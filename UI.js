var UI = Class.create(PistonEngine, {
	uiCanvas: null,
	uiCtx: null,
	uiWidth: null,
	uiHeight: null,
	uiAnimationFrame: null,
	uiInput: null,
	uiLastCall: null,
	uiDelta: null,
	initialize: function(uiID, w, h)
	{
		this.uiCanvas = document.getElementById(uiID, w, h);
		this.uiCanvas.width = w;
		this.uiCanvas.height = h;
		this.uiWidth = w;
		this.uiHeight = h;
		this.uiCtx = this.uiCanvas.getContext('2d');

		var that = this;

		 var animationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;
        if(animationFrame !== null)
        {
            if(that.uiLastCall == null)
            {
                that.uiLastCall = new Date().getTime();
                //that._fps = 0;
            }
            var animation = function()
            {
                that.uiLoop();
                setTimeout(function() {
                    animationFrame(animation, that.uiCanvas);
                }, 7)
                that.uiDelta = (new Date().getTime() - that.uiLastCall) / 1000;
                that.uiLastCall = new Date().getTime();
                //that._fps = Math.floor(1 / that.delta);
            };
            animationFrame(animation, that.uiCanvas);
        }
        else
        {
            var frame = 1000 / 60;
            setInterval(that.loop, frame);
        }
	},
	uiLoop: function()
	{
		
	}
});