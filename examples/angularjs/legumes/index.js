'use strict';

angular.module('farmbuild.nutrientCalculator.examples.legumes', ['farmbuild.nutrientCalculator'])

	.run(function ($rootScope) {
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('LegumesCtrl', function ($scope, $rootScope, legumes, nutrientCalculator) {

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
			saveInSessionStorage($scope.result);
			$scope.noResult = !$scope.result;
		};

		function saveInSessionStorage(result) {
			nutrientCalculator.session.saveSection('legumes', result);
		};

		if (nutrientCalculator.session.isLoadFlagSet(location)) {
			var legumesData = nutrientCalculator.session.loadSection('legumes'),
				farmSummary = nutrientCalculator.session.loadSection('summary'),
				foragesPurchasedData = nutrientCalculator.session.loadSection('foragesPurchased'),
				fertilizersPurchasedData = nutrientCalculator.session.loadSection('fertilizersPurchased'),
				concentratesPurchased = nutrientCalculator.session.loadSection('concentratesPurchased');

			$scope.calculate(
				legumesData.milkSoldPerYearInLitre,
				legumesData.milkFatInKg,
				legumesData.milkProteinInKg,
				farmSummary.numberOfMilkingCows,
				farmSummary.numberOfMilkingDays,
				farmSummary.averageCowWeightInKg,
				foragesPurchasedData.metabolisableEnergyInMJ,
				concentratesPurchased.metabolisableEnergyInMJ,
				farmSummary.milkingAreaInHa,
				legumesData.utilisationFactor,
				fertilizersPurchasedData.nitrogenInKg,
				legumesData.legumePercentage
			);

			$scope.milkSoldPerYearInLitre = $scope.result.milkSoldPerYearInLitre,
				$scope.milkFatInKg = $scope.result.milkFatInKg,
				$scope.milkProteinInKg = $scope.result.milkProteinInKg,
				$scope.numberOfMilkingCows = farmSummary.numberOfMilkingCows,
				$scope.numberOfMilkingDays = farmSummary.numberOfMilkingDays,
				$scope.averageCowWeightInKg = farmSummary.averageCowWeightInKg,
				$scope.forageMetabolisableEnergyInMJ = foragesPurchasedData.metabolisableEnergyInMJ,
				$scope.concentrateMetabolisableEnergyInMJ = concentratesPurchased.metabolisableEnergyInMJ,
				$scope.milkingAreaInHa = farmSummary.milkingAreaInHa,
				$scope.utilisationFactor = $scope.result.utilisationFactor,
				$scope.nitrogenFromFertiliserInKg = fertilizersPurchasedData.nitrogenInKg,
				$scope.legumePercentage = $scope.result.legumePercentage;
		}

	});