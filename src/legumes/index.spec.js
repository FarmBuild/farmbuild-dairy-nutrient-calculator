'use strict';

describe('farmbuild.nutrientCalculator module', function () {

	// instantiate service
	var legumes,
		legumePercentage = 3.5,
		milkFatInKg = 74080.71,
		milkProteinInKg = 59895.04,
		milkSoldPerYearInLitre = 1751317,
		totalForageME = 6298085,
		totalConcentrateME = 4954078,
		numberOfMilkingDays = 365,
		numberOfMilkingCows = 228,
		milkingArea = 70.39,
		averageUtilisationFactor = 75,
		totalNitrogenFromFertiliser = 5780,
		animalWeight = 550,
		liveWeight = animalWeight,
		expectedResult = {
			milkEnergy: {
				total: 9751288.792938001,
				notSold: 390051.55171752005
			},
			importedEnergyConsumedInMJ: 10204602.305,
			cattleEnergyUsedInMJ: 16680054.630369807,
			dryMatterConsumedPerHaInKg: 8761.326115546455,
			dryMatterGrownPerHaInKg: 11681.76815406194,
			averageNitrogenAppliedPerHaInKg: 82.1139366387271,
			totalLegume: 408.8618853921679,
			availableNitrogenFromLegumesPerHaInKg: 13.431975500695733,
			availableNitrogenToPasturePerHaInKg: 95.54591213942282

		};

	beforeEach(module('farmbuild.nutrientCalculator'));

	beforeEach(inject(function (_legumes_) {
		legumes = _legumes_;
	}));

	describe('legume factory', function () {
		it('legume should be defined', inject(function () {
			expect(legumes).toBeDefined();
		}));
	});

	describe('calculate legume nutrient', function () {
		it('legume should be defined', inject(function () {
			var result = legumes.calculate(milkSoldPerYearInLitre, milkFatInKg,
				milkProteinInKg, numberOfMilkingCows,
				numberOfMilkingDays, liveWeight,
				totalForageME, totalConcentrateME,
				milkingArea, averageUtilisationFactor,
				totalNitrogenFromFertiliser, legumePercentage);
			expect(result).toBeDefined();
			expect(result.importedEnergyConsumedInMJ).toEqual(expectedResult.importedEnergyConsumedInMJ);
			expect(result.dryMatterConsumedPerHaInKg).toEqual(expectedResult.dryMatterConsumedPerHaInKg);
			expect(result.dryMatterGrownPerHaInKg).toEqual(expectedResult.dryMatterGrownPerHaInKg);
			expect(result.averageNitrogenAppliedPerHaInKg).toEqual(expectedResult.averageNitrogenAppliedPerHaInKg);
			expect(result.availableNitrogenFromLegumesPerHaInKg).toEqual(expectedResult.availableNitrogenFromLegumesPerHaInKg);
			expect(result.availableNitrogenToPasturePerHaInKg).toEqual(expectedResult.availableNitrogenToPasturePerHaInKg);
			expect(result.cattleEnergyUsedInMJ).toEqual(expectedResult.cattleEnergyUsedInMJ);
			expect(result.milkEnergyInMJ).toEqual(expectedResult.milkEnergy.total);
			expect(result.milkEnergyNotSoldInMJ).toEqual(expectedResult.milkEnergy.notSold);
			expect(result.milkFatInKg).toEqual(milkFatInKg);
			expect(result.milkProteinInKg).toEqual(milkProteinInKg);
			expect(result.milkSoldPerYearInLitre).toEqual(milkSoldPerYearInLitre);
			expect(result.legumePerHaInKg).toEqual(expectedResult.totalLegume);
			expect(result.legumePercentage).toEqual(legumePercentage);
		}));
	});

});
