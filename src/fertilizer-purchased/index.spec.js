'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var fertilizerPurchased, averageCrop;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_fertilizerPurchased_) {
    fertilizerPurchased = _fertilizerPurchased_;
    averageCrop = fertilizerPurchased.types.at(0);
  }));

  describe('fertilizerPurchased factory', function(){
    it('fertilizerPurchased should be defined', inject(function() {
      expect(fertilizerPurchased).toBeDefined();
    }));
  });

  function createdFertilizer(type, weight, isDry) {
    return {type: type, weight:weight, isDry:isDry};
  }

  function addFertilizer(type, weight, isDry) {
    return [createdFertilizer(type, weight, isDry)];
  }

  describe('calculate nutrient of forage purchased', function(){

    it('Average crop type with undefined amount should fail', inject(function() {
      var result = fertilizerPurchased.calculate(addFertilizer(averageCrop, true))
      expect(result).toBeUndefined()
    }));

    it('Average crop type and amount of 1000 and basis of dry should be calculated', inject(function() {
      var weight = 1000;
      var result = fertilizerPurchased.calculate(addFertilizer(averageCrop, weight, true));
      expect(result.dryMatterWeight).toEqual(1000);
      expect(result.weight).toEqual(1000);
      expect(result.nitrogenPercentage > 2.98 && result.nitrogenPercentage < 3).toBeTruthy();
      expect(result.nitrogenInKg).toEqual(29.9);
      expect(result.phosphorusPercentage > 0.33 && result.phosphorusPercentage < 0.35).toBeTruthy();
      expect(result.phosphorusInKg).toEqual(3.4);
      expect(result.potassiumPercentage > 2.67 && result.potassiumPercentage < 2.7).toBeTruthy();
      expect(result.potassiumInKg).toEqual(26.8);
      expect(result.sulphurPercentage > 0.49 && result.sulphurPercentage < 0.52).toBeTruthy();
      expect(result.sulphurInKg).toEqual(5);
      expect(result.metabolisableEnergyInKg).toEqual(97.5);
      expect(result.metabolisableEnergyPercentage).toEqual(9.75);
    }));

  });

});

