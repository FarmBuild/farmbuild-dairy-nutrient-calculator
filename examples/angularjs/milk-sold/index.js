'use strict';

/**
 * AngularJS is popular JavaScript MVC framework which is developed by google.
 * In this example we use AngularJS to construct the structure of the client side application.
 * You can find out more about AngularJS at https://angularjs.org
 * In farmbuild project we have used AngularJS as an internal dependency to provide modular structure, but to use FarmBuild JavaScript libraries you are forced to use AngularJS.
 * All the api function are available via "farmbuild" namespace (eg: farmbuild.webmapping, farmbuild.nutrientcalculator).
 * If you are using AngularJS in your application you can consume farmbuild component as AngularJS modules, similar to this example.
 */

/**
 * Defining my application and passing 'farmbuild.nutrientCalculator', 'farmbuild.farmdata' as a dependencies to be injected.
 */
angular.module('farmbuild.nutrientCalculator.examples.milkSold',
  ['farmbuild.nutrientCalculator', 'farmbuild.farmdata'])

	/**
	 * "run" method is executed before any other function in application, so I am putting my initial configs here.
	 */
	.run(function($rootScope){
		/**
		 * In AngularJS Every application has a single root scope.
		 * All other scopes are descendant scopes of the root scope.
		 * Scopes provide separation between the model and the view, via a mechanism for watching the model for changes.
		 * They also provide an event emission/broadcast and subscription facility.
		 * See the AngularJS developer guide on scopes.
		 * https://docs.angularjs.org/guide/scope
		 */

		/**
		 * Optional version number for sake of this example (not part of the nutrientcalculator api)
		 */
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;

		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	/**
	 * controller is where I put the logic of my application
	 */
	.controller('MilkSoldCtrl', function ($log, $scope, nutrientCalculator, milkSold) {

		/**
		 * There are two options on the API to calculate milk nutrients values.
		 * calculateByPercent and calculateByKg.
		 * The main difference is in input and output units.
		 */
		$scope.calculateByPercent = function (milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
			$scope.result = milkSold.calculateByPercent(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage);
			if ($scope.result) {
				$scope.fatInKg = $scope.result.fatInKg;
				$scope.proteinInKg = $scope.result.proteinInKg;
				$scope.noResult = false;
				saveInSessionStorage($scope.result);
			} else {
				$scope.noResult = true;
			}
		};

		$scope.calculateByKg = function (milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
			$scope.result = milkSold.calculateByKg(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg);
			if ($scope.result) {
				$scope.fatPercentage = $scope.result.fatPercentage;
				$scope.proteinPercentage = $scope.result.proteinPercentage;
				$scope.noResult = false;
				saveInSessionStorage($scope.result);
			} else {
				$scope.noResult = true;
			}
		};

		/**
		 * Saving calculated values into farmdata
		 * This is updating farmdata's value in session
		 */
		function saveInSessionStorage(result) {
      nutrientCalculator.session.saveSection('milkSold', result);
		};

		/**
		 * Whether to load farmdata from sessionStorage.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 * If "load=true" this will populate values for all fields.
		 */
		if(nutrientCalculator.session.isLoadFlagSet(location)){
			var milkSoldData = nutrientCalculator.session.loadSection('milkSold');
      if(!milkSoldData) {
        $log.error('Failed to load milkSold data...');
        return;
      }
			$scope.fatInKg = milkSoldData.fatInKg;
			$scope.proteinInKg = milkSoldData.proteinInKg;
			$scope.totalPerYearInLitre = milkSoldData.totalPerYearInLitre;
      $scope.result = milkSoldData;
		}

	});
