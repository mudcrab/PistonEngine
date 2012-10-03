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
    removeChild: function(entity)
    {
        
    },
    removeChildAt: function(index)
    {
        
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
    getEntity: function(index)
    {
        return this.entities[index];
    }
});