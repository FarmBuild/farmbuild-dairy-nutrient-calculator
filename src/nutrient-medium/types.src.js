/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/nutrientMediumTypes singleton
 * @module nutrientCalculator/nutrientMediumTypes
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientMediumTypes', function (collections, validations, $log) {

    var nutrientMediumTypes,
      _isPositiveNumber = validations.isPositiveNumber,
      _isPositiveNumberOrZero = validations.isPositiveNumberOrZero,
      _isEmpty = validations.isEmpty,
      _isDefined = validations.isDefined,
      _types = [];

    function _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage,
                     nitrogenPercentage, metabolisableEnergyInMJPerKg) {
      var type = {
        name: name,
        dryMatterPercentage: dryMatterPercentage,
        sulphurPercentage: sulphurPercentage,
        potassiumPercentage: potassiumPercentage,
        phosphorusPercentage: phosphorusPercentage,
        nitrogenPercentage: nitrogenPercentage
      };
      if(_isDefined(metabolisableEnergyInMJPerKg)) {
        type.metabolisableEnergyInMJPerKg = metabolisableEnergyInMJPerKg;
      }
      return type
    }

    function _validate(type) {
      $log.info('validating type  ...', type);

      var valid =
        !(_isEmpty(type)) &&
        !(_isEmpty(type.name) ||
          !_isPositiveNumber(type.dryMatterPercentage) ||
          !_isPositiveNumberOrZero(type.potassiumPercentage) ||
          !_isPositiveNumberOrZero(type.phosphorusPercentage) ||
          !_isPositiveNumberOrZero(type.nitrogenPercentage) ||
          !_isPositiveNumberOrZero(type.sulphurPercentage));

      if(_isDefined(type) && type.hasOwnProperty('metabolisableEnergyInMJPerKg')) {
        valid = valid && _isPositiveNumber(type.metabolisableEnergyInMJPerKg);
      }

      if(!valid) {
        $log.error('invalid type: %j', type);
      }

      return valid;
    }

    function _add(types, name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
                  metabolisableEnergyInMJPerKg) {
      var type = _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage,
        nitrogenPercentage, metabolisableEnergyInMJPerKg);
      $log.info('adding a type ...', type);

      if (!_validate(type)) {
        return undefined;
      }

      return collections.add(types, type);
    };

    /**
     * NutrientMediumTypes types collection api
     * @property {object} Types - nutrientMediumTypes types collection
     * @public
     * @static
     */
    nutrientMediumTypes = {
      /**
       * Adds a new nutrientMediumTypes type for nutrient calculation
       * @method add
       * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
       * @param {!number} dryMatterPercentage - value must be > 0
       * @param {!number} sulphurPercentage - value must be > 0
       * @param {!number} potassiumPercentage - value must be > 0
       * @param {!number} phosphorusPercentage - value must be > 0
       * @param {!number} nitrogenPercentage - value must be > 0
       * @returns {object} nutrientMediumTypess
       * @public
       * @static
       */
      add: _add,
      /**
       * Returns the nutrientMediumTypes at specified index
       * @method at
       * @returns {object} nutrientMediumTypes
       * @public
       * @static
       */
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      byName: function(name) { return collections.byProperty(_types, 'name', name)},
      /**
       * Returns nutrientMediumTypes collection as an array
       * @method toArray
       * @returns {Array} nutrientMediumTypes
       * @public
       * @static
       */
      toArray: function() { return angular.copy(_types) },
      /**
       * Removes the fertilizer type at specified index
       * @method removeAt
       * @returns {object} nutrientMediumTypes collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_types, index)},
      last: function() { return collections.last(_types) },
      validate: _validate,
      create: _create
    };

    return nutrientMediumTypes;
  });