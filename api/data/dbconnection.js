var MongoClient = require('mongodb').MongoClient;

var _connection = null;
var dburl = 'mongodb://localhost:27017/meanHotel';

var open = function()
{
	MongoClient.connect(dburl,function(err,db)
	{
		if (err) {
			console.log('cannot connect to database');
			return;
		};
		_connection = db;
		console.log('database connected',db);
	});
};

var get = function()
{
	return _connection;
}
module.exports = 
{
	open : open,
	get : get
};