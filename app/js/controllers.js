'use strict';

/* Controllers */

var autoExpoControllers = angular.module('autoExpoAppControllers', []);

autoExpoControllers.controller('AutoListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('autos/autos.json').success(function(data) {
			$scope.autos = data;
		});

		//  $scope.orderProp = 'age';
	}
]);