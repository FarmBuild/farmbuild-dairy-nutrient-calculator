//http://www.biology-online.org/dictionary/Nutrient_medium
/**
 * nutrientMedium
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/nutrientMediumValidator singleton
 * @private-module nutrientCalculator/nutrientMediumValidator
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientMediumValidator',
  function (validations,nutrientMediumTypes,
            $log) {
    var nutrientMediumValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty;

    function _validate(nutrientMedium) {
      $log.info('validating nutrientMedium...', nutrientMedium);

      if (!_isDefined(nutrientMedium.type) ||
        !_isDefined(nutrientMedium.weight) ||
        !_isPositiveNumber(nutrientMedium.weight) ||
        !_isDefined(nutrientMedium.isDry)) {
        $log.error('invalid, must have type (must pass type validate), weight (positive number) and isDry (boolean): %j', nutrientMedium);
        return false;
      }

      return nutrientMediumTypes.validate(nutrientMedium.type);
    };

    nutrientMediumValidator.validate = _validate;

//    nutrientMediumValidator.validateAll = function(fertilizers) {
//      if(!_isArray(fertilizers) || _isEmpty(fertilizers)) {
//        return false;
//      }
//
//      var i = 0;
//      for (i; i < fertilizers.length; i++) {
//        var fertilizer = fertilizers[i];
//
//        if (!_validate(fertilizer)) {
//          $log.error('validator invalid at %s: %j', i, fertilizer);
//          return false;
//        }
//      }
//      return true;
//    }


    return nutrientMediumValidator;
  });