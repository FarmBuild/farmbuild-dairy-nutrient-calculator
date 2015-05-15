angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

  .run(function ($rootScope) {
    $rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
    $rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
  })

  .controller('FarmCtrl', function ($scope, $log, nutrientCalculator) {

    var load = false;
    if (location.href.split('?').length > 1 && location.href.split('?')[1].indexOf('load') === 0) {
      load = (location.href.split('?')[1].split('=')[1] === 'true');
    }

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

        $scope.farmData = farmData;
        $scope.balance = farmData.nutrientCalculator.balance;
        $scope.efficiency = farmData.nutrientCalculator.efficiency;

      } catch (e) {
        console.error('farmbuild.nutrientCalculator.examples > load: Your file should be in json format')
        $scope.noResult = true;
      }
    };

    $scope.exportFarmData = function (farmData) {
      var url = 'data:application/json;charset=utf8,' + encodeURIComponent(JSON.stringify(farmData, undefined, 2));
      window.open(url, '_blank');
      window.focus();
    };

    $scope.calculate = function () {
      $log.info('calculate...');
      $scope.farmData = nutrientCalculator.calculate($scope.farmData);
      $scope.balance = $scope.farmData.nutrientCalculator.balance;
      $scope.efficiency = $scope.farmData.nutrientCalculator.efficiency;

      nutrientCalculator.ga.trackCalculate('AgSmart');
    };

    $scope.clear = function () {
      $scope.farmData ={};
      nutrientCalculator.farmdata.session.clear();
      var path = location.href.toString(),
        path = path.substring(0, path.indexOf('?'));
      location.href = path;
    }

    if (nutrientCalculator.session.isLoadFlagSet(location)) {
      $scope.farmData = nutrientCalculator.find();

      if ($scope.farmData && $scope.farmData.nutrientCalculator) {
        $scope.balance = $scope.farmData.nutrientCalculator.balance;
        $scope.efficiency = $scope.farmData.nutrientCalculator.efficiency;
        return;
      }
      $scope.noResult = true;

    }

//    $scope.file;
//
//    $scope.loadFile =  function (file) {
//      $log.info('loadFile...');
//      var reader = new FileReader();
//
//      reader.onload = function (onLoadEvent) {
//        console.log('loadFile... onload, %s', onLoadEvent);
//      };
//
//      reader.onerror = function (onLoadEvent) {
//        console.log('loadFile... onerror', angular.toJson(onLoadEvent));
//      };
//
//      reader.onloadstart = function(onLoadEvent) {
//        console.log('loadFile... onloadstart, %s', onLoadEvent);
//      };
//
//      reader.onloadend = function(onLoadEvent) {
//        console.log('loadFile... onloadend, %s, %j, ', onLoadEvent, onLoadEvent.target.result);
//        $scope.loadFarmData(onLoadEvent.target.result);
//        $scope.$apply()
//      };
//
//      reader.readAsText(file);
//    }
//
//
//    $scope.readFile = function(onChangeEvent) {
//      $log.info('readFile... onChangeEvent');
//      $scope.file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
//      $scope.$apply()
//
////      var reader = new FileReader();
////      reader.onload = function (onLoadEvent) {
////        $log.info('readFile... onLoadEvent');
////        $scope.loadFarmData(onLoadEvent.target.result);
////        $scope.$apply()
////      };
////      reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
//    };

  })

  .directive('onReadFile', function ($parse, $log) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);

        element.on('change', function (onChangeEvent) {
          //var file =  (onChangeEvent.srcElement || onChangeEvent.target).files[0]
          var file =  (onChangeEvent.target).files[0]
          $log.info('onReadFile.onChange... onChangeEvent.srcElement:%s, ' +
              'onChangeEvent.target:%s, (onChangeEvent.srcElement || onChangeEvent.target).files[0]: %s',
            onChangeEvent.srcElement, onChangeEvent.target,
            angular.toJson(file))

          var reader = new FileReader();

          reader.onload = function (onLoadEvent) {
            //console.log('reader.onload', angular.toJson(onLoadEvent));
            scope.$apply(function () {
              fn(scope, {$fileContent: onLoadEvent.target.result});
            });
          };
          reader.onerror = function (onLoadEvent) {
            //console.log('reader.onload', angular.toJson(onLoadEvent));
          };

          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
  });