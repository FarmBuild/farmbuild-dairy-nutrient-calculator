/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerPurchased singleton
 * @module nutrientCalculator/fertilizerPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('fertilizerPurchased',
  function (validations, fertilizerDefaults, fertilizerTypes, fertilizerValidator, fertilizerCalculator,
            collections,
            $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _fertilizers = [],
      calculator = fertilizerCalculator,
      validator = fertilizerValidator;

    fertilizerPurchased.fertilizers = function() { return _fertilizers};

    function _create(type, weight, isDry) {
      return {type: type, weight:weight, isDry:isDry};
    }

    /**
     * Adds a new fertilizer type for nutrient calculation
     * @method types.add
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the fertilizer is dry, false if it's wet
     * @returns {object} fertilizerPurchased - useful for chaining multiple add()
     * @private
     * @static
     */
    function _add(type, weight, isDry) {
      var fertilizer = _create(type, weight, isDry);
      $log.info('adding fertilizer ...', fertilizer);
      if (!validator.validate(fertilizer)) {
        return undefined;
      }
      collections.add(_fertilizers, fertilizer);
      return fertilizerPurchased;
    };

    fertilizerPurchased.create = _create;
    fertilizerPurchased.add = _add;

    /**
     *
     * @param fertilizers
     * @returns {*}
     */
    fertilizerPurchased.calculate = function(fertilizers) {
      $log.info('fertilizerPurchased.calculate...');
      if(!validator.validateAll(fertilizers)) {
        $log.error('fertilizerPurchased.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      return calculator.calculate(fertilizers);
    }

    return fertilizerPurchased;
  });