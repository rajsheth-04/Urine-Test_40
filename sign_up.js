var form = document.getElementById("signupForm");
var errorBox = document.getElementById("errorMessage");
var successBox = document.getElementById("successMessage");
var infoCard = document.getElementById("patientInfoCard");

var namePattern = /^[A-Za-z\s]+$/;
var mobilePattern = /^\d{10}$/;
var patientIdPattern = /^PAT-\d{4}$/;
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
  successBox.style.display = "none";
  infoCard.style.display = "none";
}

function hideMessages() {
  errorBox.style.display = "none";
  successBox.style.display = "none";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  hideMessages();

  var fullname = document.getElementById("fullname").value.trim();
  var patientId = document.getElementById("patientId").value.trim();
  var email = document.getElementById("email").value.trim();
  var mobile = document.getElementById("mobile").value.trim();
  var ageValue = document.getElementById("age").value.trim();
  var gender = document.getElementById("gender").value;
  var bloodGroup = document.getElementById("bloodGroup").value;
  var department = document.getElementById("department").value;
  var appointmentType = document.getElementById("appointmentType").value;
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm_password").value;

  if (fullname === "") {
    showError("Please enter your full name.");
    return;
  }
  if (!namePattern.test(fullname)) {
    showError("Name must contain only alphabets and spaces.");
    return;
  }

  if (patientId === "") {
    showError("Please enter your Patient ID.");
    return;
  }
  if (!patientIdPattern.test(patientId)) {
    showError("Patient ID must be in format PAT-1234.");
    return;
  }

  if (email === "") {
    showError("Please enter your email.");
    return;
  }
  if (!emailPattern.test(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (mobile === "") {
    showError("Please enter your mobile number.");
    return;
  }
  if (!mobilePattern.test(mobile)) {
    showError("Mobile number must be exactly 10 digits.");
    return;
  }

  if (ageValue === "" || isNaN(ageValue) || Number(ageValue) < 0) {
    showError("Please enter a valid age.");
    return;
  }

  if (gender === "") {
    showError("Please select your gender.");
    return;
  }

  if (bloodGroup === "") {
    showError("Please select your blood group.");
    return;
  }

  if (department === "") {
    showError("Please select a department.");
    return;
  }

  if (appointmentType === "") {
    showError("Please select an appointment type.");
    return;
  }

  if (username === "") {
    showError("Please enter a username.");
    return;
  }

  if (password === "") {
    showError("Please enter a password.");
    return;
  }
  if (password.length < 8) {
    showError("Password must be at least 8 characters.");
    return;
  }

  if (confirmPassword !== password) {
    showError("Passwords do not match.");
    return;
  }

  var age = Number(ageValue);

  var patient = {
    patientName: fullname,
    patientId: patientId,
    age: age,
    gender: gender,
    bloodGroup: bloodGroup,
    mobile: mobile,
    email: email,
    department: department,
    appointmentType: appointmentType,
    registrationStatus: "Confirmed",

    getPatientInfo: function () {
      var info = "Name: " + this.patientName + "\n";
      info += "Patient ID: " + this.patientId + "\n";
      info += "Age: " + this.age + "\n";
      info += "Gender: " + this.gender + "\n";
      info += "Blood Group: " + this.bloodGroup + "\n";
      info += "Mobile: " + this.mobile + "\n";
      info += "Email: " + this.email + "\n";
      info += "Registration Status: " + this.registrationStatus;
      return info;
    },

    getAppointmentInfo: function () {
      var info = "Department: " + this.department + "\n";
      info += "Appointment Type: " + this.appointmentType;
      return info;
    },

    getCategory: function () {
      if (this.age >= 60) {
        return "Senior Citizen";
      } else {
        return "Adult";
      }
    }
  };

  console.log("Patient Name:", patient.patientName);
  console.log("Patient ID:", patient.patientId);
  console.log("Email:", patient.email);
  console.log("Mobile:", patient.mobile);
  console.log("Age:", patient.age);
  console.log("Gender:", patient.gender);
  console.log("Blood Group:", patient.bloodGroup);
  console.log("Department:", patient.department);
  console.log("Appointment Type:", patient.appointmentType);
  console.log("Category:", patient.getCategory());

  var storageData = {
    patientName: patient.patientName,
    patientId: patient.patientId,
    age: patient.age,
    gender: patient.gender,
    bloodGroup: patient.bloodGroup,
    mobile: patient.mobile,
    email: patient.email,
    department: patient.department,
    appointmentType: patient.appointmentType,
    registrationStatus: patient.registrationStatus
  };
  localStorage.setItem("registeredPatient", JSON.stringify(storageData));

  successBox.textContent = "Registration successful! Welcome, " + patient.patientName + ".";
  successBox.style.display = "block";
  errorBox.style.display = "none";

  var infoText = patient.getPatientInfo().replace(/\n/g, "<br>");
  document.getElementById("infoDisplay").innerHTML = infoText;

  var apptText = patient.getAppointmentInfo().replace(/\n/g, "<br>");
  document.getElementById("appointmentDisplay").innerHTML = apptText;

  var categoryText = "Category: " + patient.getCategory();
  if (patient.age >= 60) {
    categoryText += "<br>Senior Citizen: Yes";
  } else {
    categoryText += "<br>Senior Citizen: No";
  }
  document.getElementById("categoryDisplay").innerHTML = categoryText;

  infoCard.style.display = "block";
});
