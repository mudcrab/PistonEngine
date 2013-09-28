var PistonStage = function(name) {
	
	this.layers = [];
	this.name = "";

	this.initialize(name);
};
PistonStage.prototype.initialize = function(name)
{
	this.name = name;
	piston.debug.log('Stage ' + this.name + ' initialized');
	this.addLayer();
};
PistonStage.prototype.setSize = function(width, height)
{
	this.size.width = width;
	this.size.height = height;
};
PistonStage.prototype.addLayer = function()
{
	this.layers.push(new PistonLayer());
};
PistonStage.prototype.addEntity = function(entity, layer)
{
	piston.debug.log('Adding entity ' + entity);
	if(entity !== 'undefined')
	{
		if(typeof layer !== 'undefined')
		{
			this.layers[layer].addEntity(entity);
		}
		else
			this.layers[0].addEntity(entity);
	}
	else
		piston.debug.log('No entity specified');
};
/*
	moves layer by x y, if layer not specified moves all layers
*/
PistonStage.prototype.moveLayer = function(layer, x, y)
{
	if(typeof layer !== 'undefined')
		this.layers[layer].move(x, y);
	else
	{
		for(var layer in this.layers)
			this.layers[layer].move(x, y);
	}
};
/*
	moves layer to x y, if layer not specified moves all layers
*/
PistonStage.prototype.moveLayerTo = function(layer)
{
	if(typeof layer !== 'undefined')
		this.layers[layer].moveTo(x, y);
	else
	{
		for(var layer in this.layers)
			this.layers[layer].moveTo(x, y);
	}
};
/*
	returns all entities in layer(s)
*/
PistonStage.prototype.getAllEntities = function(layer)
{
	var entities = [];
	if(layer !== 'undefined')
	{
		for(var layer in this.layers)
			entities.push(this.layers[layer].entities)
	}
	else
		entities.push(this.layers[layer].entities);
	return entities;
};
PistonStage.prototype.draw = function()
{
	var entitiesToDraw = [];
	var layers = this.getAllEntities();

	for(var layer in layers)
	{
		for(var entity in layers[layer])
		{
			if(layers[layer][entity].draw)
			{
				entitiesToDraw.push(layers[layer][entity]);
				// layers[layer][entity].draw = false;
			}
		}
	}

	return entitiesToDraw;
};