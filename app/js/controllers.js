'use strict';

/*	Auxiliares	*/

var storeCookie = function storeCookie($cookies, array) {
		console.log('antes cookies: ', array);
		try {
			$cookies.autoCompare = JSON.stringify(array);
		} catch (e) {
			console.log(e);
		}
	},
	retrieveCookie = function retrieveCookie($cookies) {
		try {
			if (typeof $cookies.autoCompare !== 'undefined') {
				return JSON.parse($cookies.autoCompare);
			} else {
				return null;
			}
		} catch (e) {
			console.log(e);
		}
	};

/* Controllers */

var autoExpoControllers = angular.module('autoExpoAppControllers', ['ngCookies']);

autoExpoControllers.controller('AutoListCtrl', ['$scope', '$http', '$timeout', '$cookies',

	function($scope, $http, $timeout, $cookies) {

		$http.get('autos/autos.json').success(function(data) {
			$scope.autos = data;
		});

		$scope.select = [];
		$scope.showWarning = true;
		var selectCompare = [];

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
					storeCookie($cookies, selectCompare);
				}
			}
			if (!found) {
				if (selectCompare.length < 3) {
					$scope.select[index] = true;
					selectCompare.push(_id);
					storeCookie($cookies, selectCompare);
				} else {
					$scope.select[index] = false;
					$scope.showWarning = false;
					$timeout(function() {
						$scope.showWarning = true;
					}, 2000);
				}
			}
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

autoExpoControllers.controller('AdminListCtrl', ['$scope', '$http', 'JSONService',
	function($scope, $http) {

		$scope.order = 'brand';

		$http.get('autos/autos.json').success(function(data) {
			$scope.autos = data;
		});

		$scope.eliminar = function(id) {
			var i = 0,
				n = 0,
				aux;

			/*$http.post('path/to/server/file/to/save/json', $scope.languages).then(function(data) {
      $scope.msg = 'Data saved';
    });*/

			for (i = 0, n = $scope.autos.length; i < n; i++) {
				if ($scope.autos[i].id === id) {
					aux = $scope.autos;
					aux.splice(i, 1);
					$http.post('./autos/autos.json', aux).then(function(data) {
						$scope.autos.splice(i, 1);
					});
				}
			}
		};

	}
]);

autoExpoControllers.controller('AutoCompareCtrl', ['$scope', '$http', '$window', '$cookies',
	function($scope, $http, $window, $cookies) {

		$scope.compareVacio = false;

		$scope.width;

		$scope.remove = function(index) {
			if (typeof $scope.autos !== 'undefined') {
				$scope.autos.splice(index, 1);
				storeCookie($cookies, $scope.autos);
				if ($scope.autos.length) {
					$scope.compareVacio = false;
					$scope.width = 100 / $scope.autos.length;
				} else {
					$scope.compareVacio = true;
				}
			}
		};

		$http.get('autos/autos.json').success(function(data) {
			var i = 0,
				n = 0,
				x = 0,
				y = 0,
				selectCompare,
				compare = [];

			selectCompare = retrieveCookie($cookies);

			if (angular.isArray(data)) {
				for (i = 0, n = data.length; i < n; i++) {
					for (x = 0, y = selectCompare.length; x < y; x++) {
						if (data[i].id === selectCompare[x]) {
							compare.push(data[i]);
						}
					}
				}
			} else if (angular.isObject(data)) {
				compare.push(data);
			} else {
				$window.location.href = '/app/';
			}

			if (compare.length) {
				$scope.width = 100 / compare.length;
			} else {
				$scope.compareVacio = true;
				$scope.width = 0;
			}
			$scope.autos = compare;
		});
	}
]);