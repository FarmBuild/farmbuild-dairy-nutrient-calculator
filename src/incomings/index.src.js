/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/  incomings  singleton
 * @module nutrientCalculator/  incomings 
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('incomings', function (validations, $log) {

    var   incomings  = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _fertilizer = [];

    return   incomings;
  });