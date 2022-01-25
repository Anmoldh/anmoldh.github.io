// Exit alert
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


// Thank You Alert (donation.html)
function donationAlert(btnID){
  alert("Thank You for opting to Donate " + btnID + " Rupees");
}

// Continue to Pay Alert (donation.html)
function payAlert(){
  if (confirm("Are you sure? You want to continue to pay.") == true){
    alert("Thank You! \nYou will be redirected to Homepage.");
    window.location.href='index.html';
  } else{
    alert("oops! Payment failed, You cancelled! \nRedirecting to Homepage.");
    window.location.href='index.html';
  }
}

// Confirmation Alert (contact.html)
function confAlert(){
  if (confirm("Are you sure? You want to send this!") == true){
    if (document.getElementById("bug").checked == true){
      alert("Thank You! for reporting a bug.");
    } else{
      alert("Thank You! for your valuable Feedback!");
    }
  } else{
    alert("Looks like you Cancelled!");
  }
}

// Verify Password (signup.html)
function verifyPass(){
  if (document.getElementById("pass").value == document.getElementById("cpass").value == false){
    alert("Passwords don't Match. Please Reverify")
  } else {
    alert("Account Created Sucessfully!")
  }
}