function Animation(func /*, some number of animations*/ ) {
    this.done = false;
    this.func = func;
    this.nextanis = Array.prototype.slice.call(arguments, 1);
}

Animation.prototype.playStep = function() {
    return this.done || this.func();
};

Animation.prototype.stop = function() {
    this.done = true;
};

Animation.prototype.getNextAnis = function() {
    return this.nextanis;
};

module.exports = Animation;
