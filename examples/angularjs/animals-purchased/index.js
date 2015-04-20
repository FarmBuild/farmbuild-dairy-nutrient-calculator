'use strict';

angular.module('farmbuild.nutrientCalculator.examples.animalsPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('AnimalsPurchasedCtrl', function ($scope, AnimalsPurchased, animalTypes, Validations) {

		var isPositiveNumber = Validations.isPositiveNumber;
		$scope.animalTypes = [];
		$scope.animals = [];

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

		$scope.addAnimals = function (animalType, numberOfAnimals, form) {

			//Validate numberOfAnimals to be a valid number
			if(!isPositiveNumber(numberOfAnimals)){
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
		};

	});