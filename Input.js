var Input = Class.create(PistonEngine, {
    
    upKeys: [],
    downKeys: [],
    codeToString: null,
    leftMousePressed: false,
    leftMouseUp: false,
    mouseXY : {},
    
    initialize: function()
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
            that.mouseXY.x = event.offsetX;
            that.mouseXY.y = event.offsetY;
        });
        window.addEventListener('mouseup', function(event) {
            that.leftMousePressed = false;
            that.mouseXY.x = event.offsetX;
            that.mouseXY.y = event.offsetY;
            that.leftMouseUp = true;
        });
    },
    getMouseX: function()
    {
        
    },
    getMouseY: function()
    {
        
    },
    getMouse: function()
    {
        
    },
    keyDown: function(key)
    {
        
        if(this.downKeys[key])
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    keyUp: function(key)
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
    },
    leftMousePress: function()
    {
        var obj = {
            pressed : this.leftMousePressed,
            x : this.mouseXY.x,
            y : this.mouseXY.y
        }
        return obj;
    },
    leftMouseClick: function()
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
    }
});