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
	.factory('nutrientCalculator',
  function (milkSold,
            cowsPurchased, cowsCulled, cows,
            foragesPurchased, fertilizersPurchased, concentratesPurchased,
            legumes,
            nutrientCalculatorSession,
            farmdata,
            validations,
            googleAnalyticsCalculator,
            $log) {
		var nutrientCalculator = {farmdata:farmdata},
			_isPositiveNumber = validations.isPositiveNumber,
			_isDefined = validations.isDefined;

    // Provide a shortcut for modules
    nutrientCalculator.milkSold = milkSold;
    nutrientCalculator.cowsPurchased = cowsPurchased;
    nutrientCalculator.cowsCulled = cowsCulled;
    nutrientCalculator.foragesPurchased = foragesPurchased;
    nutrientCalculator.fertilizersPurchased = fertilizersPurchased;
    nutrientCalculator.concentratesPurchased = concentratesPurchased;
    nutrientCalculator.legumes = legumes;
    nutrientCalculator.version = '0.1.0';
    nutrientCalculator.ga = googleAnalyticsCalculator;
    nutrientCalculator.session = nutrientCalculatorSession;

		$log.info('Welcome to Farm Dairy Nutrient Calculator... ' +
      'this should only be initialised once! why we see twice in the example?');
    function createDefault() {
      return {
        summary: {
          milkingAreaInHa: 0,
          averageCowWeightInKg: 0,
          numberOfMilkingCows: 0,
          numberOfMilkingDays: 365
        },
        milkSold: {},
        cowsCulled: cows.createDefault(),
        cowsPurchased: cows.createDefault(),
        fertilizersPurchased: fertilizersPurchased.createDefault(),
        foragesPurchased: foragesPurchased.createDefault(),
        legumes: {},
        concentratesPurchased: concentratesPurchased.createDefault(),
        balance:{},
        efficiency:{}
      };
    }

    /**
     * Finds the farmData from the session.
     * @method find
     * @returns {object} the farmData stored in session, undefined if the farmData is found in session
     * @public
     * @static
     */
    nutrientCalculator.find = function () {
      return nutrientCalculatorSession.find();
    }

		/**
		 * Loads the farmData into session.
     * If the farmData has no nutrientCalculator section, then append one
		 * @method load
		 * @param {!object} farmData -
		 * @returns {object} the farmData stored in session, undefined if the farmData is invalid
		 * @public
		 * @static
		 */
		nutrientCalculator.load = function (farmData) {
      var loaded = farmdata.load(farmData);

			if (!_isDefined(loaded)) {
				return undefined;
			}

			if (!loaded.hasOwnProperty('nutrientCalculator')) {
        loaded.nutrientCalculator = createDefault();
        loaded = farmdata.update(loaded);
			}

			return loaded;
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
					outgoings.nitrogenInKg += data[key].nitrogenInKg;
					outgoings.potassiumInKg += data[key].potassiumInKg;
					outgoings.phosphorusInKg += data[key].phosphorusInKg;
					outgoings.sulphurInKg += data[key].sulphurInKg;
				};

			//Imported values
			if (_isDefined(data.milkSold)) {
				addOutgoings('milkSold')
			}
			if (_isDefined(data.cowsCulled)) {
				addOutgoings('cowsCulled')
			}

			//Exported values
			if (_isDefined(data.cowsPurchased)) {
				addIncomings('cowsPurchased');
			}
			if (_isDefined(data.concentratesPurchased)) {
				addIncomings('concentratesPurchased');
			}
			if (_isDefined(data.foragesPurchased)) {
				addIncomings('foragesPurchased');
			}
			if (_isDefined(data.fertilizersPurchased)) {
				addIncomings('fertilizersPurchased');
			}
			if (_isDefined(data.legumes)) {
				incomings.nitrogenInKg += data.legumes.averageNitrogenAppliedPerHaInKg;
				incomings.nitrogenInKg += data.legumes.availableNitrogenFromLegumesPerHaInKg;
				incomings.nitrogenInKg += data.legumes.availableNitrogenToPasturePerHaInKg;
			}

			return {
				incomings: incomings,
				outgoings: outgoings
			}
		}

	  /**
	   * Calculates efficiency
	   * @method efficiency
	   * @param {!Object} farmData
	   * @returns {Object} efficiency of the farm
	   * @public
	   * @static
	   */
		nutrientCalculator.efficiency = function (farmData) {
			var nutrientValues = _nutrientValues(farmData);
			return {
				nitrogen: _efficiency(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg),
				potassium: _efficiency(nutrientValues.incomings.potassiumInKg, nutrientValues.outgoings.potassiumInKg),
				phosphorus: _efficiency(nutrientValues.incomings.phosphorusInKg, nutrientValues.outgoings.phosphorusInKg),
				sulphur: _efficiency(nutrientValues.incomings.sulphurInKg, nutrientValues.outgoings.sulphurInKg)
			}
		};

	  /**
	   * Calculates balance
	   * @method balance
	   * @param {!Object} farmData
	   * @returns {Object} balance of the farm
	   * @public
	   * @static
	   */
		nutrientCalculator.balance = function (farmData) {
			var nutrientValues = _nutrientValues(farmData), milkingArea = farmData.nutrientCalculator.summary.milkingAreaInHa;
			return {
				nitrogen: _balance(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg, milkingArea),
				potassium: _balance(nutrientValues.incomings.potassiumInKg, nutrientValues.outgoings.potassiumInKg, milkingArea),
				phosphorus: _balance(nutrientValues.incomings.phosphorusInKg, nutrientValues.outgoings.phosphorusInKg, milkingArea),
				sulphur: _balance(nutrientValues.incomings.sulphurInKg, nutrientValues.outgoings.sulphurInKg, milkingArea)
			}
		};

    /**
     * Calculates balance and updates the farmData
     * @method balance
     * @param {!Object} farmData
     * @returns {Object} the farmData calculated
     * @public
     * @static
     */
    nutrientCalculator.calculate = function (farmData) {
      farmData.nutrientCalculator.balance = nutrientCalculator.balance(farmData);
      farmData.nutrientCalculator.efficiency = nutrientCalculator.efficiency(farmData);
      return farmdata.update(farmData);
    };

		if (typeof window.farmbuild === 'undefined') {
			window.farmbuild = {
				nutrientcalculator: nutrientCalculator
			};
		} else {
			window.farmbuild.nutrientcalculator = nutrientCalculator;
		}

		return nutrientCalculator;
	});