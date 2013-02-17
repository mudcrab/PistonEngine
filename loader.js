var PistonAssetLoader = Class.create({
	DEFAULT_PATH: 'assets/',
	assets: null,
	loaded: 0,
	initialize: function()
	{
		this.assets = new Array();
	},
	addAsset: function(asset)
	{
		typeof asset.size == 'undefined' ? asset.size = null : asset.size = size;
		typeof asset.path == 'undefined' ? asset.path = this.DEFAULT_PATH : asset.path = path;
		//var path_ == 'undfined' ? path = this.DEFAULT_PATH : path = path:
		
		if(!this.getAsset(asset.instanceName))
		{
			this.assets.push(asset);
			return true;
		}
		else
			return false;
	},
	getAsset: function(instance)
	{
		var ret = false;
		for(var asset = 0; asset < this.assets.length; asset++)
		{
			if(this.assets[asset].instanceName == instance)
				ret = this.assets[asset];
		}
		return ret;
	},
	preload: function()
	{
		var self = this;
		var loaded = 0;	
		
		for(var asset = 0; asset < this.assets.length; asset++)
		{
			if(this.assets[asset].type == 'image')
			{
				var img = new Image();
				img.src = self.assets[asset].path + self.assets[asset].file + '.png';
				img.onload = self.setLoaded();
				self.assets[asset].image = img;
			}
		}

		
	},
	setLoaded: function()
	{
		this.loaded++;
	},
	getProgress: function()
	{
		return {
			loaded: this.loaded,
			total: this.assets.length
		}
	}
});