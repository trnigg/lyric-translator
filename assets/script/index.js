
var button = document.getElementById("start");
var input1= document.getElementById("input1");
  button.addEventListener("click",(e) => {
   input1.style.display ="flex";
});


document.querySelector("#songdefy-btn").addEventListener("click", function() {
// stores song input value into the local storage.
let inputSong = document.querySelector("#input-song").value;
window.inputValue = inputSong; 
localStorage.setItem('inputSong', inputSong); 
// stores artist input value into the local storage.
let inputArtist = document.querySelector("#input-artist").value;
window.inputValue = inputArtist; 
localStorage.setItem('inputArtist', inputArtist); 

})