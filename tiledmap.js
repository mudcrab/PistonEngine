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
				var x = new Array(10);
				  for (var i = 0; i < 10; i++) {
				    x[i] = new Array(10);
				  }
				for(var l = 0; l < self.raw.layers.length; l++)
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
								/*var tile = new PistonEntity(data[i].pos, data[i].size, data[i].imageName);
                tile.scrollable = true;
                tile.clickable = true;*/
								/*var tile = {
									pos: { x: _x * self.raw.tilewidth, y: _y * self.raw.tileheight },
									size: { w: self.raw.tilewidth, h: self.raw.tileheight },
									layer: l
								};
								var data = {
									pos: { x: 0, y: 0 },
									size: { w: self.raw.tilewidth, h: self.raw.tileheight },
									layer: l
								};
								if(count == self.raw.width)
								{
									count = 0;
									hIndex++;
								}
								data.pos.x = count * data.size.w;
								data.pos.y = hIndex * data.size.h;
								var id = self.raw.layers[l].data[i] - 1;
								data.imageName = self.raw.tilesets[0].tileproperties[id].instanceName;

								*/
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
				}
				cb(data);
			}
		});
	}
});