var PistonMap = Class.create({
	DEFAULT_ASSET_PATH: 'assets/',
	mWidth: 0,
	mHeight: 0,
	layers: 0,
	name: null,
	mapData: [],
	initialize: function()
	{
		this.mapData = new Array();
	},
	returnMap: function()
	{
		return this.mapData;
	}
});