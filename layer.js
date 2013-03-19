var PistonLayer = Class.create({
	layerID: null,
	layerEntities: null,
	drawnLayerEntities: null,
	layerSize: {},
	tileSize: this.tileSize,
	totalLayerEntities: 0,
	totalDrawnEntities: 0,
	hidden: false,
	startIndex: 0,
	endIndex: 0,

	initialize: function(id, size, tileSize) {
		this.layerID = id;
		this.layerSize = size;
		this.layerEntities = new Array();
		this.drawnLayerEntities = new Array();
		this.tileSize = tileSize;
	},
	addChild: function(entity) {
		var len = this.layerEntities.push(entity);
		len--;
		this.layerEntities[len].index = len;
		this.totalLayerEntities++;
		if(entity.pos.x >= -this.tileSize && entity.pos.x <= this.layerSize.screenWidth && entity.pos.y >= -this.tileSize && entity.pos.y <= this.layerSize.screenHeight)
		{
			this.drawnLayerEntities.push(entity);
		}
		return len;
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