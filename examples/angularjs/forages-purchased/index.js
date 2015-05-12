'use strict';

angular.module('farmbuild.nutrientCalculator.examples.foragesPurchased', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.filter('dryWet', function() {
		return function(input) {
			return input ? 'Dry' : 'Wet';
		}
	})

	.controller('ForagesPurchasedCtrl', function ($scope, $rootScope, foragesPurchased, nutrientCalculator) {

		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.forages = [];
		$scope.noResult = false;
		$scope.forageTypes = foragesPurchased.types.toArray();
    $scope.newForage = createNew();
    function createNew() {
      return {isDry:true};
    }


		$scope.calculate = function (forages) {
      if(!foragesPurchased.validateAll(forages)) {
        $scope.noResult = true;
        return;
      }
			$scope.result = foragesPurchased.calculate(forages);
			saveInSessionStorage($scope.result);
			$scope.noResult = !$scope.result;
		};

		$scope.addForage = function (type, weight, isDry) {
      if(!foragesPurchased.validate(type, weight, isDry)) {
        $scope.noResult = true;
        return;
      }

			isDry = (isDry === 'true');
			$scope.forages = foragesPurchased.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newForage = createNew();
			$scope.noResult = !$scope.forages;
		};

		$scope.removeForage = function (index) {
			$scope.result = '';
			$scope.forages = foragesPurchased.removeAt(index).toArray();
		};

		$scope.addForageType = function (type) {
      if(!foragesPurchased.types.validate(type)) {
        $scope.noResult = true;
        return;
      }
			$scope.forageTypes = foragesPurchased.types.add(type.name, type.metabolisableEnergyInMJPerKg, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage).toArray();
			$scope.result = '';
			$scope.type = {};
			$scope.noResult = !$scope.forages;
		};

		$scope.removeForageType = function (index) {
			$scope.result = '';
			$scope.forageTypes = foragesPurchased.types.removeAt(index).toArray();
		};

		function saveInSessionStorage(result) {
			nutrientCalculator.session.saveSection('foragesPurchased', result);
		};

		if(nutrientCalculator.session.isLoadFlagSet(location)){
			var foragesPurchasedData = nutrientCalculator.session.loadSection('foragesPurchased');
			foragesPurchased.load(foragesPurchasedData.forages);
			$scope.calculate(foragesPurchasedData.forages);
			$scope.forages = foragesPurchasedData.forages;
		}

	});