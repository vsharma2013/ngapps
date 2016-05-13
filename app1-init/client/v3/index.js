(function(){
	angular
		.module('directiveApp', [])
		.controller('Controller', Controller)
		.directive('myCustomer', function() { return MyCustomer });

	function Controller($scope){
		$scope.name = 'Vishal Sharma';
		$scope.address = 'D-402 Silver Skyscapes'
	}
	Controller.$inject = ['$scope'];

	var MyCustomer = {
		templateUrl : function(elem, attr){
			return 'customer-' + attr.type + '.html'
		}
	}
})();