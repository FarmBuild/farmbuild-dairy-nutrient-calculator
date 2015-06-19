/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.
 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('cows',
  function (validations,
            cowTypes, cowValidator,
            collections,
            cowTypeDefaults,
            nutrientCalculatorSession,
            $log) {

    var cows = {types:cowTypes},
      validator = cowValidator;

    function createDefault() {
      return {
        types:angular.copy(cowTypeDefaults),
        cows:[],
        numberOfCows: 0,
        weight: 0,
        nitrogenInKg: 0,
        phosphorusInKg: 0,
        potassiumInKg: 0,
        sulphurInKg: 0
      };
    }
    cows.createDefault = createDefault;


    function _removeAt(items, index) {
      $log.info('removing item at index ' + index);
      return collections.removeAt(items, index);
    };

    cows.removeAt = _removeAt;

    function _create(name, weight, numberOfCows) {
      return {name: name, weight:weight, numberOfCows:numberOfCows};
    }
    cows.create = _create;

    function _add(items, name, weight, numberOfCows) {
      var item = _create(name, weight, numberOfCows);

      $log.info('cows.add item ...', item);

      if (!validator.validate(item)) {
        $log.error('cows.add unable to add as the validation has been failed, %j', item);
        return undefined;
      }

      return collections.add(items, item);
    };

    cows.add = _add;

    function validateNew(name, weight, numberOfCows) {
      var items = _create(name, weight, numberOfCows);
      return validator.validate(items);
    };

    cows.validate = validator.validate;
    cows.validateNew = validateNew;
    cows.validateAll = validator.validateAll;

    return cows;
  });