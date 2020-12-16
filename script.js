const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdown = document.getElementById("countdown");
const coountdownElTitle = document.getElementById("countdown-title");
const coountdownbtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeElBtn = document.getElementById("complete-button");

let countdownTitle = "";
let coundownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//  Set Date Input Minimum
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   Hide Input
    inputContainer.hidden = true;

    // if the countdown has endedn show complete
    //   Populate Countdown
    if (distance < 0) {
      countdown.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      coountdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      // show Countdown
      completeEl.hidden = true;
      countdown.hidden = false;
    }
  }, second);
}
// Take values from form
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  //   check for Valide Date
  if (countdownDate === "") {
    alert("Please select a date for the countdown");
  } else {
    //   Get Number version of current date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// REset All Values
function reset() {
  // Hide Countdown
  countdown.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the Countdown
  clearInterval(countdownActive);

  //   Rest Values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // GEt countdown from localstorage if availlble
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));

    countdown.hidden = false;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    countdownTitle = savedCountdown.title;
    updateDOM();
  }
}
// Event Listners
countdownForm.addEventListener("submit", updateCountdown);
coountdownbtn.addEventListener("click", reset);
completeElBtn.addEventListener("click", reset);

restorePreviousCountdown();
