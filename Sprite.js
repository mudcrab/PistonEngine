var Sprite = Class.create(PistonEngine, {
    
    image : null,
    position: null,
    alpha : 1,
    txt: null,
    
    initialize: function(src, x, y, w, h, txt)
    {
        this.image = new Image();
        this.image.src = src;
        this.image.width = w;
        this.image.height = h;
        this.position = {
            x : x,
            y : y
        };
        this.txt = txt;
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
        //ctx.fillText(this.txt, x+16, y+16);
    },
    moveTo: function(x, y)
    {
        
    }
});