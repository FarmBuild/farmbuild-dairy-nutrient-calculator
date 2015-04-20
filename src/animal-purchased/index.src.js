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

	.factory('AnimalPurchased', function (Validations, animalTypes) {

		var AnimalPurchased = {},
			_isNumber = Validations.isNumber,
			_types = animalTypes;

		/**
		 * Calculates total nutrient imported on to the farm in animals
		 * @method calculate
		 * @param {!array} animals - Array of purchased animals, each item contains details of the animal {type, count}
		 * @returns {object} nutrient data of animals purchased
		 * @public
		 * @static
		 */
		AnimalPurchased.calculate = function (animals) {
			var count = 0,
				weight = 0,
				nitrogen = 0,
				phosphorus = 0,
				potassium = 0,
				sulphur = 0,
				nitrogenPercentage = 2.8,
				phosphorusPercentage = 0.72,
				potassiumPercentage = 0.2,
				sulphurPercentage = 0.8,
				incomings = [];

			if (!animals || animals.length === 0) {
				return undefined;
			}

			angular.forEach(animals, function (animal) {
				var animalWeight = _types[animal.type].weight,
					animalCount = animal.count;
				weight += animalWeight * animalCount;
				count += animalCount;
				nitrogen += (nitrogenPercentage * animalWeight * animalCount) / 100;
				phosphorus += (phosphorusPercentage * animalWeight * animalCount) / 100;
				potassium += (potassiumPercentage * animalWeight * animalCount) / 100;
				sulphur += (sulphurPercentage * animalWeight * animalCount) / 100;
				incomings.push({name: _types[animal.type].name, numberOfAnimals: animalCount, weight: _types[animal.type].weight})
			});
			
			return {
				animals: incomings,
				numberOfAnimals: count,
				weight: weight,
				nitrogenInKg: nitrogen,
				phosphorusInKg: phosphorus,
				potassiumInKg: potassium,
				sulphurInKg: sulphur
			};

		};

		/**
		 * Adds a new animal type for nutrient calculation
		 * @method addType
		 * @param {!string} name - name of new type
		 * @param {!number} weight - average weight of this type in Kg
		 * @returns {object} animalPurchased - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		AnimalPurchased.addType = function (name, weight) {
			weight = parseFloat(weight);
			if (!_isNumber(weight)) {
				return undefined;
			}

			if (!name) {
				return undefined;
			}

			_types[name] = {
				name: name,
				weight: weight
			};

			return AnimalPurchased;
		};


		/**
		 * Returns current animal's type collection
		 * @method types
		 * @returns {object} Types - animal's type collection
		 * @public
		 * @static
		 */
		AnimalPurchased.types = function(){
			return _types;
		};

		return AnimalPurchased;

	});
