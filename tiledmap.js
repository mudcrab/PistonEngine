var PistonTiledMap = Class.create(PistonMap, {
	file: null,
	raw: {},
	initialize: function(mapFile)
	{
		this.file = mapFile;
		
	},
	parseTiled: function(cb)
	{
		var self = this;
		new Ajax.Request(this.DEFAULT_ASSET_PATH + this.file, {
			onSuccess: function(response) {
				self.raw = response.responseText.evalJSON();
				self.mWidth = self.raw.width;
				self.mHeight = self.raw.height;

				var layers = [];

				for(var l = 0; l < self.raw.layers.length; l++)
				{
					var count = 0;
					var hIndex = 0;
					if(typeof self.raw.layers[l].data == 'object')
					{
						for(var i = 0; i < self.raw.layers[l].data.length; i++)
						{
							var data = {
								pos: { x: 0, y: 0 },
								size: { w: self.raw.tilewidth, h: self.raw.tileheight }
							};
							if(count != 10)
							{
								count++;
							}
							else
							{
								count = 1;
								hIndex++;
							}
							data.pos.x = count * data.size.w;
							data.pos.y = hIndex * data.size.h;
							if(self.raw.layers[l].data[i] != 0)
							{
								var id = self.raw.layers[l].data[i] - 1;
								data.imageName = self.raw.tilesets[0].tileproperties[id].instanceName;
							}
							self.mapData.push(data);
						}
					}
				}

				cb(self.mapData);
			}
		});
	},
	getMapData: function() 
	{

	}
});