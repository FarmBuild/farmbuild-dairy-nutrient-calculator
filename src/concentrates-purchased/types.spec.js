'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var $log;
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  var concentrateTypes, pelletsCalfName = 'Pellets Calf', collections;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_$log_, _concentrateTypes_, _collections_) {
    $log = _$log_;
    concentrateTypes = _concentrateTypes_;
    collections = _collections_;
  }));

  describe('concentrateTypes factory', function(){
    it('concentrateTypes should be defined', inject(function() {
      expect(concentrateTypes).toBeDefined();
    }));
  });


  describe('types.byName', function(){
    it('byName should find ' + pelletsCalfName, inject(function() {
      var found = concentrateTypes.byName(pelletsCalfName),
          nitrogenPercentage = 3.14,
            phosphorusPercentage = 0.67,
            potassiumPercentage = 0.84,
            sulphurPercentage = 0.28,
            dryMatterPercentage = 88.78,
            metabolisableEnergyInMJPerKg = 12.72;

      expect(found.name).toEqual(pelletsCalfName);
      expect(found.nitrogenPercentage).toEqual(nitrogenPercentage);
      expect(found.phosphorusPercentage).toEqual(phosphorusPercentage);
      expect(found.potassiumPercentage).toEqual(potassiumPercentage);
      expect(found.sulphurPercentage).toEqual(sulphurPercentage);
      expect(found.dryMatterPercentage).toEqual(dryMatterPercentage);
      expect(found.dryMatterPercentage).toEqual(dryMatterPercentage);
      expect(found.metabolisableEnergyInMJPerKg).toEqual(metabolisableEnergyInMJPerKg);
    }));
  });

  describe('types.add', function(){
    it('add should create ' + pelletsCalfName, inject(function() {
      var nitrogenPercentage = 3.14,
        phosphorusPercentage = 0.67,
        potassiumPercentage = 0.84,
        sulphurPercentage = 0.28,
        dryMatterPercentage = 88.78,
        metabolisableEnergyInMJPerKg = 12.72,
        types = concentrateTypes.add(pelletsCalfName,metabolisableEnergyInMJPerKg,dryMatterPercentage,
          sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage),
        added = collections.last(types);

      expect(added.name).toEqual(pelletsCalfName);
      expect(added.nitrogenPercentage).toEqual(nitrogenPercentage);
      expect(added.phosphorusPercentage).toEqual(phosphorusPercentage);
      expect(added.potassiumPercentage).toEqual(potassiumPercentage);
      expect(added.sulphurPercentage).toEqual(sulphurPercentage);
      expect(added.dryMatterPercentage).toEqual(dryMatterPercentage);
      expect(added.dryMatterPercentage).toEqual(dryMatterPercentage);
      expect(added.metabolisableEnergyInMJPerKg).toEqual(metabolisableEnergyInMJPerKg);
    }));
  });

});

