"use strict";

const changeVisibility = function(ofWhat) {
	switch(ofWhat) {
	case showHoursCheck:
		timer.showH = showHoursCheck.checked; break;
	case showUnderOneCheck:
		timer.showOne = showUnderOneCheck.checked; break;
	}
	timer.updateTimeString();
};
const updateTime = function(timeString) {
	timeShower.innerHTML = timeString;
};
const stopped = function(timeRanOut) {
	if(timeRanOut) {
		if(USEAUDIOFILE)
			timeup.play();
		else
			sound.repeat(timeup, 3);
	}
};
const changeTitle = function(toWhat) {
	document.title = toWhat;
}
const changeMode = function(mode) {
	timer.mode = mode;
	if(mode === Timer.Mode.CLOCK) {
		disclaimer.style.visibility = "visible";
		timeButtons.style.visibility = "hidden";
	}
	else {
		disclaimer.style.visibility = "hidden";
		timeButtons.style.visibility = "visible";
	}
}

const USEAUDIOFILE = false;
const timeup = USEAUDIOFILE ? new Audio("sound/timeup.mp3") : new AudioContext();
const timeShower = document.getElementById("timeShower");
const customTime = document.getElementById("customTime");
const showHoursCheck = document.getElementById("showHoursCheck");
const showUnderOneCheck = document.getElementById("showUnderOneCheck");
const imageCredit = document.getElementById("imageCredit");
const customTitle = document.getElementById("customTitle");
const disclaimer = document.getElementById("disclaimer");
const timeButtons = document.getElementById("timeButtons");
const timer = new Timer(stopped, updateTime, format);

customTitle.addEventListener("keydown", function(event) {
	if(event.key == "Enter")
		changeTitle(customTitle.value);
});

//Update for potential cached values
changeVisibility(showHoursCheck);
changeVisibility(showUnderOneCheck);
switch(document.querySelector("input[name='moderadio']:checked").value) {
case "timer":
	changeMode(Timer.Mode.TIMER);
	break;
case "stopwatch":
	changeMode(Timer.Mode.STOPWATCH);
	break;
}
