/*
	Piston Engine
*/
var PistonEngine = Class.create({
	RENDERER: null,
	mainClass: null,
	fps: null,
	loader: null,
	initialize: function(canvasElement, _mC) 
	{
		this.mainClass = new _mC;
		var that = this;
		that.loader = new PistonAssetLoader();
		var assets = that.mainClass.toLoad;
		for(var i = 0; i < assets.length; i++)
		{
			console.log(that.loader.addAsset(assets[i]));
		}
		//that.RENDERER = new PistonRenderer(canvasElement, 'canvas', 8, { width: $(canvasElement).getWidth(), height: $(canvasElement).getHeight() }, function() {  that.loop(); });

		//that.setup();
	},
	info: function()
	{
		var info_ = {
			renderer: this.RENDERER.RENDERER_TYPE
		};
		return info_;
	},
	setup: function()
	{
		this.mainClass.setup();
	},
	loop: function()
	{
		this.update();
		this.draw();
	},
	update: function()
	{
		this.fps = this.RENDERER.fps();
		this.mainClass.update();
	},
	draw: function()
	{
		var layers = this.mainClass.stage.toDraw;
		for(var layer = 0; layer < layers.length; layer++)
		{
			var entities = layers[layer];
			for(var entity = 0; entity < entities.length; entity++)
			{
				this.RENDERER.render(entities[entity]);
			}
		}
	}
});