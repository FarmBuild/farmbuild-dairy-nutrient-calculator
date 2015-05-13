/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/concentrateTypes singleton
 * @module nutrientCalculator/concentrateTypes
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('concentrateTypes', function (collections, validations, nutrientMediumTypes, concentrateDefaults, $log) {

    var concentrateTypes,
      _isPositiveNumber = validations.isPositiveNumber,
      _isPositiveNumberOrZero = validations.isPositiveNumberOrZero,
      _isEmpty = validations.isEmpty,
      _types = angular.copy(concentrateDefaults.types),
      _validate = nutrientMediumTypes.validate,
      _create = nutrientMediumTypes.create;

//    function _create(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
//      return {
//        name: name,
//        metabolisableEnergyInMJPerKg:metabolisableEnergyInMJPerKg,
//        dryMatterPercentage: dryMatterPercentage,
//        sulphurPercentage: sulphurPercentage,
//        potassiumPercentage: potassiumPercentage,
//        phosphorusPercentage: phosphorusPercentage,
//        nitrogenPercentage: nitrogenPercentage
//      };
//    }

//    function _validate(type) {
//      $log.info('validating type  ...', type);
//
//      var valid = !(_isEmpty(type)) &&
//        !(_isEmpty(type.name) ||
//        !_isPositiveNumber(type.dryMatterPercentage) ||
//        !_isPositiveNumberOrZero(type.potassiumPercentage) ||
//        !_isPositiveNumberOrZero(type.phosphorusPercentage) ||
//        !_isPositiveNumberOrZero(type.nitrogenPercentage) ||
//        !_isPositiveNumberOrZero(type.sulphurPercentage));
//
//      if(!valid) {
//        $log.error('invalid type: %j', type);
//      }
//      return valid;
//    }

    function _add(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {
      var type = _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
        metabolisableEnergyInMJPerKg);
      $log.info('adding concentrate type ...', type);

      if (!_validate(type)) {
        return undefined;
      }

      return collections.add(_types, type, index);
    };

    /**
     * Concentrate types collection api
     * @property {object} Types - concentrate types collection
     * @public
     * @static
     */
    concentrateTypes = {
      /**
       * Adds a new concentrate type for nutrient calculation
       * @method add
       * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
       * @param {!number} metabolisableEnergyInMJPerKg - value must be > 0
       * @param {!number} dryMatterPercentage - value must be > 0
       * @param {!number} sulphurPercentage - value must be > 0
       * @param {!number} potassiumPercentage - value must be > 0
       * @param {!number} phosphorusPercentage - value must be > 0
       * @param {!number} nitrogenPercentage - value must be > 0
       * @returns {object} types
       * @public
       * @static
       */
      add: _add,
      /**
       * Returns the concentrateType at specified index
       * @method at
       * @returns {object} concentrateType
       * @public
       * @static
       */
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      byName: function(name) { return collections.byProperty(_types, 'name', name)},
      defaultTypes: function() { return angular.copy(concentrateDefaults.types)},
      /**
       * Returns concentrateTypes collection as an array
       * @method toArray
       * @returns {Array} concentrateTypes
       * @public
       * @static
       */
      toArray: function() { return angular.copy(_types) },
      /**
       * Removes the concentrate type at specified index
       * @method removeAt
       * @returns {object} concentrateTypes collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_types, index)},
//      remove: _removeType,
//      first: _getFirstType,
      last: function() { return collections.last(_types) },
      validate: _validate
    };

    return concentrateTypes;
  });