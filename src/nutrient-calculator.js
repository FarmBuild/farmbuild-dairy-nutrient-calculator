/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator
 * @module nutrientCalculator
 */
angular.module('farmbuild.nutrientCalculator', ['farmbuild.core','farmbuild.farmdata'])

	.factory('nutrientCalculator', function (milkSold, cowsPurchased, cowsCulled, foragesPurchased, fertilizersPurchased, legumes, farmdata, $log) {
		var nutrientCalculator = {};

		$log.info('Welcome to Farm Dairy Nutrient Calculator... this should only be initialised once! why we see twice in the example?');

		/**
		 * Adds nutrientCalculator block to farmData
		 * @method load
		 * @param {!object} farmData - Saved farm data or default in case of new
		 * @returns {object} updated farmData
		 * @public
		 * @static
		 */
		nutrientCalculator.load = function (toLoad) {
			if (!farmdata.isFarmData(toLoad)) {
				return undefined;
			}

			if (!toLoad.nutrientCalculator) {
				toLoad.nutrientCalculator = {
					milkSold: {},
					cowsCulled: {},
					cowsPurchased: {},
					fertilizersPurchased: {},
					foragesPurchased: {},
					legumes: {},
					concentratesPurchased: {}
				};
			}
			return toLoad;
		};

		/**
		 * Calculates efficiency
		 * @method efficiency
		 * @param {!Number} importedValue
		 * @param {!Number} exportedValue
		 * @returns {Number} efficiency
		 * @private
		 * @static
		 */
		function _efficiency(importedValue, exportedValue) {
			if (!_isPositiveNumber(importedValue) || !_isPositiveNumber(exportedValue)) {
				return undefined;
			}

			return (exportedValue / importedValue ) * 100;
		};

		/**
		 * Calculates balance
		 * @method balance
		 * @param {!Number} importedValue
		 * @param {!Number} exportedValue
		 * @param {!Number} milkingArea
		 * @returns {Number} balance
		 * @private
		 * @static
		 */
		function _balance(importedValue, exportedValue, milkingArea) {
			if (!_isPositiveNumber(importedValue) || !_isPositiveNumber(exportedValue) || !_isPositiveNumber(milkingArea)) {
				return undefined;
			}

			return (importedValue - exportedValue) / milkingArea;
		};

		function _nutrientValues(farmData) {
			var data = farmData.nutrientCalculator,
				exportedNitrogenInKg = 0,
				incomings = {
					nitrogenInKg: 0,
					potassiumInKg: 0,
					phosphorusInKg: 0,
					sulphurInKg: 0
				},
				outgoings = {
					nitrogenInKg: 0,
					potassiumInKg: 0,
					phosphorusInKg: 0,
					sulphurInKg: 0
				}, addIncomings = function (key) {
					incomings.nitrogenInKg += data[key].nitrogenInKg;
					incomings.potassiumInKg += data[key].potassiumInKg;
					incomings.phosphorusInKg += data[key].phosphorusInKg;
					incomings.sulphurInKg += data[key].sulphurInKg;
				}, addOutgoings = function (key) {
					incomings.nitrogenInKg += data[key].nitrogenInKg;
					incomings.potassiumInKg += data[key].potassiumInKg;
					incomings.phosphorusInKg += data[key].phosphorusInKg;
					incomings.sulphurInKg += data[key].sulphurInKg;
				};

			//Imported values
			if (_isDefined(data.milkSold)) {
				addIncomings('milkSold')
			}
			if (_isDefined(data.cowsCulled)) {
				addIncomings('cowsCulled')
			}

			//Exported values
			if (_isDefined(data.cowsPurchased)) {
				addOutgoings('cowsPurchased');
			}
			if (_isDefined(data.concentratesPurchased)) {
				addOutgoings('concentratesPurchased');
			}
			if (_isDefined(data.foragesPurchased)) {
				addOutgoings('foragesPurchased');
			}
			if (_isDefined(data.fertilizersPurchased)) {
				addOutgoings('fertilizersPurchased');
			}

			return {
				incomings: incomings,
				outgoings: outgoings
			}
		}

		nutrientCalculator.efficiency = function (farmData) {
			var nutrientValues = _nutrientValues(farmData);
			return {
				nitrogen: _efficiency(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg)
			}
		};

		nutrientCalculator.balance = function (farmData) {
			var nutrientValues = _nutrientValues(farmData), milkingArea = farmData.nutrientCalculator.summary.milkingAreaInHa;
			return {
				nitrogen: _balance(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg, milkingArea)
			}
		};

		// Provide a shortcut for modules
		nutrientCalculator.milkSold = milkSold;
		nutrientCalculator.cowsPurchased = cowsPurchased;
		nutrientCalculator.cowsCulled = cowsCulled;
		nutrientCalculator.foragesPurchased = foragesPurchased;
		nutrientCalculator.fertilizersPurchased = fertilizersPurchased;
		nutrientCalculator.legumes = legumes;
		nutrientCalculator.version = '0.1.0';

		if (typeof window.farmbuild === 'undefined') {
			window.farmbuild = {
				nutrientcalculator: nutrientCalculator
			};
		} else {
			window.farmbuild.nutrientcalculator = nutrientCalculator;
		}

		return nutrientCalculator;
	});