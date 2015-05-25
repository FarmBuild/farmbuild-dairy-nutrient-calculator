'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var $log, foragesPurchased, averageCrop;
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_foragesPurchased_, _$log_) {
    foragesPurchased = _foragesPurchased_;
    averageCrop = foragesPurchased.types.at(0);
    $log = _$log_;
  }));

  describe('foragesPurchased factory', function(){
    it('foragesPurchased should be defined', inject(function() {
      expect(foragesPurchased).toBeDefined();
    }));
  });

  describe('calculate nutrient of forage purchased', function(){

    it('Average crop type with undefined amount should fail', inject(function() {
      var result = foragesPurchased.calculate(foragesPurchased.add(averageCrop, true).toArray());
      expect(result).toBeUndefined()
    }));

    it('Average crop type and amount of 1000 and basis of dry should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(foragesPurchased.add(averageCrop, weight, true).toArray());
      expect(result.weight).toEqual(1000);
      expect(result.dryMatterWeight).toEqual(1000);
      expect(result.nitrogenPercentage > 2.98 && result.nitrogenPercentage < 3).toBeTruthy();
      expect(result.nitrogenInKg).toEqual(29.9);
      expect(result.phosphorusPercentage > 0.33 && result.phosphorusPercentage < 0.35).toBeTruthy();
      expect(result.phosphorusInKg).toEqual(3.4);
      expect(result.potassiumPercentage > 2.67 && result.potassiumPercentage < 2.7).toBeTruthy();
      expect(result.potassiumInKg).toEqual(26.8);
      expect(result.sulphurPercentage > 0.49 && result.sulphurPercentage < 0.52).toBeTruthy();
      expect(result.sulphurInKg).toEqual(5);
      expect(result.metabolisableEnergyInMJ).toEqual(9750);
      expect(result.metabolisableEnergyInMJPerKg).toEqual(9.75);
    }));

    it('Average crop type and amount of 1000 and basis of wet should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(foragesPurchased.add(averageCrop, weight, false).toArray());
      expect(result.dryMatterWeight).toEqual(444.5);
      expect(result.weight).toEqual(1000);
      expect(result.nitrogenPercentage > 2.98 && result.nitrogenPercentage < 3).toBeTruthy();
      expect(result.nitrogenInKg > 13 && result.nitrogenInKg < 13.3).toBeTruthy();
      expect(result.phosphorusPercentage > 0.33 && result.phosphorusPercentage < 0.35).toBeTruthy();
      expect(result.phosphorusInKg > 1.5 && result.phosphorusInKg < 1.52).toBeTruthy();
      expect(result.potassiumInKg > 11.9 && result.potassiumInKg < 12).toBeTruthy();
      expect(result.potassiumPercentage > 2.67 && result.potassiumPercentage < 2.7).toBeTruthy();
      expect(result.sulphurPercentage > 0.49 && result.sulphurPercentage < 0.52).toBeTruthy();
      expect(result.sulphurInKg > 2.22 && result.sulphurInKg < 2.23).toBeTruthy();
      expect(result.metabolisableEnergyInMJ > 4333.87 && result.metabolisableEnergyInMJ < 4333.88).toBeTruthy();
      expect(result.metabolisableEnergyInMJPerKg).toEqual(9.75);
    }));


    it('New forage type should be added', inject(function() {
      var name = 'New Forage Type 1', dryMatterPercentage = 0.8,
      nitrogenPercentage = 2, phosphorusPercentage = 0.3,
      potassiumPercentage = 2.1, sulphurPercentage = 0.4,
      metabolisableEnergyInMJPerKg = 9,
      oldCount = foragesPurchased.types.size(),
      result = foragesPurchased.types.add(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage ),
      newCount = foragesPurchased.types.size();
      expect(newCount-oldCount).toEqual(1);
      expect(foragesPurchased.types.last().name).toEqual(name);
    }));

//    it('New forage type should be added at index 3', inject(function() {
//      var name = 'New Forage Type 4', dryMatterPercentage = 0.8,
//        nitrogenPercentage = 2, phosphorusPercentage = 0.3,
//        potassiumPercentage = 2.1, sulphurPercentage = 0.4,
//        metabolisableEnergyInMJPerKg = 9,
//        oldCount = foragesPurchased.types.size(),
//        result = foragesPurchased.types.
//          add(name, metabolisableEnergyInMJPerKg,
//          dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, 3),
//        newCount = foragesPurchased.types.size();
//      expect(newCount-oldCount).toEqual(1);
//
//      expect(foragesPurchased.types.at(oldCount+1).name).toEqual(name);
//    }));

    it('Forage type with index 3 should be removed', inject(function() {
      var index = 3, toBeRemoved = foragesPurchased.types.at(index),
        oldCount = foragesPurchased.types.size(),
        newCount;
      foragesPurchased.types.removeAt(index);
      newCount = foragesPurchased.types.size();
      expect(oldCount-newCount).toEqual(1);
      expect(toBeRemoved.name !== foragesPurchased.types.at(index).name).toBeTruthy();
    }));

    it('Forage type should be removed', inject(function() {
      var index = 3, toBeRemoved = foragesPurchased.types.at(index),
        oldCount = foragesPurchased.types.size(),
        newCount;
      foragesPurchased.types.remove(toBeRemoved);
      newCount = foragesPurchased.types.size();
      expect(oldCount-newCount).toEqual(1);
      expect(toBeRemoved.name !== foragesPurchased.types.at(index).name).toBeTruthy();
    }));

  });

});

