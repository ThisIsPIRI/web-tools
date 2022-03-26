if(!Promise.allSettled) {
	Promise.allSettled = function(inp) {
		const toPass = [];
		for(const p of inp) {
			toPass.push(p.then(function(v) {
				return {status: "fulfilled", value: v};
			}).catch(function(r) {
				return {status: "rejected", reason: r};
			}));
		}
		return Promise.all(toPass);
	};
}
