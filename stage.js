var PistonStage = Class.create({
	entities: [],
	totalEntities: 0,
    drawableEntities: [],
    drawnEntities: 0,
    clickableEntities: [],
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
        console.log(Util.objToString(size_));
        this.stagePos.maxScrollX = Math.abs(this.stageSize.pxWidth -this.stageSize.screenWidth);
        this.stagePos.maxScrollY = Math.abs(this.stageSize.pxHeight - this.stageSize.screenHeight);
        console.log(Util.objToString(this.stagePos));
        /*this.currentPos: {
            l: pos_.x,
            r: (size_.totalW + Math.abs(pos_.x)),
            t: pos_.x,
            b: size_.totalH + Math.abs(pos_.y)
        };*/
        /*this.currentPos.l = pos_.x;
        this.currentPos.r = size_.totalW + Math.abs(pos_.x);
        this.currentPos.t = pos_.y;
        this.currentPos.b = size_.totalH + Math.abs(pos_.y);*/
	},
	addChild: function(entity)
    {
        if(entity.isCamera == true)
        {
            this.cameraEntity = entity;

        }
        var newLength = this.entities.push(entity);
        this.totalEntities++;
        if(entity.clickable)
        {
            this.clickableEntities.push(entity);
        }
        if(entity.pos.x >= this.stagePos.x && entity.pos.x <= this.stagePos.x + this.stageSize.screenWidth)
        {
            //this.drawableEntities.push(entity);
        }
        else
        {
           
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
        this.cameraEntity = entity;
    },
    setup: function()
    {
        this.drawableEntities = [];
        for(var i = 0; i < this.entities.length; i++)
        {
            // why did i do this like this before?
            if(this.entities[i].pos.x >= -32 && this.entities[i].pos.x <= this.stageSize.screenWidth && this.entities[i].pos.y >= -32 && this.entities[i].pos.y <= this.stageSize.screenHeight)
            {
                this.drawableEntities.push(this.entities[i]);
                
            }
        }
    },
    move: function(x, y)
    {
        this.drawableEntities = [];
        var drawn = 0;
        var lastX = this.stagePos.x;
        var lastY = this.stagePos.y;
        this.updatePos(x * 2, y * 2); // TODO fix this, i have no idea why it has to be done like this
        if(this.stagePos.x > (this.stagePos.maxScrollX * -1) && this.stagePos.x <= 0 && this.stagePos.y >= (this.stagePos.maxScrollY * -1) && this.stagePos.y <= 0)
        {
            for(var i = 0; i < this.entities.length; i++)
            {
                this.entities[i].move(x, y);
                // why did i do this like this before?
                if(this.entities[i].pos.x >= -32 && this.entities[i].pos.x <= this.stageSize.screenWidth && this.entities[i].pos.y >= -32 && this.entities[i].pos.y <= this.stageSize.screenHeight)
                {
                    this.drawableEntities.push(this.entities[i]);
                    drawn++;
                }
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
        this.stagePos.x += x;
        this.stagePos.y += y;
    },
    update: function()
    {
        if(this.cameraEntity !== null)
            this.cameraEntity.update(this.stagePos, this.stageSize); // update the size with the position because maybe the window is resized during some period
        
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