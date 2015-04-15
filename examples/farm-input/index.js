angular.module('farmbuild.nutrientCalculator.examples.farmInput', ['farmbuild.nutrientCalculator'])

	.run(function($rootScope){
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
	})

	.controller('FarmInputCtrl', function ($scope, $http, NutrientCalculator) {
			$scope.farmData = {};

		$scope.create = function(farmData){
			$scope.result = NutrientCalculator.create(farmData);
		};

		$scope.load = function() {
			$http.get('../farmdata-susan.json').then(function(resp){
				$scope.result = NutrientCalculator.load(resp.data);
			})
		}

	});