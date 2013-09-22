/*
	Piston Engine
*/
window.piston = window.piston || {};
var PistonEngine = function(canvasElement, _mC) {
	this.RENDERER = null;
	this.mainClass = null;
	this.fps = 0;
	this.delta = 0;
	this.loader = null;
	this.totalEntities = 0;
	this.totalDrawnEntities = 0;
	this.initialize(canvasElement, _mC);
};
	PistonEngine.prototype.initialize = function(canvasElement, _mC) 
	{
		this.mainClass = new _mC;
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
				piston.renderer = new PistonRenderer(canvasElement, 'canvas', 8, { width: $(canvasElement).width(), height: $(canvasElement).height() }, function() {  that.loop(); });
			}
		}, 100);
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
		this.mainClass.loader = this.loader;
		this.mainClass.setup();
	};
	PistonEngine.prototype.loop = function()
	{
		this.update();
		this.draw();
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