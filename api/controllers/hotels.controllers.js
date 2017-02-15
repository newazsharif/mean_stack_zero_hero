var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');



var runGeoQuery = function(req,res)

{
	var lat = parseFloat(req.query.lat);
	var lng = parseFloat(req.query.lng);

	var point = {
		type : 'Point',
		coordinates : [lng,lat]
	};

	var geoOptions = {
		spherical :true,
		maxDistance : 2000,
		num : 5
	};

	Hotel.geoNear(point,geoOptions,function(err,results,stats)
	{
		res.json(results);
	})


}
module.exports.getAllHotels = function(req,res)
{
	

	if(req.query && req.query.lat && req.query.lng)
	{
		
		runGeoQuery(req,res);
		return; 
	}

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	


	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset,10)
	};

	if (req.query && req.query.count) {
		count = parseInt(req.query.count,10)
	};

	if(count > maxCount)
	{
		res.status(500).
		json({
			"message" : "Maximun data range "+ maxCount + " is exceed"
		})
		return;
	}

	if (isNaN(offset) || isNaN(count)) {
		res
		.status(400)
		.json({
			"message" : "Offset and Count should be numbers"
		});
		return;
	};
	Hotel.find()
	.skip(offset)
	.limit(count).exec(function(err,hotels)
	{
		if(err)
		{
			res.status(500).json(err);
			return
		}
		else
		{
			res.json(hotels);
			return;
		}
		
	})
	
}

module.exports.getHotelOne = function(req,res)
{

	var hotelId = req.params.hotelId
	var doc = Hotel.findById(hotelId)
	.exec(function(err,doc)
		{
			var response = {
				status : 200,
				message : doc
			}
			if(err)
			{
				response.status = 500;
				response.message = err;
			}
			else if(!doc)
			{
				response.status = 404;
				response.message = "No data found";
			}
			res.status(response.status)
			.json(response.message);
			return;

		})
}


var _splitArray = function(input)
{
	var output = [];
	if(input && input.length > 0)
	{
		output = input.split(';');
	}
	return output;
}
module.exports.hotelsAddone = function(req,res)
{
	Hotel
		.create({
			name : req.body.name,
			stars : parseInt(req.body.stars,10),
			services : _splitArray(req.body.services),
			description : req.body.description,
			photos : _splitArray(req.body.photos),
			currency : req.body.currency,
			location : 
			{
				address : req.body.address,
				coordinates : [parseFloat(req.body.lng) , parseFloat(req.body.lat)]
			}

		},function(err,doc)
		{
			var response = {
				status : 201,
				message : doc
			}
			if(err)
			{
				response={
					status : 400,
					message : err
				}
			}
			res.status(response.status).json(response.message)
		})
}

module.exports.reviewsAddOne = function(req,res)
{
	var hotelId = req.params.hotelId
	var doc = Hotel.findById(hotelId)
	.exec(function(err,doc)
		{
			var response = {
				status : 200,
				message : []
			}
			if(err)
			{
				response.status = 500;
				response.message = err;
			}
			else if(!doc)
			{
				response.status = 404;
				response.message = "No data found";
			}
			res.status(response.status)
			.json(response.message);
			return;

		})

}