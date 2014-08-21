'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('autoExpoAppServices', []).
service('JSONService', function($http) {
	return {
		getJSON: function() {
			return $http.get('autos/autos.json');
		}
	};
});