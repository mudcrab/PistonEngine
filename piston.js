var PistonEngine = Class.create({
    canvas : null,
    ctx : null,
    canvasWidth : null,
    canvasHeight : null,
    mainClass : null,
    animationFrame : null,
    img: null,
    _fps: 0,
    lastCall: null,
    initialize: function(canvasID, w, h, _mainClass)
    {
        
        canvas = document.getElementById(canvasID);
        canvasWidth = w;
        canvasHeight = h;
        canvas.width = w;
        canvas.height = h;
        mainClass = new _mainClass;
        ctx = canvas.getContext('2d');
        img = new Image();
        img.src = 'assets/tiles/player.png';
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
    stage: function()
    {
        
    },
    fps: function()
    {
        return this._fps;
    }
});