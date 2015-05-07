/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/concentrateValidator singleton
 * @private-module nutrientCalculator/concentrateValidator
 */
angular.module('farmbuild.nutrientCalculator')
.factory('concentrateValidator',
  function (validations, concentrateTypes,
            $log) {

    var concentrateValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isEmpty = validations.isEmpty;

     function _validate(concentrate) {
      $log.info('validating concentrate...', concentrate);

      if (!_isDefined(concentrate.type) || !_isDefined(concentrate.weight) || !_isDefined(concentrate.isDry)) {
        $log.error('invalid concentrate, must have type, weight and isDry: %j', concentrate);
        return false;
      }

      return concentrateTypes.validate(concentrate.type);
    };

    concentrateValidator.validate = _validate;

    concentrateValidator.validateAll = function(concentrates) {
      if(!_isArray(concentrates)|| _isEmpty(concentrates)) {
        return false;
      }

      var i = 0;
      for (i; i < concentrates.length; i++) {
        var concentrate = concentrates[i];

        if (!_validate(concentrate)) {
          $log.error('validator invalid at %s: %j', i, concentrate);
          return false;
        }
      }
      return true;
    }


    return concentrateValidator;
  });