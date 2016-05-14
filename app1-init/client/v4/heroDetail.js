(function(){
	function HeroDetailController() {

	}

	var HeroDetailComponent = {
		templateUrl : 'hero-detail.html',
		controller  : HeroDetailController,
		bindings : { hero : '='}
	};


	angular
		.module('heroApp')
		.component('heroDetail', HeroDetailComponent)
})();