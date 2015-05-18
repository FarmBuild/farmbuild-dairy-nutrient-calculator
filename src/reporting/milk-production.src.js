/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * milkProduction
 * @module milkProduction
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('milkProduction',
  function (validations,
            $log) {
    var milkProduction = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

    return milkProduction;
  });