/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.1
 */

'use strict';

/**
 * nutrientCalculator/AnimalsPurchased class
 * @module nutrientCalculator/AnimalsPurchased
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('AnimalsPurchased', function (Validations, animalTypes) {

		var AnimalsPurchased = {},
			_isPositiveNumber = Validations.isPositiveNumber,
			_isAlphabet = Validations.isAlphabet,
			_types = animalTypes;

		/**
		 * Calculates total nutrient imported on to the farm in animals
		 * @method calculate
		 * @param {!array} animals - Array of purchased animals, each item contains details of the animal {type, count}
		 * @returns {object} nutrient data of animals purchased
		 * @public
		 * @static
		 */
		AnimalsPurchased.calculate = function (animals) {
			var count = 0,
				weight = 0,
				nitrogenInKg = 0,
				phosphorusInKg = 0,
				potassiumInKg = 0,
				sulphurInKg = 0,
				nitrogenPercentage = 2.8,
				phosphorusPercentage = 0.72,
				potassiumPercentage = 0.2,
				sulphurPercentage = 0.8,
				incomings = [],
				i = 0;

			if (!animals || animals.length === 0) {
				return undefined;
			}

			for (i; i < animals.length; i++) {
				var animalWeight,
					animalCount,
					animal = animals[i];

				if (!animal.type || !_types[animal.type]) {
					return undefined;
				}

				animalWeight = _types[animal.type].weight;
				animalCount = animal.count;

				if (!_isPositiveNumber(animalCount)) {
					return undefined;
				}

				weight += animalWeight * animalCount;
				count += animalCount;
				nitrogenInKg += (nitrogenPercentage * animalWeight * animalCount) / 100;
				phosphorusInKg += (phosphorusPercentage * animalWeight * animalCount) / 100;
				potassiumInKg += (potassiumPercentage * animalWeight * animalCount) / 100;
				sulphurInKg += (sulphurPercentage * animalWeight * animalCount) / 100;
				incomings.push({
					name: _types[animal.type].name,
					numberOfAnimals: animalCount,
					weight: _types[animal.type].weight
				})
			}

			return {
				animals: incomings,
				numberOfAnimals: count,
				weight: weight,
				nitrogenInKg: nitrogenInKg,
				phosphorusInKg: phosphorusInKg,
				potassiumInKg: potassiumInKg,
				sulphurInKg: sulphurInKg
			};

		};

		/**
		 * Adds a new animal type for nutrient calculation
		 * @method addType
		 * @param {!string} name - name of new type, can only contain alphabetical values with no space or special characters
		 * @param {!number} weight - average weight of this type in Kg, value must be > 0
		 * @returns {object} AnimalsPurchased - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		AnimalsPurchased.addType = function (name, weight) {
			if (!_isPositiveNumber(weight)) {
				return undefined;
			}

			if (!name || !_isAlphabet(name)) {
				return undefined;
			}

			weight = parseFloat(weight);

			_types[name] = {
				name: name,
				weight: weight
			};

			return AnimalsPurchased;
		};


		/**
		 * Returns current animal's type collection
		 * @method types
		 * @returns {object} Types - animal's type collection
		 * @public
		 * @static
		 */
		AnimalsPurchased.types = function () {
			return _types;
		};

		return AnimalsPurchased;

	});
