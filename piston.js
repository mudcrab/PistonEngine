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
    delta: 0,
    uiElements: [],
    tmpCanvas: null,
    tmpContext: null,
    redrawObjects: [],
    /*
     * constructor
     * @
     */
    initialize: function(canvasID, w, h, _mainClass)
    {
        tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = w;
        tmpCanvas.height = h;
        tmpContext = tmpCanvas.getContext('2d');
        canvas = document.getElementById(canvasID);
        canvasWidth = w;
        canvasHeight = h;
        canvas.width = w;
        canvas.height = h;
        mainClass = new _mainClass;
        ctx = canvas.getContext('2d');
        input = new Input();
        this.stage = new Stage(w, h);
        
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
                }, 8)
                that.delta = (new Date().getTime() - that.lastCall) / 1000;
                that.lastCall = new Date().getTime();
                that._fps = Math.floor(1 / that.delta);
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
        //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var i, dirtyRectangleCount = this.redrawObjects.length;
        for(i = 0; i < dirtyRectangleCount; i++)
        {
            var rect = this.redrawObjects[i];
            tmpContext.clearRect(rect.x, rect.y, rect.width, rect.height);
        }
        this.redrawObjects = [];

        var time = new Date().getTime() * 0.002;
        mainClass.draw();
        ctx.drawImage(tmpCanvas, 0, 0);
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
    },
    mousePress: function()
    {
        var mouse = input.leftMousePress();
        if(mouse.pressed)
        {
            return mouse;
        }
        else
        {
            return false;
        }
    },
    mouseClick: function()
    {
        var mouse = input.leftMouseClick();
        if(mouse.clicked)
        {
            return mouse;
        }
        else
        {
            return false;
        }
    }
});