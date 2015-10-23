/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/  incomings  singleton
 * @private-module nutrientCalculator/  incomings
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