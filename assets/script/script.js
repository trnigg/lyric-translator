// DECLARE Dom Variables
// Insert DOM variables  here
const displayError = document.querySelector(".Error");
const lyrics = document.querySelector(".Lyrics");
const timeItTakes = document.querySelector(".Time-it-takes");
 const loader = document.getElementById('loader');

// DECLARE Global variables
let spotifyToken = localStorage.getItem('currentSpotifyToken');
let spotifyTokenExpiryTime = 3600;

// Using window object
let inputSong = window.inputValue; 
let inputArtist = window.inputValue; 
 // getting from localStorage
inputSong = localStorage.getItem('inputSong');
console.log(inputSong);
inputArtist = localStorage.getItem('inputArtist'); 
console.log(inputArtist);
songName = inputSong;
artistName = inputArtist;
// _______________________________________________________________
// DEFINE FUNCTIONS

// FUNCTION to 
async function getMondegreen(songName, artistName) {
  timeItTakes.style.display = 'block';
  loader.style.display = 'block';
  // POST request to ChatGPT
  try {
    const openAISecretKey = 'INSERT_SECRET_OPENAI'; // Replace with  actual API key - this should be kept secret - HOW? For now i remove from commiting to online repo // https://platform.openai.com/docs/api-reference/authentication
    const openAIUrl = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(openAIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAISecretKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You will be told a song name and its artist. Your job is to replace the original lyrics with lyrics made up of mondegreens and structure your response as a song-sheet.'}, // maybe this can be improved for one-verse and one-chorus only (consistency and less tokens)
          { role: 'user', content: `Song: ${songName} \nArtist: ${artistName}`},
        ],
        max_tokens: 200, //set low for testing phase
      }),
    });
    // HANDLE response
    if (!response.ok) {
      throw new Error('Network response was not ok'); // TO DO elaborate on errors
    }

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content; // cherry-pick the mondegreen-lyric part
    const usageData = responseData.usage.total_tokens; // get data related to token usage
    console.log('Usage Data: ' + usageData + 'Tokens') // display how many tokens were used in console
    renderMondegreen(reply); // call function to render the reply (lyrics)   
  }
  
  catch (error) {
    timeItTakes.style.display = 'none';
    loader.style.display = 'none';
    displayError.textContent =  error;
    console.error('Error:', error);
    return 'An error occurred while processing your request.';
  }
}

// FUNCTION to render the reply to the DOM
function renderMondegreen(reply){ 
  console.log(reply);
  lyrics.innerHTML = reply;
}


// FUNCTION to store new code to localStorage: TODO incorporate under get new token
function saveSpotifyToken(spotifyToken) {
  localStorage.setItem('currentSpotifyToken', spotifyToken);
  console.log('New token saved to localStorage:', spotifyToken);
  localStorage.setItem('currentSpotifyTokenTimestamp', Math.floor(Date.now() / 1000)); // Set timestamp in current seconds. As this is never displayed, second format suffices and dayJS is not required
  console.log ('New timestamp saved to localStorage');
}

// FUNCTION to check if token is expired. If yes, fetchNew, if not use token from localStorage:
function checkSpotifyTokenValidity() {
  const tokenTimestamp = localStorage.getItem('currentSpotifyTokenTimestamp'); // Load time in seconds when last token was generated
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds.
  if (!tokenTimestamp || currentTime - tokenTimestamp >= spotifyTokenExpiryTime) { // IF time has passed is equal to or more than 1 hour (in seconds). NOTE used variable of spotifyTokenExpiry time instead of 3600 in case length of token validity changes in future
    fetchNewSpotifyToken();
    console.log('A new Spotify Token was fetched (old token expired/missing)');
  } else {
    spotifyToken = localStorage.getItem('currentSpotifyToken');
    console.log('Existing spotify token was used (see localStorage)');
  }
}

// FUNCTION to fetch new spotify token:
function fetchNewSpotifyToken(){

  // DEFINE spotify fetch variables/methods
  const spotifyID = 'ee797a9084ca4ce19e3baf9218966dad';
  const spotifySecret = 'INSERT_SECRET_SPOTIFY'; // IMPORTANT! This needs to be kept secret. Add for testing and remove from Github commits
  const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(spotifyID + ':' + spotifySecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  // FETCH token from spotify API
  fetch(spotifyTokenUrl, authOptions)
  .then(function (response) {
    if (!response.ok) {
      throw new Error(`Fetch Error (${response.statusText})`);
    }
    return response.json();
  })
  .then(function (data) {
    spotifyToken = data.access_token;
    spotifyTokenExpiryTime = data.expires_in;
    console.log(spotifyToken);
    console.log(spotifyTokenExpiryTime);
    // Save token and timestamp to localStorage:
    saveSpotifyToken(spotifyToken);
  })
  .catch(function (error) {
    console.error(`Could not get spotify token: ${error.message}`);
  });
}

// FUNCTION to search for a track: (See https://developer.spotify.com/documentation/web-api/reference/search)
function searchForTrack() {
  // CALLS Function to check token/create
  spotifyToken = localStorage.getItem('currentSpotifyToken');
  let spotifyDataUrl = `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(songName)}%20artist:${encodeURIComponent(artistName)}&type=track&limit=1`; //will need a dynamic search for track and artist and limit it to one result, get the URI of that and then run it through the embed.
  // for explanation of encodeURIComponent see: // https://www.urlencoder.io/javascript/#:~:text=You%20can%20encode%20URI%20components,scheme%20to%20encode%20URI%20components.
  const authOptions = {
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${spotifyToken}`
    }
  };

  fetch(spotifyDataUrl, authOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetch Error (${response.statusText})`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data here
      console.log(data);
      // Need to handle data to get URI and input it into the Widget
      const trackUri = data.tracks.items[0].uri;
      const trackId = data.tracks.items[0].id;
      console.log(trackUri);
      console.log(trackId);
      renderEmbed(trackId);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error(`Could not get song data: ${error.message}`);
    });
}

function renderEmbed(trackId) {
  var iframe = document.getElementById("spotify-iframe");
  iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
}

function goBack() {
  window.location.href=('index.html');
  console.log("goback clicked")
}

// _______________________________________________________________
// CALL functions when page loads

getMondegreen(songName, artistName);
checkSpotifyTokenValidity();
setTimeout(searchForTrack, 750); // This is a temporary work around to ensure that the new token is recieved from spotify before this function is called. Async function would be better.

