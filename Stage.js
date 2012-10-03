var Stage = Class.create(PistonEngine, {
    size: null,
    tileWidth: null,
    tileHeight: null,
    entities: [],
    initialize: function()
    {
        
    },
    addChild: function(entity)
    {
        var newLength = this.entities.push(entity);
        return newLength - 1; // eg element index
    },
    addChildAt: function(index, entity)
    {
        if(this.entities[index] == undefined)
        {
            entities[index] = entity;
        }
    },
    removeChild: function(entity)
    {
        this.entities.splice(this.searchForEntity(entity), 1);
    },
    removeChildAt: function(index)
    {
        this.entities.splice(index, 1);
    },
    render: function()
    {
        for(var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].render();
        }
    },
    move: function(x, y)
    {
        
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