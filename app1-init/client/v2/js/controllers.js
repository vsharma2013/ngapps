(function(){
	angular
	.module('documentControllers', [])
	.controller('docListController', docListController)
	.controller('docDetailController', docDetailController)

	function docListController($http){
		var vm = this
		$http.get('/api/doc').success(function(data){
			vm.docs = data.result;
		});
		vm.orderProp = 'name';
	}
	docListController.$inject = ['$http'];

	function docDetailController($http, $routeParams){
		var vm = this
		var url = '/api/doc/' + $routeParams.id;

		$http.get(url).success(function(data){
			vm.doc = data.result;
		});

		vm.saveDoc = function(){
			var saveDoc = angular.toJson(vm.doc);
			$http.put('/api/doc', saveDoc)
			     .success(function (res) { alert('Save status : ' + res.success) })
			     .error(function(err) { console.log(arguments); alert ('Failed to save the document.')})
		}
	}
	docDetailController.$inject = ['$http', '$routeParams'];
})();