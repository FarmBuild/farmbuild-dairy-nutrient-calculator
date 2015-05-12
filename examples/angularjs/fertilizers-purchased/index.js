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

	.controller('FertilizersPurchasedCtrl', function ($scope, $rootScope, $log, nutrientCalculator, fertilizersPurchased) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.fertilizers = [],
		$scope.noResult = false,
		$scope.fertilizerTypes = fertilizersPurchased.types.defaultTypes(),
    $scope.calculateDryMatterWeight = fertilizersPurchased.calculator.calculateDryMatterWeight;
    $scope.newFertilizer = createNew();

    function createNew() {
      return {isDry:true};
    }

    $scope.calculate = function (fertilizers) {
      if(!fertilizersPurchased.validateAll(fertilizers)) {
        $scope.noResult = true;
        return;
      }

			$scope.result = fertilizersPurchased.calculate(fertilizers);
			$scope.noResult = !$scope.result;

      saveInSessionStorage($scope.result);
		};

		$scope.add = function (type, weight, isDry) {
      $log.info('add type: %s, weight: %s, isDry', type, weight, isDry);

      if(!fertilizersPurchased.validate(type, weight, isDry)) {
        $scope.noResult = true;
        return;
      }

			isDry = (isDry === 'true');
			$scope.fertilizers = fertilizersPurchased.add(type, weight, isDry).fertilizers();
			$scope.result = '';
			$scope.newFertilizer = createNew();
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.remove = function (index) {
			$scope.result = '';
			$scope.fertilizers = fertilizersPurchased.removeAt(index).fertilizers();
		};

		$scope.addType = function (type) {
      if(!fertilizersPurchased.types.validate(type)) {
        $scope.noResult = true;
        return;
      }
			$scope.fertilizerTypes = fertilizersPurchased.types.add(type.name, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage);
			$scope.result = '';
      $scope.type = {};
			$scope.noResult = !$scope.fertilizers;
		};

		$scope.removeType = function (index) {
      $log.info('removeType at %s',  index)
			$scope.result = '';
			$scope.fertilizerTypes = fertilizersPurchased.types.removeAt(index);
		};

    function saveInSessionStorage(result) {
      nutrientCalculator.session.saveSection('fertilizersPurchased', result);
    };

    if(nutrientCalculator.session.isLoadFlagSet(location)){
      var fertilizersPurchasedData = nutrientCalculator.session.loadSection('fertilizersPurchased');

      fertilizersPurchased.load(fertilizersPurchasedData.fertilizers);
      $scope.calculate(fertilizersPurchasedData.fertilizers);
      $scope.fertilizers = fertilizersPurchasedData.fertilizers;
    }
	});