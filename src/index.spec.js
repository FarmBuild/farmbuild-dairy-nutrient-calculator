'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var NutrientCalculator;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_NutrientCalculator_) {
    NutrientCalculator = _NutrientCalculator_;
  }));

  describe('MilkSold factory', function(){

    it('NutrientCalculator should be defined', inject(function() {
      expect(NutrientCalculator).toBeDefined();
    }));

  });
});
