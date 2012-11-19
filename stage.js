var PistonStage = Class.create({
	entities: [],
	totalEntities: 0,
    drawnEntities: 0,
    clickableEntities: [],
    cameraEntity: null,
    stageSize: {
        width: 0,
        height: 0,
    },
    stagePos: {
        x: 0,
        y: 0
    },
	initialize: function(pos_, size_) 
	{
		this.stagePos = pos_;
        this.stageSize = size_;
	},
	addChild: function(entity)
    {
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
    /*
        changes camera's position in the array, so it's always on top
    */
    changeCamerLevel: function(entity, newIndex)
    {
        
    },
    arrayMove: function(from, to)
    {

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

    },
    move: function(x, y)
    {
        for(var i = 0; i < this.entities.length; i++)
        {
            this.entities[i].move(x, y);        
        }
    }
});