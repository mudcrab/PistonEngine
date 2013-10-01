var PistonInput = function() {
	
	this.upKeys = [];
	this.downKeys = [];
	this.codeToString = null;
	this.leftMouseHandler = {
		click: false,
		press: false,
		up: false,
		down: false,
		element: "none"
	};
	this.mouseXY = {};
	this.initialize();
};
	
PistonInput.prototype.initialize = function()
{
	this.codeToString = new Array();
	var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	for(var i = 0; letters[i]; i++)     { this.codeToString[65+i] = letters[i] }
		this.codeToString[8] = "backspace"
	this.codeToString[9] = "tab"
	this.codeToString[13] = "enter"
	this.codeToString[16] = "shift"
	this.codeToString[17] = "ctrl"
	this.codeToString[18] = "alt"
	this.codeToString[19] = "pause"
	this.codeToString[20] = "capslock"
	this.codeToString[27] = "esc"
	this.codeToString[32] = "space"
	this.codeToString[33] = "pageup"
	this.codeToString[34] = "pagedown"
	this.codeToString[35] = "end"
	this.codeToString[36] = "home"
	this.codeToString[37] = "left"
	this.codeToString[38] = "up"
	this.codeToString[39] = "right"
	this.codeToString[40] = "down" 
	this.codeToString[45] = "insert"
	this.codeToString[46] = "delete"
	this.codeToString[91] = "leftwindowkey"
	this.codeToString[92] = "rightwindowkey"
	this.codeToString[93] = "selectkey"
	this.codeToString[106] = "multiply"
	this.codeToString[107] = "add"
	this.codeToString[109] = "subtract"
	this.codeToString[110] = "decimalpoint"
	this.codeToString[111] = "divide"
	this.codeToString[144] = "numlock"
	this.codeToString[145] = "scrollock"
	this.codeToString[186] = "semicolon"
	this.codeToString[187] = "equalsign"
	this.codeToString[188] = "comma"
	this.codeToString[189] = "dash"
	this.codeToString[190] = "period"
	this.codeToString[191] = "forwardslash"
	this.codeToString[192] = "graveaccent"
	this.codeToString[219] = "openbracket"
	this.codeToString[220] = "backslash"
	this.codeToString[221] = "closebracket"
	this.codeToString[222] = "singlequote"
	var that = this;
	window.addEventListener('keydown', function(event) {
		that.downKeys[that.codeToString[event.keyCode]] = true;
	});
	window.addEventListener('keyup', function(event) {
		that.downKeys[that.codeToString[event.keyCode]] = false;
		that.upKeys[that.codeToString[event.keyCode]] = true;
	});
	window.addEventListener('mousedown', function(event) {
		that.leftMousePressed = true;
		that.mouseXY.x = event.clientX;
		that.mouseXY.y = event.clientY;
		that.leftMouseHandler = {
			click: true,
			press: false,
			up: false,
			down: false,
			element: event.target.id
		};
	});
	window.addEventListener('mouseup', function(event) {
		event.stopPropagation();
		that.leftMousePressed = false;
		that.mouseXY.x = event.clientX;
		that.mouseXY.y = event.clientY;
		that.leftMouseUp = true;
		that.leftMouseHandler = {
			click: false,
			press: false,
			up: true,
			down: false,
			element: event.target.id
		};
	});
};
PistonInput.prototype.getMousePos = function()
{
	return this.mouseXY;
};
PistonInput.prototype.keyDown = function(key)
{

	if(this.downKeys[key])
	{
		return true;
	}
	else
	{
		return false;
	}
};
PistonInput.prototype.keyUp = function(key)
{
	if(this.upKeys[key])
	{
		this.upKeys[key] = false;
		return true;
	}
	else
	{
		return false;
	}
};
PistonInput.prototype.leftMousePress = function(element)
{
	if(this.leftMouseHandler.element == element && this.leftMouseHandler.press == true)
	{
		this.leftMouseHandler.press = false;
		this.leftMouseHandler.element = "none";
		return true;
	}
	else
		return false;
};
PistonInput.prototype.leftMouseClick = function(element)
{
	if(this.leftMouseHandler.element == element && this.leftMouseHandler.click == true)
	{
		this.leftMouseHandler.click = false;
		this.leftMouseHandler.element = "none";
		return true;
	}
	else
		return false;
};
PistonInput.prototype.leftMouseDown = function(element)
{
	if(this.leftMouseHandler.element == element && this.leftMouseHandler.down == true)
	{
		this.leftMouseHandler.down = false;
		this.leftMouseHandler.element = "none";
		return true;
	}
	else
		return false;
};
PistonInput.prototype.leftMouseUp = function(element)
{
	if(this.leftMouseHandler.element == element && this.leftMouseHandler.up == true)
	{
		this.leftMouseHandler.up = false;
		this.leftMouseHandler.element = "none";
		return true;
	}
	else
		return false;
};
	/*leftMousePress = function()
	{
		var obj = {
			pressed : this.leftMousePressed,
			x : this.mouseXY.x,
			y : this.mouseXY.y
		}
		return obj;
	};
	leftMouseClick = function()
	{
		if(this.leftMouseUp)
		{
			var obj = {
				clicked : true,
				x : this.mouseXY.x,
				y : this.mouseXY.y
			};
			this.mouseXY.x = null;
			this.mouseXY.y = null;
			this.leftMouseUp = false;
			return obj;
		}
		else
		{
			return false;
		}
	}*/