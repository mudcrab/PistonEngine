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
	moveStage: function()
	{

	},
	update: function(stagePos, stageSize)
	{
		//this.testent.moveTo(this.camera.getPos().x + this.camera.rectSize.w / 2 - 16, this.camera.getPos().y + this.camera.rectSize.h / 2 - 16);
		this.setPos(Math.floor(this.cameraEntity.pos.x - this.rectSize.w / 2 + 16), Math.floor(this.cameraEntity.pos.y - this.rectSize.h / 2 + 16)); // TODO: tile size

		/*if(cameraPos.t <= 0)
        {
            
        }
        if(cameraPos.b >= this.stageSize.pxH)
        {
            
        }
        if(cameraPos.l <= 0)
        {
            
        }
        if(cameraPos.r >= this.stageSize.pxW)
        {

        }*/
	}
});