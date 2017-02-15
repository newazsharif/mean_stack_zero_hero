var express = require('express')
var router = express.Router();

var hotelsCtrl = require('../controllers/hotels.controllers.js');
var reviewsController = require('../controllers/reviews.controllers.js');

router
	.route('/Hotels')
	.get(hotelsCtrl.getAllHotels)
	.post(hotelsCtrl.hotelsAddone);

router
	.route('/Hotels/:hotelId')
	.get(hotelsCtrl.getHotelOne);

	

router
	.route('/Hotels/:hotelId/reviews/:reviewId')
	.get(reviewsController.reviewsGetOne);

router
	.route('/Hotels/:hotelId/reviews')
	.get(reviewsController.reviewsGetAll)
	.post(reviewsController.reviewsAddOne);


module.exports = router;