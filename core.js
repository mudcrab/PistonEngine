/*
	Piston Engine
*/
window.piston = window.piston || {};
var PistonEngine = function(width, height, canvas) {
	this.renderer = new PistonRenderer();
	this.render = null;
	this.mainClass = null;
	this.fps = 0;
	this.delta = 0;
	this.loader = null;
	this.totalEntities = 0;
	this.totalDrawnEntities = 0;
	this.interval = 0;
	this.toRender = {};
	this.stages = [];
	this.currentStage = 0;

	if(typeof canvas !== 'undefined')
		canvas = document.getElementById(canvas);
	else
	{
		canvas = document.createElement('canvas');
		canvas.setAttribute('id', '#gameDisplay');
		document.body.appendChild(canvas);
	}
	width = typeof width != 'undefined' ? width : piston.utils.viewport().width;
	height = typeof height != 'undefined' ? height : piston.utils.viewport().height;
	this.initialize(width, height, canvas);
};
PistonEngine.prototype.initialize = function(width, height, canvas) 
{
	var self = this;
	this.renderer.initialize(canvas, width, height, function(fps, delta) { self.loop(fps, delta) });
	piston.debug.log('Piston initialized');
};
PistonEngine.prototype.info = function()
{
	var info_ = {
		renderer: piston.renderer.RENDERER_TYPE
	};
	return info_;
};
PistonEngine.prototype.setup = function()
{
	this.mainClass.loader = piston.loader;
	this.mainClass.setup();
};
PistonEngine.prototype.update = function()
{
	this.stages[this.currentStage].update(this.delta);
};
PistonEngine.prototype.loop = function(fps, delta)
{
	this.fps = fps;
	this.delta = delta;
	this.update();
	this.draw();
};
PistonEngine.prototype.toggleFPS = function(state)
{
	var that = this;
	if(state)
	{
		that.interval = setInterval(function() {
			$('#fps').text(that.renderer._fps);
		}, 1000);
	}
	else
		clearInterval(that.interval);
};
PistonEngine.prototype.addStage = function(stage)
{
	if(typeof stage !== 'string')
	{
		this.stages.push(stage);
	}
	else
		this.stages.push(new PistonStage(stage));
};
PistonEngine.prototype.getStage = function()
{
	return this.stages[this.currentStage];
};
PistonEngine.prototype.draw = function()
{
	var stageEntities = this.stages[this.currentStage].draw();
	for(entity in stageEntities)
	{
		this.renderer.render(stageEntities[entity]);
	}
};