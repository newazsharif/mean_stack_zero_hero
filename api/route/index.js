var express = require('express')
var router = express.Router();
var hotelsCtrl = require('../controllers/hotels.controllers.js')

router
	.route('/Hotels')
	.get(hotelsCtrl.getAllHotels);

router
	.route('/Hotels/:hotelId')
	.get(hotelsCtrl.getHotelOne);

router
	.route('/Hotels/newHotel')
	.post(hotelsCtrl.addNewHotel);

module.exports = router;