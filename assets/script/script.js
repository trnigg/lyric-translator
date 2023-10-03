console.log("Test");

// https://developer.musixmatch.com/documentation/checklist-before-going-live 

// Musixmatch Requires 2 Calls:

// Match catalogs using track.search - https://developer.musixmatch.com/documentation/api-reference/track-search
  // This is behind a paywall :(
// Get lyrics using track.lyrics.get - https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
  // Whenever we get lyrics, required to show value of lyrics_copyright from track.lyrics.get
  // Also requires trackings script: <script type="text/javascript" src="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP"> provided as "script_tracking_url" see: bottom of /track-lyrics-get page above
  // Need add the "powered by" image provided by Musixmatch and have it linked to www.musixmatch.com

// A note on country-restrictiions: https://developer.musixmatch.com/documentation/restrictions
  // May be useful to script an error message



// New method: https://developer.musixmatch.com/documentation/api-reference/matcher-lyrics-get  
  // Example: matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao

  // musixmatch root url: https://api.musixmatch.com/ws/1.1/


// Function to fetch song lyrics from musixmatch API
function fetchLyrics(track, artist) {
  // Make a fetch request to the Weather API using the city
  const rootUrl = `https://api.musixmatch.com/ws/1.1/`; // Use template-literals to insert 'song' and 'artist' parameter conditionally (if provided) and 'API_KEY' constant and get temperature in celsius (metric).
  const methodUrl = `matcher.lyrics.get?`;
  let apiUrl = `${rootUrl}${methodUrl}`;
  // musixmatch API key 
  const API_KEY = 'f3daa507cfab2d17e6bd2a4cd05d2ece';

  // Append relevant queries to apiUrl:
  if (track !== "") { // If 'Track' input is not empty;
    apiUrl += `q_track=${encodeURIComponent(track)}`; // appends 'Track' query to API URL in encoded form.
  }

  if (artist !== "") { // If 'Artist' input is not empty;
    if (apiUrl.includes("q_track=")) { // If API already includes 'Track' query;
      apiUrl += `&q_artist=${encodeURIComponent(artist)}`; // appends 'Artist' query AND '&' separator to API URL in encoded form.
    } else { // If API doesn't include 'Track' query;
      apiUrl += `q_artist=${encodeURIComponent(artist)}`; // appends 'Artist' query WITHOUT '&' separator to API URL in encoded form.
    }
  }

  // Append musixmatch API key
  apiUrl += `&apikey=${API_KEY}`;

    // NOTE: May be able to clean up above code depending on whether or not we REQUIRE the track search, but have ARTIST field as optional
    // for explanation of encodeURIComponent see: // https://www.urlencoder.io/javascript/#:~:text=You%20can%20encode%20URI%20components,scheme%20to%20encode%20URI%20components.
    
  console.log(apiUrl);

  fetch(apiUrl, { 
  // method: 'GET', //GET is the default.
  // credentials: 'same-origin', // include, *same-origin, omit
  // redirect: 'follow', // manual, *follow, error
  mode: 'cores', // prevent sdata!!!!!
  }) //initiates HTTP GET request
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetch Error (${response.statusText})`); //  https://www.youtube.com/watch?v=cFTFtuEQ-10 see more comments next to fetch
      }
    })
    .then(function (songData){
      logSongData(songData);
    })
    .catch(function (error) {
    alert('Could not get requested song data: ' + error.message); // if there is a run-time error, the message will be displayed here. If however, there is a fetch error, it will be displayed as thrown above.
    });
}

function logSongData(songData){
  console.log(songData);
}

// RUNNING INTO CORS ISSUE 


// Scenario Testing
fetchLyrics("Roses", "Outkast");




// TO-DO 
  // EventListener with input fields for Track and Artist
    // trim() Track and Artist inputs
