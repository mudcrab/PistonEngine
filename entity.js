var PistonEntity = function(pos_, size_, image_, name_) {
	this.index = 0;
	this.ASSETS_PATH = 'assets/';
	this.pos = {
		x: 0,
		y: 0,
		lastx: 0,
		lasty: 0
	};
	this.size = {
		w: 0,
		h: 0
	};
	this.clickable = false;
	this.scrollable = false;
	this.manual = false;
	this.visible = true;
	this.imgVisible = true;
	this.source = null;
	this.image = null;
	this.name = null;
	this.rectVisible = false; // todo recto bounds
	this.rectSize = {w: 0, h: 0};
	this.rectPos = {x: 0, y: 0};
	this.layer = 0;
	this.properties = {};
	this.draw = true;
	this.rotation = 0;
	this.initialize(pos_, size_, image_, name_);
};
PistonEntity.prototype.initialize = function(pos_, size_, image_, name_) 
{
	this.pos = pos_;
	this.size = size_;
	//this.source = image_;
	this.name = name_;
	//this.image = new Image();
	//this.image.src = this.ASSETS_PATH + image_ + '.png'; // todo change this to asset loader later
	this.image = image_;
	this.image.width = this.size.w;
	this.image.height = this.size.h;
	this.rectSize = { w: this.size.w, h: this.size.h };
	this.rectPos = pos_;
};
/* 
	move entity by x, y pixels 
*/
PistonEntity.prototype.move = function(x, y)
{
	if(this.scrollable)
	{
		this.pos.lastx = this.pos.x;
		this.pos.lasty = this.pos.y;
		this.pos.x += x;
		this.pos.y += y;
	}
};
/*
	move entity to x, y
	not the most elegant solution, but works for now, and it'll be refactored later
*/
PistonEntity.prototype.moveTo = function(x, y)
{
	var mX = 1;
	var mY = 1;

	if(typeof this.speedX !== 'undefined')
	{
		if(Math.abs(this.pos.x - x) <= 10)
			this.speedX = 1;

		mX = this.speedX;
	}
	if(typeof this.speedY !== 'undefined')
	{
		if(Math.abs(this.pos.y - y) <= 10)
			this.speedY = 1;

		mY = this.speedY;
	}

	if(this.pos.x > x)
	{
		mX = mX * -1;
	}
	else if(this.pos.x < x)
	{
		mX = mX * 1;
	}
	else
		mX = 0;

	if(this.pos.y > y)
		mY = mY * -1;
	else if(this.pos.y < y)
		mY = mY * 1;
	else
		mY = 0;

	this.move(mX, mY);
};
/*
	set a new image for entity
*/
PistonEntity.prototype.changeImg = function(image_, w, h)
{
	w = undefined ? w = this.size.w : w = w;
	h = undefined ? h = this.size.h : h = h;
	this.image = new Image();
	this.image.src = this.ASSETS_PATH + image_ + '.png';
	this.image.width = size.w;
	this.image.height = size.h;
};
PistonEntity.prototype.rotate = function(deg)
{
	this.rotation = deg;
};