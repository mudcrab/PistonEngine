var PistonDebug = Class.create({

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
		console.log(log)

	}

});
window.debug = new PistonDebug()