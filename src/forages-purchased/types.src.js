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

	.factory('forageTypes', function (validations, forageTypeValues, $log) {
		var _isPositiveNumber = validations.isPositiveNumber,
			_isAlphanumeric = validations.isAlphanumeric,
			_isDefined = validations.isDefined,
			_types = angular.copy(forageTypeValues),
			forageTypes = {};

		function _validate(type) {
			$log.info('validating type  ...', type);

			return !(_isEmpty(type)) &&
        !(!_isAlphanumeric(type.name) || !_isPositiveNumber(type.metabolisableEnergyInMJPerKg) || !_isPositiveNumber(type.dryMatterPercentage) || !_isPositiveNumber(type.potassiumPercentage) || !_isPositiveNumber(type.phosphorusPercentage) || !_isPositiveNumber(type.nitrogenPercentage) || !_isPositiveNumber(type.sulphurPercentage));

		}

		function _create(name, metabolisableEnergyPercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
			return {
				name: name,
				metabolisableEnergyInMJPerKg: metabolisableEnergyPercentage,
				dryMatterPercentage: dryMatterPercentage,
				sulphurPercentage: sulphurPercentage,
				potassiumPercentage: potassiumPercentage,
				phosphorusPercentage: phosphorusPercentage,
				nitrogenPercentage: nitrogenPercentage
			};
		}

		/**
		 * Adds a new forage type for nutrient calculation
		 * @method add
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} metabolisableEnergyInMJPerKg - value must be > 0
		 * @param {!number} dryMatterPercentage - value must be > 0
		 * @param {!number} sulphurPercentage - value must be > 0
		 * @param {!number} potassiumPercentage - value must be > 0
		 * @param {!number} phosphorusPercentage - value must be > 0
		 * @param {!number} nitrogenPercentage - value must be > 0
		 * @returns {object} types - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		function _addType(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {

			var type = _create(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
			$log.info('adding forage type ...', type);

			if (!_validate(type)) {
				return undefined;
			}

			if (_isDefined(index)) {
				_types.splice(index, 0, type)
			} else {
				_types.push(type);
			}

			return forageTypes;
		};


		/**
		 * Returns the forageType at specified index
		 * @method at
		 * @returns {object} forageType
		 * @public
		 * @static
		 */
		function _at(index) {
			var type;
			$log.info('getting forage type at index: ', index);
			if (!_isDefined(index) || index < 0) {
				return undefined;
			}

			return _types[index];
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


		/**
		 * Returns forageTypes collection as an array
		 * @method toArray
		 * @returns {Array} forageTypes
		 * @public
		 * @static
		 */
		function _toArray() {
			$log.info('toArray types ...', _types);
			return _types;
		};

		/**
		 * Removes the forage type at specified index
		 * @method removeAt
		 * @returns {object} forageTypes collection
		 * @public
		 * @static
		 */
		function _removeAt(index) {
			$log.info('removing forage type at index ' + index);
			if (!_isDefined(index) || index < 0 || index > _types.length - 1) {
				return forageTypes;
			}

			_types.splice(index, 1);

			return forageTypes;
		};


		function _remove(type) {
			$log.info('removing forage type ', type);

			if (!_isDefined(type)) {
				return forageTypes;
			}

			angular.forEach(_types, function (item, index) {
				if (angular.equals(item, type)) {
					_removeAt(index);
				}
			});

			return forageTypes;
		};


		function _isEmpty() {
			$log.info('Is forage types empty? %s', forageTypes.size() === 0);
			return forageTypes.size() === 0;
		};

		forageTypes = {
			add: _addType,
			at: _at,
			size: _count,
			toArray: _toArray,
			removeAt: _removeAt,
			remove: _remove,
			first: _first,
			last: _last,
			isEmpty: _isEmpty,
			validate: _validate
		};

		return forageTypes;
	});