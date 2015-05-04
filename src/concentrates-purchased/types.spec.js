'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var $log;
  var concentrateTypes, dairyManureStockpileName = 'Dairy manure stockpile',
    dapName = 'DAP', superphosphate = 'Superphosphate (Super)';

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_$log_, _concentrateTypes_) {
    $log = _$log_;
    concentrateTypes = _concentrateTypes_;
  }));

//  describe('concentrateTypes factory', function(){
//    it('concentrateTypes should be defined', inject(function() {
//      expect(concentrateTypes).toBeDefined();
//    }));
//  });

//  describe('types.at', function(){
//
//    it('given default types, at(0) should return ' + dairyManureStockpileName, inject(function() {
//      var dairyManureStockpile = concentrateTypes.at(0);
//      expect(dairyManureStockpile.name).toEqual(dairyManureStockpileName);
//    }));
//
//    it('given default types, at(1) should return ' + dapName, inject(function() {
//      var dap = concentrateTypes.at(1);
//      expect(dap.name).toEqual(dapName);
//      expect(dap.nitrogenPercentage).toEqual(18);
//      expect(dap.phosphorusPercentage).toEqual(20);
//      expect(dap.potassiumPercentage).toEqual(0);
//      expect(dap.sulphurPercentage).toEqual(1.6);
//      expect(dap.dryMatterPercentage).toEqual(100);
//    }));
//
//  });
//
//  describe('types.add', function(){
//    it('New concentrate type should be added on top of the existing', inject(function() {
//      var name = 'New Concentrate Type 1', dryMatterPercentage = 0.8,
//        nitrogenPercentage = 2, phosphorusPercentage = 0.3,
//        potassiumPercentage = 2.1, sulphurPercentage = 0.4,
//        countExisting = concentrateTypes.size(),
//        result = concentrateTypes.add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage),
//        newCount = concentrateTypes.size();
//      expect(newCount-countExisting).toEqual(1);
//      expect(concentrateTypes.last().name).toEqual(name);
//    }));
//  });
//
//  describe('types.byName', function(){
//    it('byName should find ' + superphosphate, inject(function() {
//      var found = concentrateTypes.byName(superphosphate);
//      expect(found.name).toEqual(superphosphate);
//    }));
//  });
//
//  describe('types.removeAt', function(){
//    it('removeAt should remove by index ', inject(function() {
//      var types = concentrateTypes.defaultTypes(),
//        removed = concentrateTypes.removeAt(0);
//      expect(removed.length).toEqual(types.length -1);
//    }));
//  });

});

