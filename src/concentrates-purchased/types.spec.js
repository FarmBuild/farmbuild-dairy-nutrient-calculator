'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var $log;
  var concentrateTypes, pelletsCalfName = 'Pellets Calf';

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_$log_, _concentrateTypes_) {
    $log = _$log_;
    concentrateTypes = _concentrateTypes_;
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

});

