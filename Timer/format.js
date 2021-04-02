const format = function(number, showHour, showUnderOne) {
	var result = "";
	for(let i = showHour ? 0 : 1;i < format.milsecs.length - (showUnderOne ? 0 : 1);i++) {
		const part = Math.floor(number / format.milsecs[i]).toString();
		//result += '0'.repeat(Math.max(0, format.minLens[i] - part.length));
		for(let j = 0;j < format.minLens[i] - part.length;j++)
			result += '0';
		result += part;
		result += format.separators[i];
		number %= format.milsecs[i];
	}
	if(!showUnderOne) result = result.slice(0, -1);
	return result;
}
format.milsecs = Object.freeze([3600000, 60000, 1000, 1]);
format.separators = Object.freeze([':', ':', '.', '']);
format.minLens = Object.freeze([2, 2, 2, 3]);
