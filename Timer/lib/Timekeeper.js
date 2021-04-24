"use strict";

/**A simple abstract timekeeper.
 * You must Object.assign() an Object with functions updateState() and startCondition() to instances of this before starting them. See TimerMixin for an example.
 * @param onstop {Function} The Function to be called when the timer stops. A single Boolean, indicating whether the time ran out naturally, will be passed into it.
 * @param updateCallback {Function} The Function to be called when the time String is updated. The String will be passed into it.
 * @param format {Function} A Function that accepts an amount of time in milliseconds and two Booleans indicating
 * whether to show time over 1h/under 1s and returns a String representation of the time.
 * @param showH {Boolean} Whether to show time longer than 60 minutes as separate hours.
 * @param showOne {Boolean} Whether to show time shorter than 1 second.*/
const Timekeeper = function(onstop, updateCallback, format, showH, showOne) {
	//Times are in milliseconds
	this.time = 0;
	this.updateRate = 60;
	this.intervalId = 0;
	this.running = false;
	this.prev = null;
	this.onstop = onstop;
	this.updateCallback = updateCallback;
	this.format = format;
	this.showH = showH;
	this.showOne = showOne;
};
Timekeeper.prototype.updateTimeString = function() {
	this.updateCallback(this.format(this.time, this.showH, this.showOne));
};
Timekeeper.prototype.addTime = function(amount) {
	this.time += amount;
	if(this.time < 0)
		this.time = 0;
	this.updateTimeString();
};
Timekeeper.prototype.pause = function() {
	if(this.running) {
		clearInterval(this.intervalId);
		this.running = false;
		this.prev = null;
	}
};
/**Call to stop the timer.
 * @param timeRanOut {Boolean} Whether the time ran out naturally. Will be passed to onstop.*/
Timekeeper.prototype.stop = function(timeRanOut) {
	this.pause();
	this.time = 0;
	this.updateTimeString();
	this.onstop(timeRanOut);
};
Timekeeper.prototype.start = function() {
	if(!this.running && this.startCondition()) {
		this.intervalId = setInterval(() => this.update(), this.updateRate);
		this.running = true;
	}
};
Timekeeper.prototype.update = function() {
	if(!this.running) return;
	const started = Date.now();
	const elapsed = this.prev === null ? this.updateRate : started - this.prev;
	//Set prev before calling updateState so that prev is set correctly to null if updateState() calls stop() and not overwritten here.
	this.prev = started;
	this.updateState(elapsed);
	this.updateTimeString();
};

const TimerMixin = {
	updateState: function(elapsed) {
		this.time -= elapsed;
		if(this.time <= 0) this.stop(true);
	},
	startCondition: function() { return this.time > 0; }
};

const StopwatchMixin = {
	updateState: function(elapsed) {
		this.time += elapsed;
	},
	startCondition: () => true
};

const ClockMixin = {
	updateState: function(elapsed) {
		const date = new Date();
		this.time = date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
	},
	startCondition: () => true
};
