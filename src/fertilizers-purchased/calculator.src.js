/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerCalculator singleton
 * @private-module nutrientCalculator/fertilizerCalculator
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('fertilizerCalculator', function (fertilizerValidator, fertilizerDefaults, fertilizerTypes, $log) {
    var calculator = {},
      validator = fertilizerValidator;

    function createResult(total) {
      return {
        fertilizers: total.incomings,
        weight: total.weight,
        dryMatterWeight: total.dryMatterWeight,
        nitrogenInKg: total.nitrogenInKg,
        nitrogenPercentage: 0,
        phosphorusInKg: total.phosphorusInKg,
        phosphorusPercentage: 0,
        potassiumInKg: total.potassiumInKg,
        potassiumPercentage: 0,
        sulphurInKg: total.sulphurInKg,
        sulphurPercentage: 0
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

    function updateTotal(fertilizer, total) {
      var type = fertilizer.type,
        weight = fertilizer.weight,
        dryMatterWeight = calculateDryMatterWeight(weight, type.dryMatterPercentage, fertilizer.isDry)
        ;

      total.weight += weight;
      total.dryMatterWeight += dryMatterWeight;
      total.nitrogenInKg += _calculateNutrientWeight(dryMatterWeight, type.nitrogenPercentage);
      total.phosphorusInKg += _calculateNutrientWeight(dryMatterWeight, type.phosphorusPercentage);
      total.potassiumInKg += _calculateNutrientWeight(dryMatterWeight, type.potassiumPercentage);
      total.sulphurInKg += _calculateNutrientWeight(dryMatterWeight, type.sulphurPercentage);

      total.incomings.push({
        type: fertilizer.type,
        weight: fertilizer.weight,
        isDry: fertilizer.isDry
      });

      return total;
    }

    function calculateAll(fertilizers) {
      $log.info('calculator.calculateAll...');
      var i = 0,
        total = _createTotal();

      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i];

        if (!validator.validate(fertilizer)) {
          $log.error('calculator.calculateAll invalid fertilizer at %s: %j', i, fertilizer);
          return undefined;
        }

        total = updateTotal(fertilizer, total);
      }

      return total;
    }

    calculator.calculate = function(fertilizers) {
      var itemsTotal = calculateAll(fertilizers);

      return _calculatePercentages(itemsTotal);
    }

    return calculator;
  });