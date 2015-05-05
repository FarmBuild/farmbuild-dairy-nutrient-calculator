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

		$scope.addLegume = function (type, weight, isDry) {
			isDry = (isDry === 'true');
			$scope.legumes = legumes.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newLegume = {};
			$scope.noResult = !$scope.legumes;
		};

		$scope.removeLegume = function (index) {
			$scope.result = '';
			$scope.legumes = legumes.removeAt(index).toArray();
		};

	});