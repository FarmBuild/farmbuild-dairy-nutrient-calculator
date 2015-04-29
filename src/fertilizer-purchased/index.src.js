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

  .factory('fertilizerPurchased', function (validations, fertilizerValues, fertilizerTypes, $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _types = angular.copy(fertilizerValues.types),
      _fertilizer = [];

    function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);

      if (!_isDefined(fertilizer.type) || !_isDefined(fertilizer.weight) || !_isDefined(fertilizer.isDry)) {
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
      var weight = fertilizer.weight;

      itemsTotal.weight += weight;
      itemsTotal.incomings.push({
        type: fertilizer.type,
        weight: fertilizer.weight,
        isDry: fertilizer.isDry
      });

      return itemsTotal;
    }

    function calculateItemsTotal(fertilizers) {
      var i = 0,
        itemsTotal = createItemsTotal();

      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i];

        if (!_validate(fertilizer)) {
          return undefined;
        }

        itemsTotal = calculateFertilizer(fertilizer, itemsTotal);
      }

      return itemsTotal;
    }

    fertilizerPurchased.calculate = function(fertilizers) {
      var itemsTotal = {},
        result = createResult();

      itemsTotal = calculateItemsTotal(fertilizers);

      result.weight = itemsTotal.weight;
      return result;

    }

    return fertilizerPurchased;
  });