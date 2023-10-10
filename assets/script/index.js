
var button = document.getElementById("start");
var input1= document.getElementById("input1");

  button.addEventListener("click",(e) => {
   input1.style.display ="flex";
});


// songName = document.querySelector(".input-song").value;
// artistName = document.querySelector(".input-artist").value;
// localStorage.setItem('songName', songName);
// localStorage.setItem('artistName', artistName);

// index.js

document.querySelector(".Songdefy-btn").addEventListener("click", function() {

let inputSong = document.querySelector(".input-song").value;
window.inputValue = inputSong; // Using window object
localStorage.setItem('inputSong', inputSong); // Using localStorage

let inputArtist = document.querySelector(".input-artist").value;
window.inputValue = inputArtist; // Using window object
localStorage.setItem('inputArtist', inputArtist); // Using localStorage


})