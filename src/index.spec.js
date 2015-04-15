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

    it('NutrientCalculator load should add nutrientCalculator block', inject(function() {
      var farmData = {name: 'Parham\'s farm'};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.nutrientCalculator).toBeDefined();
    }));

    it('NutrientCalculator load return value should have the correct name', inject(function() {
      var name = 'Parham\'s farm', farmData = {name: name};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.name).toMatch(name);
    }));
  });



});
