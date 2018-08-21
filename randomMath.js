//UI-specific code
const confirmRead = function() {
	if(confirmRead.count == undefined)
		confirmRead.count = 0;
	confirmRead.count++;
	if(confirmRead.count >= 2)
		toggle();
}

const toggle = function() {
	stopped = !stopped;
	if(!stopped) update();
	toggleButton.innerHTML = stopped ? "Start" : "Stop";
	cycle = 0;
};

const changed = function(type, value) {
	value = parseFloat(value);
	if(isNaN(value)) return;
	switch(type) {
	case treeRateInput:
		timeout = Math.floor(1000 / value);
		break;
	case displayRateInput:
		cycleLimit = Math.round(1 / value);
		break;
	}
}

const update = function() {
	if(stopped)
		return;
	modifyTree(tree, DEPTH_LIMIT, topPatterns, middlePatterns);
	cycle++;
	if(cycle >= cycleLimit) {
		MathJax.Hub.Queue(["Text", MathJax.Hub.getAllJax(mainDiv)[0], codify(tree.root)]);
		cycle = 0;
	}
	setTimeout(update, timeout);
};
const mainDiv = document.getElementById("mainDiv");
const toggleButton = document.getElementById("toggleButton");
const treeRateInput = document.getElementById("treeUpdateRate");
const displayRateInput = document.getElementById("displayUpdateRate");
const topPatterns = [], middlePatterns = [];
const tree = new Tree();
const DEPTH_LIMIT = 3;
var stopped = true;
var cycle = 0;
var timeout = 200, cycleLimit = 2;

//Initialization
readPatterns("TopPatterns.txt", topPatterns, confirmRead);
readPatterns("MiddlePatterns.txt", middlePatterns, confirmRead);
tree.addNode(tree.root).pat = new Pattern("{%s} - {%s}", 2);
tree.addNode(tree.allNodes[1][0]).pat = "1";
tree.addNode(tree.allNodes[1][0]).pat = "i";
//Read the values in case they are cached
changed(treeRateInput, treeRateInput.value);
changed(displayRateInput, displayRateInput.value);