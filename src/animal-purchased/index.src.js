/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.1
 */

'use strict';

/**
 * nutrientCalculator/AnimalPurchased class
 * @module nutrientCalculator/AnimalPurchased
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('AnimalPurchased', function (Validations, CattleTypes) {

		var AnimalPurchased = {},
			_isNumber = Validations.isNumber;

		AnimalPurchased.incomings = [];

		/**
		 * Calculates total nutrient imported on to the farm in animals
		 * @method calculate
		 * @param {array} incomings - Array of purchased animals, each item contains details of the animal {type, count}
		 * @returns {object} nutrient data of animals purchased
		 * @public
		 * @static
		 */
		AnimalPurchased.calculate = function (incomings) {
			var count = 0,
				weight = 0,
				nitrogen = 0,
				phosphorus = 0,
				potassium = 0,
				sulphur = 0,
				nitrogenPercentage = 2.8,
				phosphorusPercentage = 0.72,
				potassiumPercentage = 0.2,
				sulphurPercentage = 0.8;

			if(incomings && incomings.length > 0) {
				AnimalPurchased.incomings = AnimalPurchased.incomings.concat(incomings);
			}

			if (AnimalPurchased.incomings.length === 0) {
				return undefined;
			}

			angular.forEach(AnimalPurchased.incomings, function (animal) {
				var baseWeight = CattleTypes[animal.type].weight,
					baseCount = animal.count;
					weight += CattleTypes[animal.type].weight * baseCount;
					count += baseCount;
					nitrogen += (nitrogenPercentage * baseWeight * baseCount)/100;
					phosphorus += (phosphorusPercentage * baseWeight * baseCount)/100;
					potassium += (potassiumPercentage * baseWeight * baseCount)/100;
					sulphur += (sulphurPercentage * baseWeight * baseCount)/100;
			});
			
			return {
				count: count,
				weight: weight,
				nitrogenInKg: nitrogen,
				phosphorusInKg: phosphorus,
				potassiumInKg: potassium,
				sulphurInKg: sulphur
			};

		};

		/**
		 * Adds animal(s) for nutrient calculation
		 * @method add
		 * @param {!object} type - Type of animal {name, weight}
		 * @param {!number} count - Number of animal of this type
		 * @returns {object} AnimalPurchased class - useful for chaining if needed
		 * @public
		 * @static
		 */
		AnimalPurchased.add = function (type, count) {
			count = parseInt(count);
			if (!_isNumber(count)) {
				return undefined;
			}

			if (!type.weight || !type.name) {
				return undefined;
			}

			CattleTypes[type.name] = type;

			AnimalPurchased.incomings.push({
				type: type.name,
				count: count
			});

			return AnimalPurchased;
		};

		return AnimalPurchased;

	});
