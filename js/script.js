var hourHand = document.querySelector("#hour");
var minuteHand = document.querySelector("#minute");
var secondHand = document.querySelector("#second");

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

var alpha = 360 / 60;
var secondArmOffset = alpha;
var minuteArmOffset = alpha / 60;
var hourArmOffset = alpha / 60 / 60;

function moveThoseArm() {
  // Getting current time
  secRotate += secondArmOffset;
  minRotate += minuteArmOffset;
  hrRotate += hourArmOffset;

  secondHand.style.transform = `rotate(${secRotate}deg)`;
  minuteHand.style.transform = `rotate(${minRotate}deg)`;
  hourHand.style.transform = `rotate(${hrRotate}deg)`;
}

setInterval(moveThoseArm, 1000);
