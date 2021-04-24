"use strict";

const updateTime = function(time) {
	timeShower.innerHTML = format(time, showHoursCheck.checked, showUnderOneCheck.checked);
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
	Object.assign(timer, keeperMixins[mode]);
	if(mode === KeeperMode.CLOCK) {
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
const timer = new Timekeeper(stopped, updateTime);
const keeperMixins = [TimerMixin, StopwatchMixin, ClockMixin];
const KeeperMode = Object.freeze({
	TIMER: 0,
	STOPWATCH: 1,
	CLOCK: 2
});

customTitle.addEventListener("keydown", function(event) {
	if(event.key == "Enter")
		changeTitle(customTitle.value);
});

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
