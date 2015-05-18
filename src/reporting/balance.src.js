/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientBalance
 * @module nutrientBalance
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientBalance',
  function (validations,
            $log) {
    var nutrientBalance = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

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

    /**
     * Calculates balance
     * @method calculate
     * @param {!Object} farmData
     * @returns {Object} balance of the farm
     * @public
     * @static
     */
    nutrientBalance.calculate = function (nutrientValues, milkingArea) {
      return {
        nitrogen: _balance(nutrientValues.incomings.nitrogenInKg, nutrientValues.outgoings.nitrogenInKg, milkingArea),
        potassium: _balance(nutrientValues.incomings.potassiumInKg, nutrientValues.outgoings.potassiumInKg, milkingArea),
        phosphorus: _balance(nutrientValues.incomings.phosphorusInKg, nutrientValues.outgoings.phosphorusInKg, milkingArea),
        sulphur: _balance(nutrientValues.incomings.sulphurInKg, nutrientValues.outgoings.sulphurInKg, milkingArea)
      }
    };

    return nutrientBalance;
  });