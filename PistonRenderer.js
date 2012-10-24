var PistonRenderer = Class.create({
	canvas : null,
    ctx : null,
    canvasWidth : null,
    canvasHeight : null,
    animationFrame : null,
    _fps: 0,
    lastCall: null,
    rType: null,
	initialize: function(rendererType, options, cb)
	{
		this.rType = rendererType;
		var that = this;
		switch(rendererType)
		{
			case 'c2d':
				canvas = document.getElementById(options.canvasElement);
		        canvasWidth = options.width;
		        canvasHeight = options.height;
		        canvas.width = options.width;
		        canvas.height = options.height;
		        ctx = canvas.getContext('2d');
		        this.stage = new PistonStage();
		        //var that = this;
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
		                cb();
		                setTimeout(function() {
		                    animationFrame(animation, canvas);
		                }, options.fps)
		                that.delta = (new Date().getTime() - that.lastCall) / 1000;
		                that.lastCall = new Date().getTime();
		                that._fps = Math.floor(1 / that.delta);
		            };
		            animationFrame(animation, canvas);
		        }
			break;
			case 'webgl':
				canvas = document.getElementById(options.canvasElement);
		        canvasWidth = options.width;
		        canvasHeight = options.height;
		        canvas.width = options.width;
		        canvas.height = options.height;
		        WebGL2D.enable(canvas);
		        ctx = canvas.getContext('webgl-2d');
				console.log(ctx);
				setInterval(function() { cb(); }, 1000 / 60);
			break;
			case 'fallback':
				canvas = document.getElementById(options.canvasElement);
		        canvasWidth = options.width;
		        canvasHeight = options.height;
		        canvas.width = options.width;
		        canvas.height = options.height;
		        ctx = canvas.getContext('2d');
		        this.stage = new PistonStage();
				if(that.lastCall == null)
		        {
		            that.lastCall = new Date().getTime();
		            that._fps = 0;
		        }
				var fallbackLoop = function()
				{
					cb();
					setTimeout(function() {
						fallbackLoop();
					}, options.fps);
					that.delta = (new Date().getTime() - that.lastCall) / 1000;
		                that.lastCall = new Date().getTime();
		                that._fps = Math.floor(1 / that.delta);
				};
				setTimeout(function() {
					fallbackLoop();	
				}, 10);
				//
			break;
		}
	},
	clear: function()
	{
		if(this.rType != 'webgl')
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	},
	renderEntity: function(entity)
	{
		switch(this.rType)
		{
			case 'c2d':
				ctx.drawImage(entity.image, entity.x, entity.y);
			break;
			case 'webgl':
				ctx.drawImage(entity.image, entity.x, entity.y);
			break;
			case 'fallback':
				ctx.drawImage(entity.image, entity.x, entity.y);
			break;
		}
	},
	preRenderEntity: function(entity)
	{
		switch(this.rType)
		{
			case 'c2d':
				ctx.clearRect(entity.lastx, entity.lasty, entity.image.width, entity.image.height);
				ctx.drawImage(entity.image, entity.x, entity.y);
			break;
			case 'webgl':
				
			break;
		}
	},
	fps: function()
	{
		return this._fps;
	}
});