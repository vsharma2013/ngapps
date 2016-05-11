(function(){
	angular
	.module('documentApp', [])
	.controller('listController', listController)

	function listController($scope, $http){
		$http.get('/api/doc').success(function(data){
			$scope.docs = data.result;
		});
		$scope.orderProp = 'name';
	}
})();