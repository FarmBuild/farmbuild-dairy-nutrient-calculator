/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')

  .factory('nutrientMedium',
  function (validations,
            nutrientMediumTypes, nutrientMediumValidator,
            nutrientMediumCalculator,
            collections,
            nutrientCalculatorSession,
            $log) {

    var nutrientMedium = {types:nutrientMediumTypes, calculator:nutrientMediumCalculator},
      calculator = nutrientMediumCalculator,
      validator = nutrientMediumValidator;

    function _removeAt(items, index) {
      $log.info('removing item at index ' + index);

      return collections.removeAt(items, index);
    };

    nutrientMedium.removeAt = _removeAt;

    function _create(type, weight, isDry) {
      return {type: type, weight:weight, isDry:isDry};
    }
    nutrientMedium.create = _create;

    function _add(items, type, weight, isDry) {
      var item = _create(type, weight, isDry);

      $log.info('nutrientMedium.add item ...', item);

      if (!validator.validate(item)) {
        $log.error('nutrientMedium.add unable to add as the validation has been failed, %j', item);
        return undefined;
      }

      return collections.add(items, item);
    };

    nutrientMedium.add = _add;

    function validateNew(type, weight, isDry) {
      var items = _create(type, weight, isDry);
      return validator.validate(items);
    };

    nutrientMedium.validate = validator.validate;
    nutrientMedium.validateNew = validateNew;
    nutrientMedium.validateAll = validator.validateAll;

    nutrientMedium.calculate = function(fertilizers) {
      $log.info('nutrientMedium.calculate...');
      if(!validator.validateAll(fertilizers)) {
        $log.error('nutrientMedium.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      var result = calculator.calculate(fertilizers);

      result.types = nutrientMediumTypes.toArray();

      nutrientCalculatorSession.saveSection('nutrientMedium', result);

      return result;
    }


    return nutrientMedium;
  });