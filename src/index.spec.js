'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var NutrientCalculator;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_NutrientCalculator_) {
    NutrientCalculator = _NutrientCalculator_;
  }));

  describe('NutrientCalculator factory', function(){
    it('NutrientCalculator should be defined', inject(function() {
      expect(NutrientCalculator).toBeDefined();
    }));

    it('NutrientCalculator should be defined', inject(function() {
      var farmData = {name: 'Parham\'s farm'};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.nutrientCalculator).toBeDefined();
    }));
  });



});
