'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var MilkSold;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_MilkSold_) {
    MilkSold = _MilkSold_;
  }));

  describe('MilkSold factory', function(){
    it('MilkSold should be defined', inject(function() {
      expect(MilkSold).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by Kg', inject(function() {
      var nutrientByKg = MilkSold.calculateByKg(100, 10, 90);
      expect(nutrientByKg).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by %', inject(function() {
      var nutrientByPercentage = MilkSold.calculateByPercent(10000);
      expect(nutrientByPercentage).toBeUndefined();
    }));

    it('Calculate MilkSold nutrient by %', inject(function() {
      var nutrientByPercentage = MilkSold.calculateByPercent(10000, 4);
      expect(nutrientByPercentage).toBeUndefined();
    }));

    it('Calculate MilkSold nutrient by %', inject(function() {
      var nutrientByPercentage = MilkSold.calculateByPercent(10000, 4, 3.5);
      expect(nutrientByPercentage).toBeDefined();
      expect(nutrientByPercentage.totalPerYearInLitre).toEqual(10000);
      expect(nutrientByPercentage.proteinInKg).toEqual(400);
      expect(nutrientByPercentage.proteinPercentage).toEqual(4);
      expect(nutrientByPercentage.fatInKg).toEqual(350);
      expect(nutrientByPercentage.fatPercentage).toEqual(3.5);
      expect(nutrientByPercentage.nitrogenInKg).toEqual(63.19);
      expect(nutrientByPercentage.nitrogenPercentage).toEqual(0.63);
      expect(nutrientByPercentage.phosphorusInKg).toEqual(9.14);
      expect(nutrientByPercentage.phosphorusPercentage).toEqual(0.09);
      expect(nutrientByPercentage.potassiumInKg).toEqual(14);
      expect(nutrientByPercentage.potassiumPercentage).toEqual(0.14);
      expect(nutrientByPercentage.sulphurInKg).toEqual(6);
      expect(nutrientByPercentage.sulphurPercentage).toEqual(0.06);
    }));


    it('Calculate MilkSold nutrient by % and kg should have same result', inject(function() {
      var nutrientByPercentage = MilkSold.calculateByPercent(1000, 10, 90);
      var nutrientByKg = MilkSold.calculateByKg(1000, 100, 900);
      expect(nutrientByPercentage.fatInKg).toEqual(nutrientByKg.fatInKg);
      expect(nutrientByPercentage.fatPercentage).toEqual(nutrientByKg.fatPercentage);
      expect(nutrientByPercentage.sulphurPercentage).toEqual(nutrientByKg.sulphurPercentage);
      expect(nutrientByPercentage.phosphorusInKg).toEqual(nutrientByKg.phosphorusInKg);
    }));

  });
});
