function Piston(canvas_id, w, h) {
    this.canvasID = canvas_id;
    this.graphics;
    this.canvas;
    this.context;
    this.init();
};
Piston.prototype.init = function()
{
    this.canvas = document.getElementById(this.canvasID);
    this.context = this.canvas.getContext('2d');
    this.context.width = 1440;
    this.context.height = 775;
};
Piston.prototype.draw = function()
{
    
};
Piston.prototype.update = function()
{
    var that = this;
    setInterval(function() {
        that.draw();
    }, 1000 / 60);
};