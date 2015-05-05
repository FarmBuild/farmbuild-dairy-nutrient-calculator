/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/concentratesPurchased singleton
 * @module nutrientCalculator/concentratesPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('concentratesPurchased',
  function (validations, concentrateDefaults, concentrateTypes, concentrateValidator, concentrateCalculator,
            collections,
            $log) {

    var concentratesPurchased = {types:concentrateTypes, calculator:concentrateCalculator},
      _concentrates = [],
      calculator = concentrateCalculator,
      validator = concentrateValidator;
    
    /**
     * Removes the concentrate at specified index
     * @method removeAt
     * @returns {object} concentratesPurchased
     * @public
     * @static
     */
    function _removeAt(index) {
      $log.info('removing concentrate at index ' + index);

      collections.removeAt(_concentrates, index);

      return concentratesPurchased;
    };
    concentratesPurchased.removeAt = _removeAt;

    /**
     * Returns the current instance of concentrates purchased
     * @method add
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the concentrate is dry, false if it's wet
     * @returns {object} concentratesPurchased
     * @public
     * @static
     */
    concentratesPurchased.concentrates = function() { return _concentrates};

    function _create(type, weight, isDry) {
      return {type: type, weight:weight, isDry:isDry};
    }
    concentratesPurchased.create = _create;

    /**
     * Adds a new concentrate for nutrient calculation
     * @method add
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the concentrate is dry, false if it's wet
     * @returns {object} concentratesPurchased
     * @public
     * @static
     */
    function _add(type, weight, isDry) {
      var concentrate = _create(type, weight, isDry);
      $log.info('concentratesPurchased.add concentrate ...', concentrate);
      if (!validator.validate(concentrate)) {
        $log.error('concentratesPurchased.add unable to add as the validation has been failed');
        return undefined;
      }
      collections.add(_concentrates, concentrate);
      return concentratesPurchased;
    };
    concentratesPurchased.add = _add;

    concentratesPurchased.asArray = function() { return _concentrates};

    /**
     * Calculates the nutrient of the concentrates purchased
     * @method calculate
     * @param concentrates
     * @returns {object} the result of the concentrates purchased
     * @public
     * @static
     */
    concentratesPurchased.calculate = function(concentrates) {
      $log.info('concentratesPurchased.calculate...');
      if(!validator.validateAll(concentrates)) {
        $log.error('concentratesPurchased.calculate invalid concentrates, see the error above and fix based on API...');
        return undefined;
      }

      return calculator.calculate(concentrates);
    }

    /**
     * Loads the concentrates
     * @method calculate
     * @param concentrates
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    concentratesPurchased.load = function(concentrates) {
      _concentrates = concentrates;
      return concentratesPurchased;
    }

    return concentratesPurchased;
  });