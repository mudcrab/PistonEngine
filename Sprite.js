var Sprite = Class.create(PistonEngine, {
    
    image : null,
    position: null,
    alpha : 1,
    
    initialize: function(src, x, y, w, h)
    {
        this.image = new Image();
        this.image.src = src;
        this.image.width = w;
        this.image.height = h;
        this.position = {
            x : x,
            y : y
        };
    },
    setPosition: function(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    },
    setX: function(x)
    {
        this.position.x = x;
    },
    setY: function(y)
    {
        this.position.y = y;
    },
    getPosition: function()
    {
        return this.position;
    },
    render: function(x, y)
    {
        //console.log(x);
        x = typeof x !== 'undefined' ? x : this.position.x;
        y = typeof y !== 'undefined' ? y : this.position.y;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, x, y);
    },
    moveTo: function(x, y)
    {
        
    }
});