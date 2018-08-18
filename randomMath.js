const pickRandom = function(fromHere) {
	return fromHere[Math.floor(Math.random() * fromHere.length)]
};

const chars = ['a', 'b', 'c'];
const genRandom = function(howMany) {
	const result = Array(howMany);
	for(var i = 0;i < howMany;i++) {
		if(Math.random() > 0.5) { //A number
			result[i] = (Math.random() * 100).toFixed(2);
		}
		else { //A character
			result[i] = pickRandom(chars);
		}
	}
	return result;
};

const Pattern = function(code, vars) {
	this.code = code;
	this.vars = vars;
};

const body = document.getElementsByTagName("body")[0];
const patterns = [new Pattern("{%s}^{%s}", 2), new Pattern("{%s} + {%s}", 2), new Pattern("\\sum_{%s}^{%s} {%s}", 3)];
const update = function() {
	const jax = pickRandom(MathJax.Hub.getAllJax(body));
	const pattern = pickRandom(patterns);
	MathJax.Hub.Queue(["Text", jax, sprintf(pattern.code, ...genRandom(pattern.vars))]);
	setTimeout(update, 1000);
};
//Wait until MathJax processes the initial jax. TODO: Synchronize instead of relying on an arbitrary timeout
setTimeout(update, 1000);