(function(){
	angular
		.module('directiveApp', [])
		.controller('Controller', Controller)
		.directive('myCustomer',  function() { return MyCustomer; })
		.directive('myCustomer2', function() { return MyCustomer2; })
		.directive('myCustomer3', function() { return MyCustomer3; })
		.directive('myCurrentTime', MyCurrentTime)
		.directive('myDialog', function() { return MyDialog;})
		.directive('myTabs', function() { return MyTabs;} )
		.directive('myPane', function() { return MyPane;})

	function Controller($scope){
		$scope.name = 'Vishal Sharma';
		$scope.address = 'D-402 Silver Skyscapes';
		$scope.igor = { name : 'Igor', address : 'Igore address'};
		$scope.naomi = { name : 'Naomi', address : 'Naomi address'};

		$scope.format = 'M/d/yy h:mm:ss a';
	}
	Controller.$inject = ['$scope'];

	var MyCustomer = {
		templateUrl : function(elem, attr){
			return 'customer-' + attr.type + '.html'
		}
	}

	var MyCustomer2 = {
		restrict : 'E',
		template : '<div> Name2 : {{name}}</br>    Address2 : {{address}}'
	};

	var MyCustomer3 = {
		restrict : 'E',
		scope : { cinfo : '=info' },
		template : '<div> Name3 : {{cinfo.name}}</br>    Address3 : {{cinfo.address}}'
	};

	function MyCurrentTime($interval, dateFilter){
		function link(scope, element, attrs){
			var tid, format = scope.format;

			function updateTime() {
				element.text(dateFilter(new Date(), format));
			}

			scope.$watch(attrs.myCurrentTime, function(value){
				format = value;
				updateTime();
			});

			element.on('$destroy', function() { $interval.cancel(tid) });

			tid = $interval(updateTime, 1000);
		}
		return { link : link }
	}
	MyCurrentTime.$inject = ['$interval', 'dateFilter'];

	var MyDialog = {
		restrict : 'E',
		scope : {},
		transclude : true,
		templateUrl : 'my-dialog.html'
	};

	var MyTabs = {
		restrict : 'E',
		templateUrl : 'my-tabs.html',
		transclude : true,
		scope : {},
		controller : ['$scope', function($scope){
			var panes = $scope.panes = [];

			$scope.select = function(pane){
				angular.forEach(panes, function(p){ p.selected = false});
				pane.selected = true;
			} 

			this.addPane = function(pane){
				if(panes.length === 0)
					$scope.select(pane);

				panes.push(pane);
			}
		}]
	};

	var MyPane = {
		require: '^^myTabs',
		restrict : 'E',
		templateUrl : 'my-pane.html',
		transclude : true,
		scope : { title : '@'},
		link : function(scope, elem, attrs, tabsCtrl) { tabsCtrl.addPane(scope);}
	};
})();