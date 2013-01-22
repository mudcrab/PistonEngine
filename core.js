/*
	Piston Engine
*/
var PistonEngine = Class.create({
	RENDERER: null,
	mainClass: null,
	fps: null,
	initialize: function(canvasElement, _mC) 
	{
		this.mainClass = new _mC;
		var that = this;
		that.RENDERER = new PistonRenderer(canvasElement, 'canvas', 8, { width: $(canvasElement).getWidth(), height: $(canvasElement).getHeight() }, function() {  that.loop(); });
		that.setup();
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
		var entities = this.mainClass.stage.drawableEntities;
		for(var i = 0; i < entities.length; i++)
		{
			this.RENDERER.render(entities[i]);
		}
	}
});