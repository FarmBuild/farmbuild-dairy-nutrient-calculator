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
 * Defining my application and passing 'farmbuild.nutrientCalculator' as a dependency to be injected.
 */

angular.module('farmbuild.nutrientCalculator.examples.legumes', ['farmbuild.nutrientCalculator'])

	/**
	 * "run" method is executed before any other function in application, so I am putting my initial configs here.
	 */
	.run(function ($rootScope) {
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
	})

	/**
	 * controller is where I put the logic of my application
	 */
	.controller('LegumesCtrl', function ($scope, $rootScope, legumes, nutrientCalculator) {
		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.legumes = [];
		$scope.noResult = false;
		$scope.utilisationFactors = legumes.utilisationFactors();

		/**
		 * calculate nutrients for legumes
		 */
		$scope.calculate = function (milkSoldPerYearInLitre, milkFatInKg,
		                             milkProteinInKg, numberOfMilkingCows,
		                             numberOfMilkingDays, averageCowWeightInKg,
		                             forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
		                             milkingAreaInHa, utilisationFactor,
		                             nitrogenFromFertiliserInKg, legumePercentage) {
			$scope.result = legumes.calculate(milkSoldPerYearInLitre, milkFatInKg,
				milkProteinInKg, numberOfMilkingCows,
				numberOfMilkingDays, averageCowWeightInKg,
				forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
				milkingAreaInHa, utilisationFactor,
				nitrogenFromFertiliserInKg, legumePercentage);

			/**
			 * If the is a valid result save it into sessionStorage
			 */
			if($scope.result) {
				saveInSessionStorage($scope.result);
			}

			/**
			 * If there is no valid result, the returned value is undefined and it will show a validation message
			 */
			$scope.noResult = !$scope.result;
		};

		function saveInSessionStorage(result) {
			nutrientCalculator.session.saveSection('legumes', result);
		};

		/**
		 * Whether to load farmdata from session.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 * If "load=true" this will populate values for all fields.
		 */
		if (nutrientCalculator.session.isLoadFlagSet(location)) {
			var legumesData = nutrientCalculator.session.loadSection('legumes'),
				milkSoldData = nutrientCalculator.session.loadSection('milkSold'),
				farmSummary = nutrientCalculator.session.loadSection('summary'),
				foragesPurchasedData = nutrientCalculator.session.loadSection('foragesPurchased'),
				fertilizersPurchasedData = nutrientCalculator.session.loadSection('fertilizersPurchased'),
				concentratesPurchased = nutrientCalculator.session.loadSection('concentratesPurchased');
			$scope.result = legumesData;


			$scope.milkSoldPerYearInLitre = milkSoldData.totalPerYearInLitre,
				$scope.milkFatInKg = milkSoldData.fatInKg,
				$scope.milkProteinInKg = milkSoldData.proteinInKg,
				$scope.numberOfMilkingCows = farmSummary.numberOfMilkingCows,
				$scope.numberOfMilkingDays = farmSummary.numberOfMilkingDays,
				$scope.averageCowWeightInKg = farmSummary.averageCowWeightInKg,
				$scope.forageMetabolisableEnergyInMJ = foragesPurchasedData.metabolisableEnergyInMJ,
				$scope.concentrateMetabolisableEnergyInMJ = concentratesPurchased.metabolisableEnergyInMJ,
				$scope.milkingAreaInHa = farmSummary.milkingAreaInHa,
				$scope.utilisationFactor = $scope.result.utilisationFactor,
				$scope.nitrogenFromFertiliserInKg = fertilizersPurchasedData.nitrogenInKg,
				$scope.legumePercentage = $scope.result.legumePercentage;
		}

	});