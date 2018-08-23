const addCustom = function() {
	timer.addTime(parseInt(customTime.value) * 1000);
};
const changeVisibility = function(ofWhat) {
	switch(ofWhat) {
	case showHoursCheck:
		timer.showH = showHoursCheck.checked; break;
	case showUnderOneCheck:
		timer.showOne = showUnderOneCheck.checked; break;
	}
	timer.updateTimeString();
}
const updateTime = function(timeString) {
	timeShower.innerHTML = timeString;
};
const stopped = function(timeRanOut) {
	if(timeRanOut)
		timeup.play();
}

const timeShower = document.getElementById("timeShower");
const customTime = document.getElementById("customTime");
const showHoursCheck = document.getElementById("showHoursCheck");
const showUnderOneCheck = document.getElementById("showUnderOneCheck");
const imageCredit = document.getElementById("imageCredit");
const timeup = new Audio("sound/timeup.mp3");
const timer = new Timer(stopped, updateTime);