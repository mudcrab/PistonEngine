/*
 * Main engine class, handles game class drawing and updates
 */
var PistonEngine = Class.create({
    
    canvas : null,
    ctx : null,
    canvasWidth : null,
    canvasHeight : null,
    mainClass : null,
    animationFrame : null,
    _fps: 0,
    lastCall: null,
    input: null,
    stage: null,
    /*
     * constructor
     * @
     */
    initialize: function(canvasID, w, h, _mainClass)
    {
        canvas = document.getElementById(canvasID);
        canvasWidth = w;
        canvasHeight = h;
        canvas.width = w;
        canvas.height = h;
        mainClass = new _mainClass;
        ctx = canvas.getContext('2d');
        input = new Input();
        this.stage = new Stage();
        
        var that = this;
        // gameloop stuff
        var animationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;
        if(animationFrame !== null)
        {
            if(that.lastCall == null)
            {
                that.lastCall = new Date().getTime();
                that._fps = 0;
            }
            var animation = function()
            {
                that.loop();
                setTimeout(function() {
                    animationFrame(animation, canvas);
                }, 10)
                var delta = (new Date().getTime() - that.lastCall) / 1000;
                that.lastCall = new Date().getTime();
                that._fps = Math.floor(1 / delta);
            };
            animationFrame(animation, canvas);
        }
        else
        {
            var frame = 1000 / 60;
            setInterval(that.loop, frame);
        }
        that.setup();
    },
    setup: function()
    {
        mainClass.setup(this.stage);
    },
    draw: function()
    {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var time = new Date().getTime() * 0.002;
        mainClass.draw();
    },
    update: function(mainMethod)
    {
        mainClass.update();
    },
    loop: function()
    {
        this.update();
        this.draw();
    },
    getStage: function()
    {
        return this.stage;
    },
    fps: function()
    {
        return this._fps;
    },
    onKeyDown: function(key)
    {
        if(input.keyDown(key))
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    onKeyUp: function(key)
    {
        if(input.keyUp(key))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
});