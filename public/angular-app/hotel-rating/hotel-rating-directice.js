angular.module('meanhotel').directive('hotelRating',hotelRating);

function hotelRating ()
{
	return {
		//restrict : 'E',
		template : '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{star}}</span>',
		bindToController : true,
		controller : 'HotelDisplayController',
		controllerAs : 'vm',
		scope : {
			stars : '@'
		}
	}
}