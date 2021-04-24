"use strict";

const updateTime = function(time) {
	timeShower.innerHTML = format(time, showHoursCheck.checked, showUnderOneCheck.checked);
};
const stopped = function(timeRanOut) {
	if(timeRanOut) {
		if(audioValid) audioElem.play();
		else if(aContext) sound.repeat(aContext, 4);
	}
};
const changeMode = function(mode) {
	Object.assign(timer, keeperMixins[mode]);
	if(mode === KeeperMode.CLOCK) {
		disclaimer.style.visibility = "visible";
		timeButtons.style.visibility = "hidden";
	}
	else {
		disclaimer.style.visibility = "hidden";
		timeButtons.style.visibility = "visible";
	}
};
const setAudioFile = function(filename) {
	audioElem = new Audio(filename);
	audioElem.oncanplaythrough = function() {
		audioValid = true;
		soundPath.innerHTML = `Sound: loaded ${filename}`;
	};
	audioElem.onerror = function() {
		audioValid = false;
		soundPath.innerHTML = `Sound: failed to load ${filename}, ${aContext ? "falling back to simple beep" : "no sound will play"}`;
	};
};
const setBackground = function(filename) {
	body.style.backgroundImage = `url("${filename}")`;
	body.style.color = "rgb(255, 255, 255)";
	imagePath.innerHTML = `Image: ${filename}, `;
}

var audioElem = null;
var audioValid = false;
const aContext = "AudioContext" in window ? new AudioContext() : null;
const timeShower = document.getElementById("timeShower");
const customTime = document.getElementById("customTime");
const showHoursCheck = document.getElementById("showHoursCheck");
const showUnderOneCheck = document.getElementById("showUnderOneCheck");
const imagePath = document.getElementById("imagePath");
const soundPath = document.getElementById("soundPath");
const customTitle = document.getElementById("customTitle");
const customSound = document.getElementById("customSound");
const disclaimer = document.getElementById("disclaimer");
const timeButtons = document.getElementById("timeButtons");
const timer = new Timekeeper(stopped, updateTime);
const keeperMixins = [TimerMixin, StopwatchMixin, ClockMixin];
const KeeperMode = Object.freeze({
	TIMER: 0,
	STOPWATCH: 1,
	CLOCK: 2
});

customTitle.addEventListener("keydown", function(event) {
	if(event.key == "Enter")
		document.title = customTitle.value;
});
customSound.addEventListener("keydown", function(event) {
	if(event.key == "Enter")
		setAudioFile(customSound.value);
});
customBackground.addEventListener("keydown", function(event) {
	if(event.key == "Enter")
		setBackground(customBackground.value);
});

if(!aContext) {
	soundPath.innerHTML = "Sound: no AudioContext available, please load a sound file";
}

//Update for potential cached values
switch(document.querySelector("input[name='moderadio']:checked").value) {
case "timer":
	changeMode(KeeperMode.TIMER);
	break;
case "stopwatch":
	changeMode(KeeperMode.STOPWATCH);
	break;
case "clock":
	changeMode(KeeperMode.CLOCK);
	break;
}
updateTime(timer.time);
