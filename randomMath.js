const pickRandom = function(fromHere) {
	return fromHere[Math.floor(Math.random() * fromHere.length)]
}

const body = document.getElementsByTagName("body")[0];
const patterns = ["{%s}^{%s}", "{%s} + {%s}"];
const update = function() {
	const jax = pickRandom(MathJax.Hub.getAllJax(body));
	MathJax.Hub.Queue(["Text", jax, sprintf(pickRandom(patterns), Math.random(), Math.random())]);
	setTimeout(update, 1000);
};
//Wait until MathJax processes the initial jax. TODO: synchronize instead of relying on an arbitrary timeout
setTimeout(update, 1000);