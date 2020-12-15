const inputContiner = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

let countdownTitle = "";
let coundownDate = "";
//  Set Date Input Minimum
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Take values from form
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownDate);
}

// Event Listners
countdownForm.addEventListener("submit", updateCountdown);
