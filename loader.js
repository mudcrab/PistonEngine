var PistonAssetLoader = Class.create({
	DEFAULT_PATH: 'assets/',
	assets: null,
	loaded: 0,
	spritemaps: null,
	initialize: function()
	{
		this.assets = new Array();
		this.spritemaps = new Array();
	},
	addAsset: function(asset)
	{
		typeof asset.size == 'undefined' ? asset.size = null : asset.size = size;
		typeof asset.path == 'undefined' ? asset.path = this.DEFAULT_PATH : asset.path = path;

		//var path_ == 'undfined' ? path = this.DEFAULT_PATH : path = path:
		switch(asset.type)
		{
			case 'image':
				if(!this.getAsset(asset.instanceName))
				{
					this.assets.push(asset);
					return true;
				}
				else
					return false;
			break
			case 'spritemap':
				this.spritemaps.push(asset);
			break;
		}
		
	},
	getAsset: function(instance, type)
	{
		var ret = false;
		if(typeof type == 'undefined')
		{
			for(var asset = 0; asset < this.assets.length; asset++)
			{
				
				if(this.assets[asset].instanceName == instance)
					ret = this.assets[asset];	
			}
		}
		else
		{
			for(var spritemap = 0; spritemap < this.spritemaps.length; spritemap++)
			{
				if(this.spritemaps[spritemap].instanceName == instance.name)
				{
					for(var sprite = 0; sprite < this.spritemaps[spritemap].sprites.length; sprite++)
					{
						if(this.spritemaps[spritemap].sprites[sprite].instanceName == instance.sprite)
						{
							
							var spr = this.spritemaps[spritemap].sprites[sprite];
							//ctx_.drawImage(this.spritemaps[spritemap].image, 0, 0, 160, 160);
							var cc = document.createElement('canvas');
					        cc.getContext('2d').drawImage(this.spritemaps[spritemap].image, 32, 0);
					        var i = new Image();
					        i.src = cc.toDataURL("image/png");

							ret = i;
						}
					}
				}
			}
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

		for(var spritemap = 0; spritemap < this.spritemaps.length; spritemap++)
		{
			var tempSpritemap = new Image();
			tempSpritemap.src = self.spritemaps[spritemap].path + self.spritemaps[spritemap].file + '.png';
			img.onload = self.setLoaded();
			self.spritemaps[spritemap].image = tempSpritemap;
		}

		
	},
	setLoaded: function()
	{
		this.loaded++;
		debug.log('Loaded asset ' + this.loaded + ' of ' + this.assets.length)
	},
	getProgress: function()
	{
		return {
			loaded: this.loaded,
			total: this.assets.length
		}
	}
});