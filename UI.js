var UI = Class.create({
	uiCanvas: null,
	uiCtx: null,
	uiWidth: null,
	uiHeight: null,
	uiAnimationFrame: null,
	uiInput: null,
	uiLastCall: null,
	uiDelta: null,
	uiFPS: 0,
	uiElements: [],
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
                }, 1)
                that.uiDelta = (new Date().getTime() - that.uiLastCall) / 1000;
                that.uiLastCall = new Date().getTime();
                that.uiFPS = Math.floor(1 / that.uiDelta);
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
		this.uiUpdate();
		this.uiDraw();
	},
	uiDraw: function()
	{
		for(var i = 0; i < this.uiElements.length; i++)
		{
			this.uiElements[i].render();
		}
	},
	uiUpdate: function()
	{

	},
    addUIElement: function(uiEntity)
    {
        return this.uiElements.push(uiEntity);
    },
    fps: function()
    {
    	return this.uiFPS;
    }
});