var PistonLayer = function(id, stageSize, tileSize) {
	this.layerID = null;
	this.renderByTile = true;
	this.layerEntities = null;
	this.tileSize = 32;
	this.hidden = false;
	this.totalEntities = 0;
	this.fromX = 0;
	this.toX = 0;
	this.fromY = 0;
	this.toY = 1;
	this.maxX = 0;
	this.maxY = 0;
	this.maxScreenX = 0;
	this.maxScreenY = 0;

	this.counterY = 0;
	this.counterX = 0;
	this.initialize(id, stageSize, tileSize);
};
	

PistonLayer.prototype.initialize = function(id, stageSize, tileSize) {
	this.layerID = id;
	this.layerEntities = new Array(1);
	this.layerEntities[0] = new Array(1);
	this.tileSize = tileSize;
	if(typeof tileSize == 'object')
	{
		this.maxScreenX = Math.floor((stageSize.screenWidth / (tileSize.w / 2)) / 2) + 1;
		this.maxScreenY = Math.floor(stageSize.screenHeight / (tileSize.h / 2)) + 1;
	}	
	else
	{
		this.maxScreenX = Math.floor(stageSize.screenWidth / tileSize) + 1;
		this.maxScreenY = Math.floor(stageSize.screenHeight / tileSize) + 1;
	}
};
PistonLayer.prototype.addChild = function(entity, row) {
	entity.layer = this.layerID;
	if(typeof row == 'undefined')
	{
		row = 0
	}
	else
	{
		row = row;
		this.toY += 1;
	}
	this.maxY += row;
	this.layerEntities[this.maxY][this.maxX] = entity;
	this.maxX++;
	this.toX += 1;
	this.totalEntities++;
};
PistonLayer.prototype.addChildren = function(entities, size)
{
	for(var y = 0; y < entities.length; y++)
		for(var x = 0; x < entities[0].length; x++)
			if(typeof entities[y][x] != 'undefined')
				this.totalEntities++;
	
	this.layerEntities = entities;
	if(entities[0].length > this.maxScreenX)
		this.toX = this.maxScreenX;
	else
		this.toX = entities[0].length;

	if(entities.length > this.maxScreenY)
		this.toY = this.maxScreenY;
	else
		this.toY = entities.length;
};
PistonLayer.prototype.getLayerInfo = function()
{
	return {
		fromX: this.fromX,
		fromY: this.fromY,
		toX: this.toX,
		toY: this.toY,
		maxX: this.maxX,
		maxY: this.maxY
	}
};
PistonLayer.prototype.addChildAt = function(entity) {
	// later
};
PistonLayer.prototype.removeChild = function(entity) {
	// later
};
PistonLayer.prototype.getChild = function(id) {

};
PistonLayer.prototype.move = function(_x, _y) {

	for(var y = 0; y < this.layerEntities.length; y++)
	{
		for(var x = 0; x < this.layerEntities[0].length; x++)
		{
			if(!this.layerEntities[y][x].manual)
				this.layerEntities[y][x].move(_x, _y);
		}
	}

	this.counterX += _x;
	this.counterY += _y;
	this.fromX = Math.abs( Math.floor( this.counterX / this.tileSize.w ) ) - 1;
	this.fromY = Math.abs( Math.floor( this.counterY / this.tileSize.h ) ) - 1;

	if(this.fromX < 0)
		this.fromX = 0;

	if(this.fromY < 0)
		this.fromY = 0;


	if(this.renderByTile)
	{
		if(this.layerEntities.length < this.maxScreenY)
			this.toY = this.layerEntities.length + this.fromY;
		else
			this.toY = this.maxScreenY + this.fromY;

		if(this.layerEntities[0].length < this.maxScreenX)
			this.toX = this.layerEntities[0].length + this.fromY;
		else
			this.toX = this.maxScreenX + this.fromX;
	}
	else
	{
		this.fromX = 0;
		this.fromY = 0;
		this.toX = this.layerEntities[0].length;
		this.toY = this.layerEntities.length;
	}
};
PistonLayer.prototype.hideLayer = function() {
	this.hidden = true;
	for(var i = 0; i < this.drawnLayerEntities.length; i++)
	{
		this.drawnLayerEntities[i].visible = false;
	}
	this.drawnLayerEntities = [];
};
PistonLayer.prototype.showLayer = function() {
	this.hidden = false;
	for(var i = 0; i < this.layerEntities.length; i++)
	{
		if(!this.layerEntities[i].visible)
		{
			this.layerEntities[i].visible = true;
		}
	}
};
PistonLayer.prototype.deleteLayer = function() {

};
PistonLayer.prototype.clearAllEntities = function() {

};