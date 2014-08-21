'use strict';

/* Directives */


angular.module('autoExpoAppDirectives', []).
directive('selectAuto',
	function() {
		return function($scope, elm, attrs) {
			angular.element(elm.parent()).addClass('autoSelect');
			angular.element(elm.querySelector('overlay').removeClass('hidden'));
			angular.element(elm.querySelector('checkIcon').removeClass('hidden'));
		};
	}
);