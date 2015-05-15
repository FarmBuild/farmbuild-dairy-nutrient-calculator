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
 * nutrientCalculator/cowValidator singleton
 * @private-module nutrientCalculator/cowValidator
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('cowValidator',
  function (validations,cowTypes,
            $log) {
    var cowValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty;

    function _validate(cow) {
      $log.info('validating cow...', cow);

      if (!_isDefined(cow.name) ||
        !_isDefined(cow.weight) ||
        !_isPositiveNumber(cow.weight) ||
        !_isDefined(cow.numberOfCows) ||
        !_isPositiveNumber(cow.numberOfCows)) {
        $log.error('invalid, must have name, weight (positive number) and numberOfCows: %j', cow);
        return false;
      }

      return true;
    };

    cowValidator.validate = _validate;

    cowValidator.validateAll = function(items) {
      if(!_isArray(items) || _isEmpty(items)) {
        return false;
      }

      var i = 0;
      for (i; i < items.length; i++) {
        var item = items[i];

        if (!_validate(item)) {
          $log.error('validator invalid at %s: %j', i, item);
          return false;
        }
      }
      return true;
    }


    return cowValidator;
  });