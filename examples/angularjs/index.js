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
            try {
                $scope.farmData = {};
                var farmData = nutrientCalculator.load(angular.fromJson($fileContent));
                if (!angular.isDefined(farmData)) {
                    $scope.noResult = true;
                    return;
                }
                $scope.farmData = farmData;
                $scope.balance = nutrientCalculator.balance($scope.farmData);
                $scope.efficiency = nutrientCalculator.efficiency($scope.farmData);
                $scope.saveToSessionStorage('farmData', angular.toJson($scope.farmData));
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

        $scope.calculate = function() {
            $log.info('calculate...');

            nutrientCalculator.ga.trackCalculate('AgSmart');
        };

        $scope.saveToSessionStorage = function (key, value) {
            sessionStorage.setItem(key, value);
        };

        function findInSessionStorage() {
            return angular.fromJson(sessionStorage.getItem('farmData'));
        };

        if (load) {
            $scope.farmData = findInSessionStorage();
            if ($scope.farmData) {
                $scope.balance = nutrientCalculator.balance($scope.farmData);
                $scope.efficiency = nutrientCalculator.efficiency($scope.farmData);
            }
        }

    })

    .directive('onReadFile', function ($parse, $log) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                element.on('change', function (onChangeEvent) {
                    $log.info('onReadFile.onChange... onChangeEvent.srcElement:%s, ' +
                        'onChangeEvent.target:%s, (onChangeEvent.srcElement || onChangeEvent.target).files[0]: %s',
                      onChangeEvent.srcElement,onChangeEvent.target,
                      (onChangeEvent.srcElement || onChangeEvent.target).files[0])
                    var reader = new FileReader();

                    reader.onload = function (onLoadEvent) {
                        scope.$apply(function () {
                            fn(scope, {$fileContent: onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    });