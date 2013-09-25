var PistonRenderer = function(canvas_, type, fps, size, cb) {
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
	//console.log(canvas_, type, fps, size, cb)
	this.initialize(canvas_, type, fps, size, cb);
};
PistonRenderer.prototype.initialize = function(canvas_, type, fps, size, cb) 
{
	this.CANVAS = document.getElementById(canvas_.replace('#', ''));
	this.DISPLAY_SIZE = size;	
	this.FPS = fps;
	this.RENDERER_TYPE = type;
	this.CANVAS.width = this.DISPLAY_SIZE.width;
	this.CANVAS.height = this.DISPLAY_SIZE.height;
	this.CONTEXT = this.CANVAS.getContext('2d');

	window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(function(){
           
            callback(+new Date);
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
		cb();
		that.delta = (new Date().getTime() - that.lastCall) / 1000;
		that.lastCall = new Date().getTime();
		that._fps = Math.floor(1/that.delta);
		requestAnimFrame(animation, that.CANVAS);
	}
	requestAnimFrame(animation, that.CANVAS);
};
PistonRenderer.prototype.gameLoop = function()
{


};
PistonRenderer.prototype.clear = function()
{

};
PistonRenderer.prototype.render_ = function(entities, info)
{
	var tiles = 0;
	for(var y = info.fromY; y < info.toY; y++)
	{
		for(var x = info.fromX; x < info.toX; x++)
		{
			if(typeof entities[y][x] != 'undefined' && entities[y][x].visible)
				this.CONTEXT.drawImage(piston.loader.getAsset(entities[y][x].image).image, entities[y][x].pos.x, entities[y][x].pos.y);

			tiles++;
		}
	}
	return tiles;
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