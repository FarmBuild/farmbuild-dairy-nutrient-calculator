/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.
 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/concentrateCalculator singleton
 * @private-module nutrientCalculator/concentrateCalculator
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('concentrateCalculator', 
  function (nutrientMediumCalculator, nutrientMediumValidator,
            concentrateDefaults, concentrateTypes, $log) {
    var calculator = {},
      validator = nutrientMediumValidator;

    function createResult(total) {
      return {
        concentrates: total.incomings,
        weight: total.weight,
        dryMatterWeight: total.dryMatterWeight,
        nitrogenInKg: total.nitrogenInKg,
        nitrogenPercentage: 0,
        phosphorusInKg: total.phosphorusInKg,
        phosphorusPercentage: 0,
        potassiumInKg: total.potassiumInKg,
        potassiumPercentage: 0,
        sulphurInKg: total.sulphurInKg,
        sulphurPercentage: 0,
        metabolisableEnergyInMJ: 0,
        metabolisableEnergyInMJPerKg: 0
      };
    }

    function _calculatePercentage(nutrientWeight, totalWeight) {
      return (nutrientWeight / totalWeight) * 100
    }

    function _calculatePercentages(total) {
      var result = createResult(total);

      result.nitrogenPercentage = _calculatePercentage(total.nitrogenInKg, total.dryMatterWeight);
      result.phosphorusPercentage = _calculatePercentage(total.phosphorusInKg, total.dryMatterWeight);
      result.potassiumPercentage = _calculatePercentage(total.potassiumInKg, total.dryMatterWeight);
      result.sulphurPercentage = _calculatePercentage(total.sulphurInKg, total.dryMatterWeight);
      result.metabolisableEnergyInMJ = total.metabolisableEnergyInMJ;
      result.metabolisableEnergyInMJPerKg = total.metabolisableEnergyInMJPerKg;

      return result;
    }

    function _createTotal() {
      return {
        weight:0,
        dryMatterWeight:0,
        nitrogenInKg:0,
        phosphorusInKg:0,
        potassiumInKg:0,
        sulphurInKg:0,
        metabolisableEnergyInMJ: 0,
        metabolisableEnergyInMJPerKg: 0,
        incomings:[]
      }
    }

    function _calculateNutrientWeight(weight, percentage) {
      return (weight * percentage) / 100;
    }

    function calculateDryMatterWeight(weight, dryMatterPercentage, isDry) {
      return (isDry?weight:_calculateNutrientWeight(weight, dryMatterPercentage));
    }

    calculator.calculateDryMatterWeight = calculateDryMatterWeight;

    function updateTotal(concentrate, total) {
      var type = concentrate.type,
        weight = concentrate.weight,
        dryMatterWeight = calculateDryMatterWeight(weight, type.dryMatterPercentage, concentrate.isDry)
        ;

      total.weight += weight;
      total.dryMatterWeight += dryMatterWeight;
      total.nitrogenInKg += _calculateNutrientWeight(dryMatterWeight, type.nitrogenPercentage);
      total.phosphorusInKg += _calculateNutrientWeight(dryMatterWeight, type.phosphorusPercentage);
      total.potassiumInKg += _calculateNutrientWeight(dryMatterWeight, type.potassiumPercentage);
      total.sulphurInKg += _calculateNutrientWeight(dryMatterWeight, type.sulphurPercentage);
      total.metabolisableEnergyInMJ += (dryMatterWeight * type.metabolisableEnergyInMJPerKg);
      total.metabolisableEnergyInMJPerKg = type.metabolisableEnergyInMJPerKg;
      total.incomings.push({
        type: concentrate.type,
        weight: concentrate.weight,
        isDry: concentrate.isDry
      });

      return total;
    }

    function calculateAll(concentrates) {
      $log.info('calculator.calculateAll...');
      var i = 0,
        total = _createTotal();

      for (i; i < concentrates.length; i++) {
        var concentrate = concentrates[i];

        if (!validator.validate(concentrate)) {
          $log.error('calculator.calculateAll invalid concentrate at %s: %j', i, concentrate);
          return undefined;
        }

        total = updateTotal(concentrate, total);
      }

      return total;
    }

    calculator.calculate = function(concentrates) {
      var itemsTotal = calculateAll(concentrates);

      return _calculatePercentages(itemsTotal);
    }

    return calculator;
  });