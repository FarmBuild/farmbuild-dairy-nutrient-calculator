'use strict';

describe('farmbuild.nutrientCalculator module', function () {

	// instantiate service
	var legumes,
		legumePercentage = 3.5,
		milkFatPercentage = 1,
		milkProteinPercentage = 1,
		milkSoldPerYearInLitre = 1,
		totalForageME = 1,
		totalConcentrateME = 1,
		numberOfMilkingDays = 1,
		numberOfMilkingCows = 1,
		milkingArea = 1,
		utilisationFactor = 60,
		totalNitrogenFromFertiliser = 1,
		liveWeight = 1;

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
			var result = legumes.calculate(milkSoldPerYearInLitre, milkFatPercentage,
				milkProteinPercentage, numberOfMilkingCows,
				numberOfMilkingDays, liveWeight,
				totalForageME, totalConcentrateME,
				milkingArea, utilisationFactor,
				totalNitrogenFromFertiliser, legumePercentage);
			expect(result).toBeDefined();
		}));
	});

});
