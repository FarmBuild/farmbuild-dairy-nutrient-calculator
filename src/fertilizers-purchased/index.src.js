/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizersPurchased singleton
 * @module nutrientCalculator/fertilizersPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('fertilizersPurchased',
  function (validations, fertilizerDefaults, fertilizerTypes, fertilizerValidator, fertilizerCalculator,
            collections,
            $log) {

    var fertilizersPurchased = {types:fertilizerTypes, calculator:fertilizerCalculator},
      _fertilizers = [],
      calculator = fertilizerCalculator,
      validator = fertilizerValidator;
    
    /**
     * Removes the fertilizer at specified index
     * @method removeAt
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    function _removeAt(index) {
      $log.info('removing fertilizer at index ' + index);

      collections.removeAt(_fertilizers, index);

      return fertilizersPurchased;
    };
    fertilizersPurchased.removeAt = _removeAt;

    /**
     * Returns the current instance of fertilizers purchased
     * @method add
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the fertilizer is dry, false if it's wet
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    fertilizersPurchased.fertilizers = function() { return _fertilizers};

    function _create(type, weight, isDry) {
      return {type: type, weight:weight, isDry:isDry};
    }
    fertilizersPurchased.create = _create;

    /**
     * Adds a new fertilizer for nutrient calculation
     * @method add
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the fertilizer is dry, false if it's wet
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    function _add(type, weight, isDry) {
      var fertilizer = _create(type, weight, isDry);
      $log.info('fertilizersPurchased.add fertilizer ...', fertilizer);
      if (!validator.validate(fertilizer)) {
        $log.error('fertilizersPurchased.add unable to add as the validation has been failed');
        return undefined;
      }
      collections.add(_fertilizers, fertilizer);
      return fertilizersPurchased;
    };
    fertilizersPurchased.add = _add;

    fertilizersPurchased.asArray = function() { return _fertilizers};

    /**
     * Calculates the nutrient of the fertilizers purchased
     * @method calculate
     * @param fertilizers
     * @returns {object} the result of the fertilizers purchased
     * @public
     * @static
     */
    fertilizersPurchased.calculate = function(fertilizers) {
      $log.info('fertilizersPurchased.calculate...');
      if(!validator.validateAll(fertilizers)) {
        $log.error('fertilizersPurchased.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      return calculator.calculate(fertilizers);
    }

    return fertilizersPurchased;
  });