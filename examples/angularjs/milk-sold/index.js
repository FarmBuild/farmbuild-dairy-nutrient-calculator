'use strict';

angular.module('farmbuild.nutrientCalculator.examples.milkSold', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	.controller('MilkSoldCtrl', function ($scope, milkSold) {

		var load = false;
		if(location.href.split('?').length > 1 && location.href.split('?')[1].indexOf('load') === 0){
			load = location.href.split('?')[1].split('=')[1] === 'true';
		}

		$scope.calculateByPercent = function (milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			$scope.result = milkSold.calculateByPercent(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage);
			if ($scope.result) {
				$scope.fatInKg = $scope.result.fatInKg;
				$scope.proteinInKg = $scope.result.proteinInKg;
				$scope.noResult = false;
				saveInSessionStorage($scope.result);
			} else {
				$scope.noResult = true;
			}
		};

		$scope.calculateByKg = function (milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			$scope.result = milkSold.calculateByKg(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg);
			if ($scope.result) {
				$scope.fatPercentage = $scope.result.fatPercentage;
				$scope.proteinPercentage = $scope.result.proteinPercentage;
				$scope.noResult = false;
				saveInSessionStorage($scope.result);
			} else {
				$scope.noResult = true;
			}
		};

		function findInSessionStorage() {
			var root = angular.fromJson(sessionStorage.getItem('farmData'));
			return root.nutrientCalculator.milkSold;
		};

		function saveInSessionStorage(result) {
			var farmData = angular.fromJson(sessionStorage.getItem('farmData'));
			farmData.dateLastUpdated = new Date();
			farmData.nutrientCalculator.milkSold = result;
			sessionStorage.setItem('farmData', angular.toJson(farmData));
		};

		if(load){
			var milkSoldData = findInSessionStorage();
			$scope.calculateByKg(milkSoldData.totalPerYearInLitre, milkSoldData.proteinInKg, milkSoldData.fatInKg)
			$scope.fatInKg = milkSoldData.fatInKg;
			$scope.proteinInKg = milkSoldData.proteinInKg;
			$scope.totalPerYearInLitre = milkSoldData.totalPerYearInLitre;
		}

	});
