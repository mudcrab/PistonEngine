var PistonStage = Class.create(PistonEngine, {
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
    setSize: function(w, h, tileW, tileH, viewPortW, viewPortH)
    {
        this.stageWidth = w;
        this.stageHeight = h;
        this.tileWidth = tileW;
        this.tileHeight = tileH;
        this.cameraWidth += tileW;
        this.cameraHeight += tileH;
        this.boundingBox = {
            top: viewPortH * 0.1,
            bottom: viewPortH * 0.9,
            left: viewPortW * 0.1,
            right: viewPortW * 0.9
        };
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
    },
    move: function(x, y)
    {
        /*var _x = 0;
        var _y = 0;
        this.offsetX = this.stageWidth - this.cameraWidth;
        this.offsetY = this.stageHeight - this.cameraHeight;
        var lastX = this.stageX;
        var lastY = this.stageY;
        this.stageX += x;
        this.stageY += y;
        if(this.stageX > this.offsetX && this.stageX <= 0 && this.stageY >= this.offsetY && this.stageY <= 0)
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
        }*/
        //console.log('oX: ' + this.offsetX, 'oY: ' + this.offsetY, 'sX: ' +this.stageX, 'sY: ' + this.stageY, this.stageHeight, this.stageWidth, this.cameraHeight, this.cameraWidth);
    },
    moveStage: function(x, y)
    {
    	/*for(var i = 0; i < this.entities.length; i++)
            {
                if(this.entities[i].scrollable)
                {
                    this.entities[i].move(x, y);
                }
            }
            */
    },
    /* taken from http://stackoverflow.com/a/8017599 */
    isColliding: function(entity1, entity2)
    {
        var bottom1, bottom2, left1, left2, right1, right2, top1, top2, x1 = entity1.x, y1 = entity1.y, size1 = Math.floor(entity1.width / 2), x2 = entity2.x, y2 = entity2.y, size2 = Math.floor(entity2.width / 2);
        left1 = x1 - size1;
        right1 = x1 + size1;
        top1 = y1 - size1;
        bottom1 = y1 + size1;
        left2 = x2 - size2;
        right2 = x2 + size2;
        top2 = y2 - size2;
        bottom2 = y2 + size2;
        return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
    },
    renderableObjects: function()
    {
    	/*if(this.cameraEntity.x >= this.boundingBox.right)
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
            if(Math.abs(this.stageY - 1) !== this.cameraHeight - this.stageHeight)
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
        }*/
        var drawn = 0;
        var toDraw = [];
        for(var i = 0; i < this.entities.length; i++)
        {
            if(this.entities[i].x >= -this.tileWidth && this.entities[i].x <= this.cameraWidth && this.entities[i].y >= -this.tileHeight && this.entities[i].y <= this.cameraHeight)
            {
                //this.entities[i].render();
                toDraw.push(this.entities[i]);
                drawn++;
            }
        }
        if(drawn < this.drawnEntities || drawn > this.drawnEntities)
        {
            this.drawnEntities = drawn;
        }
        return toDraw;
    }
});