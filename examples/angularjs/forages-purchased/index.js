'use strict';

angular.module('farmbuild.nutrientCalculator.examples.foragesPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.filter('dryWet', function() {
		return function(input) {
			return input ? 'Dry' : 'Wet';
		}
	})

	.controller('ForagesPurchasedCtrl', function ($scope, $rootScope, foragesPurchased) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.forages = [];
		$scope.noResult = false;
		$scope.forageTypes = foragesPurchased.types.toArray();


		$scope.calculate = function (forages) {
			$scope.result = foragesPurchased.calculate(forages);
			$scope.noResult = !$scope.result;
		};

		$scope.addForage = function (type, weight, isDry) {
			isDry = (isDry === 'true');
			$scope.forages = foragesPurchased.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newForage = {};
			$scope.noResult = !$scope.forages;
		};

		$scope.removeForage = function (index) {
			$scope.result = '';
			$scope.forages = foragesPurchased.removeAt(index).toArray();
		};

		$scope.addForageType = function (type) {
			$scope.forageTypes = foragesPurchased.types.add(type.name, type.metabolisableEnergyInMJPerKg, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage).toArray();
			$scope.result = '';
			$scope.newForage = {};
			$scope.noResult = !$scope.forages;
		};

		$scope.removeForageType = function (index) {
			$scope.result = '';
			$scope.forageTypes = foragesPurchased.types.removeAt(index).toArray();
		};

	});