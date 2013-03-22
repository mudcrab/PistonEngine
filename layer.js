var PistonLayer = Class.create({
	layerID: null,
	layerEntities: null,
	drawnLayerEntities: null,
	layerSize: { w: 0, h: 0},
	maxLayerSize: {w: 1, h: 1},
	tileSize: this.tileSize,
	totalLayerEntities: 0,
	totalDrawnEntities: 0,
	hidden: false,
	startIndex: 0,
	needle: {
		startX: 0,
		startY: 0
	},

	initialize: function(id, maxLayerSize, tileSize) {
		this.layerID = id;
		this.layerEntities = new Array();
		this.drawnLayerEntities = new Array();
		this.tileSize = tileSize;
		this.maxLayerSize.w = maxLayerSize.stageWidth;
		this.maxLayerSize.h = maxLayerSize.stageHeight;
		this.layerEntities = new Array(this.maxLayerSize.w);
		for(var i = 0; i < this.maxLayerSize.w; i++)
		{
			this.layerEntities[i] = new Array(this.maxLayerSize.h);
		}
		//this.max = size.stageWidth * size.stageHeight;
	},
	addChild: function(entity) {
		entity.layer = this.layerID;
		var index = 0;
		for(var x = 0; x < this.maxLayerSize.w; x++)
		{
			for(var y = 0; y < this.maxLayerSize.h; y++)
			{
				if(typeof this.layerEntities[x][y] == 'undefined')
				{
					this.layerEntities[x][y] = entity;
					this.layerSize.w = x+1;
					this.layerSize.h = y+1;
					return index;
				}
				index++;
			}
		}
	},
	addChildren: function(entities, size)
	{
		this.layerSize = size;
		this.layerEntities = entities;
	},
	addChildAt: function(entity) {
		// later
	},
	removeChild: function(entity) {
		// later
	},
	getChild: function(id) {

	},
	move: function(x, y) {
		for(var i = 0; i < this.layerEntities.length; i++)
		{
			if(!this.layerEntities[i].manual)
				this.layerEntities[i].move(x, y);
		}
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