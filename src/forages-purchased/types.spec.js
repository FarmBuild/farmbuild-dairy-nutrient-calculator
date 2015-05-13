'use strict';

describe('farmbuild.nutrientCalculator.types module', function() {

  // instantiate service
  var $log;
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));
  var forageTypes, pelletsCalfName = 'Pellets Calf', collections;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_$log_, _forageTypes_, _collections_) {
    $log = _$log_;
    forageTypes = _forageTypes_;
    collections = _collections_;
  }));

  describe('forageTypes factory', function(){
    it('forageTypes should be defined', inject(function() {
      expect(forageTypes).toBeDefined();
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
        types = forageTypes.add(pelletsCalfName,metabolisableEnergyInMJPerKg,dryMatterPercentage,
          sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage),
        added = collections.last(types);

      $log.info('added: %j', added)

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

