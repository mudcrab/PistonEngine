var Sprite = Class.create(PistonEngine, {
    
    sprite : null,
    position: null,
    
    initialize: function(src, _x, _y, w, h)
    {
        sprite = new Image();
        sprite.src = src;
        sprite.width = w;
        sprite.height = h;
        position = {
            x : _x,
            y : _y
        };
    },
    setPosition: function(_x, _y)
    {
        position.x = _x;
        position.y = _y;
    },
    getPosition: function()
    {
        return position;
    },
    render: function(context)
    {
        ctx.drawImage(sprite, position.x, position.y);
    }
});