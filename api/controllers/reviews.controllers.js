var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req,res)
{
	var hotelId = req.params.hotelId;
	// var doc = Hotel.findById(hotelId).select('reviews')
	// .exec(function(err,doc)
	// 	{
	// 		var response = {
	// 			status : 200,
	// 			message : doc.reviews
	// 		}

	// 		if(err)
	// 		{
	// 			response.status = 400;
	// 			response.message = err
	// 		}
	// 		else if(!doc)
	// 		{
	// 			response.status = 404;
	// 			response.message = "No reviews found"
	// 		}
	// 		res.status(response.status).json(response.message);
	// 	})

        var doc = Hotel.findById(hotelId,function(err,result)
        {
        	res.status(200).json(result);
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
	console.log(req.rating);
	hotel.save(function(err,result)
	{
		if(err)
		{
			console.log(err)
			res.status(500).json(err)
		}
		else
		{
			console.log(result);
			res.status(201).json(result.reviews[result.reviews.length - 1]);
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

module.exports.reviewsUpdateOne = function(req,res)
{
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var doc = Hotel.findById(hotelId)
				.select("reviews")
				.exec(function(err,result)
				{
					var response = {
						status : 200,
						message : result
					};
					if(err)
					{
						response.status = 400,
						response.message = err
					}
					else if(!result)
					{
						response.status = 404,
						response.message = "404 not found hotels"
					}


					if(response.status != 200)
					{
						console.log(response.status)
						res.status(response.status).json(response.message);
						return;
					}
					else
					{
						console.log(reviewId)
						//var thisReview = result.reviews.id(reviewId);

						if(result.reviews.id(reviewId))
						{
							result.reviews.id(reviewId).name = req.body.name;
							result.reviews.id(reviewId).review = req.body.review;
							result.reviews.id(reviewId).rating = parseInt(req.body.rating,10);

							result.save(function(err,result)
							{
								if (err) {
									res.status(501).json(err);
									return;
								}
								else
								{
									res.status(202).json(result);
									return;
								}
							})
						}
						else
						{
							res.status(404).json("review not found to update")
						}
					}
				})
}
module.exports.reviewsDeleteOne = function(req,res)
{
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	var doc = Hotel.findById(hotelId)
				.select("reviews")
				.exec(function(err,result)
				{
					var response = {
						status : 200,
						message : result
					};
					if(err)
					{
						response.status = 400,
						response.message = err
					}
					else if(!result)
					{
						response.status = 404,
						response.message = "404 not found hotels"
					}


					if(response.status != 200)
					{
						console.log(response.status)
						res.status(response.status).json(response.message);
						return;
					}
					else
					{
						console.log(reviewId)
						//var thisReview = result.reviews.id(reviewId);

						if(result.reviews.id(reviewId))
						{
							result.reviews.id(reviewId).remove();
							result.save(function(err,result)
							{
								if (err) {
									res.status(501).json(err);
									return;
								}
								else
								{
									res.status(202).json(result);
									return;
								}
							})
						}
						else
						{
							res.status(404).json("review not found to update")
						}
					}
				})
}