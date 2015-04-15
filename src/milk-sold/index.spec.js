'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var NutrientCalculator;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_NutrientCalculator_) {
    NutrientCalculator = _NutrientCalculator_;
  }));

  describe('MilkSold factory', function(){
    it('MilkSold should be defined', inject(function() {
      expect(NutrientCalculator).toBeDefined();
    }));

    it('MilkSold should be defined', inject(function() {
      expect(NutrientCalculator).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by Kg', inject(function() {
      var nutrientByKg = NutrientCalculator.milkSold.nutrientOfMilkSoldByKg(100, 10, 90);
      expect(nutrientByKg).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by %', inject(function() {
      var nutrientByPercentage = NutrientCalculator.milkSold.nutrientOfMilkSoldByPercent(100, 10, 90);
      expect(nutrientByPercentage).toBeDefined();
    }));

    it('Calculate MilkSold nutrient by % and kg should have same result', inject(function() {
      var nutrientByPercentage = NutrientCalculator.milkSold.nutrientOfMilkSoldByPercent(1000, 10, 90);
      var nutrientByKg = NutrientCalculator.milkSold.nutrientOfMilkSoldByKg(1000, 100, 900);
      expect(nutrientByPercentage.milkFatInKg).toEqual(nutrientByKg.milkFatInKg);
      expect(nutrientByPercentage.milkFatPercentage).toEqual(nutrientByKg.milkFatPercentage);
      expect(nutrientByPercentage.sulphurPercentage).toEqual(nutrientByKg.sulphurPercentage);
      expect(nutrientByPercentage.phosphorusInKg).toEqual(nutrientByKg.phosphorusInKg);
    }));

  });
});
