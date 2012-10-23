var PistonEntity = Class.create({
	
	x: 0,
	y: 0,
	lastx: 0,
	lasty: 0,
	width: 0,
	height: 0,
	name: null,
	scrollable: true,
	clickable: true,
	visible: true,
	image: null,
	properties: {},

	initialize: function(x, y, w, h, source, name)
	{
		this.x = x;
		this.y = y;
		this.lastx = x;
		this.lasty = y;
		this.image = new Image();
		this.image.src = 'assets/tiles/' + source + '.png';
		this.image.width = w;
		this.image.height = h;
		this.width = w;
		this.height = h;
		this.name = name;
	},
	/*
		PistonEntity.move(int, int);
		move entity by @x @y
	*/
	move: function(x, y)
	{
		this.lastx = this.x;
		this.lasty = this.y;
		this.x += x;
		this.y += y;
	}
});