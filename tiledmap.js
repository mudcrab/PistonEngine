var PistonTiledMap = Class.create(PistonMap, {
	file: null,
	mWidth: 0,
	mHeight: 0,
	raw: {},
	initialize: function(mapFile)
	{
		this.file = mapFile;
	},
	parseTiled: function(cb)
	{
		var self = this;
		var data = {};
		new Ajax.Request(this.DEFAULT_ASSET_PATH + this.file, {
			method: "get",
			onSuccess: function(response) {
				self.raw = response.responseText.evalJSON();
				self.mWidth = self.raw.width;
				self.mHeight = self.raw.height;
				data.width = self.raw.width;
				data.height = self.raw.height;
				data.layers = [];
				for(var l = 0; l < self.raw.layers.length; l++)
				{
					if(typeof self.raw.layers[l].data == 'object')
					{
						var layer = new Array(data.height);
						for(var tempX = 0; tempX < data.height; tempX++)
						{
							layer[tempX] = new Array(data.width);
						}
						var index = 0;
						for(var _y = 0; _y < data.height; _y++)
						{
							for(var _x = 0; _x < data.width; _x++)
							{
								var id = self.raw.layers[l].data[index] - 1;
								var tile = new PistonEntity({ x: _x * self.raw.tilewidth, y: _y * self.raw.tileheight, lastx: _x * self.raw.tilewidth, lasty: _y * self.raw.tileheight }, { w: self.raw.tilewidth, h: self.raw.tileheight }, self.raw.tilesets[0].tileproperties[id].instanceName);
								tile.scrollable = true;
                				tile.clickable = true;
								layer[_y][_x] = tile;
								index++;
							}
						}
						data.layers.push(layer);
					}
				}
				/*for(var l = 0; l < self.raw.layers.length; l++)
				{
					if(typeof self.raw.layers[l].data == 'object')
					{
						var map = new Array(data.width);
						for(var a = 0; a < data.height; a++)
						{
							map[a] = new Array(data.width);
						}
						var i = 0;
						for(var _y = 0; _y < data.height; _y++)
						{
							for(var _x = 0; _x < data.width; _x++)
							{
								
								var id = self.raw.layers[l].data[i] - 1;
								var tile = new PistonEntity({ x: _x * self.raw.tilewidth, y: _y * self.raw.tileheight, lastx: _x * self.raw.tilewidth, lasty: _y * self.raw.tileheight }, { w: self.raw.tilewidth, h: self.raw.tileheight }, self.raw.tilesets[0].tileproperties[id].instanceName);
								tile.scrollable = true;
                				tile.clickable = true;
								map[_x][_y] = tile;
								i++;
							}
						}
						data.layers.push(map);
					}
				}*/
				cb(data);
			}
		});
	}
});