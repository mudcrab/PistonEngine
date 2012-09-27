function Piston(canvas_id, w, h) {
    this.canvas = {
        id : canvas_id,
        c : null,
        ctx : null,
        width : w,
        height : h
    };
    this.mainMethod;
    this.drawArray = null;
};
Piston.prototype.start = function(class_)
{
    this.canvas.c = document.getElementById(this.canvas.id);
    this.canvas.ctx = this.canvas.c.getContext('2d');
    this.canvas.ctx.width = this.canvas.width;
    this.canvas.ctx.height = this.canvas.height;
    this.mainMethod = new class_();
    this.gameLoop();
};
Piston.prototype.draw = function()
{
    // clear canvas
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mainMethod.draw();
};
Piston.prototype.test = function()
{
    console.log('testpiston');
};
Piston.prototype.update = function()
{
    this.mainMethod.update();
};
Piston.prototype.gameLoop = function()
{
    var that = this;
    setInterval(function() {
        that.update();
    }, 1000 / 60);
};
Piston.Sprite = function Sprite(img, x, y)
{
    this.image = new Image();
    this.image.src = img;
    this.image.x = x;
    this.image.y = y;
    return this.image;
};
Piston.Sprite.prototype.test = function()
{
    console.log('test');
}
Piston.Sprite.prototype.draw = function()
{
    this.canvas.ctx.drawImage(this.image);
};