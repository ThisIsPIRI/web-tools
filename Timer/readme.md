# PIRI Web Timer
A simple timer and stopwatch. The timer mode requires AudioContext to be enabled(dom.webaudio.enabled in Firefox config) by default, but can easily be made to use an audio file instead by changing USEAUDIOFILE flag in timer.js.

Note: if the last two microsecond digits never/rarely change and the clock mode shows UTC time instead of local time on Firefox-based browsers, try setting privacy.resistFingerprinting config to false.

## Dependencies
Requires Timer.js and sound.js from [my JS Library](https://github.com/ThisIsPIRI/js-library). Already included.
