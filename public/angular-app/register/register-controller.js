angular.module('meanhotel').controller('registerController',registerController);

function registerController($http){
	var vm = this;
	vm.register = function()
	{
		
		
		if(vm.registrationForm.$valid)
		{
			if (vm.registration.password != vm.confirmPassword) {
				vm.errorMessage = "Password did not matched"
			}
			else
			{
				$http.post('/api/Users/register',vm.registration).then(function(response)
				{
					console.log(response);
					vm.successMessage = 'user registered successfully'
					vm.errorMessage = false;
				}).catch(function(error)
				{
					console.log(error)
				})
			}
		}
	}
}