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

angular.module('farmbuild.nutrientCalculator.examples.foragesPurchased', ['farmbuild.nutrientCalculator'])

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
	})

	/**
	 * A custom AngularJS filter, I am using this to show dry/wet based on a boolean value.
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
	 * controller is where I put the logic of my application
	 */
	.controller('ForagesPurchasedCtrl', function ($scope, $rootScope, foragesPurchased, nutrientCalculator) {

		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.forages = [];
		$scope.noResult = false;
		$scope.forageTypes = foragesPurchased.types.toArray();
    $scope.newForage = createNew();
    function createNew() {
      return {isDry:true};
    }

		/**
		 * calculate nutrients for legumes
		 */
		$scope.calculate = function (forages) {
			/**
			 * First validate all the forages
			 * If there is a issue with one of them stop
			 */
      if(!foragesPurchased.validateAll(forages)) {
        $scope.noResult = true;
        return;
      }
			$scope.result = foragesPurchased.calculate(forages);
			/**
			 * After a successful calculation update farmdata value in session
			 */
			saveInSessionStorage($scope.result);
			$scope.noResult = !$scope.result;
		};

		/**
		 * Add a new forage entity to forages
		 */
		$scope.addForage = function (type, weight, isDry) {
			/**
			 * First validate the forage
			 * If there is any issue, stop
			 */
      if(!foragesPurchased.validateNew(type, weight, isDry)) {
        $scope.noResult = true;
        return;
      }

      isDry = (isDry !== 'false');
			$scope.forages = foragesPurchased.add(type, weight, isDry).toArray();
			$scope.result = '';
			$scope.newForage = createNew();
			$scope.noResult = !$scope.forages;
		};

		/**
		 * Remove the forage at the specified index from forages
		 */
		$scope.removeForage = function (index) {
			$scope.result = '';
			$scope.forages = foragesPurchased.removeAt(index).toArray();
		};

		/**
		 * Add a new forageType entity to forageTypes
		 */
		$scope.addForageType = function (type) {
			/**
			 * First validate the forageType
			 * If there is any issue, stop
			 */
      if(!foragesPurchased.types.validate(type)) {
        $scope.noResult = true;
        return;
      }

			/**
			 * After adding a new forageType update the forageTypes on the "$scope" for template
			 */
			$scope.forageTypes = foragesPurchased.types.add(type.name, type.metabolisableEnergyInMJPerKg, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage);
			$scope.result = '';
			$scope.type = {};
			$scope.noResult = !$scope.forages;
		};

		/**
		 * Remove the forageType at the specified index from forageTypes
		 */
		$scope.removeForageType = function (index) {
			$scope.result = '';
			$scope.forageTypes = foragesPurchased.types.removeAt(index).toArray();
		};

		/**
		 * Save farmdata into sessionStorage
		 */
		function saveInSessionStorage(result) {
			nutrientCalculator.session.saveSection('foragesPurchased', result);
		};

		/**
		 * Whether to load farmdata from session.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 * If "load=true" this will populate values for all fields.
		 */
		if(nutrientCalculator.session.isLoadFlagSet(location)){
			var foragesPurchasedData = nutrientCalculator.session.loadSection('foragesPurchased');
      foragesPurchased.load(foragesPurchasedData);

      $scope.result = foragesPurchasedData;
      $scope.forages = foragesPurchased.forages();
      $scope.forageTypes = foragesPurchased.types.toArray();
		}

	});