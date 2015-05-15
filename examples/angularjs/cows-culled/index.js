'use strict';

angular.module('farmbuild.nutrientCalculator.examples.cowsCulled', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('CowsCulledCtrl', function ($scope, $rootScope, nutrientCalculator, cowsCulled, validations) {

		var isPositiveNumber = validations.isPositiveNumber;
		var load = false;
		if(location.href.split('?').length > 1 && location.href.split('?')[1].indexOf('load') === 0){
			load = location.href.split('?')[1].split('=')[1] === 'true';
		}
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.cows = [];
		$scope.noResult = false;
		$scope.cowTypes = cowsCulled.types();

		$scope.calculate = function (cows, form) {
			$scope.result = cowsCulled.calculate(cows);
			$scope.noResult = !$scope.result;
		};

		$scope.addCowType = function (type, form) {

			//Validate type
      if(!cowsCulled.validateType(type)){
				$scope.noResult = true;
				return;
			}

			$scope.noResult = !cowsCulled.addType(type.name, type.weight);
			$scope.cowTypes = cowsCulled.types();
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
      if(!cowsCulled.validateType(cowType) ||
        !cowsCulled.validateNew(cowType.name, cowType.weight, numberOfCows)){
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

    if(nutrientCalculator.session.isLoadFlagSet(location)){
      var cowsCulledData = nutrientCalculator.session.loadSection('cowsCulled');
      cowsCulled.load(cowsCulledData);

      $scope.result = cowsCulledData;
      $scope.cows = cowsCulled.cows();
      $scope.cowTypes = cowsCulled.types();
		}

	});