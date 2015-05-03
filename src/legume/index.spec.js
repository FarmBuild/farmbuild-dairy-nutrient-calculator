'use strict';

describe('farmbuild.nutrientCalculator module', function () {

    // instantiate service
    var legume;

    beforeEach(module('farmbuild.nutrientCalculator'));

    beforeEach(inject(function (_legume_) {
        legume = _legume_;
    }));

    describe('legume factory', function () {
        it('legume should be defined', inject(function () {
            expect(legume).toBeDefined();
        }));
    });

    describe('calculate milk energy per litre', function () {

        it('Calculating milk energy', inject(function () {
            var fatPercentage = 1, proteinPercentage = 1,
                totalMilkInLitre = 1,
                milkEnergyPerLitre = 1.694 * (0.386 * fatPercentage * 100 + 0.205 * (5.8 + proteinPercentage * 100) - 0.236),
                MilkEnergy = milkEnergyPerLitre * totalMilkInLitre,
                milkEnergyNotSold = MilkEnergy * 0.04;
            expect(milkEnergyNotSold).toEqual(4.06919128);

        }));

        it('Calculating imported energy consumed', inject(function () {
            var totalForageME = 1, totalConcentrateME = 1,
                importedEnergyConsumed = (totalForageME * (100 - 12.7)) / 100 + (totalConcentrateME * (100 - 5)) / 100;
            expect(importedEnergyConsumed).toEqual(1.823);
        }));

        it('Calculating cattle energy used', inject(function () {
            var fatPercentage = 1, proteinPercentage = 1,
                numberOfMilkingDays = 1, liveWeight = 1,
                numberOfMilkingCows = 1,
                totalMilkInLitre = 1,
                milkEnergyPerLitre = 1.694 * (0.386 * fatPercentage * 100 + 0.205 * (5.8 + proteinPercentage * 100) - 0.236),
                milkEnergy = milkEnergyPerLitre * totalMilkInLitre,
                milkEnergyNotSold = milkEnergy * 0.04,
                cattleEnergyUsed = milkEnergy + milkEnergyNotSold + (numberOfMilkingCows * numberOfMilkingDays * liveWeight);
            expect(cattleEnergyUsed).toEqual(106.79897328);
        }));

        it('Calculating dry matter consumed', inject(function () {
            var importedEnergyConsumed = 1, cattleEnergyUsed = 1,
                milkingArea = 1,
                dryMatterConsumed = (cattleEnergyUsed - importedEnergyConsumed) / (milkingArea * 10.5);
            expect(dryMatterConsumed).toEqual(0);
        }));

        it('Calculating dry matter grown', inject(function () {
            var dryMatterConsumed = 1, utilisationFactor = 1,
                dryMatterGrown = (dryMatterConsumed * 100) / utilisationFactor;
            expect(dryMatterGrown).toEqual(100);
        }));

        it('Calculating average Nitrogen applied', inject(function () {
            var totalNitrogenFromFertiliser = 1, milkingArea = 1,
                averageNitrogenApplied = totalNitrogenFromFertiliser / milkingArea;
            expect(averageNitrogenApplied).toEqual(1);
        }));

        it('Calculating total legume', inject(function () {
            var dryMatterConsumed = 1, legumePercentage = 1,
                utilisationFactor = 1,
                totalLegume = (dryMatterConsumed / legumePercentage) / utilisationFactor;
            expect(totalLegume).toEqual(1);
        }));

        it('Calculating available Nitrogen from legumes', inject(function () {
            var totalLegume = 1, averageNitrogenApplied = 1,
                availableNitrogenFromLegumes = totalLegume * (0.0358 - 3.59e-5 * averageNitrogenApplied);
            expect(availableNitrogenFromLegumes).toEqual(0.0357641);
        }));

        it('Calculating available Nitrogen to pasture', inject(function () {
            var totalLegume = 1, averageNitrogenApplied = 1,
                availableNitrogenToPasture = averageNitrogenApplied + totalLegume * (0.0358 - 3.59e-5 * averageNitrogenApplied);
            expect(availableNitrogenToPasture).toEqual(1.0357641);
        }));

    });

});
