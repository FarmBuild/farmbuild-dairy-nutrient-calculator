'use strict';

/**
 * nutrientCalculator/legumeCalculator singleton
 * @private-module nutrientCalculator/legumeCalculator
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('legumeCalculator', function ($log, validations) {
		var legumeCalculator,
			_isPositiveNumber = validations.isPositiveNumber;

		function _milkEnergyInMJ(milkSoldPerYearInLitre, fatInKg, proteinInKg) {
			var fatPercentage = fatInKg/milkSoldPerYearInLitre,
				proteinPercentage = proteinInKg/milkSoldPerYearInLitre,
				milkEnergyPerLitreInMJ = 1.694 * (0.386 * fatPercentage * 100 + 0.205 * (5.8 + proteinPercentage * 100) - 0.236),
				totalMilkEnergyInMJ = milkEnergyPerLitreInMJ * milkSoldPerYearInLitre,
				milkEnergyNotSoldInMJ = totalMilkEnergyInMJ * 0.04;
			return {
				perLitre: milkEnergyPerLitreInMJ,
				total: totalMilkEnergyInMJ,
				notSold: milkEnergyNotSoldInMJ
			}
		}

		function _importedEnergyConsumedInMJ(totalForageMetabolisableEnergyInMJ, totalConcentrateMetabolisableEnergyInMJ) {
			if (!_isPositiveNumber(totalForageMetabolisableEnergyInMJ) || !_isPositiveNumber(totalConcentrateMetabolisableEnergyInMJ)){
				return undefined;
			}
			return (totalForageMetabolisableEnergyInMJ * (100 - 12.7)) / 100 + (totalConcentrateMetabolisableEnergyInMJ * (100 - 5)) / 100;
		}

		function _cattleEnergyUsedInMJ(totalMilkEnergyInMJ, milkEnergyNotSoldInMJ, numberOfMilkingCows, numberOfMilkingDays, liveWeightInKg) {
			if (!_isPositiveNumber(totalMilkEnergyInMJ) || !_isPositiveNumber(milkEnergyNotSoldInMJ) ||
				!_isPositiveNumber(numberOfMilkingCows) || !_isPositiveNumber(numberOfMilkingDays) ||
				!_isPositiveNumber(liveWeightInKg)){
				return undefined;
			}
			return totalMilkEnergyInMJ + milkEnergyNotSoldInMJ + (numberOfMilkingCows * numberOfMilkingDays * (liveWeightInKg/7));
		}

		function _dryMatterConsumedPerHaInKg(cattleEnergyUsedInMJ, importedEnergyConsumedInMJ, milkingAreaInHa) {
			if (!_isPositiveNumber(cattleEnergyUsedInMJ) || !_isPositiveNumber(importedEnergyConsumedInMJ) ||
				!_isPositiveNumber(milkingAreaInHa)){
				return undefined;
			}
			return (cattleEnergyUsedInMJ - importedEnergyConsumedInMJ) / (milkingAreaInHa * 10.5);

		}

		function _dryMatterGrownInKg(dryMatterConsumedPerHaInKg, utilisationFactor) {
			if (!_isPositiveNumber(dryMatterConsumedPerHaInKg) || !_isPositiveNumber(utilisationFactor)){
				return undefined;
			}
			return (dryMatterConsumedPerHaInKg * 100) / utilisationFactor;

		}

		function _averageNitrogenAppliedInKg(totalNitrogenFromFertiliserInKg, milkingAreaInHa) {
			if (!_isPositiveNumber(totalNitrogenFromFertiliserInKg) || !_isPositiveNumber(milkingAreaInHa)){
				return undefined;
			}
			return totalNitrogenFromFertiliserInKg / milkingAreaInHa;

		}

		function _totalLegumeInKg(dryMatterConsumedPerHaInKg, legumePercentage, utilisationFactor) {
			if (!_isPositiveNumber(dryMatterConsumedPerHaInKg) || !_isPositiveNumber(legumePercentage) ||
				!_isPositiveNumber(utilisationFactor)){
				return undefined;
			}
			return (dryMatterConsumedPerHaInKg * legumePercentage) / utilisationFactor;

		}

		function _availableNitrogenFromLegumesInKg(totalLegumeInKg, averageNitrogenAppliedInKg) {
			if (!_isPositiveNumber(totalLegumeInKg) || !_isPositiveNumber(averageNitrogenAppliedInKg)){
				return undefined;
			}
			return totalLegumeInKg * (0.0358 - 3.59e-5 * averageNitrogenAppliedInKg);

		}

		function _availableNitrogenToPastureInKg(totalLegumeInKg, averageNitrogenAppliedInKg) {
			if (!_isPositiveNumber(totalLegumeInKg) || !_isPositiveNumber(averageNitrogenAppliedInKg)){
				return undefined;
			}
			return averageNitrogenAppliedInKg + totalLegumeInKg * (0.0358 - 3.59e-5 * averageNitrogenAppliedInKg);

		}

		legumeCalculator = {
			milkEnergy: _milkEnergyInMJ,
			importedEnergyConsumed: _importedEnergyConsumedInMJ,
			cattleEnergyUsed: _cattleEnergyUsedInMJ,
			dryMatterConsumed: _dryMatterConsumedPerHaInKg,
			dryMatterGrown: _dryMatterGrownInKg,
			averageNitrogenApplied: _averageNitrogenAppliedInKg,
			totalLegume: _totalLegumeInKg,
			availableNitrogenFromLegumes: _availableNitrogenFromLegumesInKg,
			availableNitrogenToPasture: _availableNitrogenToPastureInKg
		}

		return legumeCalculator;
	});