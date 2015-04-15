/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.1
 */

'use strict';

angular.module('farmbuild.nutrientCalculator', [])

	.factory('NutrientCalculator', function (MilkSold, GoogleAnalytic) {
		var NutrientCalculator = {};

		/**
		 * Adds nutrientCalculator block to farmData
		 * @method farmbuild.nutrientCalculator.load
		 * @param {!object} farmData - Basic farm data
		 * @returns {object} updated farmData
		 * @public
		 * @static
		 */
		NutrientCalculator.load = function (farmData) {
			if (!farmData.name) {
				return undefined;
			}
			if (!farmData.nutrientCalculator) {
				farmData.nutrientCalculator = {
					milkSold: {}
				};
			}
			return farmData;
		};

		// Provide a shortcut for modules
		NutrientCalculator.milkSold = MilkSold;
		NutrientCalculator.googleAnalytic = GoogleAnalytic;

		window.farmbuild.nutrientcalculator = NutrientCalculator;

		return NutrientCalculator;
	});