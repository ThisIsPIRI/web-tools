//TODO: Clean up
const pickRandom = function(fromHere) {
	return fromHere[Math.floor(Math.random() * fromHere.length)]
};

const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const genRandom = function(howMany) {
	const result = Array(howMany);
	for(var i = 0;i < howMany;i++) {
		if(Math.random() > 0.5) { //A number
			result[i] = (Math.random() * 100).toFixed(2);
		}
		else { //A symbol
			result[i] = pickRandom(chars);
		}
	}
	return result;
};
//TODO: Support codifying subtrees
/**Codifies a Tree into plain LaTeX math.
 * @param node {Node} the root of the Tree.*/
const codify = function(node) {
	if(node.children.length === 0) { //Leaf node
		return node.pat; //Return the number or symbol.
	}
	else if(node.depth === 0) {
		var result = "";
		for(var i = 0;i < node.children.length;i++) {
			result = result.concat(codify(node.children[i]));
		}
		return result; //Top-level return statement
	}
	else {
		var result = [];
		for(var i = 0;i < node.children.length;i++) {
			result = result.concat(codify(node.children[i]));
		}
		return sprintf(node.pat.code, ...result);
	}
};

const stop = function() {
	stopped = true;
}

const Pattern = function(code, vars) {
	this.code = code;
	this.vars = vars;
};

const mainDiv = document.getElementById("mainDiv");
const topPatterns = [], middlePatterns = [];
fileReader.read("TopPatterns.txt", function(read) {
	tokens = fileReader.getTokensFrom(read, null, '\n');
	for(var i = 1;i < tokens.length;i += 2) {
		topPatterns.push(new Pattern(tokens[i - 1], parseInt(tokens[i])));
	}
});
fileReader.read("MiddlePatterns.txt", function(read) {
	tokens = fileReader.getTokensFrom(read, null, '\n');
	for(var i = 1;i < tokens.length;i += 2) {
		middlePatterns.push(new Pattern(tokens[i - 1], parseInt(tokens[i])));
	}
});
const tree = new Tree();
const DEPTH_LIMIT = 2;
var stopped = false;

tree.addNode(tree.root).pat = new Pattern("{%s} - {%s}", 2);
tree.addNode(tree.allNodes[1][0]).pat = "1";
tree.addNode(tree.allNodes[1][0]).pat = "i";

const update = function() {
	const jax = MathJax.Hub.getAllJax(mainDiv)[0];
	const depth = Math.floor(Math.random() * (Math.min(tree.allNodes.length - 1, DEPTH_LIMIT)));
	//if(tree.allNodes.length > 1 && Math.random() > 0.5) { //Remove a Node
	if(false) {
	}
	else { //Add a Node
		const parentNode = pickRandom(tree.allNodes[depth]);
		var newNode;
		if(parentNode.children.length === 0 || parentNode === tree.root)
			newNode = tree.addNode(parentNode);
		else
			newNode = tree.replaceNode(pickRandom(parentNode.children));
		if(parentNode === tree.root)
			newNode.pat = pickRandom(topPatterns);
		else
			newNode.pat = pickRandom(middlePatterns);
		genRandom(newNode.pat.vars).forEach(function(elem) {
			tree.addNode(newNode).pat = elem;
		});
	}
	MathJax.Hub.Queue(["Text", jax, codify(tree.root)]);
	console.log(codify(tree.root));
	console.log(tree);
	if(!stopped)
		setTimeout(update, 1000);
};
//Wait until MathJax processes the initial jax. TODO: Synchronize instead of relying on an arbitrary timeout
setTimeout(update, 1000);