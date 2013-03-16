var PistonEntity = Class.create({
	index: 0,
	ASSETS_PATH: 'assets/',
	pos: {
		x: 0,
		y: 0,
		lastx: 0,
		lasty: 0
	},
	size: {
		w: 0,
		h: 0
	},
	clickable: false,
	scrollable: false,
	manua: false,
	visible: true,
	imgVisible: true,
	source: null,
	image: null,
	name: null,
	rectVisible: false, // todo recto bounds
	rectSize: {w: 0, h: 0},
	rectPos: {x: 0, y: 0},
	properties: {},
	initialize: function(pos_, size_, image_, name_) 
	{
		this.pos = pos_;
		this.size = size_;
		this.source = image_;
		this.name = name_;
		//this.image = new Image();
		//this.image.src = this.ASSETS_PATH + image_ + '.png'; // todo change this to asset loader later
		this.image = image_;
		this.image.width = this.size.w;
		this.image.height = this.size.h;
		this.rectSize = { w: this.size.w, h: this.size.h };
		this.rectPos = pos_;
	},
	/* 
		move entity by x, y pixels 
	*/
	move: function(x, y)
	{
		if(this.scrollable)
		{
			this.pos.lastx = this.pos.x;
			this.pos.lasty = this.pos.y;
			this.pos.x += x;
			this.pos.y += y;
		}
	},
	/*
		move entity to x, y
	*/
	moveTo: function(x, y)
	{
		this.pos.lastx = this.pos.x;
		this.pos.lasty = this.pos.y;
		this.pos.x = x;
		this.pos.y = y;
	},
	/*
		set a new image for entity
	*/
	changeImg: function(image_, w, h)
	{
		w = undefined ? w = this.size.w : w = w;
		h = undefined ? h = this.size.h : h = h;
		this.image = new Image();
		this.image.src = this.ASSETS_PATH + image_ + '.png';
		this.image.width = size.w;
		this.image.height = size.h;
	}
});