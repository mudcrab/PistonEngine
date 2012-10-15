var UIEntity = Class.create({
    x: null,
    y: null,
    properties: {},
    sprite: null,
    instanceName: null,
    clickable: false,
    collidable: false,
    img: null,
    initialize: function(ctx, img, x, y, w, h, clickable, name)
    {
        this.instanceName = name;
        this.x = x;
        this.y = y;
        this.sprite = new UISprite(ctx, 'assets/ui/' + img, x, y, w, h);
        this.sprite.setPosition(x, y);
        this.clickable = clickable;
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