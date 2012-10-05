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
    viewPort: [],
    initialize: function()
    {
        
    },
    setSize: function(w, h)
    {
        
        for(var i = 0; i < w; i++)
        {
            for(var j = 0; j < h; j++)
            {
                var obj = {
                    x: Math.floor(i * 32),
                    y: Math.floor(j * 32)
                }
                this.viewPort.push(obj)
            }
        }
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
        for(var i = 0; i < this.entities.length; i++)
        {
            if(this.entities[i].scrollable)
            {
                this.entities[i].move(x, y);
            }
        }
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