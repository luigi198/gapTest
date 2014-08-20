'use strict';


// Declare app level module which depends on filters, and services
var autoExpo = angular.module('autoExpoApp', [
	'ngRoute',
	'autoExpoAppControllers'
]);

autoExpo.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/homePartial.html',
			controller: 'AutoListCtrl'
		})

		.when('/auto/:id', {
			templateUrl: 'partials/autoDetail.html',
			controller: 'AutoDetailCtrl'
		});
	}
]);