'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var $log;
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  var fertilizerTypes, dairyManureStockpileName = 'Dairy manure stockpile',
    dapName = 'DAP', superphosphate = 'Superphosphate (Super)';

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_$log_, _fertilizerTypes_) {
    $log = _$log_;
    fertilizerTypes = _fertilizerTypes_;
  }));

  describe('fertilizerTypes factory', function(){
    it('fertilizerTypes should be defined', inject(function() {
      expect(fertilizerTypes).toBeDefined();
    }));
  });

  describe('types.at', function(){

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

  });

  describe('types.add', function(){
    it('New fertilizer type should be added on top of the existing', inject(function() {
      var name = 'New Fertilizer Type 1', dryMatterPercentage = 0.8,
        nitrogenPercentage = 2, phosphorusPercentage = 0.3,
        potassiumPercentage = 2.1, sulphurPercentage = 0.4,
        countExisting = fertilizerTypes.size(),
        result = fertilizerTypes.add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage),
        newCount = fertilizerTypes.size();
      expect(newCount-countExisting).toEqual(1);
      expect(fertilizerTypes.last().name).toEqual(name);
    }));
  });

  describe('types.byName', function(){
    it('byName should find ' + superphosphate, inject(function() {
      var found = fertilizerTypes.byName(superphosphate);
      expect(found.name).toEqual(superphosphate);
    }));
  });

  describe('types.removeAt', function(){
    it('removeAt should remove by index ', inject(function() {
      var types = fertilizerTypes.defaultTypes(),
        removed = fertilizerTypes.removeAt(0);
      expect(removed.length).toEqual(types.length -1);
    }));
  });

  describe('types.add', function() {
    it('add should create ' + dapName, inject(function() {
      var nitrogenPercentage = 3.14,
        phosphorusPercentage = 0.67,
        potassiumPercentage = 0.84,
        sulphurPercentage = 0.28,
        dryMatterPercentage = 88.78,
        metabolisableEnergyInMJPerKg = 12.72,
        types = fertilizerTypes.add(dapName,dryMatterPercentage,
          sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage),
        added = fertilizerTypes.last(types);

      $log.info('added: %j', added)

      expect(added.name).toEqual(dapName);
      expect(added.nitrogenPercentage).toEqual(nitrogenPercentage);
      expect(added.phosphorusPercentage).toEqual(phosphorusPercentage);
      expect(added.potassiumPercentage).toEqual(potassiumPercentage);
      expect(added.sulphurPercentage).toEqual(sulphurPercentage);
      expect(added.dryMatterPercentage).toEqual(dryMatterPercentage);
      expect(added.dryMatterPercentage).toEqual(dryMatterPercentage);

    }));
  });

});

