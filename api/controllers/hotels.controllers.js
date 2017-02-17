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
module.exports.getAllHotels = function(req, res) {

  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 50;

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      console.log(err);
      console.log(hotels);
      if (err) {
        console.log("Error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found hotels", hotels.length);
        res
          .json(hotels);
      }
    });

};


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

module.exports.HotelUpdateOne = function(req,res)
{

	var hotelId = req.params.hotelId
	var doc = Hotel.findById(hotelId).
	select("-reviews -rooms")
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
			if(response.status != 200)
			{
				res.status(response.status).json(response.message);
				return;
			}
			else
			{
				doc.name = req.body.name,
				doc.stars = parseInt(req.body.stars,10),
				doc.services = _splitArray(req.body.services),
				doc.description = req.body.description,
				doc.photos = _splitArray(req.body.photos),
				doc.currency = req.body.currency,
				doc.location = 
				{
					address : req.body.address,
					coordinates : [parseFloat(req.body.lng) , parseFloat(req.body.lat)]
				}
				doc.save(function(err,result)
				{
					if(err)
					{
						res.status(500).json(err)
						return;
					}
					else
					{
						res.status(204).json(result);
						return;
					}
				})	
			}

		})
}

module.exports.HotelsDeleteOne = function(req,res)
{
	var hotelId = req.params.hotelId
	var doc = Hotel.findByIdAndRemove(hotelId)
	.exec(function(err,doc)
		{
			var response = {
				status : 200,
				message : []
			}
			if(err)
			{
				response.status = 404;
				response.message = err;
			}
			res.status(response.status)
			.json(response.message);
			return;

		})
}