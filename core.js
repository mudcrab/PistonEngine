/*
	Piston Engine
*/
window.piston = window.piston || {};
var PistonEngine = Class.create({
	RENDERER: null,
	mainClass: null,
	fps: 0,
	delta: 0,
	loader: null,
	totalEntities: 0,
	totalDrawnEntities: 0,
	initialize: function(canvasElement, _mC) 
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
				piston.renderer = new PistonRenderer(canvasElement, 'canvas', 8, { width: $(canvasElement).getWidth(), height: $(canvasElement).getHeight() }, function() {  that.loop(); });
			}
		}, 100);
	},
	info: function()
	{
		var info_ = {
			renderer: piston.renderer.RENDERER_TYPE
		};
		return info_;
	},
	setup: function()
	{
		this.mainClass.loader = this.loader;
		this.mainClass.setup();
	},
	loop: function()
	{
		this.update();
		this.draw();
	},
	update: function()
	{
		this.fps = piston.renderer.fps();
		this.delta = piston.renderer.getDelta();
		this.mainClass.update();
	},
	draw: function()
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
	}
});