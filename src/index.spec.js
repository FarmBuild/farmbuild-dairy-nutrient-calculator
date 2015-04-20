'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // define NutrientCalculator service
  var NutrientCalculator;

  // inject farmbuild.nutrientCalculator module
  beforeEach(module('farmbuild.nutrientCalculator'));

  // inject NutrientCalculator service
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

    it('NutrientCalculator.animalsPurchased should be defined', inject(function() {
      expect(NutrientCalculator.animalsPurchased).toBeDefined();
    }));

    it('NutrientCalculator.load should add nutrientCalculator block', inject(function() {
      var farmData = {name: 'Susan\'s farm'};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.nutrientCalculator).toBeDefined();
    }));

    it('NutrientCalculator.load return value should have the correct name', inject(function() {
      var name = 'Susan\'s farm', farmData = {name: name};
      farmData = NutrientCalculator.load(farmData);
      expect(farmData.name).toMatch(name);
    }));

  });

});
