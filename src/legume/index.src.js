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
			milk_sold_total, //Total milk (litres/year)
			milk_fat_kg, //Total Fat
			milk_prot_kg,//Total Protein,
			//Fat % (Fat_pc)
			//Protein% (Prot_pc)
			//Total milking days
			//Total milking cows
			//Animal/live weight

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

		function _validate(legume) {
			$log.info('validating legume ...', legume);

			if (!_isDefined(legume.type) || !_isDefined(legume.weight) || !_isDefined(legume.isDry)) {
				return false;
			}
			return true;
		};

		function _create(type, weight, isDry) {
			return {type: type, weight:weight, isDry:isDry};
		};

		/**
		 * Calculates total nutrient imported on to the farm in legumes
		 * @method calculate
		 * @param {!array} legumes - Array of purchased legumes, each item contains details of the legume {type, weight, isDry}
		 * @returns {object} nutrient data of legumes purchased
		 * @public
		 * @static
		 */
		 function _calculate(legumes) {
			$log.info('calculating legumes nutrient ...', legumes);

			var totalWeight = 0,
				totalDMWeight = 0,
				nitrogenInKg = 0,
				phosphorusInKg = 0,
				potassiumInKg = 0,
				sulphurInKg = 0,
				meInMJ = 0,
				incomings = [],
				i = 0;

			if (!legumes || legumes.length === 0) {
				return undefined;
			}

			for (i; i < legumes.length; i++) {
				var weight = 0,
					dmWeight = 0,
					legume = legumes[i],
					type = legume.type;

				if (!_validate(legume)) {
					return undefined;
				}

				weight = legume.weight;
				dmWeight = weight;
				if (!legume.isDry) {
					dmWeight = (weight * legume.type.dryMatterPercentage) / 100;
				}
				totalWeight += weight;
				totalDMWeight += dmWeight;
				nitrogenInKg += (type.nitrogenPercentage * dmWeight) / 100;
				phosphorusInKg += (type.phosphorusPercentage * dmWeight) / 100;
				potassiumInKg += (type.potassiumPercentage * dmWeight) / 100;
				sulphurInKg += (type.sulphurPercentage * dmWeight) / 100;
				meInMJ += (type.metabolisableEnergyInMJPerKg * dmWeight);
				incomings.push({
					type: legume.type,
					weight: legume.weight,
					isDry: legume.isDry
				});

			}

			return {
				legumes: incomings,
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
