var appointmentForm = document.getElementById("appointmentForm");
var patientNameInput = document.getElementById("patientName");
var patientEmailInput = document.getElementById("patientEmail");
var doctorSelect = document.getElementById("doctorSelect");
var serviceSelect = document.getElementById("serviceSelect");
var appointmentDateInput = document.getElementById("appointmentDate");
var appointmentTimeSelect = document.getElementById("appointmentTime");

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var doctorError = document.getElementById("doctorError");
var serviceError = document.getElementById("serviceError");
var dateError = document.getElementById("dateError");
var timeError = document.getElementById("timeError");

var bookingMessage = document.getElementById("bookingMessage");
var appointmentDetails = document.getElementById("appointmentDetails");
var noAppointmentMessage = document.getElementById("noAppointmentMessage");
var appointmentInfo = document.getElementById("appointmentInfo");

var displayPatientName = document.getElementById("displayPatientName");
var displayDoctor = document.getElementById("displayDoctor");
var displayService = document.getElementById("displayService");
var displayDate = document.getElementById("displayDate");
var displayTime = document.getElementById("displayTime");

var cancelAppointmentBtn = document.getElementById("cancelAppointmentBtn");
var rescheduleBtn = document.getElementById("rescheduleBtn");
var rescheduleSection = document.getElementById("rescheduleSection");
var newDateInput = document.getElementById("newDate");
var newTimeSelect = document.getElementById("newTime");
var newDateError = document.getElementById("newDateError");
var newTimeError = document.getElementById("newTimeError");
var saveRescheduleBtn = document.getElementById("saveRescheduleBtn");
var closeRescheduleBtn = document.getElementById("closeRescheduleBtn");

var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTodayString() {
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, "0");
  var day = String(now.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

if (appointmentDateInput) {
  appointmentDateInput.min = getTodayString();
}
if (newDateInput) {
  newDateInput.min = getTodayString();
}

function clearValidationErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  doctorError.textContent = "";
  serviceError.textContent = "";
  dateError.textContent = "";
  timeError.textContent = "";
}

function showBookingMessage(msg, isSuccess) {
  bookingMessage.textContent = msg;
  bookingMessage.className = isSuccess ? "booking-message success" : "booking-message";
  bookingMessage.style.display = "block";
}

function hideBookingMessage() {
  bookingMessage.style.display = "none";
}

function loadAppointment() {
  var stored = localStorage.getItem("appointment");
  if (stored) {
    var data = JSON.parse(stored);
    displayPatientName.textContent = data.patientName;
    displayDoctor.textContent = data.doctor;
    displayService.textContent = data.service;
    displayDate.textContent = data.date;
    displayTime.textContent = data.time;
    noAppointmentMessage.style.display = "none";
    appointmentInfo.style.display = "block";
  } else {
    noAppointmentMessage.style.display = "block";
    appointmentInfo.style.display = "none";
    if (rescheduleSection) {
      rescheduleSection.style.display = "none";
    }
  }
}

appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearValidationErrors();
  hideBookingMessage();

  var nameVal = patientNameInput.value.trim();
  var emailVal = patientEmailInput.value.trim();
  var doctorVal = doctorSelect.value;
  var serviceVal = serviceSelect.value;
  var dateVal = appointmentDateInput.value;
  var timeVal = appointmentTimeSelect.value;

  var isValid = true;

  if (nameVal === "") {
    nameError.textContent = "Please enter patient name.";
    isValid = false;
  }

  if (emailVal === "") {
    emailError.textContent = "Please enter email address.";
    isValid = false;
  } else if (!emailPattern.test(emailVal)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (doctorVal === "") {
    doctorError.textContent = "Please select a doctor.";
    isValid = false;
  }

  if (serviceVal === "") {
    serviceError.textContent = "Please select a service.";
    isValid = false;
  }

  if (dateVal === "") {
    dateError.textContent = "Please select an appointment date.";
    isValid = false;
  } else {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var chosenDate = new Date(dateVal + "T00:00:00");
    if (chosenDate < today) {
      dateError.textContent = "Appointment date cannot be in the past.";
      isValid = false;
    }
  }

  if (timeVal === "") {
    timeError.textContent = "Please select a time slot.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  var appointment = {
    patientName: nameVal,
    email: emailVal,
    doctor: doctorVal,
    service: serviceVal,
    date: dateVal,
    time: timeVal
  };

  localStorage.setItem("appointment", JSON.stringify(appointment));
  loadAppointment();
  showBookingMessage("Appointment booked successfully!", true);
  appointmentForm.reset();
});

if (cancelAppointmentBtn) {
  cancelAppointmentBtn.addEventListener("click", function () {
    localStorage.removeItem("appointment");
    loadAppointment();
    showBookingMessage("Appointment cancelled successfully.", true);
  });
}

if (rescheduleBtn) {
  rescheduleBtn.addEventListener("click", function () {
    var stored = localStorage.getItem("appointment");
    if (stored) {
      var data = JSON.parse(stored);
      newDateInput.value = data.date;
      newTimeSelect.value = data.time;
      newDateError.textContent = "";
      newTimeError.textContent = "";
      rescheduleSection.style.display = "block";
    }
  });
}

if (closeRescheduleBtn) {
  closeRescheduleBtn.addEventListener("click", function () {
    rescheduleSection.style.display = "none";
  });
}

if (saveRescheduleBtn) {
  saveRescheduleBtn.addEventListener("click", function () {
    newDateError.textContent = "";
    newTimeError.textContent = "";

    var newDateVal = newDateInput.value;
    var newTimeVal = newTimeSelect.value;
    var isRescheduleValid = true;

    if (newDateVal === "") {
      newDateError.textContent = "Please select a new date.";
      isRescheduleValid = false;
    } else {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var chosenDate = new Date(newDateVal + "T00:00:00");
      if (chosenDate < today) {
        newDateError.textContent = "New date cannot be in the past.";
        isRescheduleValid = false;
      }
    }

    if (newTimeVal === "") {
      newTimeError.textContent = "Please select a new time slot.";
      isRescheduleValid = false;
    }

    if (!isRescheduleValid) {
      return;
    }

    var stored = localStorage.getItem("appointment");
    if (stored) {
      var data = JSON.parse(stored);
      data.date = newDateVal;
      data.time = newTimeVal;
      localStorage.setItem("appointment", JSON.stringify(data));
      loadAppointment();
      rescheduleSection.style.display = "none";
      showBookingMessage("Appointment rescheduled successfully!", true);
    }
  });
}

loadAppointment();
