/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.1
 */

'use strict';

/**
 * nutrientCalculator/NutrientCalculator class
 * @module nutrientCalculator/NutrientCalculator
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('NutrientCalculator', function (MilkSold, GoogleAnalytic) {
		var NutrientCalculator = {};

		NutrientCalculator.create = function(farmData){
			farmData.nutrientCalculator = {};
			return farmData;
		};

		NutrientCalculator.load = function(farmData){
				//'farmerName',
				//'farmName',
				//'street',
				//'town',
				//'state',
				//'postcode',
				//'yearEnding',
				//'herdProfile',
				//'animalWeight',
				//'milkingDays',
				//'totalMilkingCows',
				//'totalFarmArea',
				//'milkingArea',
				//'nonMilkingArea'
		};

		NutrientCalculator.milkSold = MilkSold;
		NutrientCalculator.googleAnalytic = GoogleAnalytic;

		window.farmbuild.nutrientcalculator = NutrientCalculator;
		return NutrientCalculator;
	});