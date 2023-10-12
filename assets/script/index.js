
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



// Get all the elements
var modal = document.getElementById("songModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];

// When the user clicks the button, the modal is opened or if the both boxes are filled move to Second Page 
document.getElementById("songdefy-btn").addEventListener("click", function () {
 var inputSong = document.getElementById("input-song").value;
var inputArtist = document.getElementById("input-artist").value;
  if (inputSong === "" || inputArtist === "") {
      modal.style.display = "block";
  } else {
      // Redirect to Second page
      window.location.href = "SecondPage.html";
  }
});


// When the user clicks on (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close the modal
window.onclick = function close2Modal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


