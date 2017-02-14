var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.getAllHotels = function(req,res)
{
	
	var offset = 0;
	var count = 5;


	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset,10)
	};

	if (req.query && req.query.count) {
		count = parseInt(req.query.count,10)
	};

	Hotel.find()
	.skip(offset)
	.limit(count).exec(function(err,hotels)
	{
		console.log('offset '+offset);
		console.log('count '+count);
		console.log(hotels.length);
		res.json(hotels);
	})
	
}

module.exports.getHotelOne = function(req,res)
{

	var hotelId = req.params.hotelId
	var doc = Hotel.findById(hotelId)
	.exec(function(err,doc)
		{
			res.status(200).json(doc);
		})
		

	
}

module.exports.hotelsAddone = function(req,res)
{
	var newHotel = req.body;
	newHotel.stars = parseInt(newHotel.stars,10);

	var db = dbConn.get();
	var collection = db.collection('hotels');

	collection.insertOne(newHotel,function(err,doc)
	{
		res.status(201).json(doc.ops);
	})
	res.json(newHotel);
}

