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

	.factory('legumes', function (validations, utilisationFactorsValues, legumeCalculator, $log) {

		var legumes,
			_isDefined = validations.isDefined,
			_isPositiveNumber = validations.isPositiveNumber,
			_isPositiveNumberOrZero = validations.isPositiveNumberOrZero,
			_utilisationFactors = angular.copy(utilisationFactorsValues);

		function _validate(legume) {
			$log.info('validating legume ...', legume);

			if (!_isDefined(legume.type) || !_isDefined(legume.weight) || !_isDefined(legume.isDry)) {
				return false;
			}
			return true;
		};

		/**
		 * Calculates total Nitrogen nutrient imported on to the farm in legumes
		 * @method calculate
		 * @param {!Number} milkSoldPerYearInLitre 
		 * @param {!Number} milkFatInKg
		 * @param {!Number} milkProteinInKg
		 * @param {!Number} numberOfMilkingCows 
		 * @param {!Number} numberOfMilkingDays 
		 * @param {!Number} averageCowWeightInKg
		 * @param {!Number} forageMetabolisableEnergyInMJ
		 * @param {!Number} concentrateMetabolisableEnergyInMJ
		 * @param {!Number} milkingAreaInHa
		 * @param {!Number} utilisationFactor 
		 * @param {!Number} nitrogenFromFertiliserInKg
		 * @param {!Number} legumePercentage 
		 * @returns {object} Nitrogen nutrient data imported on the farm in legumes purchased
		 * @public
		 * @static
		 */
		function _calculate(milkSoldPerYearInLitre, milkFatInKg,
		                    milkProteinInKg, numberOfMilkingCows,
		                    numberOfMilkingDays, averageCowWeightInKg,
		                    forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
		                    milkingAreaInHa, utilisationFactor,
		                    nitrogenFromFertiliserInKg, legumePercentage) {
			$log.info('calculating legumes nutrient ...');

			if (!_isPositiveNumberOrZero(milkSoldPerYearInLitre) || !_isPositiveNumberOrZero(milkProteinInKg) ||
				!_isPositiveNumberOrZero(milkFatInKg) || !_isPositiveNumberOrZero(numberOfMilkingCows) ||
				!_isPositiveNumberOrZero(numberOfMilkingDays) || !_isPositiveNumberOrZero(averageCowWeightInKg) ||
				!_isPositiveNumberOrZero(forageMetabolisableEnergyInMJ) || !_isPositiveNumberOrZero(concentrateMetabolisableEnergyInMJ) ||
				!_isPositiveNumberOrZero(milkingAreaInHa) || !_isPositiveNumberOrZero(utilisationFactor) ||
				!_isPositiveNumberOrZero(nitrogenFromFertiliserInKg) || !_isPositiveNumberOrZero(legumePercentage)) {
				return undefined;
			}

			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(milkEnergy.total, milkEnergy.notSold, numberOfMilkingCows, numberOfMilkingDays, averageCowWeightInKg),
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingAreaInHa),
				dryMatterGrown = legumeCalculator.dryMatterGrown(dryMatterConsumed, utilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(nitrogenFromFertiliserInKg, milkingAreaInHa),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, utilisationFactor),
				availableNitrogenFromLegumes = legumeCalculator.availableNitrogenFromLegumes(totalLegume, averageNitrogenApplied),
				availableNitrogenToPasture = legumeCalculator.availableNitrogenToPasture(totalLegume, averageNitrogenApplied);

			return {
				importedEnergyConsumedInMJ: importedEnergyConsumed,
				utilisationFactor: utilisationFactor,
				dryMatterConsumedPerHaInKg: dryMatterConsumed,
				dryMatterGrownPerHaInKg: dryMatterGrown,
				averageNitrogenAppliedPerHaInKg: averageNitrogenApplied,
				availableNitrogenFromLegumesPerHaInKg: availableNitrogenFromLegumes,
				availableNitrogenToPasturePerHaInKg: availableNitrogenToPasture,
				cattleEnergyUsedInMJ: cattleEnergyUsed,
				milkEnergyInMJ: milkEnergy.total,
				milkEnergyNotSoldInMJ: milkEnergy.notSold,
				milkProteinInKg: milkProteinInKg,
				milkFatInKg: milkFatInKg,
				milkSoldPerYearInLitre: milkSoldPerYearInLitre,
				legumePerHaInKg: totalLegume,
				legumePercentage: legumePercentage
			};

		};

		/**
		 * Utilisation factors reference values
		 * @method utilisationFactors
		 * @returns {Array} utilisationFactors
		 * @public
		 * @static
		 */
		function utilisationFactors(){
			return _utilisationFactors;
		}

		legumes = {
			calculate: _calculate,
			utilisationFactors: utilisationFactors
		};

		return legumes;
	});
