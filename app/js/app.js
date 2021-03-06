'use strict';


// Declare app level module which depends on filters, and services
var autoExpo = angular.module('autoExpoApp', [
	'ngRoute',
	'autoExpoAppControllers',
	'autoExpoAppDirectives',
	'autoExpoAppServices'
]);

autoExpo.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/homePartial.html',
			controller: 'AutoListCtrl'
		})

		.when('/auto/compare', {
			templateUrl: 'partials/autoCompare.html',
			controller: 'AutoCompareCtrl'
		})

		.when('/auto/:id', {
			templateUrl: 'partials/autoDetail.html',
			controller: 'AutoDetailCtrl'
		})

		.when('/admin', {
			templateUrl: 'partials/listAutos.html',
			controller: 'AdminListCtrl'
		})

		.otherwise('/', {
			templateUrl: 'partials/homePartial.html',
			controller: 'AutoListCtrl'
		});
	}
]);