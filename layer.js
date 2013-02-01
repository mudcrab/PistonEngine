var PistonLayer = Class.create({
	layerID: null,
	layerEntities: null,
	drawnLayerEntities: null,
	layerSize: {},
	totalLayerEntities: 0,
	totalDrawnEntities: 0,

	initialize: function(id, size) {
		this.layerID = id;
		this.layerSize = size;
		this.layerEntities = new Array();
		this.drawnLayerEntities = new Array();
	},
	initDrawables: function() {
		this.drawnLayerEntities = [];
		for(var i = 0; i < this.layerEntities.length; i++)
		{
			if(this.layerEntities[i].pos.x >= -32 && this.layerEntities[i].pos.x <= this.layerSize.screenWidth && this.layerEntities[i].pos.y >= -32 && this.layerEntities[i].pos.y <= this.layerSize.screenHeight)
			{
				this.drawnLayerEntities.push(this.layerEntities[i]);
			}
		}
	},
	addChild: function(entity) {
		var len = this.layerEntities.push(entity);
		this.totalLayerEntities++;
		return len--;
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
		this.drawnLayerEntities = [];
		for(var i = 0; i < this.layerEntities.length; i++)
		{
			this.layerEntities[i].move(x, y);
			if(this.layerEntities[i].pos.x >= -32 && this.layerEntities[i].pos.x <= this.layerSize.screenWidth && this.layerEntities[i].pos.y >= -32 && this.layerEntities[i].pos.y <= this.layerSize.screenHeight)
			{
				this.drawnLayerEntities.push(this.layerEntities[i]);
			}
		}
	},
	deleteLayer: function() {

	},
	clearAllEntities: function() {

	}
});