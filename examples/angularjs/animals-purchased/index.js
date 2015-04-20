'use strict';

angular.module('farmbuild.nutrientCalculator.examples.animalsPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('AnimalsPurchasedCtrl', function ($scope, $rootScope, AnimalsPurchased, animalTypes, Validations) {

		var isPositiveNumber = Validations.isPositiveNumber;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.animalTypes = [];
		$scope.animals = [];
		$scope.noResult = false;

		for (var key in animalTypes) {
			$scope.animalTypes.push({
				name: animalTypes[key].name,
				type: key,
				weight: animalTypes[key].weight
			});
		};

		$scope.calculate = function (animals, form) {
			$scope.result = AnimalsPurchased.calculate(animals);
			$scope.noResult = !$scope.result;
		};

		$scope.addType = function (type, form) {
			$scope.noResult = !AnimalsPurchased.addType(type.name, type.weight);
		};

		$scope.addAnimals = function (animalType, numberOfAnimals, form) {

			$scope.noResult = false;
			
			//Validate numberOfAnimals to be a valid number
			if(!animalType || !isPositiveNumber(numberOfAnimals)){
				$scope.noResult = true;
				return;
			}

			$scope.animals.push({
				type: animalType.type,
				name: animalType.name,
				weight: animalType.weight,
				numberOfAnimals: numberOfAnimals
			});

			//reset form
			$scope.animalType = '';
			$scope.numberOfAnimals = '';
			$scope.result = {};
		};

	});