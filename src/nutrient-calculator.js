/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.7
 */

'use strict';

/**
 * nutrientCalculator
 * @module nutrientCalculator
 */
angular.module('farmbuild.nutrientCalculator', ['farmbuild.core','farmbuild.farmdata'])

	.factory('NutrientCalculator', function (MilkSold, GoogleAnalytic, CowsPurchased, CowsCulled, FarmData) {
		var NutrientCalculator = {};

		/**
		 * Adds nutrientCalculator block to farmData
		 * @method load
		 * @param {!object} farmData - Saved farm data or default in case of new
		 * @returns {object} updated farmData
		 * @public
		 * @static
		 */
		NutrientCalculator.load = function (farmData) {
			if (!FarmData.isFarmData(farmData)) {
				return undefined;
			}

			if (!farmData.nutrientCalculator) {
				farmData.nutrientCalculator = {
					milkSold: {},
					cowsCulled: {},
					cowsPurchased: {}
				};
			}
			return farmData;
		};

		// Provide a shortcut for modules
		NutrientCalculator.milkSold = MilkSold;
		NutrientCalculator.googleAnalytic = GoogleAnalytic;
		NutrientCalculator.cowsPurchased = CowsPurchased;
		NutrientCalculator.cowsCulled = CowsCulled;

		window.farmbuild.nutrientcalculator = NutrientCalculator;

		return NutrientCalculator;
	});