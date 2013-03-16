var PistonAssetLoader = Class.create({
	DEFAULT_PATH: 'assets/',
	assets: null,
	loaded: 0,
	spritemaps: null,
	last: 0,
	initialize: function()
	{
		this.assets = new Array();
		this.spritemaps = new Array();
	},
	addAsset: function(asset)
	{
		var self = this;
		typeof asset.size == 'undefined' ? asset.size = null : asset.size = size;
		typeof asset.path == 'undefined' ? asset.path = this.DEFAULT_PATH : asset.path = path;
		asset.loaded = false;

		//var path_ == 'undfined' ? path = this.DEFAULT_PATH : path = path:
		switch(asset.type)
		{
			case 'image':
				if(!this.getAsset(asset.instanceName))
				{
					this.last++;
					var img = new Image();
					img.src = asset.path + asset.file + '.png';
					img.onload = setLoaded(asset.instanceName);
					asset.image = img;
					asset.loaded = true;
					this.assets.push(asset);
					return true;
				}
				else
					return false;
			break
			case 'spritemap':
				this.spritemaps.push(asset);

				this.last++;
				var img = new Image();
				img.src = asset.path + asset.file + '.png';
				img.onload = function() {
					self.setLoaded(asset.instanceName);
					for(var i = 0; i < asset.sprites.length; i++)
					{
						var cc = document.createElement('canvas');
						cc.width = asset.sprites[i].w;
						cc.height = asset.sprites[i].h;
						cc.getContext('2d').drawImage(img, asset.sprites[i].x, asset.sprites[i].y,
															asset.sprites[i].w, asset.sprites[i].h, 0, 0,
															asset.sprites[i].w, asset.sprites[i].h);
						var image = new Image();
						image.src = cc.toDataURL("image/png");
						self.last++;
						image.onload = function() {};
						asset.sprites[i].image = image;
						self.assets.push(asset.sprites[i]);
						self.setLoaded(asset.sprites[i].instanceName);
					}
				};
				asset.image = img;
				this.assets.push(asset);
				//this.assets.push(asset);
				//for(var i = 0; i < asset.sprites.length; i++)
				//{
				//	this.assets.push(asset.sprites[i]);
				//}
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
	setLoaded: function(name)
	{
		this.loaded++;
		debug.log('Loaded asset [ ' + name + ' ] ' + this.loaded + ' of ' + this.assets.length)
	},
	getProgress: function()
	{
		return {
			loaded: this.loaded,
			total: this.assets.length
		}
	}
});