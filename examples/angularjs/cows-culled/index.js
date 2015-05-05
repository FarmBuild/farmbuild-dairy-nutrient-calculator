'use strict';

angular.module('farmbuild.nutrientCalculator.examples.cowsPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('CowsPurchasedCtrl', function ($scope, $rootScope, cowsPurchased, validations) {

		var isPositiveNumber = validations.isPositiveNumber;
		var load = false;
		if(location.href.split('?').length > 1 && location.href.split('?')[1].indexOf('load') === 0){
			load = location.href.split('?')[1].split('=')[1] === 'true';
		}
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.cows = [];
		$scope.noResult = false;
		$scope.cowTypes = cowsPurchased.types();

		$scope.calculate = function (cows, form) {
			$scope.result = cowsPurchased.calculate(cows);
			$scope.noResult = !$scope.result;
		};

		$scope.addCowType = function (type, form) {

			//Validate type
			if(!type || !type.name || !type.weight){
				$scope.noResult = true;
				return;
			}

			$scope.noResult = !cowsPurchased.addType(type.name, type.weight);
			$scope.cowTypes = cowsPurchased.types();
			$scope.type = '';
		};
		
		$scope.removeCows = function (index, form) {

			if (index > -1) {
			   $scope.cows.splice(index, 1);
			}

		};

		$scope.addCows = function (cowType, numberOfCows, form) {

			$scope.noResult = false;
			
			//Validate numberOfCows to be a valid number
			if(!cowType || !isPositiveNumber(numberOfCows)){
				$scope.noResult = true;
				return;
			}

			$scope.cows.push({
				name: cowType.name,
				weight: cowType.weight,
				numberOfCows: numberOfCows
			});

			//reset form
			$scope.cowType = '';
			$scope.numberOfCows = '';
			$scope.result = {};
		};

		function findInSessionStorage() {
			var root = angular.fromJson(sessionStorage.getItem('farmData'));
			return root.nutrientCalculator.cowsCulled;
		};

		if(load){
			var cowsCulledData = findInSessionStorage();
			$scope.calculate(cowsCulledData.cows);
			$scope.cows = cowsCulledData.cows;
		}

	});