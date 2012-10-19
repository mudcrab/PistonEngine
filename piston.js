var PistonEngine = Class.create({
	
    mainClass : null,
    input: null,
    stage: null,
    delta: 0,
    stage: null,
    renderer: null,
    testimg: null,

	initialize: function(_canvasElement, _width, _height, _mC)
	{
		mainClass = new _mC;
		this.stage = new PistonStage(_width, _height);
		var that = this;
		that.testimg = new Image();
       	that.testimg.src = 'assets/tiles/player.png';
		that.renderer = new PistonRenderer('c2d', { canvasElement: _canvasElement, width: _width, height: _height }, function() { that.loop(); });
        that.setup();
	},
	loop: function()
	{
		this.update();
		this.draw();
	},
	setup: function()
	{
		mainClass.setup(this.stage);
	},
	draw: function()
	{
		this.renderer.clear();
		var entities = this.stage.getEntities();
		for(var i = 0; i < entities.length; i++)
		{
			if(entities[i].visible)
				this.renderer.renderEntity(entities[i]);
		}
	},
	update: function()
	{
		mainClass.update();
	},
	fps: function()
	{
		return this.renderer.fps();
	}
});