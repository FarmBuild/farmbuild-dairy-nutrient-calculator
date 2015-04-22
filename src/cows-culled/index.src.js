/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/CowsCulled class
 * @module nutrientCalculator/CowsCulled
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('CowsCulled', function (Validations, references) {

		var CowsCulled = {},
			_isPositiveNumber = Validations.isPositiveNumber,
			_isAlphanumeric = Validations.isAlphanumeric,
			_types = references.cowTypes;

		function _findType(toFind) {
			console.log(toFind);
			var found;
			angular.forEach(_types, function(type){
				if(type.name === toFind){
					found = type;
				}
			});
			console.log(found);
			return found;
		}

		/**
		 * Calculates total nutrient exported from the farm in culled cows
		 * @method calculate
		 * @param {!array} cows - Array of purchased cows, each item contains details of the cow {type, count}
		 * @returns {object} nutrient data of cows purchased
		 * @public
		 * @static
		 */
		CowsCulled.calculate = function (cows) {
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
				cowType,
				i = 0;

			if (!cows || cows.length === 0) {
				return undefined;
			}

			for (i; i < cows.length; i++) {
				var cowWeight,
					cowCount,
					cow = cows[i];

				if (!cow.type || !_findType(cow.type)) {
					return undefined;
				}

				cowType = _findType(cow.type);
				cowWeight = cowType.weight;
				cowCount = cow.numberOfCows;

				if (!_isPositiveNumber(cowCount)) {
					return undefined;
				}

				weight += cowWeight * cowCount;
				numberOfCows += cowCount;
				nitrogenInKg += (nitrogenPercentage * cowWeight * cowCount) / 100;
				phosphorusInKg += (phosphorusPercentage * cowWeight * cowCount) / 100;
				potassiumInKg += (potassiumPercentage * cowWeight * cowCount) / 100;
				sulphurInKg += (sulphurPercentage * cowWeight * cowCount) / 100;
				incomings.push({
					name: cowType.name,
					numberOfCows: cowCount,
					weight: cowType.weight
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
		 * Adds a new cow type for nutrient calculation
		 * @method addType
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} weight - average weight of this type in Kg, value must be > 0
		 * @returns {object} CowsCulled - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		CowsCulled.addType = function (name, weight) {
			if (!_isPositiveNumber(weight)) {
				return undefined;
			}

			if (!name || !_isAlphanumeric(name)) {
				return undefined;
			}

			weight = parseFloat(weight);

			_types.push({
				name: name,
				weight: weight
			});

			return CowsCulled;
		};

		/**
		 * Remove this cow type from cow types collection
		 * @method removeType
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} weight - average weight of this type in Kg, value must be > 0
		 * @returns {object} CowsCulled - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		CowsCulled.removeType = function (name, weight) {
			if (!_isPositiveNumber(weight)) {
				return undefined;
			}

			if (!name || !_isAlphanumeric(name)) {
				return undefined;
			}

			weight = parseFloat(weight);

			_types.push({
				name: name,
				weight: weight
			});

			return CowsCulled;
		};


		/**
		 * Returns current cow's type collection
		 * @method types
		 * @returns {object} Types - cow's type collection
		 * @public
		 * @static
		 */
		CowsCulled.types = function () {
			return _types;
		};

		return CowsCulled;

	});
