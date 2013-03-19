var PistonDebug = Class.create({

	buffer: [],
	bufferSize: 500,
	enabled: true,

	initialize: function() {

	},
	log: function() {
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

	},
	clear: function()
	{
		this.buffer = [];
		console.clear();
	},
	showBuffer: function()
	{
		for(var i = 0; i < this.buffer.length; i++)
		{
			console.log(i+1 + '. ' + this.buffer[i]);
		}
		if(this.buffer.length === 0)
			console.log('Buffer empty');
	}

});
piston.debug = new PistonDebug()