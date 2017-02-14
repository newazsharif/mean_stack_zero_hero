var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req,res)
{
	var hotelId = req.params.hotelId;
	var doc = Hotel.findById(hotelId).select('reviews')
	.exec(function(err,doc)
		{
			res.status(200).json(doc.reviews);
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
