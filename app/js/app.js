'use strict';


// Declare app level module which depends on filters, and services
var autoExpo = angular.module('autoExpoApp', [
	'ngRoute',
	'autoExpoAppControllers',
	'autoExpoAppDirectives'
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

		.otherwise('/', {
			templateUrl: 'partials/homePartial.html',
			controller: 'AutoListCtrl'
		});
	}
]);