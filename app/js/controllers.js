'use strict';

/* Controllers */

var autoExpoControllers = angular.module('autoExpoAppControllers', []);

autoExpoControllers.controller('AutoListCtrl', ['$scope', '$http',
	function($scope, $http) {

		$http.get('autos/autos.json').success(function(data) {
			$scope.autos = data;
		});

		$scope.checkBox = false;

		$scope.checkCar = function(e) {
			var elm = e.currentTarget;
			console.log(elm);
			console.log($scope.checkBox);
			// angular.element(elm.parent()).addClass('autoSelect');
			// angular.element(elm.querySelector('.overlay').removeClass('hidden'));
			// angular.element(elm.querySelector('.checkIcon').removeClass('hidden'));
		};

		//  $scope.orderProp = 'age';
	}
]);

autoExpoControllers.controller('AutoDetailCtrl', ['$scope', '$http',
	'$routeParams', '$window',
	function($scope, $http, $routeParams, $window) {
		$http.get('autos/autos.json').success(function(data) {
			var i = 0,
				n = 0,
				id = $routeParams.id;

			if (angular.isArray(data)) {
				for (i = 0, n = data.length; i < n; i++) {
					if (data[i].id === id) {
						$scope.auto = data[i];
					}
				}
				if (typeof $scope.auto === 'undefined') {
					$window.location.href = '/app/';
				}
			} else if (angular.isObject(data)) {
				if (typeof data.id !== 'undefined' && data.id === id) {
					$scope.auto = data;
				} else {
					$window.location.href = '/app/';
				}
			} else {
				$window.location.href = '/app/';
			}
		});
	}
]);