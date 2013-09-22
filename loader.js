var PistonAssetLoader = function() {
	this.DEFAULT_PATH = 'assets/';
	this.assets = null;
	this.loaded = 0;
	this.spritemaps = null;
	this.last = 0;
	this.initialize();
};
	PistonAssetLoader.prototype.initialize = function()
	{
		this.assets = new Array();
		this.spritemaps = new Array();
	};
	PistonAssetLoader.prototype.addAsset = function(asset)
	{
		var self = this;
		typeof asset.size == 'undefined' ? asset.size = null : asset.size = size;
		typeof asset.path == 'undefined' ? asset.path = this.DEFAULT_PATH : asset.path = path;
		asset.loaded = false;
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
			break;
		}
		
	};
	PistonAssetLoader.prototype.getAsset = function(instance)
	{
		var ret = false;
		for(var asset = 0; asset < this.assets.length; asset++)
			{
				
				if(this.assets[asset].instanceName == instance)
					ret = this.assets[asset];	
			}
		
		return ret;
	};
	PistonAssetLoader.prototype.setLoaded = function(name)
	{
		this.loaded++;
		console.log('Loaded asset [ ' + name + ' ] ' + this.loaded + ' of ' + this.assets.length)
		//piston.debug.log('Loaded asset [ ' + name + ' ] ' + this.loaded + ' of ' + this.assets.length)
	};
	PistonAssetLoader.prototype.getProgress = function()
	{
		return {
			loaded: this.loaded,
			total: this.assets.length
		}
	}