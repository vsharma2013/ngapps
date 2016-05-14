(function(){
	angular
		.module('heroApp', [])
		.controller('mainCtrl', Controller);

	function Controller() {
	  this.hero = {name: 'Spawn'};
	}
	Controller.$inject = ['$scope'];
})();