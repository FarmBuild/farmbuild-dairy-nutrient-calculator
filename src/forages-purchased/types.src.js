/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * Singleton - forageTypes Collection, This is a shortcut for "nutrientCalculator.foragesPurchased.types"
 * @module nutrientCalculator/foragesTypes
 */

angular.module('farmbuild.nutrientCalculator')
	.factory('forageTypes',
  function (collections, validations, nutrientMediumTypes, forageDefaults, $log) {
		var
			_isDefined = validations.isDefined,
			_types = angular.copy(forageDefaults.types),
      _isEmpty = validations.isEmpty,
			forageTypes = {},
      _validate = nutrientMediumTypes.validate;

		/**
		 * Adds a new forage type for nutrient calculation
		 * @method add
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} dryMatterPercentage - value must be > 0
		 * @param {!number} sulphurPercentage - value must be > 0
		 * @param {!number} potassiumPercentage - value must be > 0
		 * @param {!number} phosphorusPercentage - value must be > 0
		 * @param {!number} nitrogenPercentage - value must be > 0
     * @param {!number} metabolisableEnergyInMJPerKg - value must be > 0
		 * @returns {object} types - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		function add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
                      metabolisableEnergyInMJPerKg) {
      return nutrientMediumTypes.add(_types, name,
        dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
        metabolisableEnergyInMJPerKg);
		};

		function _last() {
			$log.info('getting last forage type ...');
			var length = _count();
			return _types[length - 1];
		};

		function _first() {
			$log.info('getting first forage type ...');
			return _types[0];
		};

		function _count() {
			$log.info('counting forage types ...', _types);
			return _types.length;
		};

		function _remove(type) {
			$log.info('removing forage type ', type);

			if (!_isDefined(type)) {
				return forageTypes;
			}

			angular.forEach(_types, function (item, index) {
				if (angular.equals(item, type)) {
          forageTypes.removeAt(index);
				}
			});

			return forageTypes;
		};

		forageTypes = {
			add: add,
      /**
       * Returns the forageType at specified index
       * @method at
       * @returns {object} fertilizerType
       * @public
       * @static
       */
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      toArray: function() { return angular.copy(_types) },
      /**
       * Removes the forage type at specified index
       * @method removeAt
       * @returns {object} forageTypes collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_types, index)},
			remove: _remove,
			first: _first,
			last: _last,
			isEmpty: _isEmpty,
      validate: _validate,
      /**
       * Loads the types in foragesPurchasedSection.types
       * @method load
       * @param foragesPurchasedSection
       * @returns {object} fertilizersPurchased
       * @public
       * @static
       */
      load: function(foragesPurchasedSection) {
        _types = foragesPurchasedSection.types;
      }
		};

		return forageTypes;
	});