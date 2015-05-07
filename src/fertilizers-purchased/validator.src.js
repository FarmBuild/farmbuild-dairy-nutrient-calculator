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
  function (validations, fertilizerTypes,
            $log) {

    var fertilizerValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty;

     function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);

      if (!_isDefined(fertilizer.type) ||
        !_isDefined(fertilizer.weight) ||
        !_isPositiveNumber(fertilizer.weight) ||
        !_isDefined(fertilizer.isDry)) {
        $log.error('invalid fertilizer, must have type, weight and isDry: %j', fertilizer);
        return false;
      }
      return fertilizerTypes.validate(fertilizer.type);
    };

    fertilizerValidator.validate = _validate;

    fertilizerValidator.validateAll = function(fertilizers) {
      if(!_isArray(fertilizers) || _isEmpty(fertilizers)) {
        return false;
      }

      var i = 0;
      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i];

        if (!_validate(fertilizer)) {
          $log.error('validator invalid at %s: %j', i, fertilizer);
          return false;
        }
      }
      return true;
    }


    return fertilizerValidator;
  });