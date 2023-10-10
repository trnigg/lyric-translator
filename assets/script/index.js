
var button = document.getElementById("start");
var input= document.getElementById("input1");

  button.addEventListener("click",(e) => {
   input.style.display ="flex";
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

