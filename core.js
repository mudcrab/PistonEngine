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
		var alLEntities = new Array();
		for(var i = 0; i < piston.stage.layers.length; i++)
		{
			alLEntities = alLEntities.concat(piston.stage.layers[i].layerEntities);
		}
		piston.renderer.render_(alLEntities);
	},
	draw_: function()
	{
		var layers = piston.stage.layers;
		piston.stage.drawnEntities = 0;
		for(var i = 0; i < layers.length; i++)
		{
			layers[i].update(function(entities) {
				piston.stage.drawnEntities += entities.length;
				for(var j = 0; j < entities.length; j++)
				{
					if(typeof entities[j].update == 'function')
					{
						entities[j].update();
					}
					piston.renderer.render(entities[j]);
				}
			});
		}
	}
});