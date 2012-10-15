var Entity = Class.create({
    x: null,
    y: null,
    width: null,
    height: null,
    properties: {},
    sprite: null,
    instanceName: null,
    scrollable: false,
    collidable: false,
    clickable: false,
    img: null,
    initialize: function(img, x, y, w, h, scrollable, name)
    {
        this.instanceName = name;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.sprite = new Sprite('assets/' + img, x, y, w, h, name);
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