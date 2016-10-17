/**
 * AngularJS is popular JavaScript MVC framework which is developed by google.
 * In this example we use AngularJS to construct the structure of the client side application.
 * You can find out more about AngularJS at https://angularjs.org
 * In farmbuild project we have used AngularJS as an internal dependency to provide modular structure, but to use FarmBuild JavaScript libraries you are not forced to use AngularJS.
 * All the api function are available via "farmbuild" namespace (eg: farmbuild.webmapping, farmbuild.nutrientcalculator).
 * Have a look at the jQuery example section to understand more on how to use farmbuild api without directly. (https://github.com/FarmBuild/farmbuild-dairy-nutrient-calculator/tree/master/examples/jquery)
 * If you are using AngularJS in your application you can consume farmbuild component as AngularJS modules, similar to this example.
 */

/**
 * Defining my application and passing 'farmbuild.nutrientCalculator' as a dependency to be injected.
 */
angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

	/**
	 * "run" method is executed before any other function in application, so we are putting my initial configs here.
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
	 * This is where we put the logic of my application
	 */
	.controller('FarmCtrl', function ($scope, $log, farmdata, nutrientCalculator) {

		/**
		 * Defining a variable on the $scope for farmdata
		 */
		$scope.farmData = {};

		/**
		 * Load farmdata
		 * Here we read farmdata from a JSON file and we load it into nutrientCalculator.
		 * Because value is a string we need to convert it to JavaScript object using "angular.fromJson"
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
		 * Here we are passing the farmdata to calculate method which does all the nutrient calculations and returns updated farmdata with the updated nutrientCalculator block
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
			 * Here we are using 'farmbuild-test-client', change this with your own organisation name.
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
			
			drawBenchMarkingCharts();
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
/**********code for drawing whisker plots*********/
		function drawWhiskerChart(dataArray, i) {
		   
			var ColHeaderDesc = {'balance.nitrogen':"Net Bal N", 'balance.phosphorus':"Net Bal P",'balance.potassium':"Net Bal K",'balance.sulphur':"Net Bal S",'efficiency.nitrogen':"N Efficiency %",'efficiency.phosphorus':"P Efficiency %",'efficiency.potassium':"K Efficiency %",'efficiency.sulphur':"S Efficiency %",
			'stockingRate.milkingArea':"Milking area Stocking rate",'feedBalance.homeForageConsumed':"Home Forage consumption (kg DM)",'feedBalance.homegrownTotalFeedRatio':"Home forage as a proportion",'feedBalance.forageTotalFeedRatio':"% Feed Imported",
			'milkProduction.milkSoldPerCowInLitre':"Milk litres per cow",'milkProduction.milkSoldPerHectareInLitre':"Milk litres per Ha",'TotalFertiliserNImportedperHa':"Total Fertiliser N Imported per Ha",'TotalFeedNImportedperHa':"Total Feed N Imported per ha",'TotalFertiliserPImportedperHa':"Total Fertiliser P Imported per Ha",
			'TotalFeedPImportedperHa':"Total Feed P Imported per Ha",'TotalFertiliserKImportedperHa':"Total Fertiliser K Imported per Ha",'TotalFeedKImportedperHa':"Total Feed K Imported per Ha",'TotalFertiliserSImportedperHa':"Total Fertiliser S Imported per Ha",'TotalFeedSImportedperHa':"Total Feed S Imported per Ha"
			 };
			var ylabel = ColHeaderDesc[dataArray[0]];
			dataArray[0]='';	
			var data = google.visualization.arrayToDataTable([
                   dataArray
          // Treat first row as data as well.
			], true);
		
		var div_id="chart_div".concat(i);
	
		var ac = new google.visualization.ComboChart(document.getElementById(div_id));
		ac.draw(data, {
		title : 'Whisker plot for Whole Farm '.concat(ylabel),
		
		orientation:'vertical',
		width: 650,
		height: 400,		
		
		bar: { width: 20 }, 
		series: { 0: {type: "candlesticks", labelInLegend:'Box (Q1, Q3)'}, 1: {labelInLegend: ylabel, type: "line", pointSize: 20, pointShape:{type: 'star', dent:0.5}, lineWidth:
	0 },2: {labelInLegend:'Min', type: "line", pointSize: 10, pointShape: 'diamond',lineWidth:0 }, 3: {labelInLegend:'Median', type: "line", pointSize: 10, lineWidth:0 },
	4: {labelInLegend:'Max', type: "line", pointSize: 10, pointShape: 'triangle',lineWidth:0 }}
	});
}

	function drawBenchMarkingCharts(){
			var ColHeader = ["balance.nitrogen","balance.phosphorus","balance.potassium","balance.sulphur","efficiency.nitrogen","efficiency.phosphorus","efficiency.potassium","efficiency.sulphur","stockingRate.milkingArea","feedBalance.homeForageConsumed","feedBalance.homegrownTotalFeedRatio","feedBalance.forageTotalFeedRatio","milkProduction.milkSoldPerCowInLitre","milkProduction.milkSoldPerHectareInLitre","TotalFertiliserNImportedperHa","TotalFeedNImportedperHa","TotalFertiliserPImportedperHa","TotalFeedPImportedperHa","TotalFertiliserKImportedperHa","TotalFeedKImportedperHa","TotalFertiliserSImportedperHa","TotalFeedSImportedperHa"];
			var RowHeader= ["Min","FirstQuartile","Median","ThirdQuartile","Max"];
			var BenchMarkDataArray = [[47,	-7,	9,	-6,	13.9,	6,	9,	6,	0.4,	0.37,	31,	3.14,	3198,	2948,	0,	9.39,	0,	2.13,	0,	7.11,	0,	1.48],
						  [164,	14,	42,	15,	22.5,	27.8,	14,	17,	1.2,	4.14,	54.85,	26,	5981.5,	7497,	71.66,	60.35,	9.57,	10.79,	14.9,	25.11,	5.54,	5.339],
						  [233,	27,	81,	27,	25.3,	33,	20,	25,	1.97,	6.69,	67.28,	32.72,	7038,	11445,	143,	94.73,	19,	16,	34.81,	39.74,	15.33,	7.93],
						  [300,	46,	107,	39,	30.9,	48,	27,	37,	2.6,	10.22,	74,	45.15,	8202,	14428.5,	189.85,	139.11,	29.22,	28.16,	68.27,	68.97,	28.24,	13.16],
						  [601,	133,	452,	184,	49.7,	158,	68.2,	183,	3.7,	16.47,	96.86,	69,	10445,	36637,	423.91,	544.11,	81.78,	86.38,	176.86,	337.78,	84.67,	72.75]
						];
			var BenchMarkingParam = {};						
			var uinput={};	//will be passed from nutrient topic package
			var farmData = nutrientCalculator.find();
			
        		
		for(i=0; i<BenchMarkDataArray[0].length; i++){
   
			BenchMarkingParam[ColHeader[i]]={"Min":0, "FirstQuartile":0,"Median":0,"ThirdQuartile":0, "Max":0,"UserInput":0};
			uinput[ColHeader[i]]=Math.floor((Math.random() * 100) + 1);  //uinput = {"Net Bal N":100,...}
            if (i<=13) {
				uinput[ColHeader[i]] = Math.floor(eval("$scope."+ColHeader[i]));//eval("$scope.balance."+ColHeader[i]);
				if(i==9) uinput[ColHeader[i]]/=1000; //home forage consumed is in Tonne of DM
			}
			BenchMarkingParam[ColHeader[i]].Min = BenchMarkDataArray[0][i];
			BenchMarkingParam[ColHeader[i]].FirstQuartile = BenchMarkDataArray[1][i];
			BenchMarkingParam[ColHeader[i]].Median = BenchMarkDataArray[2][i];
			BenchMarkingParam[ColHeader[i]].ThirdQuartile = BenchMarkDataArray[3][i];
			BenchMarkingParam[ColHeader[i]].Max = BenchMarkDataArray[4][i];
			BenchMarkingParam[ColHeader[i]].UserInput = uinput[ColHeader[i]];
		    	
		}
		//Fertilizers and Feed N, P, K, S Inputs
		BenchMarkingParam['TotalFertiliserNImportedperHa'].UserInput = Math.floor(farmData.nutrientCalculator.fertilizersPurchased.nitrogenInKg/farmData.area);
		BenchMarkingParam['TotalFertiliserPImportedperHa'].UserInput = Math.floor(farmData.nutrientCalculator.fertilizersPurchased.phosphorusInKg/farmData.area);
		BenchMarkingParam['TotalFertiliserKImportedperHa'].UserInput = Math.floor(farmData.nutrientCalculator.fertilizersPurchased.potassiumInKg/farmData.area);
		BenchMarkingParam['TotalFertiliserSImportedperHa'].UserInput = Math.floor(farmData.nutrientCalculator.fertilizersPurchased.sulphurInKg/farmData.area);
		
		BenchMarkingParam['TotalFeedNImportedperHa'].UserInput = Math.floor((farmData.nutrientCalculator.foragesPurchased.nitrogenInKg+farmData.nutrientCalculator.concentratesPurchased.nitrogenInKg)/farmData.area);
		BenchMarkingParam['TotalFeedPImportedperHa'].UserInput = Math.floor((farmData.nutrientCalculator.foragesPurchased.phosphorusInKg+farmData.nutrientCalculator.concentratesPurchased.phosphorusInKg)/farmData.area);
		BenchMarkingParam['TotalFeedKImportedperHa'].UserInput = Math.floor((farmData.nutrientCalculator.foragesPurchased.potassiumInKg+farmData.nutrientCalculator.concentratesPurchased.potassiumInKg)/farmData.area);
		BenchMarkingParam['TotalFeedSImportedperHa'].UserInput = Math.floor((farmData.nutrientCalculator.foragesPurchased.sulphurInKg+farmData.nutrientCalculator.concentratesPurchased.sulphurInKg)/farmData.area);
				
		var i=1;
		var dataArray=new Array(9);
		var elemDiv;
	for (var key in BenchMarkingParam) {   
		
		dataArray[0] = key; dataArray[1] = BenchMarkingParam[key].Min;dataArray[2] = BenchMarkingParam[key].FirstQuartile;dataArray[3] = BenchMarkingParam[key].ThirdQuartile;
		dataArray[4] = BenchMarkingParam[key].Max;dataArray[5]=BenchMarkingParam[key].UserInput; dataArray[6] = BenchMarkingParam[key].Min;dataArray[7] = BenchMarkingParam[key].Median;
		dataArray[8] = BenchMarkingParam[key].Max;		
   
		elemDiv = document.createElement('div');
		elemDiv.id = "chart_div".concat(i);
		elemDiv.className = 'chart_block';	
		elemDiv.style.cssText = 'float:left;width:49%;height:auto;';
		document.getElementById('nutrient_benchmarking_fieldset').appendChild(elemDiv);		
		drawWhiskerChart(dataArray,i);	
		i=i+1;
	}	
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
