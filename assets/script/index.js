
var startButton = document.getElementById("start");
var input1= document.getElementById("input1");
let inputArtist = document.querySelector("#input-artist").value;
let inputSong = document.querySelector("#input-song").value;

// when start button is clicked it displays the two inputs.
startButton.addEventListener("click",(e) => {
   input1.style.display ="flex";
});

// Saves the input value to the local storage when the songdefy button is clicked.
document.querySelector("#songdefy-btn").addEventListener("click", function() {
window.inputValue = inputSong;
localStorage.setItem('inputSong', inputSong); 
window.inputValue = inputArtist; 
localStorage.setItem('inputArtist', inputArtist); 


})