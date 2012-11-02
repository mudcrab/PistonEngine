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
	source: null,
	angle: 0,

	initialize: function(x, y, w, h, _source, name)
	{
		this.x = x;
		this.y = y;
		this.lastx = x;
		this.lasty = y;
		this.source = _source;
		this.image = new Image();
		this.image.src = 'assets/tiles/' + this.source + '.png';
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
	},
	moveTo: function(x, y)
	{
		this.lastx = this.x;
		this.lasty = this.y;
		this.x = x;
		this.y = y;
	},
	/*
		Change the source file of the Entity, you can also specify new width and height of the image
	*/
	changeSource: function(src, w, h)
	{
		w = undefined ? w = this.width : w = w;
		h = undefined ? h = this.width : h = h;
		this.image = new Image();
		this.image.src = 'assets/tiles/' + src + '.png';
		this.image.width = w;
		this.image.height = h;
	},
	rotate: function(degrees)
	{

	}
});