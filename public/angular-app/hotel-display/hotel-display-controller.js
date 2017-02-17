angular.module('meanhotel')
	.controller('HotelDisplayController',HotelDisplayController);

	function HotelDisplayController(hotelDataFactory,$routeParams,$route)
	{
		var vm= this;
		var id = $routeParams.id
		hotelDataFactory.hotelDisplay(id).then(function(response)
		{
			vm.hotel = response;
			vm.stars = getArrayByStars(response.stars);
		})

		function getArrayByStars(stars)
		{
			return new Array(stars)
		}

		vm.addNewReview = function()
		{
			var postData = {
				name : vm.name,
				rating : vm.rating,
				review : vm.review
			}
			if(vm.reviewForm.$valid)
			{
				hotelDataFactory.postReview(id,postData).then(function(response)
				{
					console.log(response);
					$route.reload();
				})
			}
			else
			{
				vm.isSubmitted = true;
			}
		}

	}