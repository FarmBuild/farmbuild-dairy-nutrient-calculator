'use strict';

/**
 * nutrientCalculator/GoogleAnalytic class
 * @module nutrientCalculator/GoogleAnalytic
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('GoogleAnalytic', function () {

		var exports = {};

		/**
		* @property {string} username - Username of the api user
		 * @public
		*/
		exports.username = 'anonymous';
		return exports;
	});