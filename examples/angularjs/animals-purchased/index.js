'use strict';

angular.module('farmbuild.nutrientCalculator.examples.animalsPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('AnimalsPurchasedCtrl', function ($scope, $rootScope, AnimalsPurchased, Validations) {

		var isPositiveNumber = Validations.isPositiveNumber, animalTypes = AnimalsPurchased.types();
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.animals = [];
		$scope.noResult = false;
		$scope.animalTypes = [];

		function animalTypesToArray(){
			var types = [];
			for (var key in animalTypes) {
				types.push({
					name: animalTypes[key].name,
					type: key,
					weight: animalTypes[key].weight
				});
			};
			return types;
		}

		$scope.calculate = function (animals, form) {
			$scope.result = AnimalsPurchased.calculate(animals);
			$scope.noResult = !$scope.result;
		};

		$scope.addAnimalType = function (type, form) {

			//Validate type
			if(!type || !type.name || !type.weight){
				$scope.noResult = true;
				return;
			}

			$scope.noResult = !AnimalsPurchased.addType(type.name, type.weight);
			$scope.animalTypes = animalTypesToArray();
			$scope.type = '';
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

		$scope.animalTypes = animalTypesToArray();

	});