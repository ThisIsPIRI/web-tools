const Background = function(fileName, enabledColor, disabledColor, author) {
	this.fileName = fileName;
	this.enabledColor = enabledColor;
	this.disabledColor = disabledColor;
	this.author = author;
};
const BgManager = function(data) {
	this.backgroundData = data;
	this.backgroundList = [];
	this.curIdx = 0;
	for(var i = 0;i < this.backgroundData.length;i++) {
		this.backgroundList.push(new Background(...this.backgroundData[i]));
	}
};
BgManager.prototype.cycleBackground = function() {
	this.curIdx = (this.curIdx + 1) % this.backgroundList.length;
	body.style.backgroundImage = `url("${this.backgroundList[this.curIdx].fileName}")`;
	body.style.color = this.backgroundList[this.curIdx].enabledColor;
	imagePath.innerHTML = `Image: ${this.backgroundList[this.curIdx].author}, `;
};

const body = document.getElementsByTagName("body")[0];
const presetBgManager = new BgManager([["bg/bg0.png", "rgb(255, 255, 255)", "rgb(30, 30, 30)", "N/A"], ["bg/bg1.png", "rgb(0, 0, 0)", "rgb(200, 200, 200)", "N/A"]]);
