'use strict';

angular.module('farmbuild.nutrientCalculator.examples.milkSold', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('MilkSoldCtrl', function ($scope, NutrientCalculator) {

		NutrientCalculator.GoogleAnalytic.username = 'SpatialVision';

		$scope.result =  {
				milkSoldPerYearInLitre: '-',
				milkFatInKg: '-',
				milkFatPercentage: '-',
				milkProteinInKg: '-',
				milkProteinPercentage: '-',
				nitrogenInKg: '-',
				nitrogenPercentage: '-',
				phosphorusInKg: '-',
				phosphorusPercentage: '-',
				potassiumInKg: '-',
				potassiumPercentage: '-',
				sulphurInKg: '-',
				sulphurPercentage: '-'
			};

		$scope.nutrientOfMilkSoldByPercent = function (milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			$scope.result = NutrientCalculator.MilkSold.nutrientOfMilkSoldByPercent(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage);
			if ($scope.result) {
				$scope.milkFatInKg = $scope.result.milkFatInKg;
				$scope.milkProteinInKg = $scope.result.milkProteinInKg;
			}
		};

		$scope.nutrientOfMilkSoldByKg = function (milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			$scope.result = NutrientCalculator.MilkSold.nutrientOfMilkSoldByKg(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg);
			if ($scope.result) {
				$scope.milkFatPercentage = $scope.result.milkFatPercentage;
				$scope.milkProteinPercentage = $scope.result.milkProteinPercentage;
			}
		};

	});
