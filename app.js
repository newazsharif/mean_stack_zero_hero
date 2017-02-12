(function()
{

	//some comment added for nodemon
	var express = require('express');
	var app = express();
	var path  = require('path');
	var bodyParser = require('body-parser');
	var routes = require('./api/route/index.js');
	app.set('port',3000);

	app.use(function(req,res,next)
	{
		console.log(req.method,req.url);
		next();
	})
	app.use(express.static(path.join(__dirname,'public')))
	app.use(bodyParser.urlencoded({"extended" : "false"}));
	app.use('/api',routes);
	
	

	
	app.get('/file',function(req,res)
	{
		res.sendFile(path.join(__dirname,'app.js'));
	})

	app.listen(app.get('port'),function()
		{
			console.log("hello from port "+ app.get('port'));
		});
	console.log('test')
})();
