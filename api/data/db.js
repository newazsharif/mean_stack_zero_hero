var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/meanHotel';

mongoose.connect(dburl);

mongoose.connection.on('connected',function()
{
	console.log('mongoose is connected to '+dburl);
})

mongoose.connection.on('disconnected',function()
{
	console.log('mongoose is disconnected');
})

mongoose.connection.on('error',function(err)
{
	console.log('connection error occured '+err);
})

require('./hotels.model.js');