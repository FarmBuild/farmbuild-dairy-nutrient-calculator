/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/legume singleton
 * @module nutrientCalculator/legume
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('legume', function (validations, $log) {

		var legume = {},
			_isDefined = validations.isDefined,
			milk_sold_total,
			milk_fat_kg,
			milk_prot_kg,
		forage_ME_total,
		conc_ME_total,
		pasture_utilisation,
		Legume_pc;

		//Output
		//Home_Grown_kg_per_ha
		//Total_N_kg_per_ha
		//Legume_N_kg
		//Average_N_per_ha
		//DM_Consumed_kg_per_ha

		function _validate(forage) {
			$log.info('validating forage ...', forage);

			if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
				return false;
			}
			return true;
		};

		function _create(type, weight, isDry) {
			return {type: type, weight:weight, isDry:isDry};
		};

		/**
		 * Calculates total nutrient imported on to the farm in forages
		 * @method calculate
		 * @param {!array} forages - Array of purchased forages, each item contains details of the forage {type, weight, isDry}
		 * @returns {object} nutrient data of forages purchased
		 * @public
		 * @static
		 */
		 function _calculate(forages) {
			$log.info('calculating forages nutrient ...', forages);

			var totalWeight = 0,
				totalDMWeight = 0,
				nitrogenInKg = 0,
				phosphorusInKg = 0,
				potassiumInKg = 0,
				sulphurInKg = 0,
				meInMJ = 0,
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

				if (!_validate(forage)) {
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
				meInMJ += (type.metabolisableEnergyInMJPerKg * dmWeight);
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
				metabolisableEnergyInMJ: meInMJ,
				metabolisableEnergyInMJPerKg: parseFloat(type.metabolisableEnergyInMJPerKg)
			};

		};

		legume = {
			calculate: _calculate
		};

		return legume;
	});