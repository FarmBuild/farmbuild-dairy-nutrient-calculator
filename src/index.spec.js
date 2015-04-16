'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // define NutrientCalculator service
  var NutrientCalculator;

  // instantiate farmbuild.nutrientCalculator module
  beforeEach(module('farmbuild.nutrientCalculator'));

  // instantiate NutrientCalculator service
  beforeEach(inject(function (_NutrientCalculator_) {
    NutrientCalculator = _NutrientCalculator_;
  }));

  describe('NutrientCalculator factory', function(){

    it('NutrientCalculator factory should be defined', inject(function() {
      expect(NutrientCalculator).toBeDefined();
    }));

    it('window.farmbuild name space should be defined', inject(function() {
      expect(window.farmbuild).toBeDefined();
    }));

    it('NutrientCalculator.milkSold should be defined', inject(function() {
      expect(NutrientCalculator.milkSold).toBeDefined();
    }));

    it('NutrientCalculator.load should add nutrientCalculator block', inject(function() {
      var farmData = {name: 'Parham\'s farm'};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.nutrientCalculator).toBeDefined();
    }));

    it('NutrientCalculator.load return value should have the correct name', inject(function() {
      var name = 'Parham\'s farm', farmData = {name: name};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.name).toMatch(name);
    }));

  });
  
});
