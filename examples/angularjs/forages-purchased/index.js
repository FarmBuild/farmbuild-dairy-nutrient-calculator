'use strict';

angular.module('farmbuild.nutrientCalculator.examples.foragesPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('ForagesPurchasedCtrl', function ($scope, $rootScope, foragesPurchased, validations) {

		var isPositiveNumber = validations.isPositiveNumber;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.forages = [];
		$scope.noResult = false;
		$scope.forageTypes = foragesPurchased.types.toArray();


		$scope.calculate = function (forages) {
			$scope.result = foragesPurchased.calculate(forages);
			$scope.noResult = !$scope.result;
		};

	});