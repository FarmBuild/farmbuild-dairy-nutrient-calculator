/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/foragesPurchased singleton
 * @module nutrientCalculator/foragesPurchased
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('foragesPurchased', function (validations, references, $log) {

		var foragesPurchased = {},
			_isPositiveNumber = validations.isPositiveNumber,
			_isAlphanumeric = validations.isAlphanumeric,
			_isDefined = validations.isDefined,
			_types = angular.copy(references.forageTypes);

		function _validateForageType(forageType) {
			$log.info('validating forageType  ...', forageType);

			return !(!_isAlphanumeric(forageType.name) || !_isPositiveNumber(forageType.metabolisableEnergyPercentage) || !_isPositiveNumber(forageType.dryMatterPercentage) || !_isPositiveNumber(forageType.potassiumPercentage) || !_isPositiveNumber(forageType.phosphorusPercentage) || !_isPositiveNumber(forageType.nitrogenPercentage) || !_isPositiveNumber(forageType.sulphurPercentage));

		}

		function _validateForage(forage) {
			$log.info('validating forage ...', forage);

			if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
				return false;
			}
			return _validateForageType(forage.type);
		}
		
		function _createdForageType(name, metabolisableEnergyPercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
			return {
				name: name,
				metabolisableEnergyPercentage: metabolisableEnergyPercentage,
				dryMatterPercentage: dryMatterPercentage,
				sulphurPercentage: sulphurPercentage,
				potassiumPercentage: potassiumPercentage,
				phosphorusPercentage: phosphorusPercentage,
				nitrogenPercentage: nitrogenPercentage
			};
		}


		/**
		 * Calculates total nutrient imported on to the farm in forages
		 * @method calculate
		 * @param {!array} forages - Array of purchased forages, each item contains details of the forage {type, weight, isDry}
		 * @returns {object} nutrient data of forages purchased
		 * @public
		 * @static
		 */
		foragesPurchased.calculate = function (forages) {
			$log.info('calculating forages nutrient ...', forages);

			var totalWeight = 0,
				totalDMWeight = 0,
				nitrogenInKg = 0,
				phosphorusInKg = 0,
				potassiumInKg = 0,
				sulphurInKg = 0,
				meInKg = 0,
				incomings = [],
				i = 0;

			if (!forages || forages.length === 0) {
				return undefined;
			}

			for (i; i < forages.length; i++) {
				var weight = 0,
					dmWeight = 0,
					forage = forages[i],
					type = forage.type;

				if (!_validateForage(forage)) {
					return undefined;
				}

				weight = forage.weight;
				dmWeight = weight;
				if (!forage.isDry) {
					dmWeight = (weight * forage.type.dryMatterPercentage) / 100;
				}
				totalWeight += weight;
				totalDMWeight += dmWeight;
				nitrogenInKg += (type.nitrogenPercentage * dmWeight) / 100;
				phosphorusInKg += (type.phosphorusPercentage * dmWeight) / 100;
				potassiumInKg += (type.potassiumPercentage * dmWeight) / 100;
				sulphurInKg += (type.sulphurPercentage * dmWeight) / 100;
				meInKg += (type.metabolisableEnergyPercentage * dmWeight) / 100;
				incomings.push({
					type: forage.type,
					weight: forage.weight,
					isDry: forage.isDry
				});

			}

			return {
				forages: incomings,
				weight: totalWeight,
				dryMatterWeight: totalDMWeight,
				nitrogenInKg: nitrogenInKg,
				nitrogenPercentage: (nitrogenInKg / totalDMWeight) * 100,
				phosphorusInKg: phosphorusInKg,
				phosphorusPercentage: (phosphorusInKg / totalDMWeight) * 100,
				potassiumInKg: potassiumInKg,
				potassiumPercentage: (potassiumInKg / totalDMWeight) * 100,
				sulphurInKg: sulphurInKg,
				sulphurPercentage: (sulphurInKg / totalDMWeight) * 100,
				metabolisableEnergyInKg: meInKg,
				metabolisableEnergyPercentage: (meInKg / totalDMWeight) * 100
			};

		};


		function _validateForageType(forageType) {
			$log.info('validating forageType  ...', forageType);

			return !(!_isAlphanumeric(forageType.name) || !_isPositiveNumber(forageType.metabolisableEnergyPercentage) || !_isPositiveNumber(forageType.dryMatterPercentage) || !_isPositiveNumber(forageType.potassiumPercentage) || !_isPositiveNumber(forageType.phosphorusPercentage) || !_isPositiveNumber(forageType.nitrogenPercentage) || !_isPositiveNumber(forageType.sulphurPercentage));

		}

		function _createdForageType(name, metabolisableEnergyPercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
			return {
				name: name,
				metabolisableEnergyPercentage: metabolisableEnergyPercentage,
				dryMatterPercentage: dryMatterPercentage,
				sulphurPercentage: sulphurPercentage,
				potassiumPercentage: potassiumPercentage,
				phosphorusPercentage: phosphorusPercentage,
				nitrogenPercentage: nitrogenPercentage
			};
		}
		
		/**
		 * Adds a new forage type for nutrient calculation
		 * @method addType
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} mePercentage - value must be > 0
		 * @param {!number} dryMatterPercentage - value must be > 0
		 * @param {!number} sulphurPercentage - value must be > 0
		 * @param {!number} potassiumPercentage - value must be > 0
		 * @param {!number} phosphorusPercentage - value must be > 0
		 * @param {!number} nitrogenPercentage - value must be > 0
		 * @returns {object} foragesPurchased - useful for chaining multiple add()
		 * @private
		 * @static
		 */
		function _addType(name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {

			var forageType = _createdForageType(name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
			$log.info('adding forage type ...', forageType);

			if (!_validateForageType(forageType)) {
				return undefined;
			}

			//return xxx.add()

			if (_isDefined(index)) {
				_types.splice(index, 0, forageType)
			} else {
				_types.push(forageType);
			}
			
			return foragesPurchased.types;
		};

		
		function _getTypeByIndex(index) {
			var forageType;
			$log.info('getting forage type at index: ', index);
			if(!_isDefined(index) || index <0){
				return undefined;
			}

			forageType = _types[index];

			return forageType;
		};


		function _getLastType() {
			$log.info('getting last forage type ...');
			var length = _countTypes();
			return _types[length - 1];
		};


		function _getFirstType() {
			$log.info('getting first forage type ...');
			return _types[0];
		};
		
		
		function _countTypes() {
			$log.info('counting forage types ...', _types);
			return _types.length;
		};


		function _typesToArray() {
			$log.info('toArray types ...', _types);
			return _types;
		};


		function _removeTypeByIndex(index) {
			$log.info('removing forage type at index ' + index);
			if (!index || index < 0 || index > _types.length - 1) {
				return undefined;
			}

			_types.splice(index, 1);

			return _types;
		};


		function _removeType(forageType) {
			$log.info('removing forage type ', forageType);

			if (!_isDefined(forageType)) {
				return undefined;
			}

			angular.forEach(_types, function (item, index) {
				if (angular.equals(item, forageType)) {
					_removeTypeByIndex(index);
				}
			});

			return _types;
		};


		function _isForageTypesEmpty() {
			$log.info('Is forage types empty?', foragesPurchased.types.count() === 0);
			return foragesPurchased.types.count() === 0;
		};


		/**
		 * Returns current cow types
		 * @method types
		 * @returns {object} Types - cow types array
		 * @public
		 * @static
		 */
		foragesPurchased.types = {
			add: _addType,
			at: _getTypeByIndex,
			count: _countTypes,
			toArray: _typesToArray,
			removeIndex: _removeTypeByIndex,
			remove: _removeType,
			first: _getFirstType,
			last: _getLastType,
			isEmpty: _isForageTypesEmpty,
			validate: _validateForageType
		};

		return foragesPurchased;
	});