/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerValidator singleton
 * @private-module nutrientCalculator/fertilizerValidator
 */
angular.module('farmbuild.nutrientCalculator')
.factory('fertilizerValidator',
  function (nutrientMediumValidator,
            $log) {

    var fertilizerValidator = {};

     function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);
      return nutrientMediumValidator.validate(fertilizer);
    };

    fertilizerValidator.validate = _validate;

    fertilizerValidator.validateAll = function(fertilizers) {
      return nutrientMediumValidator.validateAll(fertilizers);
    }


    return fertilizerValidator;
  });