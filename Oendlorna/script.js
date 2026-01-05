"use strict";

const requestGeneration = function(url, prompt, config, doStream = false) {
	const requestBody = Object.assign(config, { prompt: prompt, stream: doStream });

	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(requestBody)
	})
	.then(response => {
		if(response.ok)
			return doStream ? response.body : response.json();
		else
			throw new Error(`Response not ok: ${response.status} ${response.statusText}`);
	})
	.then(data => {
		if(doStream)
			return handleStream(data);
		else if(data.choices?.length > 0)
			return data.choices[0].text;
		else
			throw new Error(`Malformed non-streaming response: ${data}`);
	});
};

const handleStream = async function*(readableStream) {
	const decoder = new TextDecoder();
	for await(const chunk of readableStream) {
		let decoded = decoder.decode(chunk);
		decoded = decoded.substring(decoded.indexOf('{')).trim(); // Remove 'data: ' at the start. Sometimes there are duplicate 'data: ' substrings, so slice(6) won't work.
		let jsons;
		if(decoded.indexOf("\ndata: {") >= 0) // Sometimes we get two 'data: ' rows in the same chunk.
			jsons = decoded.split("\ndata: ");
		else
			jsons = [decoded];
		for(const j of jsons) {
			// Discard unwanted transmissions, including "[DONE]" and "ping"
			if(j[0] !== '{' && j.indexOf('"text"') < 0)
				continue;
			//console.log(j);
			yield JSON.parse(j).choices[0].text;
		}
	}
};



const RequestManager = function(sendButton, errorDisplay, statusBlinker, indicatorType) {
	this.state = RequestManager.CLOSED;
	this.stream = null;
	this.sendButton = sendButton;
	this.errorDisplay = errorDisplay;
	this.statusBlinker = statusBlinker;
	this.indicatorType = indicatorType;

	sendButton.addEventListener("click", e => {
		if(this.state === RequestManager.CLOSED)
			this.tryGenerate();
		else
			this.setState(RequestManager.INTERRUPTED);
	});
	this.statusBlinker.className = `${this.indicatorType}-inactive`;
};
RequestManager.CLOSED = 0;
RequestManager.OPEN = 1;
RequestManager.INTERRUPTED = -1;

RequestManager.prototype.setState = function(newState) {
	if(newState === this.state)
		return;

	if(newState === RequestManager.INTERRUPTED) {
		if(this.state === RequestManager.CLOSED)
			return;
		this.stream?.return();
	}
	else if(newState === RequestManager.OPEN) {
		this.statusBlinker.className = `${this.indicatorType}-active`;
		this.sendButton.innerText = "Interrupt";
	}
	else if(newState === RequestManager.CLOSED) {
		this.statusBlinker.className = `${this.indicatorType}-inactive`;
		this.sendButton.innerText = "Generate";
	}
	this.state = newState;
};

RequestManager.prototype.tryGenerate = function() {
	if(this.state !== RequestManager.CLOSED)
		return;

	const doStream = uiConfigManager.getConfig().dostream;
	this.showError("");
	pasteManager.forward();
	this.setState(RequestManager.OPEN);

	requestGeneration(API_URL, inputText.value, configManager.getConfig(), doStream)
	.then(async (result) => {
		if(doStream) {
			this.stream = result;
			for await(const token of this.stream) {
				pasteManager.addOutput(token);
			}
		}
		else
			pasteManager.addOutput(result);
	})
	.catch(RequestManager.prototype.showError.bind(this))
	.finally(RequestManager.prototype.setState.bind(this, RequestManager.CLOSED));
};

/** To clear, pass an empty string. */
RequestManager.prototype.showError = function(str) {
	if(typeof str !== "string")
		str = String(str);
	if(str.length > 0)
		console.error(str);
	this.errorDisplay.innerText = str;
};



// TODO: prevent ID conflicts
const ConfigManager = function(parameters, container) {
	this.sliders = [];
	this.valueSpans = [];
	this.checkboxes = [];
	const slidersDiv = document.createElement("div");
	const checkboxesDiv = document.createElement("div");
	container.appendChild(slidersDiv);
	container.appendChild(checkboxesDiv);

	parameters.filter(p => typeof p.def !== "boolean").forEach(param => {
		const div = document.createElement("div");
		div.className = "slider";
		div.innerHTML = `<label for="${param.name}">${param.name} (<span id="${param.name}Value">${param.def.toFixed(3)}</span>):</label>
		<input type="range" id="${param.name}" min="${param.min}" max="${param.max}" step="${param.step ? param.step : 0.01}" value="${param.def}">`;
		slidersDiv.appendChild(div);
		this.sliders.push(document.getElementById(param.name));
		this.valueSpans.push(document.getElementById(`${param.name}Value`));
	});
	this.sliders.forEach(s => s.addEventListener("input", ConfigManager.prototype.updateValueSpans.bind(this)));

	parameters.filter(p => typeof p.def === "boolean").forEach(param => {
		const check = `<input type="checkbox" id="${param.name}"${param.def ? " checked" : ""}><label for="${param.name}">${param.name}</label>`
		checkboxesDiv.insertAdjacentHTML("beforeend", check);
		this.checkboxes.push(document.getElementById(param.name));
	});
};

ConfigManager.prototype.getConfig = function() {
	const config = {};
	for(let i = 0;i < this.sliders.length;i++) {
		config[this.sliders[i].id] = this.sliders[i].value;
	}
	for(let i = 0;i < this.checkboxes.length;i++) {
		config[this.checkboxes[i].id] = this.checkboxes[i].checked;
	}
	return config;
};

ConfigManager.prototype.setConfig = function(config) {
	//TODO: Option to reset non-specified params to default values
	for(let i = 0;i < this.sliders.length;i++) {
		if(config[this.sliders[i].id] !== undefined)
			this.sliders[i].value = config[this.sliders[i].id];
	}
	for(let i = 0;i < this.checkboxes.length;i++) {
		if(config[this.checkboxes[i].id] !== undefined)
			this.checkboxes[i].value = config[this.checkboxes[i].id];
	}
	this.updateValueSpans();
};

ConfigManager.prototype.updateValueSpans = function() {
	for(let i = 0;i < this.sliders.length;i++) {
		this.valueSpans[i].textContent = parseFloat(this.sliders[i].value).toFixed(3);
	}
};

const FiledConfigManager = function(parameters, container, settingInput) {
	ConfigManager.call(this, parameters, container);
	settingInput.addEventListener("change", e => {
		const reader = new FileReader();
		reader.onload = loadEvent => this.setConfig(JSON.parse(loadEvent.target.result));
		reader.readAsText(e.target.files[0]);
	});
};
Object.setPrototypeOf(FiledConfigManager.prototype, ConfigManager.prototype);



const PasteManager = function(outputText, instructSelect, instructUndoButton, defaultFormat = "none") {
	this.instructAppendString = "";
	this.instructUndoCache = null;
	this.outputText = outputText;

	let selectInner = "";
	for(const [key, value] of Object.entries(INSTRUCT_FORMATS)) {
		selectInner += `<option value="${key}">${key}</option>\n`
	}
	instructSelect.innerHTML = selectInner;
	instructSelect.addEventListener("change", e => {
		this.instructAppendString = INSTRUCT_FORMATS[e.currentTarget.value];
	});
	instructSelect.value = defaultFormat;
	this.instructAppendString = INSTRUCT_FORMATS[defaultFormat];

	instructUndoButton.addEventListener("click", e => {
		if(this.instructUndoCache != null) {
			inputText.value = this.instructUndoCache;
			inputText.dispatchEvent(new Event("input"));
		}
	});
};

PasteManager.prototype.forward = function() {
	this.outputText.value = inputText.value;
};

PasteManager.prototype.backward = function(useInstruct) {
	this.instructUndoCache = inputText.value;
	if(useInstruct)
		inputText.value = this.outputText.value + this.instructAppendString;
	else
		inputText.value = this.outputText.value;
	inputText.dispatchEvent(new Event("input"));
};

PasteManager.prototype.addOutput = function(text) {
	this.outputText.value += text;
	if(uiConfigManager.getConfig().autoscroll)
		this.outputText.scrollTop = this.outputText.scrollHeight;
};



const handleKeyEvent = function(e) {
	if(e.key === "Enter") {
		if(e.getModifierState("Control") || e.getModifierState("Alt")) {
			if(e.getModifierState("Alt"))
				pasteManager.backward(false);
			requestManager.tryGenerate();
			e.preventDefault();
		}
	}
	else if(e.key === "Insert")
		pasteManager.backward(!e.getModifierState("Control"));
	else if(e.key === "Escape")
		requestManager.setState(RequestManager.INTERRUPTED);
	else if(e.key === " " && e.getModifierState("Control")) {
		inputText.focus();
		e.preventDefault();
	}
	else if(DISABLED_KEYS.has(e.key))
		e.preventDefault();
};



const UI_PARAMS = [
	{ name: "dostream", def: true },
	{ name: "autoscroll", def: true }
];

const inputText = document.getElementById("inputText");

const configManager = new FiledConfigManager(GEN_PARAMS, document.getElementById("genConfigDiv"), document.getElementById("settingFile"));
const uiConfigManager = new ConfigManager(UI_PARAMS, document.getElementById("uiConfigDiv"));
const pasteManager = new PasteManager(document.getElementById("outputText"), document.getElementById("instructSelect"), document.getElementById("instructUndoButton"), DEFAULT_INSTRUCT_FORMAT);
const requestManager = new RequestManager(document.getElementById("sendButton"), document.getElementById("errorDisplay"), document.getElementById("statusBlinker"), INDICATOR_TYPE);

document.addEventListener("keydown", handleKeyEvent);

if(DEFAULT_PRESET != null)
	configManager.setConfig(DEFAULT_PRESET);
