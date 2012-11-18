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
        this.cameraEntity = new PistonEntity({x: 0, y: 0}, {w: 0, h: 0}, 'player');
        this.cameraEntity.rectSize = {w: 500, h: 300};
        this.cameraEntity.rectPos = {x: Math.floor($('gameDisplay').getWidth() / 2 - 250), y: Math.floor($('gameDisplay').getHeight() / 2 - 150)};
        this.cameraEntity.rectVisible = true;
        this.imgVisible = false;
        this.addChild(1000, this.cameraEntity)
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
    changeChildPos: function(entity, newIndex)
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