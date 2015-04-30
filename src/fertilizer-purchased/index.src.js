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

  .factory('fertilizerPurchased',
  function (validations, fertilizerDefaults, fertilizerTypes, fertilizerValidator, fertilizerCalculator,
            $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _isDefined = validations.isDefined,
      _fertilizer = [],
      calculator = fertilizerCalculator,
      validator = fertilizerValidator;

    fertilizerPurchased.calculate = function(fertilizers) {
      $log.info('fertilizerPurchased.calculate...');
      if(!validator.validateAll(fertilizers)) {
        $log.error('fertilizerPurchased.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      return calculator.calculate(fertilizers);
    }

    return fertilizerPurchased;
  });