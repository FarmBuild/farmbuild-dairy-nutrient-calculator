'use strict';

angular.module('farmbuild.nutrientCalculator.examples.fertilizerPurchased',
  ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.filter('dryWet', function() {
		return function(input) {
			return input ? 'Dry' : 'Wet';
		}
	})

	.controller('FertilizersPurchasedCtrl', function ($scope, $rootScope, fertilizerPurchased) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.fertilizers = [];
		$scope.noResult = false;
		$scope.fertilizerTypes = fertilizerPurchased.types.toArray();


		$scope.calculate = function (fertilizers) {
			$scope.result = fertilizerPurchased.calculate(fertilizers);
			$scope.noResult = !$scope.result;
		};

		$scope.addForage = function (type, weight, isDry) {
			isDry = (isDry === 'true');
			$scope.fertilizers = fertilizerPurchased.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newFertilizer = {};
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.removeForage = function (index) {
			$scope.result = '';
			$scope.fertilizers = fertilizerPurchased.removeAt(index).toArray();
		};

		$scope.addType = function (type) {
			$scope.fertilizerTypes = fertilizerPurchased.types.add(type.name, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage).toArray();
			$scope.result = '';
			$scope.newFertilizer = {};
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.removeType = function (index) {
			$scope.result = '';
			$scope.fertilizerTypes = fertilizerPurchased.types.removeAt(index).toArray();
		};

	});