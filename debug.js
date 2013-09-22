var PistonDebug = function() {

	buffer = [];
	bufferSize = 500;
	enabled = false;
	mstick = 0;
	barVisible = false;
	this.initialize();
};

	PistonDebug.prototype.initialize = function() {
		var barHTML = '<div id="debug_bar">\
			<div class="db_item" id="db_fps">FPS 60</div>\
			<div class="db_item" id="db_time">TIME 60</div>\
			<div class="db_item" id="db_drawn" title="Total drawn entities current frame">DRAWN 60</div>\
			<div class="db_item" id="db_total" title="Total entities added to stage">TOTAL 60</div>\
			<div class="db_item" id="db_log"></div>\
			<div class="dbclear"></div>\
		</div>';
		$(document.body).insert(barHTML);
		this.hideDebugBar();
	};
	PistonDebug.prototype.log = function() {
		var date = new Date();
		var log = '[ ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ] ';
		for(var i = 0; i < arguments.length; i++)
		{
			if(typeof arguments[i] == 'object')
				arguments[i] = JSON.stringify(arguments[i]);

			if(i == 0 || i == arguments.length)
				log += arguments[i];
			else
				log += ', ' + arguments[i];
		}
		if(this.buffer.length < this.bufferSize)
		{
			this.buffer.push(log);
		}
		else
		{
			this.buffer.pop();
			this.buffer.push(log);
		}
		if(this.enabled)
			console.log(log)

	};
	PistonDebug.prototype.clear = function()
	{
		this.buffer = [];
		console.clear();
	};
	PistonDebug.prototype.showBuffer = function()
	{
		for(var i = 0; i < this.buffer.length; i++)
		{
			console.log(i+1 + '. ' + this.buffer[i]);
		}
		if(this.buffer.length === 0)
			console.log('Buffer empty');
	};
	PistonDebug.prototype.showDebugBar = function()
	{
		$('debug_bar').show();
		this.barVisible = true;
	};
	PistonDebug.prototype.hideDebugBar = function()
	{
		$('debug_bar').hide();
		this.barVisible = false;
	};
	PistonDebug.prototype.setBarPosition = function(position) // top or bottom
	{

	};
	PistonDebug.prototype.update = function()
	{
		if(this.barVisible)
		{
			$('db_fps').update(piston.core.fps + " FPS");
			$('db_total').update(piston.core.totalEntities + " TOTAL");
			$('db_drawn').update(piston.core.totalDrawnEntities + " DRAWN");
			if(this.mstick == 60)
			{
				$('db_time').update(piston.core.delta * 1000 + " MS");
				this.mstick = 0;
			}
			else
				this.mstick++;
		}
	}
piston.debug = new PistonDebug()