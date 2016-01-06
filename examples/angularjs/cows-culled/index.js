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


angular.module('farmbuild.nutrientCalculator.examples.cowsCulled', ['farmbuild.nutrientCalculator'])

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
	 * controller is where we put the logic of my application
	 */
	.controller('CowsCulledCtrl', function ($scope, $rootScope, nutrientCalculator, cowsCulled, validations) {

		var isPositiveNumber = validations.isPositiveNumber;
		var load = false;
		if(location.href.split('?').length > 1 && location.href.split('?')[1].indexOf('load') === 0){
			load = location.href.split('?')[1].split('=')[1] === 'true';
		}

		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
		$scope.cows = [];
		$scope.noResult = false;
		$scope.cowTypes = cowsCulled.types();

		/**
		 * calculate nutrients for cowsCulled
		 */
		$scope.calculate = function (cows, form) {
			$scope.result = cowsCulled.calculate(cows);
			$scope.noResult = !$scope.result;
		};

		/**
		 * Add a new cowType entity to cowTypes
		 */
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

		/**
		 * Remove the cow at the specified index
		 */
		$scope.removeCows = function (index, form) {

			if (index > -1) {
			   $scope.cows.splice(index, 1);
			}

		};

		/**
		 * Add a new cow
		 */
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

		/**
		 * Whether to load farmdata from session.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 * If "load=true" this will populate values for all fields.
		 */
    if(nutrientCalculator.session.isLoadFlagSet(location)){
      var cowsCulledData = nutrientCalculator.session.loadSection('cowsCulled');
      cowsCulled.load(cowsCulledData);

      $scope.result = cowsCulledData;
      $scope.cows = cowsCulled.cows();
      $scope.cowTypes = cowsCulled.types();
		}

	});