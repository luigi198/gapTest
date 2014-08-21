'use strict';

/* Controllers */

var autoExpoControllers = angular.module('autoExpoAppControllers', []),
	selectCompare = [];

autoExpoControllers.controller('AutoListCtrl', ['$scope', '$http', '$timeout',

	function($scope, $http, $timeout) {

		$http.get('autos/autos.json').success(function(data) {
			$scope.autos = data;
		});

		$scope.select = [];
		$scope.showWarning = true;

		$scope.selectFunction = function(e, index, _id) {
			var elm = e.target,
				found = false,
				i = 0,
				n = 0;

			for (i = 0, n = selectCompare.length; i < n; i++) {
				if (selectCompare[i] === _id) {
					found = true;
					$scope.select[index] = false;
					selectCompare.splice(i, 1);
				}
			}
			if (!found) {
				if (selectCompare.length < 3) {
					$scope.select[index] = true;
					selectCompare.push(_id);
				} else {
					$scope.select[index] = false;
					$scope.showWarning = false;
					$timeout(function() {
						$scope.showWarning = true;
					}, 2000);
				}
			}
			console.log($scope.select);
		};
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