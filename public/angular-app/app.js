angular.module('meanhotel', ['ngRoute']).config(config)

function config($routeProvider,$locationProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl : 'angular-app/main/main.html'
    })
    .when('/hotels', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: 'HotelsController',
      controllerAs : 'vm'
      
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: 'HotelDisplayController',
      controllerAs : 'vm'
    })
    .when('/register',
    {
      templateUrl : 'angular-app/register/register.html',
      controller: 'registerController',
      controllerAs : 'vm'
    })
};
