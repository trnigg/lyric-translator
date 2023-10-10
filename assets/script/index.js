
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

document.querySelector("#songdefy-btn").addEventListener("click", function() {

let inputSong = document.querySelector("#input-song").value;
window.inputValue = inputSong; // Using window object
localStorage.setItem('inputSong', inputSong); // Using localStorage

let inputArtist = document.querySelector("#input-artist").value;
window.inputValue = inputArtist; // Using window object
localStorage.setItem('inputArtist', inputArtist); // Using localStorage


})



// Get the modal
var modal = document.getElementById("songModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];

// When the user clicks the button, open the modal 
button.onclick = function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function close2Modal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var btnDefy = document.getElementById("btnDefy");
var songInput = document.getElementsByClassName("input-song");
var artistInput = document.getElementsByClassName("input-artist");

