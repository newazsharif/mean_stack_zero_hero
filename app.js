(function()
{
	var express = require('express');
	var app = express();
	var path  = require('path');

	app.set('port',3000);

	app.use(express.static(path.join(__dirname,'public')))
	

	app.get('/',function(req,res)
	{
		console.log("got it man");
		res.sendFile('index.html');
	})

	app.get('/json',function(req,res)
	{
		console.log("got it man");
		res.json({'name' : 'newaz'}).status(404);
	})
	app.get('/file',function(req,res)
	{
		res.sendFile(path.join(__dirname,'app.js'));
	})

	app.listen(app.get('port'),function()
		{
			console.log("hello from port "+ app.get('port'));
		});
	console.log('test')
})()
