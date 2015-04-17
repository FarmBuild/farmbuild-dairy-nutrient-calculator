/**
* @since 0.0.1
* @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
* @license The MIT License
* @author Spatial Vision
* @version 0.0.1
*/

'use strict';

/**
 * nutrientCalculator/MilkSold class
 * @module nutrientCalculator/MilkSold
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('MilkSold', function (Validations) {

		var MilkSold = {},
				_isNumber = Validations.isNumber;

		/**
		 * Calculates nutrient from milk sold, input values are in percentage
		 * @method calculateByPercent
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkProteinPercentage - Percentage of milk protein, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkFatPercentage - Percentage of milk fat, value must be > 0 and can have up to 2 decimal places
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		MilkSold.calculateByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			var milkProteinInKg, milkFatInKg;

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinPercentage = parseFloat(milkProteinPercentage);
			milkFatPercentage = parseFloat(milkFatPercentage);

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage, '%')){
				return undefined;
			}

			milkProteinInKg = _percentageToKg(milkProteinPercentage, milkSoldPerYearInLitre);
			milkFatInKg = _percentageToKg(milkFatPercentage, milkSoldPerYearInLitre);
			return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Calculates nutrient from milk sold, input values are in Kg
		 * @method calculateByKg
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kilograms, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kilograms, value must be > 0 and can have up to 2 decimal places
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		MilkSold.calculateByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			var milkProteinPercentage, milkFatPercentage;

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinInKg = parseFloat(milkProteinInKg);
			milkFatInKg = parseFloat(milkFatInKg);

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg, 'kg')){
				return undefined;
			}

			milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
			milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
			return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Returns true if input values are valid
		 * @method _validateInputs
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkProtein - Quantity of milk fat in Kilograms/Percentage, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkFat - Quantity of milk protein in Kilograms/Percentage, value must be > 0 and can have up to 2 decimal places
		 * @param {!string} unit - Percentage or Kg
		 * @returns {boolean} validity of input values
		 * @private
		 */
		function _validateInputs(milkSoldPerYearInLitre, milkProtein, milkFat, unit){

			if (!milkSoldPerYearInLitre || !milkProtein || !milkFat || !unit) {
				return false;
			}

			if(!_isNumber(milkSoldPerYearInLitre) || !_isNumber(milkProtein) || !_isNumber(milkFat)){
				return false;
			}

			if(milkSoldPerYearInLitre < 0 || milkProtein < 0 || milkFat < 0){
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
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kilograms, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kilograms, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkProteinPercentage - Percentage of milk protein, value must be > 0 and can have up to 2 decimal places
		 * @param {!number} milkFatPercentage - Percentage of milk fat, value must be > 0 and can have up to 2 decimal places
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
				totalPerYearInLitre: _toFixNumber(milkSoldPerYearInLitre, 2),
				fatInKg: _toFixNumber(milkFatInKg, 2),
				fatPercentage: _toFixNumber(milkFatPercentage, 2),
				proteinInKg: _toFixNumber(milkProteinInKg, 2),
				proteinPercentage: _toFixNumber(milkProteinPercentage, 2),
				nitrogenInKg: _toFixNumber(nitrogenInKg, 2),
				nitrogenPercentage: _toFixNumber(nitrogenPercentage, 2),
				phosphorusInKg: _toFixNumber(phosphorusInKg, 2),
				phosphorusPercentage: _toFixNumber(phosphorusPercentage, 2),
				potassiumInKg: _toFixNumber(potassiumInKg, 2),
				potassiumPercentage: _toFixNumber(potassiumPercentage, 2),
				sulphurInKg: _toFixNumber(sulphurInKg, 2),
				sulphurPercentage: _toFixNumber(sulphurPercentage, 2)
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

		/**
		 * Returns round the value with decimalPrecision passed
		 * @method _isNumber
		 * @param {!number} decimalPrecision - The value to be examined as a number
		 * @param {!number} value - The value to be examined as a number
		 * @returns {number}
		 * @private
		 */
		function _toFixNumber(value, decimalPrecision) {
			return parseFloat(value.toFixed(decimalPrecision));
		}

		return MilkSold;

	});
