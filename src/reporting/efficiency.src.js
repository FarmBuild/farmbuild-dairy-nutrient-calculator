/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientEfficiency',
  function (validations,
            $log) {
    var nutrientEfficiency = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

    function _efficiency(importedValue, exportedValue) {
      if (!_isPositiveNumber(importedValue) || !_isPositiveNumber(exportedValue)) {
        return undefined;
      }

      return (exportedValue / importedValue ) * 100;
    };

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