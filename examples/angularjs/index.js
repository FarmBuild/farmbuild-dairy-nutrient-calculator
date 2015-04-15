angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	.controller('FarmCtrl', function ($scope, $http, NutrientCalculator) {

		$scope.farmData = {};

		$scope.load = function() {
			$http.get('../farmdata-susan.json').then(function(resp){
				$scope.farmData = NutrientCalculator.load(resp.data);
			})
		}

		$scope.milkSold = function() {
			$scope.farmData.nutrientCalculator.milkSold =
				NutrientCalculator.milkSold.nutrientOfMilkSoldByPercent(
					$scope.farmData.nutrientCalculator.milkSold.milkSoldPerYearInLitre,
					$scope.farmData.nutrientCalculator.milkSold.milkProteinPercentage,
					$scope.farmData.nutrientCalculator.milkSold.milkFatPercentage)
		}

	});