//UI-specific code
const toggle = function() {
	stopped = !stopped;
	if(!stopped) update();
	toggleButton.innerHTML = stopped ? "Start" : "Stop";
};

const update = function() {
	if(stopped)
		return;
	modifyTree(tree, DEPTH_LIMIT, topPatterns, middlePatterns);
	MathJax.Hub.Queue(["Text", MathJax.Hub.getAllJax(mainDiv)[0], codify(tree.root)]);
	setTimeout(update, 500);
};
const mainDiv = document.getElementById("mainDiv");
const toggleButton = document.getElementById("toggleButton");
const topPatterns = [], middlePatterns = [];
const tree = new Tree();
const DEPTH_LIMIT = 3;
var stopped = false;

//Initialization
readPatterns("TopPatterns.txt", topPatterns);
readPatterns("MiddlePatterns.txt", middlePatterns);
tree.addNode(tree.root).pat = new Pattern("{%s} - {%s}", 2);
tree.addNode(tree.allNodes[1][0]).pat = "1";
tree.addNode(tree.allNodes[1][0]).pat = "i";
//Wait until MathJax processes the initial jax and all Patterns are read. TODO: Synchronize instead of relying on an arbitrary timeout
setTimeout(update, 2000);