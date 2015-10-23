/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/concentratesPurchased singleton
 * @module nutrientCalculator/concentratesPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('concentratesPurchased',
  function (validations,
            nutrientMedium,
            concentrateDefaults, concentrateTypes,
            nutrientMediumValidator, concentrateCalculator,
            collections,
            nutrientCalculatorSession,
            $log) {

    var concentratesPurchased = {types:concentrateTypes, calculator:concentrateCalculator},
      _concentrates = [],
      calculator = concentrateCalculator,
      validator = nutrientMediumValidator;

    function createDefault() {
      return {
        types:concentrateTypes.toArray(),
        concentrates:[],
        dryMatterWeight: 0
      };
    }
    concentratesPurchased.createDefault = createDefault;

    /**
     * Removes the concentrate at specified index
     * @method removeAt
     * @returns {object} concentratesPurchased
     * @public
     * @static
     */
    function _removeAt(index) {
      $log.info('removing concentrate at index ' + index);
      nutrientMedium.removeAt(_concentrates, index);
      return concentratesPurchased;
    };
    concentratesPurchased.removeAt = _removeAt;

    /**
     * Returns the current instance of concentrates purchased
     * @method concentrates
     * @returns {object} concentrates
     * @public
     * @static
     */
    concentratesPurchased.concentrates = function() { return _concentrates};

    /**
     * Returns true if the arguments are valid, false otherwise
     * @method validateNew
     * @param {!type} type - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} weight - value must be > 0
     * @param {!boolean} isDry -true if the concentrate is dry, false if it's wet
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    function validateNew(type, weight, isDry) {
      var concentrate = nutrientMedium.create(type, weight, isDry);
      return validator.validate(concentrate);
    };

    concentratesPurchased.validateNew = validateNew;
    concentratesPurchased.validateAll = validator.validateAll;

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
      _concentrates = nutrientMedium.add(_concentrates, type, weight, isDry);
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
      var result = calculator.calculate(concentrates);

      result.types = concentrateTypes.toArray();

      nutrientCalculatorSession.saveSection('concentratesPurchased', result);

      return result;
    }

    /**
     * Loads the concentratesPurchasedSection
     * @method load
     * @param concentratesPurchasedSection
     * @returns {object} fertilizersPurchased
     * @public
     * @static
     */
    concentratesPurchased.load = function(concentratesPurchasedSection) {
      if(!validator.validateAll(concentratesPurchasedSection.concentrates)) {
        return undefined
      }
      _concentrates = concentratesPurchasedSection.concentrates;
      concentrateTypes.load(concentratesPurchasedSection);
      return concentratesPurchased;
    }

    return concentratesPurchased;
  });