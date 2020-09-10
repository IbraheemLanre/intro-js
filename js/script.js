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

// Play Audio file, the sound of the clock
var audioEl = document.createElement("audio");
var sourceEl = document.createElement("source");
sourceEl.setAttribute("src", "https://freesound.org/s/237210/");
audioEl.appendChild(sourceEl);
document.body.appendChild(audioEl);

var selectClock = document.querySelector("#clock");
