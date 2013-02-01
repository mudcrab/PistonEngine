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
	addChild: function(entity, layerID)
    {
        this.layers[layerID].addChild(entity);
        var newLength = this.entities.push(entity);
        this.totalEntities++;
        if(entity.clickable)
        {
            this.clickableEntities.push(entity);
        }
        return newLength - 1; // eg element index
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
    addLayer: function(id) {
        this.layers.push(new PistonLayer(id, this.stageSize));
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
    getEntityAtPos: function(x, y)
    {

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
        //this.drawableEntities = this.entities;
        this.toDraw = [];
        for(var layer = 0; layer < this.layers.length; layer++)
        {
            this.layers[layer].initDrawables();
            this.toDraw.push(this.layers[layer].drawnLayerEntities);
        }
        /*for(var i = 0; i < this.entities.length; i++)
        {
            // why did i do this like this before?
            if(this.entities[i].pos.x >= -32 && this.entities[i].pos.x <= this.stageSize.screenWidth && this.entities[i].pos.y >= -32 && this.entities[i].pos.y <= this.stageSize.screenHeight)
            {
                this.drawableEntities.push(this.entities[i]);
                
            }
        }*/
    },
    move: function(x, y)
    {
        this.drawableEntities = [];
        var drawn = 0;
        var lastX = this.stagePos.x;
        var lastY = this.stagePos.y;
        this.stagePos.x += x;
        this.stagePos.y += y;
        if(this.stagePos.x > (this.stagePos.maxScrollX * -1) && this.stagePos.x <= 0 && this.stagePos.y >= (this.stagePos.maxScrollY * -1) && this.stagePos.y <= 0)
        {
            /*for(var i = 0; i < this.entities.length; i++)
            {
                this.entities[i].move(x, y);
                // why did i do this like this before?
                if(this.entities[i].pos.x >= -32 && this.entities[i].pos.x <= this.stageSize.screenWidth && this.entities[i].pos.y >= -32 && this.entities[i].pos.y <= this.stageSize.screenHeight)
                {
                    this.drawableEntities.push(this.entities[i]);
                    drawn++;
                }
            }*/
            this.toDraw = [];
            for(var layer = 0; layer < this.layers.length; layer++)
            {
                this.layers[layer].move(x, y);
                this.toDraw.push(this.layers[layer].drawnLayerEntities);
            }
        }
        else
        {
            this.stagePos.x = lastX;
            this.stagePos.y = lastY;
        }
        this.drawnEntities = drawn;
    },
    updatePos: function(x, y)
    {
        
    },
    update: function()
    {
        if(this.cameraEntity !== null)
            this.cameraEntity.update(this.stagePos, this.stageSize); // update the size with the position because maybe the window is resized during some period
        for(var layer = 0; layer < this.layers.length; layer++)
        {
            this.layers[layer].update();
        }
    },
    setDrawable: function()
    {
        var drawn = 0;
        var toDraw = [];
        for(var i = 0; i < this.entities.length; i++)
        {

        }
    }
});