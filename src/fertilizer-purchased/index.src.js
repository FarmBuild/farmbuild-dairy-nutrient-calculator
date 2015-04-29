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

  .factory('fertilizerPurchased', function (validations, fertilizers, fertilizerTypes, $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _types = angular.copy(fertilizers.types),
      _fertilizer = [];

    function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);

      if (!_isDefined(fertilizer.type) || !_isDefined(fertilizer.weight) || !_isDefined(fertilizer.isDry)) {
        return false;
      }
      return fertilizerTypes.validate(fertilizer.type);
    };

    fertilizerPurchased.calculate = function(fertilizers) {
      var totalWeight = 0,
        incomings = [],
        i = 0
        ;
      
      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i]

        if (!_validate(fertilizer)) {
          return undefined;
        }

        var weight = fertilizer.weight;
        totalWeight += weight;
        incomings.push({
          type: fertilizer.type,
          weight: fertilizer.weight,
          isDry: fertilizer.isDry
        });

      }
      
      return {
        forages: incomings,
        weight: totalWeight
      }
    }

    return fertilizerPurchased;
  });