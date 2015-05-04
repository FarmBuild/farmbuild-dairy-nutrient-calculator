'use strict';

describe('farmbuild.nutrientCalculator module', function () {

	// instantiate service
	var legumeCalculator,
		legumePercentage = 3.5,
		milkFatPercentage = 1,
		milkProteinPercentage = 1,
		milkSoldPerYearInLitre = 1,
		totalForageME = 1,
		totalConcentrateME = 1,
		numberOfMilkingDays = 1,
		numberOfMilkingCows = 1,
		milkingArea = 1,
		lowUtilisationFactor = 60,
		totalNitrogenFromFertiliser = 1,
		liveWeight = 1;

	beforeEach(module('farmbuild.nutrientCalculator'));

	beforeEach(inject(function (_legumeCalculator_) {
		legumeCalculator = _legumeCalculator_;
	}));

	describe('legumeCalculator factory', function () {
		it('legumeCalculator should be defined', inject(function () {
			expect(legumeCalculator).toBeDefined();
		}));
	});

	describe('calculate legume nutrient', function () {

		it('Calculating milk energy', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatPercentage, milkProteinPercentage);
			expect(milkEnergy.notSold).toEqual(4.06919128);
		}));

		it('Calculating imported energy consumed', inject(function () {
			var importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME);
			expect(importedEnergyConsumed).toEqual(1.823);
		}));

		it('Calculating cattle energy used', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatPercentage, milkProteinPercentage),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight);
			expect(cattleEnergyUsed).toEqual(106.79897328);
		}));

		it('Calculating dry matter consumed', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatPercentage, milkProteinPercentage),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea);
			expect(dryMatterConsumed).toEqual(9.997711740952381);
		}));

		it('Calculating dry matter grown', inject(function () {
			var dryMatterConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				dryMatterGrown = legumeCalculator.dryMatterGrown(dryMatterConsumed, lowUtilisationFactor);
			expect(dryMatterGrown).toEqual(3.038333333333333);
		}));

		it('Calculating average Nitrogen applied', inject(function () {
			var averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea);
			expect(averageNitrogenApplied).toEqual(1);
		}));

		it('Calculating total legume', inject(function () {
			var dryMatterConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, lowUtilisationFactor);
			expect(totalLegume).toEqual(0.00868095238095238);
		}));

		it('Calculating available Nitrogen from legumes', inject(function () {
			var dryMatterConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, lowUtilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea),
				availableNitrogenFromLegumes = legumeCalculator.availableNitrogenFromLegumes(totalLegume, averageNitrogenApplied);
			expect(availableNitrogenFromLegumes).toEqual(0.000310466449047619);
		}));

		it('Calculating available Nitrogen to pasture', inject(function () {
			var dryMatterConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, lowUtilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea),
				availableNitrogenToPasture = legumeCalculator.availableNitrogenToPasture(totalLegume, averageNitrogenApplied);
			expect(availableNitrogenToPasture).toEqual(1.0003104664490476);
		}));

	});

});
