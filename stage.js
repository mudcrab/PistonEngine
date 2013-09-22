var PistonStage = function(pos_, size_) {
    this.layers = [],
	this.entities = [],
	this.totalEntities = 0,
    this.drawableEntities = [],
    this.drawnEntities = 0,
    this.clickableEntities = [],
    this.stageType = 'orthogonal',
    this.toDraw = null,
    this.cameraEntity = null,
    this.stageSize = {
        stageWidth: 0,
        stageHeight: 0,
        screenWidth: 0,
        screenHeight: 0,
        pxWidth: 0,
        pxHeight: 0
    };
    this.stagePos = {
        x: 0,
        y: 0,
        maxScrollX: 0,
        maxScrollY: 0
    };
    this.currentPos = {
        l: 0,
        r: 0,
        t: 0,
        b: 0
    }
};
	PistonStage.prototype.initialize = function(pos_, size_) 
	{
        this.stageSize = size_;
        this.stagePos.x = pos_.x;
        this.stagePos.y = pos_.y;
        this.stagePos.maxScrollX = Math.abs(this.stageSize.pxWidth -this.stageSize.screenWidth);
        this.stagePos.maxScrollY = Math.abs(this.stageSize.pxHeight - this.stageSize.screenHeight);
        toDraw = new Array();
	};
    PistonStage.prototype.setSize = function(w, h)
    {
        this.stageSize.stageWidth = w;
        this.stageSize.stageHeight = h;
    };
	PistonStage.prototype.addChild = function(entity, layerID)
    {
        this.layers[layerID].addChild(entity);
    };
    PistonStage.prototype.addChildren = function(entities, layerID, width, height)
    {
        this.layers[layerID].addChildren(entities, {w: width, h: height});
    };
    PistonStage.prototype.addChildAt = function(index, entity)
    {
        if(entity.isCamera == true)
        {
            this.cameraEntity = entity;
        }
        if(this.entities[index] == undefined)
        {
            entities[index] = entity;
            this.totalEntities++;
            if(entity.clickable)
            {
                this.clickableEntities.push(entity);
            }
        }
    };
    PistonStage.prototype.addLayer = function(id, tileSize) {
        this.layers.push(new PistonLayer(id, this.stageSize, tileSize));
    };
    PistonStage.prototype.deleteLayer = function(id) {

    };
    PistonStage.prototype.shiftLayer = function(id, to) {

    };
    PistonStage.prototype.hideLayer = function(id) {
        this.layers[id].hideLayer();
    };
    PistonStage.prototype.showLayer = function(id) {
        this.layers[id].showLayer();
    };
    PistonStage.prototype.removeChild = function(entity)
    {
        this.entities.splice(this.searchForEntity(entity), 1);
        this.totalEntities--;
    };
    PistonStage.prototype.removeChildAt = function(index)
    {
        this.entities.splice(index, 1);
        this.totalEntities--;
    };
    PistonStage.prototype.clearStage = function()
    {
        for(var i = 0; i < this.entities.length; i++)
        {
            this.entities.pop();
        }
        this.entities = [];
        console.log(this.entities);
    };
    PistonStage.prototype.getEntities = function()
    {
        return this.entities;
    };
    PistonStage.prototype.getEntity = function(entity)
    {
        return this.entities[this.searchForEntity(entity)];
    };
    PistonStage.prototype.getEntityAt = function(index)
    {
        return this.entities[index];
    };
    PistonStage.prototype.getEntityAtPos = function(_x, _y, layer)
    {
        typeof layer == 'undefined' ? layer = this.layers.length-1 : layer = layer;
        for(var i = layer; i >= 0; i--)
        {
            for(var y = 0; y < this.layers[i].layerEntities.length; y++)
            {
                for(var x = 0; x < this.layers[i].layerEntities[0].length; x++)
                {
                    if(this.stageType == 'orthogonal')
                    {
                        var minX = this.layers[i].layerEntities[y][x].pos.x;
                        var maxX = this.layers[i].layerEntities[y][x].pos.x + this.layers[i].layerEntities[y][x].size.w;
                        var minY = this.layers[i].layerEntities[y][x].pos.y;
                        var maxY = this.layers[i].layerEntities[y][x].pos.y + this.layers[i].layerEntities[y][x].size.h;
                    }
                    else
                    {
                        var minX = (_y / this.layers[i].layerEntities[y][x].size.h) + (_x / this.layers[i].layerEntities[y][x].size.w);
                        var maxX = this.layers[i].layerEntities[y][x].pos.x + this.layers[i].layerEntities[y][x].size.w;
                        var minY = (_x / this.layers[i].layerEntities[y][x].size.w) - (_y / this.layers[i].layerEntities[y][x].size.h);
                        var maxY = this.layers[i].layerEntities[y][x].pos.y + this.layers[i].layerEntities[y][x].size.h;
                    }
                    
                    if(_x >= minX && _x <= maxX && _y >= minY && _y <= maxY)
                    {
                        return this.layers[i].layerEntities[y][x];
                    }
                }
            }
        }
    };
    PistonStage.prototype.searchForEntity = function(instanceName)
    {
        var index = null;
        for(var i = 0; i < this.entities.length; i++)
        {
            if(this.entities[i].instanceName == instanceName)
            {
                index = i;
            }
        }
        return index;
    };
    PistonStage.prototype.addCamera = function(entity)
    {
        this.cameraEntity = entity;
    };
    PistonStage.prototype.setup = function()
    {
        this.drawnEntities = 0;
    };
    PistonStage.prototype.move = function(x, y)
    {
        var drawn = 0;
        var lastX = this.stagePos.x;
        var lastY = this.stagePos.y;
        this.stagePos.x += x;
        this.stagePos.y += y;
        if(this.stagePos.x > (this.stagePos.maxScrollX * -1) && this.stagePos.x <= 0 && this.stagePos.y >= (this.stagePos.maxScrollY * -1) && this.stagePos.y <= 0)
        {
            for(var layer = 0; layer < this.layers.length; layer++)
            {
                this.layers[layer].move(x, y);
            }
        }
        else
        {
            this.stagePos.x = lastX;
            this.stagePos.y = lastY;
        }
    };
    PistonStage.prototype.updatePos = function(x, y)
    {
        
    };
    PistonStage.prototype.update = function()
    {        
        
    };
    PistonStage.prototype.getClickedEntity = function(x, y, layer)
    {
        typeof layer == 'undefined' ? layer = this.layers.length-1 : layer = layer;
        var entity = this.getEntityAtPos(x, y, layer);
        if(typeof entity !== 'undefined')
            return entity;
        else
            return false;
    };
    PistonStage.prototype.isColliding = function(entity1, entity2)
    {
        if(this.getEntityAtPos(entity1.pos.x, entity1.pos.y, entity2.layer) && this.getEntityAtPos(entity1.pos.x, entity1.pos.y, entity2.layer).index == entity2.index)
           return true;
        else
            return false;
    }