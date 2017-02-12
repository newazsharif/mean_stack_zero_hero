var hotelData = require('../data/hotel-data.json');


module.exports.getAllHotels = function(req,res)
{
	console.log("got it man");

	var offset = 0;
	var count = 6;


	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset,10)
	};

	if (req.query && req.query.count) {
		count = parseInt(req.query.count,10)
	};
	console.log(req.query.offset);
	console.log(req.query.count);
	var returnData = hotelData.slice(offset, offset+count);
	res.json(returnData).status(200);
}

module.exports.getHotelOne = function(req,res)
{
	var thisHotel = req.params.hotelId
	var result = hotelData[thisHotel];
	res.json(result);
}

module.exports.addNewHotel = function(req,res)
{
	console.log(req.body);
	res.json(req.body);
}