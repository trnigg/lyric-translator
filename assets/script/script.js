
// TO-DO: Add global variables for DOM manipulation and event listeners
// TO-DO 
  // EventListener with input fields for Track and Artist
    // trim() Track and Artist inputs
    let songName  ; // Remove once eventListner and input field implemented
    let artistName  ; // Remove once eventListner and input field implemented


const apiKey = 'add key'; // Replace with  actual API key - this should be kept secret - HOW? For now i remove from commiting to online repo // https://platform.openai.com/docs/api-reference/authentication
const apiUrl = 'https://api.openai.com/v1/chat/completions';


// POST request to ChatGPT
async function getMondegreen(songName, artistName) {

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
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

    // Handle response
    if (!response.ok) {
      throw new Error('Network response was not ok'); // TO DO elaborate on errors
    }
    

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content; // cherry-pick the mondegreen-lyric part
    const usageData = responseData.usage.total_tokens; // get data related to token usage
    console.log('Usage Data: ' + usageData + 'Tokens') // display how many tokens were used in console
    renderMondegreen(reply); // call function to render the reply (lyrics)
      
    then( response => {
      loader.style.display = 'none'; // Hide loader when done
      // Handle response...
    });
  }
  
  
  catch (error) {
    loader.style.display = 'none';
    displayError.textContent =  error;
    console.error('Error:', error);
    return 'An error occurred while processing your request.';
  }
}

// TO DO: Flesh out function to render the reply to the DOM
function renderMondegreen(reply){ 
  console.log(reply);
  lyrics.innerHTML = reply;
}
var displayError = document.querySelector(".Error");
// document.addEventListener('DOMContentLoaded', (event) => {
// document.querySelector(".Songdefy-btn").addEventListener("click", function(){
//   console.log('button clicked ')
//  var songName = localStorage.getItem("songName");
//  var artistName = localStorage.getItem("artistName");
//  console.log(songName, artistName);

// })});
// script.js
let inputSong = window.inputValue; // Using window object

 inputSong = localStorage.getItem('inputSong'); // Using localStorage
console.log(inputSong);



let inputArtist = window.inputValue; // Using window object

 inputArtist = localStorage.getItem('inputArtist'); // Using localStorage
console.log(inputArtist);
songName = inputSong;
artistName = inputArtist;
var lyrics = document.querySelector(".Lyrics");

// Example usage:
getMondegreen(songName, artistName);

// DECLARE global variables
let spotifyToken = localStorage.getItem('currentSpotifyToken');
let spotifyTokenExpiryTime = 3600;



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
  const spotifySecret = ' secret Key'; // IMPORTANT! This needs to be kept secret. Remove from Github commits
  const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(spotifyID + ':' + spotifySecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };


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
  checkSpotifyTokenValidity();
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
      console.log(trackUri);
      renderEmbed(trackUri);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error(`Could not get song data: ${error.message}`);
    });
}

//TEST CALL:



searchForTrack();

//See  https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
function renderEmbed(trackUri) {
  console.log(trackUri);
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
      width: '100%',
      height: '200',
      uri: trackUri // TO DO: Dynamically Replace this link with data from the API Call above (searchForTrack)
    };
    const callback = (EmbedController) => {
      document.querySelectorAll('.episode').forEach(
        episode => {
          episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
          });
        })
    };
    IFrameAPI.createController(element, options, callback);
  };
}

renderEmbed();