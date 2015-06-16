angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

	.run(function ($rootScope) {
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	.controller('FarmCtrl', function ($scope, $log, farmdata, nutrientCalculator) {

		$scope.farmData = {};

		$scope.loadFarmData = function ($fileContent) {
			$log.info('$scope.loadFarmData $fileContent..');

			try {
				$scope.farmData = {};
				var farmData = nutrientCalculator.load(angular.fromJson($fileContent));

				if (!angular.isDefined(farmData)) {
					$scope.noResult = true;
					return;
				}

				updateFarmData($scope, farmData);

			} catch (e) {
				console.error('farmbuild.nutrientCalculator.examples > load: Your file should be in json format: ', e);
				$scope.noResult = true;
			}
		};

		$scope.exportFarmData = function (farmData) {
			nutrientCalculator.export(document, farmData);
		};

		$scope.calculate = function () {
			$log.info('calculate...');
			var farmData = nutrientCalculator.calculate($scope.farmData);

			updateFarmData($scope, farmData);

			$scope.drawChart();
			nutrientCalculator.ga.trackCalculate('AgSmart');
		};

		$scope.clear = function () {
			$scope.farmData = {};
			nutrientCalculator.farmdata.session.clear();
//      var path = location.href.toString(),
//        path = path.substring(0, path.indexOf('?'));
			location.href = farmdata.session.clearLoadFlag(location);
		}

		if (nutrientCalculator.session.isLoadFlagSet(location)) {
			var farmData = nutrientCalculator.find();

			updateFarmData($scope, farmData);
		}

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