
var express = require('express')
var router = express.Router();

var hotelsCtrl = require('../controllers/hotels.controllers.js');
var reviewsController = require('../controllers/reviews.controllers.js');
var usersController = require('../controllers/users.controllers.js');

router
	.route('/Hotels')
	.get(hotelsCtrl.getAllHotels)
	.post(hotelsCtrl.hotelsAddone);

router
	.route('/Hotels/:hotelId')
	.get(hotelsCtrl.getHotelOne)
	.put(hotelsCtrl.HotelUpdateOne)
	.delete(hotelsCtrl.HotelsDeleteOne)
	

router
	.route('/Hotels/:hotelId/reviews/:reviewId')
	.get(reviewsController.reviewsGetOne)
	.put(reviewsController.reviewsUpdateOne)
	.delete(reviewsController.reviewsDeleteOne);


router
	.route('/Hotels/:hotelId/reviews')
	.get(reviewsController.reviewsGetAll)
	.post(reviewsController.reviewsAddOne)
	

router
	.route('/Users/register')
	.post(usersController.register)

router
	.route('/Users/login')
	.post(usersController.login)

	
module.exports = router;


