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

// For Showing different form based on selected
function changeForm(form) {
  for (var i=0; i<form.length; i++){
    var form_op = form.options[i].value;
    if (form_op == form.value) {
      document.getElementsByName(form_op)[0].style.display = "block";
    }
    else {
      document.getElementsByName(form_op)[0].style.display = "none";
    }
   }
  }
