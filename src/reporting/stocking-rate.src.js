/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('stockingRate',
  function (validations,
            $log) {
    var stockingRate = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

    function validate(summary, area) {
      if(!_isDefined(area)) {
        $log.error('farmData.area must be populated');
        return false;
      }

      if(!_isDefined(summary) ||
        !_isDefined(summary.numberOfMilkingCows) ||
        !_isDefined(summary.milkingAreaInHa)) {
        $log.error('nutrientCalculator.summary must be populated for numberOfMilkingCows, milkingAreaInHa');
        return false;
      }
      return true;
    }

    function calculate(nutrientCalculator, area) {
      var summary = nutrientCalculator.summary;

      if(!validate(summary, area)) {
        return undefined;
      }

      var result = {},
        numberOfMilkingCows = summary.numberOfMilkingCows,
        milkingAreaInHa = summary.milkingAreaInHa
        ;
      result.milkingArea = numberOfMilkingCows/milkingAreaInHa;
      result.wholeFarm =  numberOfMilkingCows/area;

      return result;
    }

    stockingRate.calculate = calculate;

    return stockingRate;
  });