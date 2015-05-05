'use strict';

angular.module('farmbuild.nutrientCalculator.examples.legumes', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('LegumesCtrl', function ($scope, $rootScope, legumes) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.legumes = [];
		$scope.noResult = false;
		$scope.utilisationFactors = legumes.utilisationFactors();


		$scope.calculate = function (milkSoldPerYearInLitre, milkFatInKg,
		                             milkProteinInKg, numberOfMilkingCows,
		                             numberOfMilkingDays, averageCowWeightInKg,
		                             forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
		                             milkingAreaInHa, utilisationFactor,
		                             nitrogenFromFertiliserInKg, legumePercentage) {
			$scope.result = legumes.calculate(milkSoldPerYearInLitre, milkFatInKg,
				milkProteinInKg, numberOfMilkingCows,
				numberOfMilkingDays, averageCowWeightInKg,
				forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
				milkingAreaInHa, utilisationFactor,
				nitrogenFromFertiliserInKg, legumePercentage);
			$scope.noResult = !$scope.result;
		};

	});