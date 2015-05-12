/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/forageValidator singleton
 * @private-module nutrientCalculator/forageValidator
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('forageValidator',
  function (validations, forageTypes,
            $log) {

    var forageValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isEmpty = validations.isEmpty;

    function _validate(forage) {
      $log.info('validating forage...', forage);

      if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
        $log.error('invalid forage, must have type, weight and isDry: %j', forage);
        return false;
      }

      return forageTypes.validate(forage.type);
    };

    forageValidator.validate = _validate;

    forageValidator.validateAll = function(forages) {
      if(!_isArray(forages)|| _isEmpty(forages)) {
        return false;
      }

      var i = 0;
      for (i; i < forages.length; i++) {
        var forage = forages[i];

        if (!_validate(forage)) {
          $log.error('validator invalid at %s: %j', i, forage);
          return false;
        }
      }
      return true;
    }


    return forageValidator;
  });