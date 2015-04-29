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

  .factory('fertilizerPurchased', function (validations, fertilizers, $log) {

    var fertilizer = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _types = angular.copy(fertilizers.types),
      _fertilizer = [];

    return fertilizer;
  });