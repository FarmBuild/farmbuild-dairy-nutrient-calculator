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

	.factory('AnimalPurchased', function (Validations) {

		var AnimalPurchased = {},
				_isNumber = Validations.isNumber;

		AnimalPurchased.incoming = [];

		/**
		 * Calculates total nutrient imported on to the farm in animals
		 * @method calculate
		 * @param {!array} incomings - Array of purchased animals, each item contains details of the animal {type, count}
		 * @returns {object} nutrient data of animals purchased
		 * @public
		 * @static
		 */

		AnimalPurchased.calculate = function(incomings) {

			AnimalPurchased.incoming = incomings;

			if(incomings.length === 0){
				return undefined;
			}

			return '';

		};

		AnimalPurchased.add = function(type, count) {
			count = parseInt(count);
			if(!_isNumber(count)){
				return undefined;
			}
			AnimalPurchased.incoming.push({
				type:type,
				count: count
			});
			return AnimalPurchased;
		};


		return AnimalPurchased;

	});
