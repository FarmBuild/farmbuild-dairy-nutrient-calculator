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
  .factory('fertilizerTypes', function (collections, validations, nutrientMediumTypes, fertilizerDefaults, $log) {

    var fertilizerTypes,
      _types = angular.copy(fertilizerDefaults.types),
      _validate = nutrientMediumTypes.validate;

    function _add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
      return nutrientMediumTypes.add(_types, name,
        dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
    };

    /**
     * Fertilizer types collection api
     * @property {object} Types - fertilizer types collection
     * @public
     * @static
     */
    fertilizerTypes = {
      /**
       * Adds a new fertilizer type for nutrient calculation
       * @method add
       * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
       * @param {!number} dryMatterPercentage - value must be > 0
       * @param {!number} sulphurPercentage - value must be >= 0
       * @param {!number} potassiumPercentage - value must be >= 0
       * @param {!number} phosphorusPercentage - value must be >= 0
       * @param {!number} nitrogenPercentage - value must be >= 0
       * @returns {object} fertilizers
       * @public
       * @static
       */
      add: _add,
      /**
       * Returns the fertilizerType at specified index
       * @method at
       * @returns {object} fertilizerType
       * @public
       * @static
       */
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      byName: function(name) { return collections.byProperty(_types, 'name', name)},
      defaultTypes: function() { return angular.copy(fertilizerDefaults.types)},
      /**
       * Returns fertilizerTypes collection as an array
       * @method toArray
       * @returns {Array} fertilizerTypes
       * @public
       * @static
       */
      toArray: function() { return angular.copy(_types) },
      /**
       * Removes the fertilizer type at specified index
       * @method removeAt
       * @returns {object} fertilizerTypes collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_types, index)},
      last: function() { return collections.last(_types) },
//      isEmpty: _isTypesEmpty
      validate: _validate
    };

    return fertilizerTypes;
  });