/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * feedBalance
 * @module feedBalance
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('feedBalance',
  function (validations,
            $log) {
    var feedBalance = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

    return feedBalance;
  });