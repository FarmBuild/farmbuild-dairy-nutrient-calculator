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

			if (!milkSoldPerYearInLitre || !milkProteinPercentage || !milkFatPercentage) {
				return undefined;
			}

			if(!_isNumber(milkSoldPerYearInLitre) || !_isNumber(milkProteinPercentage) || !_isNumber(milkFatPercentage)){
				return undefined;
			}

			if(milkProteinPercentage + milkFatPercentage > 100){
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

			if (!milkSoldPerYearInLitre || !milkFatInKg || !milkProteinInKg) {
				return undefined;
			}

			if(!_isNumber(milkSoldPerYearInLitre) || !_isNumber(milkProteinInKg) || !_isNumber(milkFatInKg)){
				return undefined;
			}

			if(milkFatInKg + milkProteinInKg > milkSoldPerYearInLitre){
				return undefined;
			}

			milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
			milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
			return _nutrientInMilkSold(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);

		};

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
