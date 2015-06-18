/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/forageValidator singleton
 * @private-module nutrientCalculator/forageValidator
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('forageValidator',
  function (nutrientMediumValidator,
            $log) {

    var forageValidator = {};

    function _validate(forage) {
      $log.info('validating forage...', forage);
      return nutrientMediumValidator.validate(forage);
    };

    forageValidator.validate = _validate;

    forageValidator.validateAll = function(forages) {
      return nutrientMediumValidator.validateAll(forages);
    }


    return forageValidator;
  });