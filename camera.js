/*
	This class adds viewport moving and stuff like that.
	TODO proper desc
*/
var PistonCamera = Class.create(PistonEntity, {
	cameraEntity: null,
	isCamera : true,
	initialize: function()
	{
		this.rectSize = {w: 500, h: 300};
		this.rectVisible = true;
		this.imgVisible = false;
	},
	setCamera: function(entity)
	{
		this.cameraEntity = entity;
		this.rectPos = {x: 100, y: 100};
	},
	getPos: function()
	{
		return this.rectPos;
	},
	getEdgePos: function()
	{
		return {
			l: this.rectPos.x,
			r: this.rectPos.x + this.rectSize.w,
			t: this.rectPos.y,
			b: this.rectPos.y + this.rectSize.h
		};
	},
	setPos: function(x_, y_)
	{
		this.rectPos = {x: x_, y: y_};
		this.moveTo(x_, y_);
	},
	setPosX: function(x_)
	{
		this.rectPos.x = x_;
		this.pos.lastx = this.pos.x;
		this.pos.x = x_;
	},
	setPosY: function(y_)
	{
		this.rectPos.y = y_;
		this.pos.lasty = this.pos.y;
		this.pos.y = y_;
	},
	moveStage: function()
	{

	},
	update: function(stagePos, stageSize)
	{
		//this.testent.moveTo(this.camera.getPos().x + this.camera.rectSize.w / 2 - 16, this.camera.getPos().y + this.camera.rectSize.h / 2 - 16);
		//this.setPos(Math.floor(this.cameraEntity.pos.x - this.rectSize.w / 2 + 16), Math.floor(this.cameraEntity.pos.y - this.rectSize.h / 2 + 16)); // TODO: tile size
		
		var cameraPos = this.getEdgePos();
		var entityPos = this.cameraEntity.pos;

		if(entityPos.x <= cameraPos.l)
		{
			this.setPosX(entityPos.x);
		}
		if(entityPos.x + this.cameraEntity.size.w >= cameraPos.r)
		{
			this.setPosX(entityPos.x - this.rectSize.w + this.cameraEntity.size.w)
		}
		if(entityPos.y <= cameraPos.t)
		{
			this.setPosY(entityPos.y);
		}
		if(entityPos.y + this.cameraEntity.size.h >= cameraPos.b)
		{
			this.setPosY(entityPos.y - this.rectSize.h + this.cameraEntity.size.h);
		}
		/*if(cameraPos.t <= 0 || cameraPos.b >= stageSize.pxH)
        {
            this.setPos(this.pos.x, this.pos.lasty);
        }*/
        /*if(cameraPos.l <= 0 || cameraPos.r >= stageSize.pxW)
        {
            this.setPos(this.pos.lastx, this.pos.y);
        }*/
        
	}
});