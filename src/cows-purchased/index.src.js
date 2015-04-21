/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.0.7
 */

'use strict';

/**
 * nutrientCalculator/CowsPurchased class
 * @module nutrientCalculator/CowsPurchased
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('CowsPurchased', function (Validations, animalTypes) {

		var CowsPurchased = {},
			_isPositiveNumber = Validations.isPositiveNumber,
			_isAlphabet = Validations.isAlphabet,
			_types = animalTypes;

		/**
		 * Calculates total nutrient imported on to the farm in cows
		 * @method calculate
		 * @param {!array} cows - Array of purchased cows, each item contains details of the animal {type, count}
		 * @returns {object} nutrient data of cows purchased
		 * @public
		 * @static
		 */
		CowsPurchased.calculate = function (cows) {
			var numberOfCows = 0,
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

			if (!cows || cows.length === 0) {
				return undefined;
			}

			for (i; i < cows.length; i++) {
				var animalWeight,
					animalCount,
					animal = cows[i];

				if (!animal.type || !_types[animal.type]) {
					return undefined;
				}

				animalWeight = _types[animal.type].weight;
				animalCount = animal.numberOfCows;

				if (!_isPositiveNumber(animalCount)) {
					return undefined;
				}

				weight += animalWeight * animalCount;
				numberOfCows += animalCount;
				nitrogenInKg += (nitrogenPercentage * animalWeight * animalCount) / 100;
				phosphorusInKg += (phosphorusPercentage * animalWeight * animalCount) / 100;
				potassiumInKg += (potassiumPercentage * animalWeight * animalCount) / 100;
				sulphurInKg += (sulphurPercentage * animalWeight * animalCount) / 100;
				incomings.push({
					name: _types[animal.type].name,
					numberOfCows: animalCount,
					weight: _types[animal.type].weight
				})
			}

			return {
				cows: incomings,
				numberOfCows: numberOfCows,
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
		 * @returns {object} CowsPurchased - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		CowsPurchased.addType = function (name, weight) {
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

			return CowsPurchased;
		};


		/**
		 * Returns current animal's type collection
		 * @method types
		 * @returns {object} Types - animal's type collection
		 * @public
		 * @static
		 */
		CowsPurchased.types = function () {
			return _types;
		};

		return CowsPurchased;

	});
