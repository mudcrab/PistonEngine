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
				this.assets.push(asset);
				for(var i = 0; i < asset.sprites.length; i++)
				{
					this.assets.push(asset.sprites[i]);
				}
			break;
		}
		
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
	genSprites: function()
	{
		var self = this;
		for(var i = 0; i < this.spritemaps.length; i++)
		{
			for(var j = 0; j < this.spritemaps[i].sprites.length; j++)
			{
				var spr = this.spritemaps[i].sprites[j];
				var canvas = document.createElement('canvas');
				canvas.width = spr.w;
				canvas.height = spr.h;
				canvas.getContext('2d').drawImage(this.spritemaps[i].image, 32, 0, 32, 32, 0, 0, 32, 32);

				var image = new Image();
				image.src = canvas.toDataURL("image/png");
				image.onload = function() {
					self.setLoaded();
					var sprite = {
						instanceName: spr.instanceName,
						type: 'image',
						image: image
					};
					self.assets.push(sprite);
				};
			}
		}	
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
			var spMap = self.spritemaps[spritemap];
			var tempSpritemap = new Image();
			tempSpritemap.src = self.spritemaps[spritemap].path + self.spritemaps[spritemap].file + '.png';
			tempSpritemap.onload = function() {
				for(var i = 0; i < spMap.sprites.length; i++)
				{
					for(var j = 0; j < self.assets.length; j++)
					{
						if(self.assets[j].instanceName == spMap.sprites[i].instanceName)
						{
							var sprite = spMap.sprites[i];
							var cc = document.createElement('canvas');
							cc.width = sprite.w;
							cc.height = sprite.h;
							cc.getContext('2d').drawImage(tempSpritemap, sprite.x, sprite.y, sprite.w, sprite.h, 0, 0, sprite.w, sprite.h);
							var image = new Image();
							image.src = cc.toDataURL("image/png");
							image.onload = function() {
								self.assets[j-1].image = image;
								self.setLoaded();
							}
						}
					}
				}
			};
			self.spritemaps[spritemap].image = tempSpritemap;
			self.setLoaded();
		}

		//self.genSprites();		
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