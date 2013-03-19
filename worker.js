/*
	WebWorker
*/
self.addEventListener('message', function(e) {
	var data = JSON.parse(e.data);
	var ret = [];
	switch(data.action)
	{
		case 'findElements':
			
			for(var c = 0; c < data.conditions.length; c++)
			{
				if( data.array[data.conditions[c]] == data.conditions[c].value )
				{
					ret.push(data.array[i])
				}
			}
			self.postMessage(JSON.stringify(ret));

		break;	
	}
});
/*self.addEventListener('message', function(e) {

	var data = JSON.parse(e.data);
	self.postMessage(data);
	var ret = [];
	for(var i = 0; i < data.arr.length; i++)
	{
		if(typeof data.arr[i].f !== "undefined" && data.arr[i].f == "heh")
		{
			ret.push(data.arr[i]);
		}
	}
	self.postMessage(JSON.stringify(ret));

}, false);*/