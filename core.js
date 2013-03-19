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
		// window.debug = PistonDebug; // add this to window ns, so it will be available globally, TODO create a piston ns!
		piston.loader = new PistonAssetLoader();
		var assets = that.mainClass.toLoad;
		for(var i = 0; i < assets.length; i++)
		{
			piston.loader.addAsset(assets[i]);
		}
		//piston.loader.preload();
		//this.loader.genSprites();
		
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
	redraw: function()
	{
		var layers = pistonengine.stage.toDraw;
		console.log(layers)
		for(var layer = 0; layer < layers.length; layer++)
		{
			var entities = layers[layer];
			for(var entity = 0; entity < entities.length; entity++)
			{
				piston.renderer.render(entities[entity]);
			}
		}	
	},
	draw: function()
	{
		var layers = piston.stage.layers;
		for(var i = 0; i < layers.length; i++)
		{
			layers[i].update(function(entities) {
				for(var j = 0; j < entities.length; j++)
				{
					piston.renderer.render(entities[j]);
				}
			});
		}
		/*var layers = piston.stage.toDraw;
		for(var layer = 0; layer < layers.length; layer++)
		{
			var entities = layers[layer];
			for(var entity = 0; entity < entities.length; entity++)
			{
				piston.renderer.render(entities[entity]);
			}
		}*/
	}
});