// Exit aleart
function erralt() {
    alert("oops! Something went wrong.");
}

// For Making Collapsible Form or Div
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Copy Div
var firstDivContent = document.getElementById('copyfromdiv');
var secondDivContent = document.getElementById('pasteherediv');
secondDivContent.innerHTML = firstDivContent.innerHTML;