var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req,res)
{
	var hotelId = req.params.hotelId;
	var doc = Hotel.findById(hotelId).select('reviews')
	.exec(function(err,doc)
		{
			var response = {
				status : 200,
				message : doc.reviews
			}

			if(err)
			{
				response.status = 400;
				response.message = err
			}
			else if(!doc)
			{
				response.status = 404;
				response.message = "No reviews found"
			}
			res.status(response.status).json(response.message);
		})
}

module.exports.reviewsGetOne = function(req,res)
{
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;

	var doc = Hotel.findById(hotelId).select('reviews')
	.exec(function(err,hotel)
		{
			var review = hotel.reviews.id(reviewId);
			res.status(200).json(review);  
		})
}

var _addReviews = function(req,res,hotel)
{
	hotel.reviews.push(req.body);
	console.log(req.body.name)
	console.log(hotel);
	hotel.save(function(err,res)
	{
		if(err)
		{
			console.log(err)
			res.status(500).json(err)
		}
		else
		{
			console.log(res)
			res.status(201).json(res.reviews[res.length - 1]);
		}
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
			if (doc) {
				_addReviews(req,res,doc);
				return;
			};
			res.status(response.status)
			.json(response.message);
			return;

		})

}
