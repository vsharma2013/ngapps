(function(){
	angular
	.module('documentControllers', [])
	.controller('docListController', docListController)
	.controller('docDetailController', docDetailController)

	function docListController($scope, $http){
		$http.get('/api/doc').success(function(data){
			$scope.docs = data.result;
		});
		$scope.orderProp = 'name';
	}
	docListController.$inject = ['$scope', '$http'];

	function docDetailController($scope, $http){

	}
	docDetailController.$inject = ['$scope', '$http'];
})();