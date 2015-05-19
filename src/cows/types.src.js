/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/cowTypes singleton
 * @module nutrientCalculator/cowTypes
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('cowTypes',
  function (cowTypeDefaults, collections, validations, $log) {

    var cowTypes,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty,
      _types = angular.copy(cowTypeDefaults);

    function _create(name, weight) {
      var type = {
        name: name,
        weight: weight
      };
      return type
    }

    function _validate(type) {
      $log.info('validating type  ...', type);

      var valid =
        !(_isEmpty(type)) &&
        !(_isEmpty(type.name) ||
        !_isPositiveNumber(type.weight));

      if(!valid) {
        $log.error('invalid type: %j', type);
      }

      return valid;
    }

    function _add(types, name, weight) {
      var type = _create(name, weight);
      $log.info('adding a type ...', type);

      if (!_validate(type)) {
        return undefined;
      }

      return collections.add(types, type);
    };

    /**
     * cowTypes types collection api
     * @property {object} Types - cowTypes types collection
     * @public
     * @static
     */
    cowTypes = {
      /**
       * Adds a new cowTypes type for nutrient calculation
       * @method add
       * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
       * @param {!number} dryMatterPercentage - value must be > 0
       * @param {!number} sulphurPercentage - value must be > 0
       * @param {!number} potassiumPercentage - value must be > 0
       * @param {!number} phosphorusPercentage - value must be > 0
       * @param {!number} nitrogenPercentage - value must be > 0
       * @returns {object} cowTypess
       * @public
       * @static
       */
      add: _add,
      /**
       * Returns the cowTypes at specified index
       * @method at
       * @returns {object} cowTypes
       * @public
       * @static
       */
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      byName: function(name) { return collections.byProperty(_types, 'name', name)},
      /**
       * Returns cowTypes collection as an array
       * @method toArray
       * @returns {Array} cowTypes
       * @public
       * @static
       */
      toArray: function() { return angular.copy(_types) },
      /**
       * Removes the fertilizer type at specified index
       * @method removeAt
       * @returns {object} cowTypes collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_types, index)},
      last: function() { return collections.last(_types) },
      validate: _validate,
      create: _create
    };

    return cowTypes;
  });