/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator
 * @module nutrientCalculator
 */
angular.module('farmbuild.nutrientCalculator', ['farmbuild.core','farmbuild.farmdata'])

	.factory('nutrientCalculator', function (milkSold, cowsPurchased, cowsCulled, foragesPurchased, fertilizersPurchased, FarmData, $log) {
		var nutrientCalculator = {};

		$log.info('Welcome to Farm Dairy Nutrient Calculator ...');

		/**
		 * Adds nutrientCalculator block to farmData
		 * @method load
		 * @param {!object} farmData - Saved farm data or default in case of new
		 * @returns {object} updated farmData
		 * @public
		 * @static
		 */
		nutrientCalculator.load = function (farmData) {
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
		nutrientCalculator.milkSold = milkSold;
		nutrientCalculator.cowsPurchased = cowsPurchased;
		nutrientCalculator.cowsCulled = cowsCulled;
		nutrientCalculator.foragesPurchased = foragesPurchased;
    nutrientCalculator.fertilizersPurchased = fertilizersPurchased;
		nutrientCalculator.version = '0.1.0';

		if(typeof window.farmbuild === 'undefined') {
			window.farmbuild = {
				nutrientcalculator: nutrientCalculator
			};
		} else {
			window.farmbuild.nutrientcalculator = nutrientCalculator;
		}

		return nutrientCalculator;
	});