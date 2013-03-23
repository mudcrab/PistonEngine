var PistonLayer = Class.create({
	layerID: null,
	layerEntities: null,
	drawnLayerEntities: null,
	layerSize: { w: 0, h: 0},
	renderSize: {x: 0, y: 0},
	maxLayerSize: {w: 1, h: 1},
	tileSize: 32,
	totalLayerEntities: 0,
	totalDrawnEntities: 0,
	hidden: false,
	stageSize: {},
	
	fromX: 0,
	toX: 0,
	fromY: 0,
	toY: 1,
	maxX: 0,
	maxY: 0,
	maxScreenX: 0,
	maxScreenY: 0,

	

	initialize: function(id, stageSize, tileSize) {
		this.layerID = id;
		this.layerEntities = new Array(1);
		this.layerEntities[0] = new Array(1);
		this.drawnLayerEntities = new Array();
		this.tileSize = tileSize;
		this.maxScreenX = Math.floor(stageSize.screenWidth / tileSize) + 1;
		this.maxScreenY = Math.floor(stageSize.screenHeight / tileSize) + 1;
		//this.stageSize = maxLayerSize;
		//this.layerInfo.maxSizeX = maxLayerSize.screenWidth;
		//this.layerInfo.maxSizeY = maxLayerSize.screenHeight;
		//this.layerInfo.maxX = 0;
		//this.layerInfo.maxY = 0;
		/*this.maxLayerSize.w = maxLayerSize.stageWidth;
		this.maxLayerSize.h = maxLayerSize.stageHeight;
		this.renderSize.x = Math.floor(maxLayerSize.screenWidth / tileSize) + 1;
		this.renderSize.y = Math.floor(maxLayerSize.screenHeight / tileSize) + 1;
		this.layerEntities = new Array(this.maxLayerSize.w);
		for(var i = 0; i < this.maxLayerSize.w; i++)
		{
			this.layerEntities[i] = new Array(this.maxLayerSize.h);
		}
		this.size.endX = Math.floor(maxLayerSize.screenWidth / tileSize) + 1;
		this.size.endY = Math.floor(maxLayerSize.screenHeight / tileSize) + 1;
		this.size.maxX = this.size.endX - this.size.startX;
		this.size.maxY = this.size.endY - this.size.startY;
		this.size.totalW = maxLayerSize.stageWidth;
		this.size.totalH = maxLayerSize.stageHeight;*/
		//this.max = size.stageWidth * size.stageHeight;
	},
	addChild: function(entity, row) {
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
		//this.layerInfo.layerId = this.layerID;
		/*for(var y = 0; y < this.maxY+1; y++)
		{
			for(var x = 0; x < this.maxX+1; x++)
			{
				if(typeof this.layerEntities[x][y] == 'undefined')
				{
					this.layerEntities[x][y] = entity;
					this.maxX = x+1;
					this.maxY = y+1;
					return index;
				}
				index++;
			}
		}*/
		//console.log(this.layerEntities, this.getLayerInfo())
	},
	addChildren: function(entities, size)
	{
		//this.layerInfo.toX = entities[0].length;
		//this.layerInfo.toY = entities.length;
		//this.toX = entities[0].length;
		//this.toY = entities.length;
		this.layerEntities = entities;
		if(entities[0].length > this.maxScreenX)
			this.toX = this.maxScreenX;
		else
			this.toX = entities[0].length;

		if(entities.length > this.maxScreenY)
			this.toY = this.maxScreenY;
		else
			this.toY = entities.length;
		//this.layerInfo.layerId = this.layerID;
	},
	getLayerInfo: function()
	{
		return {
			fromX: this.fromX,
			fromY: this.fromY,
			toX: this.toX,
			toY: this.toY,
			maxX: this.maxX,
			maxY: this.maxY
		}
	},
	addChildAt: function(entity) {
		// later
	},
	removeChild: function(entity) {
		// later
	},
	getChild: function(id) {

	},
	move: function(_x, _y) {
		/*this.current.x += _x;
		this.current.y += _y;
		for(var y = 0; y < this.layerSize.h; y++)
		{
			for(var x = 0; x < this.layerSize.w; x++)
			{
				if(!this.layerEntities[x][y].manual)
					this.layerEntities[x][y].move(_x, _y);
			}
		}
		//console.log()
		//this.layerSize.w = Math.floor(this.current.x / this.tileSize);
		//this.needle.startY = Math.abs(Math.floor(this.current.y / this.tileSize));
		this.size.startX = Math.abs(Math.floor(this.current.x / this.tileSize));
		this.size.startY = Math.abs(Math.floor(this.current.y / this.tileSize));
		this.size.endX = this.size.startX + this.renderSize.x;
		this.size.endY = this.size.startY + this.renderSize.y;
		this.size.maxX = this.size.endX - this.size.startX;
		this.size.maxY = this.size.endY - this.size.startY;*/
	},
	hideLayer: function() {
		this.hidden = true;
		for(var i = 0; i < this.drawnLayerEntities.length; i++)
		{
			this.drawnLayerEntities[i].visible = false;
		}
		this.drawnLayerEntities = [];
	},
	showLayer: function() {
		this.hidden = false;
		for(var i = 0; i < this.layerEntities.length; i++)
		{
			if(!this.layerEntities[i].visible)
			{
				this.layerEntities[i].visible = true;
			}
		}
	},
	deleteLayer: function() {

	},
	clearAllEntities: function() {

	},
	update: function(cb) {
		this.drawnLayerEntities = [];
		if(!this.hidden)
		{
			if(this.layerEntities.length <= 4900)
			{
				for(var i = 0; i < this.layerEntities.length; i++)
				{
					if(this.layerEntities[i].visible)
					{
						if(this.layerEntities[i].pos.x >= -this.tileSize && this.layerEntities[i].pos.x <= this.layerSize.screenWidth && this.layerEntities[i].pos.y >= -this.tileSize && this.layerEntities[i].pos.y <= this.layerSize.screenHeight)
						{
							this.drawnLayerEntities.push(this.layerEntities[i]);
						}
					}
				}
				cb(this.drawnLayerEntities);
			}
			else
			{
				var worker = new Worker('/js/piston/workers/pickdrawables.js');
				worker.postMessage(JSON.stringify({ array: this.layerEntities, layerSize: this.layerSize }));
				worker.addEventListener('message', function(e) {
					this.drawnLayerEntities = JSON.parse(e.data).entities.array;
					cb(this.drawnLayerEntities);
					worker.terminate();
		        });
			}
		}
	}
});