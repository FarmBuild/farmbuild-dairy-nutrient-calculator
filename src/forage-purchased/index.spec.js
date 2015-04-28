'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var foragesPurchased, averageCrop;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_foragesPurchased_) {
    foragesPurchased = _foragesPurchased_;
    averageCrop = foragesPurchased.types()[0];
  }));

  describe('foragesPurchased factory', function(){
    it('foragesPurchased should be defined', inject(function() {
      expect(foragesPurchased).toBeDefined();
    }));
  });

  function Forages() {

  }

  function createdForage(type, weight, isDry) {
    return {type: type, weight:weight, isDry:isDry};
  }

  function addForage(type, weight, isDry) {
    return [createdForage(type, weight, isDry)];
  }

  describe('calculate nutrient of forage purchased', function(){

    it('Average crop type with undefined amount should fail', inject(function() {
      var result = foragesPurchased.calculate(addForage(averageCrop, true))
      expect(result).toBeUndefined()
    }));

    it('Average crop type and amount of 1000 and basis of dry should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(addForage(averageCrop, weight, true));
      console.log(result);
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

    it('Average crop type and amount of 1000 and basis of wet should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(addForage(averageCrop, weight, false));
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
      expect(result.metabolisableEnergyInKg > 43.33 && result.metabolisableEnergyInKg < 43.34).toBeTruthy();
      expect(result.metabolisableEnergyPercentage).toEqual(9.75);
    }));

  });

});

