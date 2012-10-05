var Entity = Class.create({
    x: null,
    y: null,
    properties: null,
    sprite: null,
    instanceName: null,
    scrollable: false,
    img: null,
    initialize: function(img, x, y, scrollable, name)
    {
        this.instanceName = name;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite('assets/tiles/' + img, x, y, 32, 32);
        this.sprite.setPosition(x, y);
        this.scrollable = scrollable;
    },
    move: function(x, y)
    {
        this.x += x;
        this.y += y;
    },
    moveTo: function(x, y)
    {
        //this.sprite.setPosition(this.x, this.y);
        this.x = x;
        this.y = y;
    },
    update: function()
    {
        
    },
    render: function()
    {
        this.sprite.setPosition(this.x, this.y);
        this.sprite.render();
    },
    drawRect: function()
    {
        
    }
});