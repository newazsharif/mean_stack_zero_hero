angular.module('meanhotel').directive('meanhotelDirective',meanhotelDirective);


function meanhotelDirective()
{
	return{
		restrict : 'E',
		templateUrl : 'angular-app/navigation-directive/navigation-directive.html'
	}
}