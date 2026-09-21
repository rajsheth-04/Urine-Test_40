var patientAges = [22, 35, 67, 45, 29, 72, 56, 18, 64, 40];

function displayAges() {
  return patientAges.join(", ");
}

function findMinimum() {
  var min = patientAges[0];
  for (var i = 1; i < patientAges.length; i++) {
    if (patientAges[i] < min) {
      min = patientAges[i];
    }
  }
  return min;
}

function findMaximum() {
  var max = patientAges[0];
  for (var i = 1; i < patientAges.length; i++) {
    if (patientAges[i] > max) {
      max = patientAges[i];
    }
  }
  return max;
}

function calculateAverage() {
  var sum = 0;
  for (var i = 0; i < patientAges.length; i++) {
    sum += patientAges[i];
  }
  return sum / patientAges.length;
}

function countSeniorCitizens() {
  var count = 0;
  for (var i = 0; i < patientAges.length; i++) {
    if (patientAges[i] >= 60) {
      count++;
    }
  }
  return count;
}

function countBelow18() {
  var count = 0;
  for (var i = 0; i < patientAges.length; i++) {
    if (patientAges[i] < 18) {
      count++;
    }
  }
  return count;
}

function getAbove60() {
  var result = [];
  for (var i = 0; i < patientAges.length; i++) {
    if (patientAges[i] > 60) {
      result.push(patientAges[i]);
    }
  }
  return result;
}

document.getElementById("allAges").textContent = displayAges();
document.getElementById("minAge").textContent = findMinimum();
document.getElementById("maxAge").textContent = findMaximum();
document.getElementById("avgAge").textContent = calculateAverage();
document.getElementById("seniorCount").textContent = countSeniorCitizens();
document.getElementById("below18Count").textContent = countBelow18();
document.getElementById("above60List").textContent = getAbove60().join(", ");

console.log("All Patient Ages:", patientAges);
console.log("Minimum Age:", findMinimum());
console.log("Maximum Age:", findMaximum());
console.log("Average Age:", calculateAverage());
console.log("Senior Citizens:", countSeniorCitizens());
console.log("Patients Below 18:", countBelow18());
console.log("Patients Above 60:", getAbove60());
