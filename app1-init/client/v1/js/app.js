(function(){
	
	function appRoutes($routeProvider){
		$routeProvider
			.when('/docs', docListRoute)
			.when('/docs/:id', docDetailRoute)
			.otherwise({redirectTo : '/docs'})
	}

	var appRouteConfig = ['$routeProvider', appRoutes];
	
	angular
		.module('documentApp', ['ngRoute', 'documentControllers'])
		.config(appRouteConfig);
	

	var docListRoute = {
		templateUrl : 'partials/doc-list.html',
		controller : 'docListController'
	};

	var docDetailRoute = {
		templateUrl : 'partials/doc-detail.html',
		controller : 'docDetailController'
	};
})();