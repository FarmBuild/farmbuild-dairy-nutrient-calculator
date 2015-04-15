angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

	.run(function ($rootScope) {
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	.controller('FarmCtrl', function ($scope, NutrientCalculator) {

		$scope.farmData = {};

		$scope.load = function ($fileContent) {
			try {
				$scope.farmData = NutrientCalculator.load(angular.fromJson($fileContent));
			} catch(e){
				console.error('farmbuild.nutrientCalculator.examples > load: Your file should be in json format')
			}
		};

		$scope.milkSold = function () {
			$scope.farmData.nutrientCalculator.milkSold =
				NutrientCalculator.milkSold.nutrientOfMilkSoldByPercent(
					$scope.farmData.nutrientCalculator.milkSold.milkSoldPerYearInLitre,
					$scope.farmData.nutrientCalculator.milkSold.milkProteinPercentage,
					$scope.farmData.nutrientCalculator.milkSold.milkFatPercentage)
		}

		$scope.exportFarmData = function(farmData){
			var url = 'data:text/json;charset=utf8,' + encodeURIComponent(angular.toJson(farmData));
			window.open(url, '_blank');
			window.focus();
		}

	})

	.directive('onReadFile', function ($parse) {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				var fn = $parse(attrs.onReadFile);

				element.on('change', function (onChangeEvent) {
					var reader = new FileReader();

					reader.onload = function (onLoadEvent) {
						scope.$apply(function () {
							fn(scope, {$fileContent: onLoadEvent.target.result});
						});
					};

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	});