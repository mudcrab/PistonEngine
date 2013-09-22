var PistonMap = function() {
	this.DEFAULT_ASSET_PATH = 'assets/';
	this.mWidth = 0;
	this.mHeight = 0;
	this.layers = 0;
	this.name = null;
	this.mapData = [];
};
	initialize = function()
	{
		this.mapData = new Array();
	};
	returnMap = function()
	{
		return this.mapData;
	};