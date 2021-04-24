//constructor for Background objects
const Background = function(fileName, enabledColor, disabledColor, author) {
	this.fileName = fileName;
	this.enabledColor = enabledColor;
	this.disabledColor = disabledColor;
	this.author = author;
}
backgroundData = [["bg/bg0.png", "rgb(255, 255, 255)", "rgb(30, 30, 30)", "N/A"], ["bg/bg1.png", "rgb(0, 0, 0)", "rgb(200, 200, 200)", "N/A"]];
backgroundList = [];
for(var i = 0;i < backgroundData.length;i++) {
	backgroundList.push(new Background(backgroundData[i][0], backgroundData[i][1], backgroundData[i][2], backgroundData[i][3]));
}
const body = document.getElementsByTagName("body")[0];
var backgroundNum = 2;
const changeBackground = function() {
	window.backgroundNum = (window.backgroundNum + 1) % window.backgroundList.length;
	body.style.backgroundImage = `url("${window.backgroundList[window.backgroundNum].fileName}")`;
	body.style.color = window.backgroundList[window.backgroundNum].enabledColor;
	imagePath.innerHTML = `Image: ${window.backgroundList[window.backgroundNum].author}, `;
}