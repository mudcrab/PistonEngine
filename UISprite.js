var UISprite = Class.create({
    
    image : null,
    position: null,
    alpha : 1,
    txt: null,
    uiCtx: null,
    initialize: function(ctx, src, x, y, w, h)
    {
        this.uiCtx = ctx;
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
        
        x = typeof x !== 'undefined' ? x : this.position.x;
        y = typeof y !== 'undefined' ? y : this.position.y;
        //this.uiCtx.globalAlpha = this.alpha;
        this.uiCtx.drawImage(this.image, x, y);
        //ctx.fillText(this.txt, x+16, y+16);
    },
    moveTo: function(x, y)
    {
        
    }
});