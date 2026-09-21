var contactForm = document.getElementById("contactForm");
var cnameInput = document.getElementById("cname");
var cemailInput = document.getElementById("cemail");
var messageInput = document.getElementById("message");

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var messageError = document.getElementById("messageError");
var successMessage = document.getElementById("successMessage");

var namePattern = /^[A-Za-z\s]+$/;
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  successMessage.style.display = "none";

  var nameVal = cnameInput.value.trim();
  var emailVal = cemailInput.value.trim();
  var messageVal = messageInput.value.trim();

  var isValid = true;

  if (nameVal === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  } else if (!namePattern.test(nameVal)) {
    nameError.textContent = "Name should contain only letters and spaces.";
    isValid = false;
  }

  if (emailVal === "") {
    emailError.textContent = "Please enter your email.";
    isValid = false;
  } else if (!emailPattern.test(emailVal)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (messageVal === "") {
    messageError.textContent = "Please enter your message.";
    isValid = false;
  } else if (messageVal.length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  var contactData = {
    name: nameVal,
    email: emailVal,
    message: messageVal
  };

  localStorage.setItem("contactMessage", JSON.stringify(contactData));

  successMessage.textContent = "Message sent successfully!";
  successMessage.style.display = "block";

  contactForm.reset();
});

contactForm.addEventListener("reset", function () {
  clearErrors();
  successMessage.textContent = "";
  successMessage.style.display = "none";
});
