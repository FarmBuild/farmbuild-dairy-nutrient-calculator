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
  function (validations,
            nutrientMedium,
            fertilizerDefaults, fertilizerTypes,
            nutrientMediumValidator,
            fertilizerCalculator,
            collections,
            nutrientCalculatorSession,
            $log) {

    var fertilizersPurchased = {types:fertilizerTypes, calculator:fertilizerCalculator},
      _fertilizers = [],
      calculator = fertilizerCalculator,
      validator = nutrientMediumValidator;

    /**
     * Removes the fertilizer at specified index
     * @method removeAt
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    function _removeAt(index) {
      $log.info('removing fertilizer at index ' + index);
      nutrientMedium.removeAt(_fertilizers, index);
      return fertilizersPurchased;
    };
    fertilizersPurchased.removeAt = _removeAt;

    /**
     * Returns the current instance of fertilizers purchased
     * @method fertilizers
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the fertilizer is dry, false if it's wet
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    fertilizersPurchased.fertilizers = function() { return _fertilizers};

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
      _fertilizers = nutrientMedium.add(_fertilizers, type, weight, isDry);
      return fertilizersPurchased;
    };

    fertilizersPurchased.add = _add;

    /**
     * Returns true if the arguments are valid, false otherwise
     * @method validateNew
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the fertilizer is dry, false if it's wet
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    function validateNew(type, weight, isDry) {
      var fertilizer = nutrientMedium.create(type, weight, isDry);
      return validator.validate(fertilizer);
    };

    fertilizersPurchased.validateNew = validateNew;
    fertilizersPurchased.validateAll = validator.validateAll;

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

      var result = calculator.calculate(fertilizers);

      result.types = fertilizerTypes.toArray();

      nutrientCalculatorSession.saveSection('fertilizersPurchased', result);

      return result;
    }

    /**
     * Loads the fertilizers in fertilizersPurchasedSection.fertilizers
     * @method load
     * @param fertilizersPurchasedSection
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    fertilizersPurchased.load = function(fertilizersPurchasedSection) {
      if(!validator.validateAll(fertilizersPurchasedSection.fertilizers)) {
        return undefined
      }
      _fertilizers = fertilizersPurchasedSection.fertilizers;
      fertilizerTypes.load(fertilizersPurchasedSection);
      return fertilizersPurchased;
    }


    return fertilizersPurchased;
  });