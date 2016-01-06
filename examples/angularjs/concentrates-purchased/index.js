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
angular.module('farmbuild.nutrientCalculator.examples.concentratesPurchased', ['farmbuild.nutrientCalculator'])

	/**
	 * "run" method is executed before any other function in application, so we are putting my initial configs here.
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
	})

	/**
	 * A custom AngularJS filter, we are using this to show dry/wet based on a boolean value.
	 * A filter formats the value of an expression for display to the user.
	 * They can be used in view templates, controllers or services and it is easy to define your own filter.
	 * Read more about filter at: https://docs.angularjs.org/guide/filter
	 */
	.filter('dryWet', function() {
		return function(input) {
			return input ? 'Dry' : 'Wet';
		}
	})

	/**
	 * controller is where we put the logic of my application
	 */
	.controller('ConcentratesPurchasedCtrl', function ($scope, $rootScope, nutrientCalculator, concentratesPurchased) {
		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.concentrates = [];
		$scope.noResult = false;
		$scope.concentrateTypes = concentratesPurchased.types.toArray();
    $scope.newConcentrate = createNew();

    function createNew() {
      return {isDry:true};
    }

		/**
		 * calculate nutrients for concentrates
		 */
		$scope.calculate = function (concentrates) {
      if(!concentratesPurchased.validateAll(concentrates)) {
        $scope.noResult = true;
        return;
      }
			$scope.result = concentratesPurchased.calculate(concentrates);
			$scope.noResult = !$scope.result;
      saveInSessionStorage($scope.result);

		};

		/**
		 * Add a new concentrate entity to concentrates
		 */
		$scope.addConcentrate = function (type, weight, isDry) {
      if(!concentratesPurchased.validateNew(type, weight, isDry)) {
        $scope.noResult = true;
        return;
      }

      isDry = (isDry !== 'false');
			$scope.concentrates = concentratesPurchased.add(type, weight, isDry).concentrates();
			$scope.result = '';
			$scope.newConcentrate = createNew();
			$scope.noResult = !$scope.concentrates;
		};

		/**
		 * Remove the concentrate at the specified index from concentrates
		 */
		$scope.removeConcentrate = function (index) {
			$scope.result = '';
			$scope.concentrates = concentratesPurchased.removeAt(index).concentrates();
		};

		/**
		 * Add a new concentrateType entity to concentrateTypes
		 */
		$scope.addConcentrateType = function (type) {
			/**
			 * First validate the concentrateType
			 * If there is any issue, stop
			 */
      if(!concentratesPurchased.types.validate(type)) {
        $scope.noResult = true;
        return;
      }

			/**
			 * After adding a new concentrateType update the concentrateTypes on the "$scope" for template
			 */
			$scope.concentrateTypes = concentratesPurchased.types.add(type.name, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage,type.metabolisableEnergyInMJPerKg);
			$scope.result = '';
			$scope.type = {};
			$scope.noResult = !$scope.concentrates;
		};

		/**
		 * Remove the concentrateType at the specified index from concentrateTypes
		 */
		$scope.removeConcentrateType = function (index) {
			$scope.result = '';
			$scope.concentrateTypes = concentratesPurchased.types.removeAt(index);
		};

		/**
		 * Save farmdata into sessionStorage
		 * call saveSection API function to save farmdata into sessionStorage
		 */
    function saveInSessionStorage(result) {
      nutrientCalculator.session.saveSection('concentratesPurchased', result);
    };

		/**
		 * Whether to load farmdata from session.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 * If "load=true" this will populate values for all fields.
		 */
    if(nutrientCalculator.session.isLoadFlagSet(location)){
      var concentratesPurchasedData = nutrientCalculator.session.loadSection('concentratesPurchased');
      concentratesPurchased.load(concentratesPurchasedData);
      $scope.result =  concentratesPurchasedData;
      $scope.concentrates =  concentratesPurchased.concentrates();
      $scope.concentrateTypes =  concentratesPurchased.types.toArray();
    }

	});