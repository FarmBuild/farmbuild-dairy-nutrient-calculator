/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerTypes singleton
 * @module nutrientCalculator/fertilizerTypes
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('fertilizerTypes', function (collections, validations, fertilizerValues, $log) {

    var fertilizerTypes = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _types = angular.copy(fertilizerValues.types);

    function _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
      return {
        name: name,
        dryMatterPercentage: dryMatterPercentage,
        sulphurPercentage: sulphurPercentage,
        potassiumPercentage: potassiumPercentage,
        phosphorusPercentage: phosphorusPercentage,
        nitrogenPercentage: nitrogenPercentage
      };
    }

    function _validate(type) {
      $log.info('validating type  ...', type);

      return !(!_isAlphanumeric(type.name) ||
        !_isPositiveNumber(type.dryMatterPercentage) ||
        !_isPositiveNumber(type.potassiumPercentage) ||
        !_isPositiveNumber(type.phosphorusPercentage) ||
        !_isPositiveNumber(type.nitrogenPercentage) ||
        !_isPositiveNumber(type.sulphurPercentage));

    }

    /**
     * Adds a new forage type for nutrient calculation
     * @method types.add
     * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
     * @param {!number} dryMatterPercentage - value must be > 0
     * @param {!number} sulphurPercentage - value must be > 0
     * @param {!number} potassiumPercentage - value must be > 0
     * @param {!number} phosphorusPercentage - value must be > 0
     * @param {!number} nitrogenPercentage - value must be > 0
     * @returns {object} forages - useful for chaining multiple add()
     * @private
     * @static
     */
    function _add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {

      var type = _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
      $log.info('adding forage type ...', type);

      if (!_validate(type)) {
        return undefined;
      }

      return collections.add(_types, type, index);
    };

    /**
     * Fertilizer types collection api
     * @property {object} Types - forage types collection
     * @public
     * @static
     */
    fertilizerTypes = {
      add: _add,
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
//      toArray: _typesToArray,
//      removeIndex: _removeTypeByIndex,
//      remove: _removeType,
//      first: _getFirstType,
      last: function() { return collections.last(_types) },
//      isEmpty: _isTypesEmpty
      validate: _validate
    };

    return fertilizerTypes;
  });