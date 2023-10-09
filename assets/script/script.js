
// TO-DO: Add global variables for DOM manipulation


const apiKey = 'ADD_TOKEN'; // Replace with  actual API key - this should be kept secret - HOW? For now i remove from commiting to online repo // https://platform.openai.com/docs/api-reference/authentication
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// POST request to ChatGPT
async function getMondegreen(songName, artistName) {
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

  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while processing your request.';
  }
}

// TO DO: Flesh out function to render the reply to the DOM
function renderMondegreen(reply){ 
  console.log(reply);
}


// TO-DO 
  // EventListener with input fields for Track and Artist
    // trim() Track and Artist inputs
let songName = 'All Star'; // Remove once eventListner and input field implemented
let artistName = 'Smash Mouth'; // Remove once eventListner and input field implemented

// Example usage:
getMondegreen(songName, artistName);


// https://platform.openai.com/docs/guides/gpt
// https://platform.openai.com/account/api-keys




  var button = document.getElementById("start");
  var input= document.getElementById("input1");

    button.addEventListener("click",(e) => {
     input.style.display ="flex";
 
  })
