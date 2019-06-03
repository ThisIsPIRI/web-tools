//Modified from https://stackoverflow.com/a/6313008.
//Licensed under CC BY-SA 3.0, https://creativecommons.org/licenses/by-sa/3.0/.
const format = function (number, showHour, showUnderOne) {
	var secondSum = number / 1000;
	if(!showUnderOne) secondSum = Math.floor(secondSum);
	var hours = showHour ? Math.floor(secondSum / 3600) : 0; //To show over an hour as minutes, assing 0 to hours when !showHour
	var minutes = Math.floor((secondSum - (hours * 3600)) / 60);
	var seconds = secondSum - (hours * 3600) - (minutes * 60);
	if(showUnderOne) seconds = seconds.toFixed(3);
	
	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;
	var result = "";
	if(showHour) result += hours + ':';
	result += minutes + ':' + seconds;
	return result;
};
