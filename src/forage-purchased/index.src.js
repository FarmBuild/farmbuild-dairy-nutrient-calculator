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
				if(!forage.isDry) {
					dmWeight = weight * forage.type.dryMatterPercentage;
				}
				totalWeight += weight;
				totalDMWeight += dmWeight;
				nitrogenInKg += type.nitrogenPercentage * dmWeight;
				phosphorusInKg += type.phosphorusPercentage * dmWeight;
				potassiumInKg += type.potassiumPercentage * dmWeight;
				sulphurInKg += type.sulphurPercentage * dmWeight;
				meInKg += type.metabolisableEnergyPercentage * dmWeight;
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
				nitrogenPercentage: nitrogenInKg / totalDMWeight,
				phosphorusInKg: phosphorusInKg,
				phosphorusPercentage: phosphorusInKg / totalDMWeight,
				potassiumInKg: potassiumInKg,
				potassiumPercentage: potassiumInKg / totalDMWeight,
				sulphurInKg: sulphurInKg,
				sulphurPercentage: sulphurInKg / totalDMWeight,
				metabolisableEnergyInKg: meInKg,
				metabolisableEnergyPercentage: meInKg / totalDMWeight
			};

		};
		
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
		 * @public
		 * @static
		 */
		foragesPurchased.addType = function (name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
			if (!_isPositiveNumber(mePercentage) || !_isPositiveNumber(dryMatterPercentage) || !_isPositiveNumber(sulphurPercentage) || !_isPositiveNumber(potassiumPercentage) || !_isPositiveNumber(phosphorusPercentage) || !_isPositiveNumber(nitrogenPercentage)) {
				return undefined;
			}
			
			if (!name || !_isAlphanumeric(name)) {
				return undefined;
			}
			
			mePercentage = parseFloat(mePercentage);
			dryMatterPercentage = parseFloat(dryMatterPercentage);
			sulphurPercentage = parseFloat(sulphurPercentage);
			potassiumPercentage = parseFloat(potassiumPercentage);
			phosphorusPercentage = parseFloat(phosphorusPercentage);
			nitrogenPercentage = parseFloat(nitrogenPercentage);

			_types.push({
				name: name,
				mePercentage: parseFloat(mePercentage),
				dryMatterPercentage: parseFloat(dryMatterPercentage),
				sulphurPercentage: parseFloat(sulphurPercentage),
				potassiumPercentage: parseFloat(potassiumPercentage),
				phosphorusPercentage: parseFloat(phosphorusPercentage),
				nitrogenPercentage: parseFloat(nitrogenPercentage)
			});
			
			return foragesPurchased;
		};


		/**
		 * Returns current cow types
		 * @method types
		 * @returns {object} Types - cow types array
		 * @public
		 * @static
		 */
		foragesPurchased.types = function () {
			return _types;
		};

		return foragesPurchased;
	});