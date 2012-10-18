var Stage = Class.create(PistonEngine, {
    size: null,
    tileWidth: null,
    tileHeight: null,
    entities: [],
    clickableEntities: [],
    totalEntities: 0,
    drawnEntities: 0,
    stageX: 0,
    stageY: 0,
    stageWidth: 0,
    stageHeight: 0,
    cameraWidth: 0,
    cameraHeight: 0,
    offsetX: 0,
    offsetY: 0,
    cameraEntity: null,
    boundingBox: {},
    initialize: function(cWidth, cHeight)
    {
        this.cameraWidth = cWidth;
        this.cameraHeight = cHeight;
        
    },
    setSize: function(w, h, tileW, tileH)
    {
        this.stageWidth = w;
        this.stageHeight = h;
        this.tileWidth = tileW;
        this.tileHeight = tileH;
        this.cameraWidth += tileW;
        this.cameraHeight += tileH;
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
        if(this.cameraEntity.x >= this.boundingBox.right)
        {
            var off = this.cameraWidth - this.stageWidth;
            if(this.stageX - 2 !== off && this.stageX - 3 !== off)
            {
                this.cameraEntity.x = this.boundingBox.right;
                this.move(-this.cameraEntity.properties.xspeed, 0);
            }
            else
            {
                if(this.cameraEntity.x >= this.cameraWidth - this.tileWidth * 2)
                {
                    this.cameraEntity.x = this.cameraWidth - this.tileHeight * 2;
                }
            }
        }
        if(this.cameraEntity.x <= this.boundingBox.left)
        {
            if(this.stageX !== 0)
            {
                this.cameraEntity.x = this.boundingBox.left;
                this.move(this.cameraEntity.properties.xspeed, 0);
            }
            else
            {
                if(this.cameraEntity.x <= 0)
                {
                    this.cameraEntity.x = 0;
                }
            }
        }
        if(this.cameraEntity.y <= this.boundingBox.top)
        {
            if(this.stageY !== 0)
            {
                this.cameraEntity.y = this.boundingBox.top;
                this.move(0, this.cameraEntity.properties.yspeed);
            }
            else
            {
                if(this.cameraEntity.y <= 0)
                {
                    this.cameraEntity.y = 0;
                }
            }
        }
        if(this.cameraEntity.y >= this.boundingBox.bottom)
        {
            if(this.stageY - 3 !== this.cameraHeight - this.stageHeight)
            {
                this.cameraEntity.y = this.boundingBox.bottom;
                this.move(0, -this.cameraEntity.properties.yspeed);
            }
            else
            {
                if(this.cameraEntity.y >= this.cameraHeight - this.tileHeight * 2)
                {
                    this.cameraEntity.y = this.cameraHeight - this.tileHeight * 2;
                }
            }
        }
        var drawn = 0;
        for(var i = 0; i < this.entities.length; i++)
        {
            if(this.entities[i].x >= -this.tileWidth && this.entities[i].x <= this.cameraWidth && this.entities[i].y >= -this.tileHeight && this.entities[i].y <= this.cameraHeight)
            {
                this.entities[i].render();
                drawn++;
            }
        }
        if(drawn < this.drawnEntities || drawn > this.drawnEntities)
        {
            this.drawnEntities = drawn;
        }
    },
    move: function(x, y)
    {
        
        var _x = 0;
        var _y = 0;
        this.offsetX = this.stageWidth - this.cameraWidth;
        this.offsetY = this.stageHeight - this.cameraHeight;
        var lastX = this.stageX;
        var lastY = this.stageY;
        this.stageX += x;
        this.stageY += y;
        
        if(this.stageX > -this.offsetX && this.stageX <= 0 && this.stageY >= -this.offsetY && this.stageY <= 0)
        {
            for(var i = 0; i < this.entities.length; i++)
            {
                if(this.entities[i].scrollable)
                {
                    var originalX = this.entities[i].x;
                    var originalY = this.entities[i].y;
                    if(originalX != (this.entities[i].x + x) || originalY != (this.entities[i].y + y))
                    {
                        this.redrawObjects.push({
                            x: originalX,
                            y: originalY,
                            width: this.entities[i].width,
                            height: this.entities[i].height
                        });
                    }
                    this.entities[i].move(x, y);
                }
            }
        }
        else
        {
            this.stageX = lastX;
            this.stageY = lastY;
        }
        //console.log('oX: ' + this.offsetX, 'oY: ' + this.offsetY, 'sX: ' +this.stageX, 'sY: ' + this.stageY, this.stageHeight, this.stageWidth, this.cameraHeight, this.cameraWidth);
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
    getClickableEntities: function()
    {
        return this.clickableEntities;
    },
    isClicked: function(x, y)
    {
        var entities = this.clickableEntities;
        for(var i = 0; i < entities.length; i++)
        {
            var minX = entities[i].x;
            var maxX = entities[i].x + entities[i].width;
            var minY = entities[i].y;
            var maxY = entities[i].y + entities[i].height;
            if(x >= minX && x <= maxX && y >= minY && y <= maxY)
            {
                return entities[i];
            }
        }
    }
});