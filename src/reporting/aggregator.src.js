/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientAggregator',
  function (validations,
            $log) {
    var nutrientAggregator = {},
      _isDefined = validations.isDefined;

    function _aggregate(farmData) {
      var data = farmData.nutrientCalculator,
        incomings = {
          nitrogenInKg: 0,
          potassiumInKg: 0,
          phosphorusInKg: 0,
          sulphurInKg: 0
        },
        outgoings = {
          nitrogenInKg: 0,
          potassiumInKg: 0,
          phosphorusInKg: 0,
          sulphurInKg: 0
        }, addIncomings = function (key) {
          incomings.nitrogenInKg += data[key].nitrogenInKg;
          incomings.potassiumInKg += data[key].potassiumInKg;
          incomings.phosphorusInKg += data[key].phosphorusInKg;
          incomings.sulphurInKg += data[key].sulphurInKg;
        }, addOutgoings = function (key) {
          outgoings.nitrogenInKg += data[key].nitrogenInKg;
          outgoings.potassiumInKg += data[key].potassiumInKg;
          outgoings.phosphorusInKg += data[key].phosphorusInKg;
          outgoings.sulphurInKg += data[key].sulphurInKg;
        };

      //Imported values
      if (_isDefined(data.milkSold)) {
        addOutgoings('milkSold')
      }
      if (_isDefined(data.cowsCulled)) {
        addOutgoings('cowsCulled')
      }

      //Exported values
      if (_isDefined(data.cowsPurchased)) {
        addIncomings('cowsPurchased');
      }
      if (_isDefined(data.concentratesPurchased)) {
        addIncomings('concentratesPurchased');
      }
      if (_isDefined(data.foragesPurchased)) {
        addIncomings('foragesPurchased');
      }
      if (_isDefined(data.fertilizersPurchased)) {
        addIncomings('fertilizersPurchased');
      }
      if (_isDefined(data.legumes)) {
        incomings.nitrogenInKg += data.legumes.averageNitrogenAppliedPerHaInKg;
        incomings.nitrogenInKg += data.legumes.availableNitrogenFromLegumesPerHaInKg;
        incomings.nitrogenInKg += data.legumes.availableNitrogenToPasturePerHaInKg;
      }

      return {
        incomings: incomings,
        outgoings: outgoings
      }
    }

    nutrientAggregator.calculate = function (farmData) {
      return _aggregate(farmData);
    };

    return nutrientAggregator;
  });