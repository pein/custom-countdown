const inputContiner = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdown = document.getElementById("countdown");
const coountdownElTitle = document.getElementById("countdown-title");
const coountdownbtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let coundownDate = "";
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//  Set Date Input Minimum
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  const now = new Date().getTime();
  const distance = countdownValue - now;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  console.log(days, hours, minutes, seconds);

  //   Populate Countdown
  coountdownElTitle.textContent = `${countdownTitle}`;
  timeElements[0].textContent = `${days}`;
  timeElements[1].textContent = `${hours}`;
  timeElements[2].textContent = `${minutes}`;
  timeElements[3].textContent = `${seconds}`;

  //   Hide Input
  inputContiner.hidden = true;
  // show Countdown
  countdown.hidden = false;
}
// Take values from form
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownDate);
  //   Get Number version of current date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  console.log(countdownValue);
  updateDOM();
}

// Event Listners
countdownForm.addEventListener("submit", updateCountdown);
