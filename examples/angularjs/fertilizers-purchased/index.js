'use strict';

angular.module('farmbuild.nutrientCalculator.examples.fertilizersPurchased',
  ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.filter('dryWet', function() {
		return function(input) {
			return input ? 'Dry' : 'Wet';
		}
	})

	.controller('FertilizersPurchasedCtrl', function ($scope, $rootScope, fertilizersPurchased) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.fertilizers = [];
		$scope.noResult = false;
		$scope.fertilizerTypes = fertilizersPurchased.types.defaultTypes();


		$scope.calculate = function (fertilizers) {
			$scope.result = fertilizersPurchased.calculate(fertilizers);
			$scope.noResult = !$scope.result;
		};

		$scope.add = function (type, weight, isDry) {
			isDry = (isDry === 'true');
			$scope.fertilizers = fertilizersPurchased.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newFertilizer = {};
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.remove = function (index) {
			$scope.result = '';
			$scope.fertilizers = fertilizersPurchased.removeAt(index).toArray();
		};

		$scope.addType = function (type) {
			$scope.fertilizerTypes = fertilizersPurchased.types.add(type.name,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage).toArray();
			$scope.result = '';
			$scope.newFertilizer = {};
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.removeType = function (index) {
			$scope.result = '';
			$scope.fertilizerTypes = fertilizersPurchased.types.removeAt(index).toArray();
		};

	});