angular.module('meanhotel',['ngRoute'])
.config(config)
.controller('HotelsController',HotelsController);

function config($routeProvide)
{
	$routeProvide
		.when('/',
		{
			templateUrl : 'angular-app/hotels.html',
			controller : HotelsController,
			controllerAs : vm
		})
};

function HotelsController()
{
	var vm  = this;
	this.title = 'Mean Hotel App'
	
}