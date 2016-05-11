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

	function docDetailController($scope, $http, $routeParams){
		var url = '/api/doc/' + $routeParams.id;

		$http.get(url).success(function(data){
			$scope.doc = data.result;
		});

		$scope.saveDoc = function(){
			var saveDoc = angular.toJson($scope.doc);
			$http.put('/api/doc', saveDoc)
			     .success(function (res) { alert('Save status : ' + res.success) })
			     .error(function(err) { console.log(arguments); alert ('Failed to save the document.')})
		}
	}
	docDetailController.$inject = ['$scope', '$http', '$routeParams'];
})();