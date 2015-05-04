'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var fertilizerTypes, dairyManureStockpileName = 'Dairy manure stockpile',
    dapName = 'DAP', superphosphate = 'Superphosphate (Super)';

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_fertilizerTypes_) {
    fertilizerTypes = _fertilizerTypes_;
  }));

  describe('fertilizerTypes factory', function(){
    it('fertilizerTypes should be defined', inject(function() {
      expect(fertilizerTypes).toBeDefined();
    }));
  });

//  function createdFertilizer(type, weight, isDry) {
//    return {type: type, weight:weight, isDry:isDry};
//  }
//
//  function addFertilizer(type, weight, isDry) {
//    return [createdFertilizer(type, weight, isDry)];
//  }

  describe('types', function(){

    it('given default types, at(0) should return ' + dairyManureStockpileName, inject(function() {
      var dairyManureStockpile = fertilizerTypes.at(0);
      expect(dairyManureStockpile.name).toEqual(dairyManureStockpileName);
    }));

    it('given default types, at(1) should return ' + dapName, inject(function() {
      var dap = fertilizerTypes.at(1);
      expect(dap.name).toEqual(dapName);
      expect(dap.nitrogenPercentage).toEqual(18);
      expect(dap.phosphorusPercentage).toEqual(20);
      expect(dap.potassiumPercentage).toEqual(0);
      expect(dap.sulphurPercentage).toEqual(1.6);
      expect(dap.dryMatterPercentage).toEqual(100);
    }));

    it('New fertilizer type should be added on top of the existing', inject(function() {
      var name = 'New Fertilizer Type 1', dryMatterPercentage = 0.8,
        nitrogenPercentage = 2, phosphorusPercentage = 0.3,
        potassiumPercentage = 2.1, sulphurPercentage = 0.4,
        countExisting = fertilizerTypes.size(),
        result = fertilizerTypes.add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage ),
        newCount = fertilizerTypes.size();
      expect(newCount-countExisting).toEqual(1);
      expect(fertilizerTypes.last().name).toEqual(name);
    }));

    it('byName should find ' + superphosphate, inject(function() {
      var found = fertilizerTypes.byName(superphosphate);
      expect(found.name).toEqual(superphosphate);
    }));
  });

});

