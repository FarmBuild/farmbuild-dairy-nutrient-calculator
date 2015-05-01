/**
* @since 0.0.1
* @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
* @license The MIT License
* @author Spatial Vision
* @version 0.1.0
*/

'use strict';

/**
 * nutrientCalculator/milkSold singleton
 * @module nutrientCalculator/milkSold
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('milkSold', function (validations) {

		var milkSold = {},
				_isPositiveNumber = validations.isPositiveNumber;

		/**
		 * Calculates nutrient from milk sold, input values are in percentage
		 * @method calculateByPercent
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0
		 * @param {!number} milkProteinPercentage - Percentage of milk protein, value must be > 0
		 * @param {!number} milkFatPercentage - Percentage of milk fat, value must be > 0
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		milkSold.calculateByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			var milkProteinInKg, milkFatInKg;

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage, '%')){
				return undefined;
			}

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinPercentage = parseFloat(milkProteinPercentage);
			milkFatPercentage = parseFloat(milkFatPercentage);

			milkProteinInKg = _percentageToKg(milkProteinPercentage, milkSoldPerYearInLitre);
			milkFatInKg = _percentageToKg(milkFatPercentage, milkSoldPerYearInLitre);
			return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Calculates nutrient from milk sold, input values are in Kg
		 * @method calculateByKg
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kg, value must be > 0
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kg, value must be > 0
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		milkSold.calculateByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			var milkProteinPercentage, milkFatPercentage;

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg, 'kg')){
				return undefined;
			}

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinInKg = parseFloat(milkProteinInKg);
			milkFatInKg = parseFloat(milkFatInKg);

			milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
			milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
			return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Returns true if input values are valid
		 * @method _validateInputs
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0
		 * @param {!number} milkProtein - Quantity of milk fat in Kg/Percentage, value must be > 0
		 * @param {!number} milkFat - Quantity of milk protein in Kg/Percentage, value must be > 0
		 * @param {!string} unit - Percentage or Kg
		 * @returns {boolean} validity of input values
		 * @private
		 */
		function _validateInputs(milkSoldPerYearInLitre, milkProtein, milkFat, unit){

			if (!milkSoldPerYearInLitre || !milkProtein || !milkFat || !unit) {
				return false;
			}

			if(!_isPositiveNumber(milkSoldPerYearInLitre) || !_isPositiveNumber(milkProtein) || !_isPositiveNumber(milkFat)){
				return false;
			}

			if(unit === '%' && milkProtein + milkFat > 100){
				return false;
			}

			if(unit === 'kg' && milkProtein + milkFat > milkSoldPerYearInLitre){
				return false;
			}

			return true;

		}

		/**
		 * Returns nutrient data of milk
		 * @method _calculate
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kilograms, value must be > 0
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kilograms, value must be > 0
		 * @param {!number} milkProteinPercentage - Percentage of milk protein, value must be > 0
		 * @param {!number} milkFatPercentage - Percentage of milk fat, value must be > 0
		 * @returns {object} milk nutrient data
		 * @private
		 */
		function _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage) {

			var nitrogenPercentage = milkProteinPercentage / 6.33,
				phosphorusPercentage = (0.0111 * milkFatPercentage + 0.05255),
				potassiumPercentage = 0.14, sulphurPercentage = 0.06,
				nitrogenInKg = (milkSoldPerYearInLitre * nitrogenPercentage / 100),
				potassiumInKg = (milkSoldPerYearInLitre * potassiumPercentage / 100),
				sulphurInKg = (milkSoldPerYearInLitre * sulphurPercentage / 100),
				phosphorusInKg = (milkSoldPerYearInLitre * phosphorusPercentage / 100);

			return {
				totalPerYearInLitre: milkSoldPerYearInLitre,
				fatInKg: milkFatInKg,
				fatPercentage: milkFatPercentage,
				proteinInKg: milkProteinInKg,
				proteinPercentage: milkProteinPercentage,
				nitrogenInKg: nitrogenInKg,
				nitrogenPercentage: nitrogenPercentage,
				phosphorusInKg: phosphorusInKg,
				phosphorusPercentage: phosphorusPercentage,
				potassiumInKg: potassiumInKg,
				potassiumPercentage: potassiumPercentage,
				sulphurInKg: sulphurInKg,
				sulphurPercentage: sulphurPercentage
			};

		}

		/**
		 * Returns nutrient value in percentage
		 * @method _kgToPercentage
		 * @param {!number} valueInKg - Quantity of milk protein in Kilograms
		 * @param {!number} totalInLitre - Percentage of milk protein
		 * @returns {number} nutrient value in percentage
		 * @private
		 */
		function _kgToPercentage(valueInKg, totalInLitre) {
			return (valueInKg / totalInLitre) * 100;
		}

		/**
		 * Returns nutrient value in Kg
		 * @method _percentageToKg
		 * @param {!number} valuePercentage - Quantity of milk protein in Kilograms
		 * @param {!number} totalInLitre - Percentage of milk protein
		 * @returns {number} nutrient value in Kg
		 * @private
		 */
		function _percentageToKg(valuePercentage, totalInLitre) {
			return (valuePercentage * totalInLitre) / 100;
		}

		return milkSold;

	});
