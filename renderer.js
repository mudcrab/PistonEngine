var PistonRenderer = function() {
	this.CANVAS = null;
	this.DISPLAY_SIZE = null;
	this.CONTEXT = null;
	this.RENDERER_TYPE = null;
	this.FPS = null;
	this._fps = 0;
	this.lastCall = null;
	this.delta = null;
	this.tick = null;
	this.entityInfo = {
		total: 0,
		drawn: 0,
		currentPos: 0,
		max: {
			x: 39,
			y: 28,
			i: 1092
		}
	};
	this.lastRun;
	this.img = null;
	//console.log(canvas_, type, fps, size, cb)
	// this.initialize(canvas_, type, fps, size, cb);
};
PistonRenderer.prototype.initialize = function(canvas_, width, height, callback) 
{
	this.img = new Image();
	this.img.src = '/assets/asd.png';
	this.CANVAS = canvas_;
	this.FPS = fps;
	this.CANVAS.width = width;
	this.CANVAS.height = height;
	this.CONTEXT = this.CANVAS.getContext('2d');
	window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(cb, element){
        window.setTimeout(function(){
           
            cb(+new Date);
        }, 1000 / 60);
	    };
	})();
	var that = this;
	if(this.lastCall == null)
	{
		that.lastCall = new Date().getTime();
		that._fps = 0;
	}
	var animation = function()
	{
		callback(that._fps, that.delta);
		that.delta = (new Date().getTime() - that.lastCall) / 1000;
		that.lastCall = new Date().getTime();
		that._fps = Math.floor(1/that.delta);
		requestAnimFrame(animation);
	}
	requestAnimFrame(animation, that.CANVAS);
};
PistonRenderer.prototype.render = function(obj)
{
	this.CONTEXT.save();
	//this.CONTEXT.clearRect(obj.pos.lastx, obj.pos.lasty, obj.size.w, obj.size.h);
	this.CONTEXT.clearRect(0, 0, 800, 600);
	if(obj.rotation != 0)
	{
		this.CONTEXT.translate(obj.pos.x + obj.size.w / 2, obj.pos.y + obj.size.h / 2);
		this.CONTEXT.rotate(obj.rotation);
		this.CONTEXT.drawImage(piston.loader.getAsset(obj.image).image, -obj.size.w / 2, -obj.size.h / 2);
	}
	else
		this.CONTEXT.drawImage(piston.loader.getAsset(obj.image).image, obj.pos.x, obj.pos.y);
	this.CONTEXT.restore();
};
PistonRenderer.prototype.render_ = function(entities, info)
{
	// var tiles = 0;
	// for(var y = info.fromY; y < info.toY; y++)
	// {
	// 	for(var x = info.fromX; x < info.toX; x++)
	// 	{
	// 		if(typeof entities[y][x] != 'undefined' && entities[y][x].visible)
	// 			this.CONTEXT.drawImage(piston.loader.getAsset(entities[y][x].image).image, entities[y][x].pos.x, entities[y][x].pos.y);

	// 		tiles++;
	// 	}
	// }
	// return tiles;
};
PistonRenderer.prototype.setFps = function(fps) { this._fps = fps; return 0; }
PistonRenderer.prototype.fps = function()
{
	return this._fps;
};
PistonRenderer.prototype.getDelta = function()
{
	return this.delta;
};