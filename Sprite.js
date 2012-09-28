var Sprite = Class.create(PistonEngine, {
    
    sprite : null,
    position: null,
    alpha : 1,
    
    initialize: function(src, x, y, w, h)
    {
        sprite = new Image();
        sprite.src = src;
        sprite.width = w;
        sprite.height = h;
        position = {
            x : x,
            y : y
        };
    },
    setPosition: function(x, y)
    {
        position.x = x;
        position.y = y;
    },
    setX: function(x)
    {
        position.x = x;
    },
    setY: function(y)
    {
        positoin.y = y;
    },
    getPosition: function()
    {
        return position;
    },
    render: function(x, y)
    {
        x = typeof x !== 'undefined' ? x : position.x;
        y = typeof y !== 'undefined' ? y : position.y;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(sprite, x, y);
    },
    moveTo: function(x, y)
    {
        
    }
});