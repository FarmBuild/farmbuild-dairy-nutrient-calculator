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

	.factory('legume', function (validations, utilisationFactorsValues, legumeCalculator, $log) {

		var legume,
			_isDefined = validations.isDefined,
			_utilisationFactors = angular.copy(utilisationFactorsValues);

		function _validate(legume) {
			$log.info('validating legume ...', legume);

			if (!_isDefined(legume.type) || !_isDefined(legume.weight) || !_isDefined(legume.isDry)) {
				return false;
			}
			return true;
		};

		/**
		 * Calculates total nutrient imported on to the farm in legumes
		 * @method calculate
		 * @param {!Number} milkSoldPerYearInLitre 
		 * @param {!Number} milkFatPercentage 
		 * @param {!Number} milkProteinPercentage 
		 * @param {!Number} numberOfMilkingCows 
		 * @param {!Number} numberOfMilkingDays 
		 * @param {!Number} liveWeight 
		 * @param {!Number} totalForageME 
		 * @param {!Number} totalConcentrateME 
		 * @param {!Number} milkingArea 
		 * @param {!Number} utilisationFactor 
		 * @param {!Number} totalNitrogenFromFertiliser 
		 * @param {!Number} legumePercentage 
		 * @returns {object} nutrient data of legumes purchased
		 * @public
		 * @static
		 */
		function _calculate(milkSoldPerYearInLitre, milkFatPercentage,
		                    milkProteinPercentage, numberOfMilkingCows,
		                    numberOfMilkingDays, liveWeight,
		                    totalForageME, totalConcentrateME,
		                    milkingArea, utilisationFactor,
		                    totalNitrogenFromFertiliser, legumePercentage) {
			$log.info('calculating legumes nutrient ...');

			if (!_isDefined(milkSoldPerYearInLitre) || !_isDefined(milkFatPercentage) ||
				!_isDefined(milkProteinPercentage) || !_isDefined(numberOfMilkingCows) ||
				!_isDefined(numberOfMilkingDays) || !_isDefined(liveWeight) ||
				!_isDefined(totalForageME) || !_isDefined(totalConcentrateME) ||
				!_isDefined(milkingArea) || !_isDefined(utilisationFactor) ||
				!_isDefined(totalNitrogenFromFertiliser) || !_isDefined(legumePercentage)) {
				return undefined;
			}

			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatPercentage, milkProteinPercentage),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(milkEnergy.total, milkEnergy.notSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea),
				dryMatterGrown = legumeCalculator.dryMatterGrown(dryMatterConsumed, utilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, utilisationFactor),
				availableNitrogenFromLegumes = legumeCalculator.availableNitrogenFromLegumes(totalLegume, averageNitrogenApplied),
				availableNitrogenToPasture = legumeCalculator.availableNitrogenToPasture(totalLegume, averageNitrogenApplied);

			return {
				importedEnergyConsumed: importedEnergyConsumed,
				utilisationFactor: utilisationFactor,
				dryMatterConsumedPerHaInKg: dryMatterConsumed,
				dryMatterGrownPerHaInKg: dryMatterGrown,
				averageNitrogenAppliedPerHaInKg: averageNitrogenApplied,
				availableNitrogenFromLegumes: availableNitrogenFromLegumes,
				availableNitrogenToPasture: availableNitrogenToPasture,
				cattleEnergyUsed: cattleEnergyUsed,
				milkEnergy: milkEnergy,
				milkEnergyNotSold: milkEnergy.notSold,
				milkFatPercentage: milkFatPercentage,
				milkProteinPercentage: milkProteinPercentage,
				totalMilkInLitre: milkEnergy.total,
				totalLegume: totalLegume,
				legumePercentage: legumePercentage
			};

		};

		function utilisationFactors(){
			return _utilisationFactors;
		}

		legume = {
			calculate: _calculate,
			utilisationFactors: utilisationFactors
		};

		return legume;
	});
