/*
	Piston Engine
*/
var PistonEngine = Class.create({
	RENDERER: null,
	initialize: function(canvasElement) 
	{
		this.RENDERER = new PistonRenderer(canvasElement, 'canvas', { width: $(canvasElement).getWidth(), height: $(canvasElement).getHeight() });
	}
});