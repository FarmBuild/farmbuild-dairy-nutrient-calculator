/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerPurchased singleton
 * @module nutrientCalculator/fertilizerPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('fertilizerPurchased', function (validations, fertilizerDefaults, fertilizerTypes, $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _fertilizer = [];

    function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);

      if (!_isDefined(fertilizer.type) || !_isDefined(fertilizer.weight) || !_isDefined(fertilizer.isDry)) {
        $log.error('invalid fertilizer, must have type, weight and isDry: %j', fertilizer);
        return false;
      }

      return fertilizerTypes.validate(fertilizer.type);
    };

    function createResult() {
      return {
        fertilizers: [],
        weight: 0,
        dryMatterWeight: 0,
        nitrogenInKg: 0,
        nitrogenPercentage: 0,
        phosphorusInKg: 0,
        phosphorusPercentage: 0,
        potassiumInKg: 0,
        potassiumPercentage: 0,
        sulphurInKg: 0,
        sulphurPercentage: 0
      };
    }

    function calculateResult(itemsTotal) {
      var result = createResult();
      result.weight = itemsTotal.weight;
      result.dryMatterWeight = itemsTotal.dryMatterWeight;
      result.nitrogenInKg = itemsTotal.nitrogenInKg;
      result.nitrogenPercentage = (itemsTotal.nitrogenInKg / itemsTotal.dryMatterWeight) * 100;

      return result;
    }

    function createItemsTotal() {
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

    function calculateFertilizer(fertilizer, itemsTotal) {
      var weight = fertilizer.weight,
        dryMatterWeight = (fertilizer.isDry?weight:(weight * fertilizer.type.dryMatterPercentage) / 100),
        type = fertilizer.type;

      itemsTotal.weight += weight;
      itemsTotal.dryMatterWeight += dryMatterWeight;
      itemsTotal.nitrogenInKg += (type.nitrogenPercentage * dryMatterWeight) / 100;
      //nitrogenInKg += (type.nitrogenPercentage * dmWeight) / 100;

      itemsTotal.incomings.push({
        type: fertilizer.type,
        weight: fertilizer.weight,
        isDry: fertilizer.isDry
      });

      return itemsTotal;
    }

    function calculateItemsTotal(fertilizers) {
      $log.info('calculateItemsTotal...');
      var i = 0,
        itemsTotal = createItemsTotal();

      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i];

        if (!_validate(fertilizer)) {
          $log.error('calculateItemsTotal invalid fertilizer at %s: %j', i, fertilizer);
          return undefined;
        }

        itemsTotal = calculateFertilizer(fertilizer, itemsTotal);
      }

      return itemsTotal;
    }

    fertilizerPurchased.calculate = function(fertilizers) {
      $log.info('fertilizerPurchased.calculate...');

      var itemsTotal = calculateItemsTotal(fertilizers);

      if(!_isDefined(itemsTotal)) {
        $log.error('fertilizerPurchased.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      return calculateResult(itemsTotal);
    }

    return fertilizerPurchased;
  });