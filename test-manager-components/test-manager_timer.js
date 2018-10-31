(function(){

    var Timer = function(options){
        this.container = options.showIn;
        this.time = options.time || 300;
        this.delay = options.delay || 1000;
        this.timerId = null;

        this.start = function(time){
            this.time = time || this.time;
            this.tick();
        };

        this.stop = function(){
            clearTimeout(this.timerId);
        };
    };

    Timer.prototype.tick = function(){
        if(this.time !== 0) {
            document.getElementById(this.container).innerHTML = this.formatOutput(this.time);
            this.time--;
            this.timerId = setTimeout(this.tick.bind(this), this.delay);
        }
        else {
            var el = document.getElementById(this.container);
            el.innerHTML = "Out of Time - no credit given for answer";
            el.className += ' expired';
        }
    };

    Timer.prototype.formatOutput = function(timeInSec){
        var minutes = Math.floor(timeInSec / 60);
        var seconds = timeInSec % 60;
        var timeString = '';
        if(minutes === 0)
            timeString = seconds + " seconds left";
        else if(seconds === 0)
            timeString = minutes + " minutes left";
        else
            timeString = minutes + " minutes and " + seconds + " seconds left";

        return timeString;
    };

    //*******************************
    // Attach timer constructor to manager prototype in the global scope
    window.TestManager.prototype.Timer = Timer;
    //*******************************
}());