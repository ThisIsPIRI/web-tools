//UI-independent utilities for generating random math
const Pattern = function(code, vars) {
	this.code = code;
	this.vars = vars;
};

const readPatterns = function(fileName, toPushTo, callback) {
	const countOccurrence = (str, substr) => str.split(substr).length - 1;
	ajaxRequester.request(fileName, function(read) {
		tokens = ajaxRequester.getTokensFrom(read, null, '\n');
		for(var i = 0;i < tokens.length;i++) {
			toPushTo.push(new Pattern(tokens[i], countOccurrence(tokens[i], "{%s}")));
		}
		callback();
	});
};

const pickRandom = function(fromHere) {
	return fromHere[Math.floor(Math.random() * fromHere.length)]
};

const genRandom = function(howMany) {
	const result = Array(howMany);
	for(var i = 0;i < howMany;i++) {
		if(Math.random() > 0.5) //A number
			result[i] = (Math.random() * 100).toFixed(2);
		else //A symbol
			result[i] = pickRandom(genRandom.chars);
	}
	return result;
};
//TODO: Move to somewhere else
genRandom.chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
"\\alpha", "\\beta", "\\gamma", "\\delta", "\\epsilon", "\\zeta", "\\eta", "\\theta", "\\iota", "\\kappa", "\\lambda", "\\mu", "\\nu", "\\xi", "\\omicron",
"\\pi", "\\rho", "\\sigma", "\\tau", "\\upsilon", "\\phi", "\\chi", "\\psi", "\\omega", "\\infty"];

//TODO: Support codifying subtrees
/**Codifies the Tree into a string.
 * @param node {Node} the root of the Tree.*/
const codify = function(node) {
	if(node.children.length === 0) { //Leaf node
		return node.pat; //Return the number or symbol.
	}
	else if(node.depth === 0) {
		var result = "";
		for(var i = 0;i < node.children.length;i++) {
			result = result.concat(codify(node.children[i]));
			//if(i % 10 === 9) //TODO: Add an option to use this instead of the MathJax config for line break
				//result += '\\\\';
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
//TODO: Prevent empty parentheses
const modifyTree = function(tree, depthLimit, topPatterns, middlePatterns) {
	const depth = Math.floor(Math.random() * (Math.min(tree.allNodes.length - 1, depthLimit)));
	//if(tree.allNodes.length > 1 && Math.random() > 0.8) { //Remove a Node
	if(false) { //Remove something. TODO: implement
	}
	else { //Add something
		const parentNode = pickRandom(tree.allNodes[depth]);
		var newNode;
		//Add or replace a Node
		if(parentNode.children.length === 0 || parentNode === tree.root)
			newNode = tree.addNode(parentNode);
		else
			newNode = tree.replaceNode(pickRandom(parentNode.children));
		//Pick a Pattern for the Node
		if(parentNode === tree.root)
			newNode.pat = pickRandom(topPatterns);
		else
			newNode.pat = pickRandom(middlePatterns);
		//Generate leaf Nodes for the Node
		genRandom(newNode.pat.vars).forEach(function(elem) {
			tree.addNode(newNode).pat = elem;
		});
	}
};
