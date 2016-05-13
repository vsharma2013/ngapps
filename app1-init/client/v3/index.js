(function(){
	angular
		.module('directiveApp', [])
		.controller('Controller', Controller)
		.directive('myCustomer', function() { return MyCustomer })
		.directive('myCustomer2', function() { return MyCustomer2 });

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

	var MyCustomer2 = {
		restrict : 'E',
		template : '<div> Name2 : {{name}}    Address2 : {{address}}'
	};
})();