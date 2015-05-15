/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/cows singleton
 * @module nutrientCalculator/cows
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('cows',
  function (validations,
            cowTypes, cowValidator,
            collections,
            nutrientCalculatorSession,
            $log) {

    var cows = {types:cowTypes},
      validator = cowValidator;

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