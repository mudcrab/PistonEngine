var PistonRenderer = Class.create({
	CANVAS: null,
	DISPLAY_SIZE: null,
	CONTEXT: null,
	RENDERER_TYPE: null,
	FPS: null,
	_fps: null,
	lastCall: null,
	delta: null,
	tick: null,
	initialize: function(canvas, type, fps, size, cb) 
	{
		this.CANVAS = $(canvas);
		this.DISPLAY_SIZE = size;	
		this.FPS = fps;
		var that = this;
		switch(type)
		{
			case 'canvas':
				this.CONTEXT = this.CANVAS.getContext('2d');
				var that = this;
				var frame = window.requestAnimationFrame ||
		            window.webkitRequestAnimationFrame ||
		            window.mozRequestAnimationFrame    ||
		            window.oRequestAnimationFrame      ||
		            window.msRequestAnimationFrame     ||
		            null ;
		        if(frame !== null)
		        {
		        	if(this.lastCall == null)
		        	{
		        		that.lastCall = new Date().getTime();
		        		that._fps = 0;
		        	}
		        	var animation = function()
		        	{
		        		cb();
		        		setTimeout(function() {
		        			frame(animation, that.CANVAS);
		        		}, that.FPS);
		        		that.delta = (new Date().getTime() - that.lastCall) / 1000;
		        		that.lastCall = new Date().getTime();
		        		if(that.tick == 12)
		        		{
		        			that._fps = Math.floor(1 / that.delta);
		        			that.tick = 0;
		        		}
		                else
		                {
		                	that.tick++;
		                }
		        	};
		        	frame(animation, that.CANVAS);
		        }
			break;
		}
	},
	clear: function()
	{

	},
	render: function(entity)
	{
		switch(this.RENDERER_TYPE)
		{
			case 'canvas':
				this.CONTEXT.clearRect(entity.lastx, entity.lasty, entity.image.width, entity.image.height);
				this.CONTEXT.drawImage(entity.image, entity.x, entity.y);
			break;
		}
	},
	fps: function()
	{
		return this._fps;
	}
});