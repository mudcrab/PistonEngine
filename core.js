/*
	Piston Engine
*/
window.piston = window.piston || {};
var PistonEngine = function(canvas, width, height) {
	this.renderer = new PistonRenderer();
	this.render = null;
	this.mainClass = null;
	this.fps = 0;
	this.delta = 0;
	this.loader = null;
	this.totalEntities = 0;
	this.totalDrawnEntities = 0;
	this.interval = 0;
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
	this.initialize(canvas, width, height);
};
PistonEngine.prototype.initialize = function(canvas, width, height) 
{
	//this.renderer.initialize(canvas, 'canvas', 8, { width: $(canvas).width(), height: $(canvas).height() }, function() {  that.update(); });	
	//	console.log('asd')
	this.renderer.initialize(canvas, width, height, this.loop);
	//this.render = this.renderer.render;
	/*this.mainClass = new _mC;
	var that = this;
	piston.loader = new PistonAssetLoader();
	var assets = that.mainClass.toLoad;
	for(var i = 0; i < assets.length; i++)
	{
		piston.loader.addAsset(assets[i]);
	}
	var timeout = setInterval(function() {
		if(piston.loader.loaded == piston.loader.assets.length)
		{
			clearTimeout(timeout);
			that.setup();
			piston.renderer = new PistonRenderer(canvasElement, 'canvas', 8, { width: $(canvasElement).width(), height: $(canvasElement).height() }, function() {  that.update(); });
		}
	}, 100);*/
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
PistonEngine.prototype.loop = function(delta)
{
	//this.update();
	//this.draw();
};
PistonEngine.prototype.update = function()
{
	this.fps = piston.renderer.fps();
	this.delta = piston.renderer.getDelta();
	this.mainClass.update();
};
PistonEngine.prototype.draw = function()
{
	this.totalDrawnEntities = 0;
	this.totalEntities = 0;
	for(var i = 0; i < piston.stage.layers.length; i++)
	{
		this.totalEntities += piston.stage.layers[i].totalEntities;
		if(piston.stage.layers[i].layerEntities.length > 0)
		{
			this.totalDrawnEntities += piston.renderer.render_(piston.stage.layers[i].layerEntities, piston.stage.layers[i].getLayerInfo());
		}	
	}	
};
PistonEngine.prototype.toggleFPS = function(state)
{
	var that = this;
	if(state)
	{
		that.interval = setInterval(function() {
			console.log('set');
			$('#fps').text(that.fps);
		}, 1000);
	}
	else
		clearInterval(that.interval);
};