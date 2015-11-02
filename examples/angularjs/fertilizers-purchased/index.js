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
angular.module('farmbuild.nutrientCalculator.examples.fertilizersPurchased',
  ['farmbuild.nutrientCalculator'])

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
	.controller('FertilizersPurchasedCtrl', function ($scope, $rootScope, $log, nutrientCalculator, fertilizersPurchased) {
		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;

		$scope.fertilizers = [],
		$scope.noResult = false,
		$scope.fertilizerTypes = fertilizersPurchased.types.defaultTypes(),
    $scope.calculateDryMatterWeight = fertilizersPurchased.calculator.calculateDryMatterWeight;
    $scope.newFertilizer = createNew();

		/**
		 * Create New fertilizer
		 */
    function createNew() {
      return {isDry:true};
    }

		/**
		 * calculate nutrients for fertilizers
		 */
    $scope.calculate = function (fertilizers) {
	    /**
	     * First validate all the forages
	     * If there is a issue with one of them stop
	     */
      if(!fertilizersPurchased.validateAll(fertilizers)) {
        $scope.noResult = true;
        return;
      }

			$scope.result = fertilizersPurchased.calculate(fertilizers);
			$scope.noResult = !$scope.result;
	    /**
	     * After a successful calculation update farmdata value in session
	     */
      saveInSessionStorage($scope.result);
		};

		/**
		 * Add a new fertilizer entity to fertilizers
		 */
		$scope.add = function (type, weight, isDry) {
      $log.info('add type: %s, weight: %s, isDry', type, weight, isDry);

			/**
			 * First validate the fertilizer
			 * If there is any issue, stop
			 */
      if(!fertilizersPurchased.validateNew(type, weight, isDry)) {
        $scope.noResult = true;
        return;
      }

			isDry = (isDry !== 'false');
			$scope.fertilizers = fertilizersPurchased.add(type, weight, isDry).fertilizers();
			$scope.result = '';
			$scope.newFertilizer = createNew();
			$scope.noResult = !$scope.fertilizers;
		};

		/**
		 * Remove the fertilizer at the specified index from fertilizers
		 */
		$scope.remove = function (index) {
			$scope.result = '';
			$scope.fertilizers = fertilizersPurchased.removeAt(index).fertilizers();
		};

		/**
		 * Add a new fertilizerType entity to fertilizerTypes
		 */
		$scope.addType = function (type) {
      if(!fertilizersPurchased.types.validate(type)) {
        $scope.noResult = true;
        return;
      }

			/**
			 * After adding a new fertilizerType update the fertilizerTypes on the "$scope" for template
			 */
			$scope.fertilizerTypes = fertilizersPurchased.types.add(type.name, type.dryMatterPercentage,
																									type.sulphurPercentage, type.potassiumPercentage,
																									type.phosphorusPercentage, type.nitrogenPercentage);
			$scope.result = '';
      $scope.type = {};
			$scope.noResult = !$scope.fertilizers;
		};

		/**
		 * Remove the fertilizerType at the specified index from fertilizerTypes
		 */
		$scope.removeType = function (index) {
      $log.info('removeType at %s',  index)
			$scope.result = '';
			$scope.fertilizerTypes = fertilizersPurchased.types.removeAt(index);
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
      var fertilizersPurchasedData = nutrientCalculator.session.loadSection('fertilizersPurchased');
      fertilizersPurchased.load(fertilizersPurchasedData);
      $scope.result = fertilizersPurchasedData;
      $scope.fertilizers = fertilizersPurchased.fertilizers();
      $scope.fertilizerTypes = fertilizersPurchased.types.toArray();
    }
	});