/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientEfficiency
 * @module nutrientEfficiency
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientEfficiency',
  function (validations,
            $log) {
    var nutrientEfficiency = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

    /**
     * Calculates efficiency
     * @method efficiency
     * @param {!Number} importedValue
     * @param {!Number} exportedValue
     * @returns {Number} efficiency, undefined if the params are not positive number
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
     * Calculates efficiency
     * @method calculate
     * @param {!Object} The aggregated nutrientValues (use aggregator)
     * @returns {Object} efficiency of the farm
     * @public
     * @static
     */
    nutrientEfficiency.calculate = function (nutrientValues) {
      return {
        nitrogen: _efficiency(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg),
        potassium: _efficiency(nutrientValues.incomings.potassiumInKg, nutrientValues.outgoings.potassiumInKg),
        phosphorus: _efficiency(nutrientValues.incomings.phosphorusInKg, nutrientValues.outgoings.phosphorusInKg),
        sulphur: _efficiency(nutrientValues.incomings.sulphurInKg, nutrientValues.outgoings.sulphurInKg)
      }
    };

    return nutrientEfficiency;
  });