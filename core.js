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
		var entities = this.mainClass.stage.entities;
		for(var i = 0; i < entities.length; i++)
		{
			this.RENDERER.render(entities[i]);
		}
	}
});