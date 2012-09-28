var PistonEngine = Class.create({
    canvas : null,
    ctx : null,
    canvasWidth : null,
    canvasHeight : null,
    mainClass : null,
    animationFrame : null,
    img: null,
    fps: 0,
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
                that.fps = 0;
            }
            var animation = function()
            {
                that.loop();
                setTimeout(function() {
                    animationFrame(animation, canvas);
                }, 10)
                var delta = (new Date().getTime() - that.lastCall) / 1000;
                that.lastCall = new Date().getTime();
                that.fps = Math.floor(1 / delta);
            };
            animationFrame(animation, canvas);
        }
    },
    draw: function()
    {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var time = new Date().getTime() * 0.002;   
        var x = Math.sin( time ) * 96 + 128;   
        var y = Math.cos( time * 0.9 ) * 96 + 128;   
        var colors = ["red", "orange", "yellow", "green", "blue", "cyan", "purple"];   
        ctx.fillStyle = 'rgb(245,245,245)';   
        ctx.fillRect( 0, 0, 1440, 775);
        ctx.drawImage(img, Math.floor(Math.random() * 1440), Math.floor(Math.random() * 775));
    },
    update: function(mainMethod)
    {
        
    },
    loop: function()
    {
        var that = this;
        jQuery('#framecounter').html(that.fps);
        that.draw();
    },
    stage: function()
    {
        
    }
});