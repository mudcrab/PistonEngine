var PistonLayer = function()
{
	this.entities = [];
	this.size = { width: 0, height: 0 };
	this.pos = { x: 0, y: 0 };

	this.initialize();
};
PistonLayer.prototype.initialize = function()
{
	piston.debug.log('Layer added');
};
/*

*/
PistonLayer.prototype.addEntity = function(entity)
{
	this.entities.push(entity);
};
/*

*/
PistonLayer.prototype.removeEntity = function(entity)
{

};
/*
	moves the whole layer by x y
*/
PistonLayer.prototype.move = function(x, y)
{
	this.pos.x += x;
	this.pos.y += y;
};
/*
	moves the whole layer to x y
*/
PistonLayer.prototype.moveTo = function(x, y)
{
	this.pos.x = x;
	this.pos.y = y;
};