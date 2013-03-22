var PistonStage = Class.create({
    layers: [],
	entities: [],
	totalEntities: 0,
    drawableEntities: [],
    drawnEntities: 0,
    clickableEntities: [],
    toDraw: null,
    cameraEntity: null,
    stageSize: {
        stageWidth: 0,
        stageHeight: 0,
        screenWidth: 0,
        screenHeight: 0,
        pxWidth: 0,
        pxHeight: 0
    },
    stagePos: {
        x: 0,
        y: 0,
        maxScrollX: 0,
        maxScrollY: 0
    },
    currentPos: {
        l: 0,
        r: 0,
        t: 0,
        b: 0
    },
	initialize: function(pos_, size_) 
	{
        this.stageSize = size_;
        this.stagePos.x = pos_.x;
        this.stagePos.y = pos_.y;
        this.stagePos.maxScrollX = Math.abs(this.stageSize.pxWidth -this.stageSize.screenWidth);
        this.stagePos.maxScrollY = Math.abs(this.stageSize.pxHeight - this.stageSize.screenHeight);
        toDraw = new Array();
	},
    setSize: function(w, h)
    {
        this.stageSize.stageWidth = w;
        this.stageSize.stageHeight = h;
    },
    // TODO fix this
	addChild: function(entity, layerID)
    {
        this.layers[layerID].addChild(entity);
    },
    addChildren: function(entities, layerID, width, height)
    {
        this.layers[layerID].addChildren(entities, {w: width, h: height});
    },
    addChildAt: function(index, entity)
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
    },
    addLayer: function(id, tileSize) {
        this.layers.push(new PistonLayer(id, this.stageSize, tileSize));
    },
    deleteLayer: function(id) {

    },
    shiftLayer: function(id, to) {

    },
    hideLayer: function(id) {
        this.layers[id].hideLayer();
    },
    showLayer: function(id) {
        this.layers[id].showLayer();
    },
    removeChild: function(entity)
    {
        this.entities.splice(this.searchForEntity(entity), 1);
        this.totalEntities--;
    },
    removeChildAt: function(index)
    {
        this.entities.splice(index, 1);
        this.totalEntities--;
    },
    clearStage: function()
    {
        for(var i = 0; i < this.entities.length; i++)
        {
            this.entities.pop();
        }
        this.entities = [];
        console.log(this.entities);
    },
    getEntities: function()
    {
        return this.entities;
    },
    getEntity: function(entity)
    {
        return this.entities[this.searchForEntity(entity)];
    },
    getEntityAt: function(index)
    {
        return this.entities[index];
    },
    getEntityAtPos: function(x, y, layer)
    {
        typeof layer == 'undefined' ? layer = this.layers.length-1 : layer = layer;
        for(var i = layer; i >= 0; i--)
        {
            for(var entity = 0; entity < this.layers[i].layerEntities.length; entity++)
            {
                var minX = this.layers[i].layerEntities[entity].pos.x;
                var maxX = this.layers[i].layerEntities[entity].pos.x + this.layers[i].layerEntities[entity].size.w;
                var minY = this.layers[i].layerEntities[entity].pos.y;
                var maxY = this.layers[i].layerEntities[entity].pos.y + this.layers[i].layerEntities[entity].size.h;
                if(x >= minX && x <= maxX && y >= minY && y <= maxY)
                {
                    return this.layers[i].layerEntities[entity];
                }
            }
        }
    },
    searchForEntity: function(instanceName)
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
    },
    addCamera: function(entity)
    {
        this.cameraEntity = entity;
    },
    setup: function()
    {
        this.drawnEntities = 0;
    },
    move: function(x, y)
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
    },
    updatePos: function(x, y)
    {
        
    },
    update: function()
    {        
        
    },
    getClickedEntity: function(x, y)
    {
        var entity = this.getEntityAtPos(x, y);
        if(typeof entity !== 'undefined')
            return entity;
        else
            return false;
    },
    isColliding: function(entity1, entity2)
    {
        if(this.getEntityAtPos(entity1.pos.x, entity1.pos.y, entity2.layer) && this.getEntityAtPos(entity1.pos.x, entity1.pos.y, entity2.layer).index == entity2.index)
           return true;
        else
            return false;
    }
});