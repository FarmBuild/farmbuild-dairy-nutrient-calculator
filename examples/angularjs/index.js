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
angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

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
		 * Optional version number for sake of this example (not part of the webmapping api)
		 */
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;

		/**
		 * normalising the way we round numbers, this variable is used in html template
		 */
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	/**
	 * This is where I put the logic of my application
	 */
	.controller('FarmCtrl', function ($scope, $log, farmdata, nutrientCalculator) {

		/**
		 * Defining a variable on the $scope for farmdata
		 */
		$scope.farmData = {};

		/**
		 * Load farmdata
		 * Here I read farmdata from a JSON file and I load it into nutrientCalculator.
		 * Because value is a string I need to convert it to JavaScript object using "angular.fromJson"
		 */
		$scope.loadFarmData = function ($fileContent) {
			$log.info('$scope.loadFarmData $fileContent..');

			try {
				$scope.farmData = {};
				var farmData = nutrientCalculator.load(angular.fromJson($fileContent));

				if (!angular.isDefined(farmData)) {
					$scope.noResult = true;
					return;
				}

				/**
				 * If farmdata is valid, update the farmdata variable on $scope, this is necessary to update values on the template
				 */
				updateFarmData($scope, farmData);

			} catch (e) {
				console.error('farmbuild.nutrientCalculator.examples > load: Your file should be in json format: ', e);
				$scope.noResult = true;
			}
		};

		/**
		 * export farmdata
		 * it is using HTML5 <a> download to download farmdata as a json file
		 */
		$scope.exportFarmData = function (farmData) {
			nutrientCalculator.export(document, farmData);
		};

		/**
		 * calculate nutrient values
		 * Here I am passing the farmdata to calculate method which does all the nutrient calculations and returns updated farmdata with the updated nutrientCalculator block
		 */
		$scope.calculate = function () {
			$log.info('calculate...');
			var farmData = nutrientCalculator.calculate($scope.farmData);

			/**
			 * Update the farmdata variable on $scope, this is necessary to update values on the template
			 */
			updateFarmData($scope, farmData);

			$scope.drawChart();

			/**
			 * Sending api usage statistic for analysis purpose
			 * Here I am using 'farmbuild-test-client', change this with your own organisation name.
			 */
			nutrientCalculator.ga.trackCalculate('farmbuild-test-client');
		};

		/**
		 * Clear the farmdata stored in the session
		 * This can be used in a scenario where you want clear all stored data and start over
		 */
		$scope.clear = function () {
			$scope.farmData = {};
			nutrientCalculator.farmdata.session.clear();
			location.href = farmdata.session.clearLoadFlag(location);
		}

		/**
		 * Whether to load farmdata from session.
		 * This is looking at the URL to understand if there is a "load=true" passed as query string
		 */
		if (nutrientCalculator.session.isLoadFlagSet(location)) {
			var farmData = nutrientCalculator.find();

			updateFarmData($scope, farmData);
		}

		/**
		 * Update the farmdata variable on $scope, this is necessary to update values on the template
		 */
		function updateFarmData($scope, farmData) {
			if (!farmData) {
				$log.error('Failed to load milkSold data...');
				$scope.noResult = true;
				return;
			}
			$scope.farmData = farmData;
			$scope.balance = farmData.nutrientCalculator.balance;
			$scope.efficiency = farmData.nutrientCalculator.efficiency;
			$scope.feedBalance = farmData.nutrientCalculator.feedBalance;
			$scope.milkProduction = farmData.nutrientCalculator.milkProduction;
			$scope.stockingRate = farmData.nutrientCalculator.stockingRate;

		}

		/**
		 * Draw charts based on nutrient calculator values
		 * Here we are using google charts to draw pie charts for different nutrient values
		*/
		$scope.drawChart = function () {

			var farmData = nutrientCalculator.find();
			drawSpecificChart(farmData, 'mass', 'import');
			drawSpecificChart(farmData, 'mass', 'export');


			drawSpecificChart(farmData, 'nitrogen', 'import');
			drawSpecificChart(farmData, 'nitrogen', 'export');

			drawSpecificChart(farmData, 'phosphorus', 'import');
			drawSpecificChart(farmData, 'phosphorus', 'export');

			drawSpecificChart(farmData, 'potassium', 'import');
			drawSpecificChart(farmData, 'potassium', 'export');

			drawSpecificChart(farmData, 'sulphur', 'import');
			drawSpecificChart(farmData, 'sulphur', 'export');
		};

		function drawSpecificChart(farmData, what_to_draw, imp_or_exp) {
			// Create the data table.
			try {
				var data = new google.visualization.DataTable(),
					datafield,
					milkdatafield,
					imp_exp_str = "Import",
					datalabel;

				if (imp_or_exp == "export") imp_exp_str = "Export";
			} catch (Err) {
				alert(Err.message);
			}
			var totalfarmarea = parseFloat(farmData.area); //needs to get area

			var milkingarea = parseFloat(farmData.nutrientCalculator.summary.milkingAreaInHa);
			var fixation_val = 0.0;
			var atmosphere_val = 0.0;
			switch (what_to_draw) {
				case 'mass':
					datafield = 'weight';
					if (imp_or_exp == 'export') milkdatafield = 'totalPerYearInLitre';
					datalabel = 'Mass';
					fixation_val = parseFloat(farmData.nutrientCalculator.legumes.availableNitrogenFromLegumesPerHaInKg / 1000) * milkingarea;
					atmosphere_val = parseFloat(totalfarmarea * parseFloat(eval('3/1000')));
					break;
				case 'nitrogen':
					milkdatafield = datafield = 'nitrogenInKg';
					datalabel = 'Nitrogen';
					fixation_val = parseFloat(farmData.nutrientCalculator.legumes.availableNitrogenFromLegumesPerHaInKg) * milkingarea;
					atmosphere_val = parseFloat(totalfarmarea * 3.0);
					break;
				case 'potassium':
					milkdatafield = datafield = 'potassiumInKg';
					datalabel = 'Potassium';
					break;
				case 'phosphorus':
					milkdatafield = datafield = 'phosphorusInKg';
					datalabel = 'Phosphorus';
					break;
				case 'sulphur':
					milkdatafield = datafield = 'sulphurInKg';
					datalabel = 'Sulphur';
					break;

			}

			try {
				var KgToTonne = "";
				var divisor = 1;
				if (datalabel == "Mass") {
					KgToTonne = "/1000"; //make it tonne
					divisor = 1000;
				}
				data.addColumn('string', 'Source');
				data.addColumn('number', datalabel + '(' + imp_exp_str + ')');
				if (imp_or_exp == 'import') {


					data.addRows([
						['Grains & Concentrates (DM)', parseFloat(eval("farmData.nutrientCalculator.concentratesPurchased." + datafield + KgToTonne))],
						['Forages/Hay/Silage (DM)', parseFloat(eval("farmData.nutrientCalculator.foragesPurchased." + datafield + KgToTonne))],
						['Fertiliser', parseFloat(eval("farmData.nutrientCalculator.fertilizersPurchased." + datafield + KgToTonne))],
						['Animals (Live weight)', parseFloat(eval("farmData.nutrientCalculator.cowsPurchased." + datafield + KgToTonne))],
						['Fixation', fixation_val],
						['Atmosphere', atmosphere_val]//should be based on area code??
					]);
				} else {
					data.addRows([
						['Milk', parseFloat(eval("farmData.nutrientCalculator.milkSold." + milkdatafield + KgToTonne))],
						['Animals', parseFloat(eval("farmData.nutrientCalculator.cowsCulled." + datafield + KgToTonne))]
					]);

				}
			} catch (Err) {
				alert(Err.message);
			}

			// Set chart options
			var unit = "unit";
			if (what_to_draw == "mass") unit = "DM, tonnes/yr";
			else unit = "DM, kg/yr";
			var options = {
				vAxis: {title: unit, titleTextStyle: {color: 'red'}, slantedText: true, slantedTextAngle: 90},
				hAxis: {title: 'Source', titleTextStyle: {color: 'red'}},
				'title': datalabel + ' ' + imp_exp_str + 'ed',
				'width': 400,
				'height': 300
			};


			// Instantiate and draw our chart, passing in some options.
			var div_id = 'chart_div_' + what_to_draw + '_' + imp_or_exp;

			var chart_type_selected = "PieChart";
			var options_bar = {
				hAxis: {title: unit, titleTextStyle: {color: 'red'}, slantedText: true, slantedTextAngle: 90},
				vAxis: {title: 'Source', titleTextStyle: {color: 'red'}},
				'title': datalabel + ' ' + imp_exp_str + 'ed',
				'width': 400,
				'height': 300
			};

			var chart = eval("new google.visualization." + chart_type_selected + "(document.getElementById(div_id))");
			//var chart = eval(vis);
			if (chart_type_selected == "BarChart") chart.draw(data, options_bar);
			else chart.draw(data, options);

		}

	})

/**
 * directives are markers on a DOM element (such as an attribute,
 * element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. via event listeners),
 * or even to transform the DOM element and its children
 * visit https://docs.angularjs.org/guide/directive for more information
 */
	.directive('onReadFile', function ($parse, $log) {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				var fn = $parse(attrs.onReadFile);

				element.on('change', function (onChangeEvent) {
					//var file =  (onChangeEvent.srcElement || onChangeEvent.target).files[0]
					var file = (onChangeEvent.target).files[0]
					$log.info('onReadFile.onChange... onChangeEvent.srcElement:%s, ' +
						'onChangeEvent.target:%s, (onChangeEvent.srcElement || onChangeEvent.target).files[0]: %s',
						onChangeEvent.srcElement, onChangeEvent.target,
						angular.toJson(file))

					var reader = new FileReader();

					reader.onload = function (onLoadEvent) {
						scope.$apply(function () {
							fn(scope, {$fileContent: onLoadEvent.target.result});
						});
					};
					reader.onerror = function (onLoadEvent) {
					};

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	});