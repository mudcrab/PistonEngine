var PistonRenderer = Class.create({
	CANVAS: null,
	DISPLAY_SIZE: null,
	CONTEXT: null,
	RENDERER_TYPE: null,
	FPS: null,
	_fps: 0,
	lastCall: null,
	delta: null,
	tick: null,
	entityInfo: {
		total: 0,
		drawn: 0
	},
	initialize: function(canvas_, type, fps, size, cb) 
	{
		this.CANVAS = document.getElementById(canvas_);
		
		this.DISPLAY_SIZE = size;	
		this.FPS = fps;
		this.RENDERER_TYPE = type;
		this.CANVAS.width = this.DISPLAY_SIZE.width;
		this.CANVAS.height = this.DISPLAY_SIZE.height;
		this.CONTEXT = this.CANVAS.getContext('2d');

		var that = this;
		var frame = window.requestAnimationFrame ||
		            window.webkitRequestAnimationFrame ||
		            window.mozRequestAnimationFrame    ||
		            window.oRequestAnimationFrame      ||
		            window.msRequestAnimationFrame     ||
		            null ;
		if(frame == null)
		{
			this.RENDERER_TYPE = 'fallback';
		}
		switch(this.RENDERER_TYPE)
		{
			case 'canvas':
				
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
		        else
		        {
		        	this.RENDERER_TYPE = 'fallback';
		        	this.FPS = 1000 / 60;
		        }
			break;
			case 'fallback':
				this.CANVAS.width = this.DISPLAY_SIZE.width;
				this.CANVAS.height = this.DISPLAY_SIZE.height;
				this.CONTEXT = this.CANVAS.getContext('2d');
				if(this.lastCall == null)
				{
					that.lastCall = new Date().getTime();
					that._fps = 0;
				}
				var that = this;
				var animation = function()
				{
					setTimeout(function() {
							cb();
						animation();
					}, that.FPS);
					that.delta = (new Date().getTime() - that.lastCall) / 1000;
					that.lastCall = new Date().getTime();
					if(that.tick == 60)
					{
						that._fps = Math.floor(1 / that.delta);
						that.tick = 0;
					}
					else
					{
						that.tick++;
					}
				};
				animation();
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
				this.CONTEXT.drawImage(piston.loader.getAsset(entity.image).image, entity.pos.x, entity.pos.y);
			break;
			case 'fallback':
				//this.CONTEXT.clearRect(entity.pos.x, entity.pos.y, entity.size.w, entity.size.w);
				if(entity.imgVisible)
				{
					this.CONTEXT.drawImage(entity.image, entity.pos.x, entity.pos.y);
				}
				if(entity.rectVisible)
				{
					this.CONTEXT.strokeStyle = "red";
					this.CONTEXT.strokeRect(entity.rectPos.x, entity.rectPos.y, entity.rectSize.w, entity.rectSize.h);
				}
			break;
		}
	},
	render_: function(entities)
	{
		this.entityInfo.total = entities.length;
		this.entityInfo.drawn = 0;
		for(var i = 0; i < entities.length; i++)
		{
			if(entities[i].visible)
			{
				if(entities[i].pos.x >= -entities[i].size.w && entities[i].pos.x <= this.DISPLAY_SIZE.width && entities[i].pos.y >= -entities[i].size.h && entities[i].pos.y <= this.DISPLAY_SIZE.height)
				{
					
					this.CONTEXT.drawImage(piston.loader.getAsset(entities[i].image).image, entities[i].pos.x, entities[i].pos.y);
					this.entityInfo.drawn++;
				}
			}
		}
	},
	fps: function()
	{
		return this._fps;
	},
	getDelta: function()
	{
		return this.delta;
	}
});