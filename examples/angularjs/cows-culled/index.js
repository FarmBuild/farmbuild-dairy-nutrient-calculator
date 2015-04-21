'use strict';

angular.module('farmbuild.nutrientCalculator.examples.cowsPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('CowsPurchasedCtrl', function ($scope, $rootScope, CowsPurchased, Validations) {

		var isPositiveNumber = Validations.isPositiveNumber, animalTypes = CowsPurchased.types();
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.cows = [];
		$scope.noResult = false;
		$scope.animalTypes = [];

		function sortFn(a, b) {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			// a must be equal to b
			return 0;
		}

		function animalTypesToArray(){
			var types = [];
			for (var key in animalTypes) {
				types.push({
					name: animalTypes[key].name,
					type: key,
					weight: animalTypes[key].weight
				});
			};
			return types.sort(sortFn);
		}

		$scope.calculate = function (cows, form) {
			$scope.result = CowsPurchased.calculate(cows);
			$scope.noResult = !$scope.result;
		};

		$scope.addAnimalType = function (type, form) {

			//Validate type
			if(!type || !type.name || !type.weight){
				$scope.noResult = true;
				return;
			}

			$scope.noResult = !CowsPurchased.addType(type.name, type.weight);
			$scope.animalTypes = animalTypesToArray();
			$scope.type = '';
		};

		$scope.addCows = function (animalType, numberOfCows, form) {

			$scope.noResult = false;
			
			//Validate numberOfCows to be a valid number
			if(!animalType || !isPositiveNumber(numberOfCows)){
				$scope.noResult = true;
				return;
			}

			$scope.cows.push({
				type: animalType.type,
				name: animalType.name,
				weight: animalType.weight,
				numberOfCows: numberOfCows
			});

			//reset form
			$scope.animalType = '';
			$scope.numberOfCows = '';
			$scope.result = {};
		};

		$scope.animalTypes = animalTypesToArray();

	});