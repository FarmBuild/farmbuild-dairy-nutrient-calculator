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

	.factory('MilkSold', function () {

		var MilkSold = {};

		/**
		 * Calculates nutrient from milk sold, input values are in percentage
		 * @method nutrientOfMilkSoldByPercent
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre
		 * @param {!number} milkProteinPercentage - Percentage of milk protein
		 * @param {!number} milkFatPercentage - Percentage of milk fat
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		MilkSold.nutrientOfMilkSoldByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			var milkProteinInKg, milkFatInKg;

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinPercentage = parseFloat(milkProteinPercentage);
			milkFatPercentage = parseFloat(milkFatPercentage);

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage, '%')){
				return undefined;
			}

			milkProteinInKg = _percentageToKg(milkProteinPercentage, milkSoldPerYearInLitre);
			milkFatInKg = _percentageToKg(milkFatPercentage, milkSoldPerYearInLitre);
			return _nutrientInMilkSold(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Calculates nutrient from milk sold, input values are in Kg
		 * @method nutrientOfMilkSoldByKg
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kilograms
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kilograms
		 * @returns {object} milk nutrient data
		 * @public
		 * @static
		 */
		MilkSold.nutrientOfMilkSoldByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			var milkProteinPercentage, milkFatPercentage;

			milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
			milkProteinInKg = parseFloat(milkProteinInKg);
			milkFatInKg = parseFloat(milkFatInKg);

			if(!_validateInputs(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg, 'kg')){
				return undefined;
			}

			milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
			milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
			return _nutrientInMilkSold(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

		/**
		 * Returns true if input values are valid
		 * @method _validateInputs
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre
		 * @param {!number} milkProtein - Quantity of milk fat in Kilograms/Percentage
		 * @param {!number} milkFat - Quantity of milk protein in Kilograms/Percentage
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
		 * @method _nutrientInMilkSold
		 * @param {!number} milkSoldPerYearInLitre - Quantity of milk sold in a year in litre
		 * @param {!number} milkFatInKg - Quantity of milk fat in Kilograms
		 * @param {!number} milkProteinInKg - Quantity of milk protein in Kilograms.
		 * @param {!number} milkProteinPercentage - Percentage of milk protein
		 * @param {!number} milkFatPercentage - Percentage of milk fat
		 * @returns {object} milk nutrient data
		 * @private
		 */
		function _nutrientInMilkSold(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage) {

			var nitrogenPercentage = milkProteinPercentage / 6.33,
				phosphorusPercentage = (0.0111 * milkFatPercentage + 0.05255),
				potassiumPercentage = 0.14, sulphurPercentage = 0.06,
				nitrogenInKg = (milkSoldPerYearInLitre * nitrogenPercentage / 100),
				potassiumInKg = (milkSoldPerYearInLitre * potassiumPercentage / 100),
				sulphurInKg = (milkSoldPerYearInLitre * sulphurPercentage / 100),
				phosphorusInKg = (milkSoldPerYearInLitre * phosphorusPercentage / 100);

			return {
				milkSoldPerYearInLitre: milkSoldPerYearInLitre.toFixed(2),
				milkFatInKg: milkFatInKg.toFixed(2),
				milkFatPercentage: milkFatPercentage.toFixed(2),
				milkProteinInKg: milkProteinInKg.toFixed(2),
				milkProteinPercentage: milkProteinPercentage.toFixed(2),
				nitrogenInKg: nitrogenInKg.toFixed(2),
				nitrogenPercentage: nitrogenPercentage.toFixed(2),
				phosphorusInKg: phosphorusInKg.toFixed(2),
				phosphorusPercentage: phosphorusPercentage.toFixed(2),
				potassiumInKg: potassiumInKg.toFixed(2),
				potassiumPercentage: potassiumPercentage.toFixed(2),
				sulphurInKg: sulphurInKg.toFixed(2),
				sulphurPercentage: sulphurPercentage.toFixed(2)
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
		 * Returns true if value is a number
		 * @method _isNumber
		 * @param {!number} value - The value to be examined as a number
		 * @returns {boolean}
		 * @private
		 */
		function _isNumber(value) {
			return !isNaN(parseFloat(value)) && isFinite(value);
		}

		return MilkSold;

	});
