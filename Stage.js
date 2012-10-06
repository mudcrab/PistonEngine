var Stage = Class.create(PistonEngine, {
    size: null,
    tileWidth: null,
    tileHeight: null,
    entities: [],
    totalEntities: 0,
    drawnEntities: 0,
    maxHeight: 23,
    maxElement: 1079,
    currentStart: 0,
    stageX: 0,
    stageY: 0,
    stageWidth: 0,
    stageHeight: 0,
    cameraWidth: 0,
    cameraHeight: 0,
    viewPort: [],
    initialize: function()
    {
        this.cameraWidth = 1440;
        this.cameraHeight = 745+32;
    },
    setSize: function(x, y)
    {
        this.stageWidth = x;
        this.stageHeight = y;
    },
    addChild: function(entity)
    {
        var newLength = this.entities.push(entity);
        this.totalEntities++;
        return newLength - 1; // eg element index
    },
    addChildAt: function(index, entity)
    {
        if(this.entities[index] == undefined)
        {
            entities[index] = entity;
            this.totalEntities++;
        }
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
    render: function()
    {
        // todo limit by width / height 45 x 24                //this.entities[i].render();
        var drawn = 0;
        for(var i = this.currentStart; i < this.entities.length; i++)
        {
            if(this.entities[i].x >= -32 && this.entities[i].x <= 1472 && this.entities[i].y >= -32 && this.entities[i].y <= 777)
            {
                this.entities[i].render();
                drawn++;
            }
        }
        if(drawn < this.drawnEntities || drawn > this.drawnEntities)
        {
            this.drawnEntities = drawn;
        }
        //console.log(this.maxHeight);
    },
    move: function(x, y)
    {
        var _x = 0;
        var _y = 0;
        var offsetX = this.stageWidth - this.cameraWidth;
        var offsetY = this.stageHeight - this.cameraHeight;
        var lastX = this.stageX;
        var lastY = this.stageY;
        this.stageX += x;
        this.stageY += y;
        if(this.stageX > -offsetX && this.stageX <= 0 && this.stageY > -offsetY && this.stageY <= 0)
        {
            for(var i = 0; i < this.entities.length; i++)
            {
                if(this.entities[i].scrollable)
                {
                    this.entities[i].move(x, y);
                }
            }
        }
        else
        {
            this.stageX = lastX;
            this.stageY = lastY;
        }
        //console.log(offsetX, offsetY, this.stageX, this.stageY);
    },
    moveTo: function(x, y)
    {
        
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
    }
});