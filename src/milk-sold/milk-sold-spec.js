'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var GoogleAnalytic, MilkSold;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_GoogleAnalytic_, _MilkSold_) {
    GoogleAnalytic = _GoogleAnalytic_,
      MilkSold = _MilkSold_;
  }));

  describe('MilkSold factory', function(){
    it('MilkSold should be defined', inject(function() {
      expect(MilkSold).toBeDefined();
    }));

    it('MilkSold should be defined', inject(function() {
      expect(MilkSold).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by Kg', inject(function() {
      var nutrientByKg = MilkSold.nutrientOfMilkSoldByKg(100, 10, 90);
      expect(nutrientByKg).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by %', inject(function() {
      var nutrientByPercentage = MilkSold.nutrientOfMilkSoldByPercent(100, 10, 90);
      expect(nutrientByPercentage).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by % and kg should have same result', inject(function() {
      var nutrientByPercentage = MilkSold.nutrientOfMilkSoldByPercent(1000, 10, 90);
      var nutrientByKg = MilkSold.nutrientOfMilkSoldByKg(1000, 100, 900);
      expect(nutrientByPercentage.milkFatInKg).toEqual(nutrientByKg.milkFatInKg);
      expect(nutrientByPercentage.milkFatPercentage).toEqual(nutrientByKg.milkFatPercentage);
      expect(nutrientByPercentage.sulphurPercentage).toEqual(nutrientByKg.sulphurPercentage);
      expect(nutrientByPercentage.phosphorusInKg).toEqual(nutrientByKg.phosphorusInKg);
    }));

  });
});
