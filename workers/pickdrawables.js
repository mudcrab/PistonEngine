/*
	WebWorker
*/
self.addEventListener('message', function(e) {
	var array = JSON.parse(e.data);
	var ret = [];
	for(var i = 0; i < array.length; i++)
	{
		if(array[i].pos.x >= -32 && array[i].pos.x <= layerSize.layerSize.screenWidth && array[i].pos.y >= -32 && array[i].pos.y <= layerSize.layerSize.screenHeight)
		{
			ret.push(array[i]);
		}
	}
	self.postMessage(JSON.stringify({ entities: array }));
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