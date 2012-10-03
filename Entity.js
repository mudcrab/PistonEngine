var Entity = Class.create({
    x: null,
    y: null,
    properties: null,
    sprite: null,
    instanceName: null,
    initialize: function(x, y, name)
    {
        this.instanceName = name;
        this.x = x;
        this.y = y;
        this.sprite = new Sprite('assets/tiles/player.png', x, y, 32, 32);
        this.sprite.setPosition(x, y);
    },
    move: function()
    {
        
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
    }
});