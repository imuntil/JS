/**
 * Created by jtun02 on 15/1/29.
 */
window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000/60);
        };
})();

var Stopwatch = function(time, elem) {
    this.totalTime = time;
    this.running = false;
    this.startTime = undefined;
    this.elapsed = undefined;
    this.elem = elem;
    this.endCallback = function(){};
};

Stopwatch.prototype.start = function() {
    var that = this;
    that.running = true;
    requestAnimFrame(that.run.bind(that));
};

Stopwatch.prototype.run = function(time) {
    if (this.running) {

        if (this.startTime == undefined) {
            this.startTime = time;
        }

        this.showTime(time);

        requestAnimFrame(this.run.bind(this));
    }
};

Stopwatch.prototype.pause = function() {
    if (!this.running) {
        return;
    }
    this.running = false;
    this.totalTime -= this.elapsed;
    this.startTime = undefined;
};

Stopwatch.prototype.isRunning = function() {
    return this.running;
};

Stopwatch.prototype.showTime = function(time) {
    this.elapsed = time - this.startTime;

    var remain = this.totalTime - this.elapsed;
    if (remain < 0) {
        this.running = false;
        if (this.endCallback) {
            this.endCallback();
        }
        return;
    }
    this.elem.innerHTML = (remain/1000).toFixed(0)+'s';
};

Stopwatch.prototype.setEndCallback = function(callback) {
    if (Object.prototype.toString.call(callback).slice(8, -1) == 'Function') {
        this.endCallback = callback;
    }
}