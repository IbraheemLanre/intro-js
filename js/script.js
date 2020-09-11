var hourHand = document.querySelector("#hour");
var minuteHand = document.querySelector("#minute");
var secondHand = document.querySelector("#second");

function moveThoseArm() {
  // Getting current time
  var now = new Date();

  var sec = now.getSeconds();
  var secFraction = sec / 60;
  var secRotate = secFraction * 360;
  secondHand.style.transform = `rotate(${secRotate}deg)`;

  var min = now.getMinutes();
  var minFraction = (secFraction + min) / 60;
  var minRotate = minFraction * 360;
  minuteHand.style.transform = `rotate(${minRotate}deg)`;

  var hr = now.getHours();
  var hrFraction = (minFraction + hr) / 12;
  var hrRotate = hrFraction * 360;
  hourHand.style.transform = `rotate(${hrRotate}deg)`;
}

setInterval(moveThoseArm, 1000);

//
var h2El = document.createElement("h2");
h2El.innerText = "Use the menu below";
document.body.appendChild(h2El);

//create menu
// var formEl = document.createElement("form");
// document.body.appendChild(formEl);

var clockMenu = document.createElement("select");
clockMenu.setAttribute("id", "menu");
document.body.appendChild(clockMenu);

var optionEl1 = document.createElement("option");
optionEl1.textContent = "Select an option";
clockMenu.appendChild(optionEl1);

var optionEl2 = document.createElement("option");
optionEl2.setAttribute("class", "hour-opt");
optionEl2.textContent = "Hour";
clockMenu.appendChild(optionEl2);

var optionEl3 = document.createElement("option");
optionEl3.setAttribute("class", "minute-opt");
optionEl3.textContent = "Minute";
clockMenu.appendChild(optionEl3);

// inputTime("hour");
var inputHour = document.createElement("input");
inputHour.setAttribute("name", "inputHour");
inputHour.setAttribute("id", "inputHour");
inputHour.setAttribute("type", "number");
inputHour.setAttribute("min", "0");
inputHour.setAttribute("max", "24");

var hourLabel = document.createElement("label");
hourLabel.setAttribute("for", "inputHour");
hourLabel.setAttribute("style", "margin-left:10px;");
hourLabel.innerText = "Hour";

document.body.appendChild(hourLabel);
document.body.appendChild(inputHour);

var inputMin = document.createElement("input");
inputMin.setAttribute("name", "inputMinute");
inputMin.setAttribute("id", "inputMinute");
inputMin.setAttribute("type", "number");
inputMin.setAttribute("min", "0");
inputMin.setAttribute("max", "59");

var minuteLabel = document.createElement("label");
minuteLabel.setAttribute("for", "inputMinute");
minuteLabel.setAttribute("style", "margin-left:10px;");
minuteLabel.innerText = "Minute";

document.body.appendChild(minuteLabel);
document.body.appendChild(inputMin);

var btnEl = document.createElement("button");
btnEl.setAttribute("style", "margin-left:10px;");
btnEl.innerText = "Submit";
document.body.appendChild(btnEl);

//

// var hourHandVal = document.querySelector("#hour").value;
// var minuteHandVal = document.querySelector("#minute").value;

var userInputHourVal = document.querySelector("#inputHour").value;
var userInputMinVal = document.querySelector("#inputMinute").value;

// btnEl.addEventListener("click", playSound);

if (hourHand === userInputHourVal && minuteHand === userInputMinVal) {
  btnEl.addEventListener("submit", playSound);
}
// play the sound

// var selectClock = document.querySelector("#clock");

function playSound() {
  // Create Audio tag
  var audioEl = document.createElement("audio");
  var sourceEl = document.createElement("source");
  sourceEl.setAttribute("src", "https://freesound.org/s/237210/");
  audioEl.appendChild(sourceEl);
  document.body.appendChild(audioEl);
}
