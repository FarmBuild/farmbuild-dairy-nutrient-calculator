/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  // instantiate log
  var $log, nutrientMediumTypes;
  var name = 'New Type 1', dryMatterPercentage = 0.8,
    nitrogenPercentage = 2, phosphorusPercentage = 0.3,
    potassiumPercentage = 2.1, sulphurPercentage = 0.4,
    metabolisableEnergyInMJPerKg = 1.5;

  function createValid() {
    return nutrientMediumTypes.create(name,
      dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
  }

  function createValidWithMetabolisableEnergyInMJPerKg() {
    return nutrientMediumTypes.create(name,
      dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
      metabolisableEnergyInMJPerKg);
  }

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _nutrientMediumTypes_) {
    $log = _$log_;
    nutrientMediumTypes = _nutrientMediumTypes_;
  }))

  describe('nutrientMediumTypes.validate should validate the name, dryMatterPercentage, potassiumPercentage' +
    'phosphorusPercentage, nitrogenPercentage, sulphurPercentage', function() {
    it('empty nutrientMedium must be invalid ', inject(function() {
      var nutrientMediumType = {};
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('empty name must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.name = ''
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('0 dryMatterPercentage must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.dryMatterPercentage = 0
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('negative nitrogenPercentage must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.nitrogenPercentage = -1
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('negative sulphurPercentage must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.sulphurPercentage = -1
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('negative phosphorusPercentage must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.phosphorusPercentage = -1
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('negative potassiumPercentage must be invalid', inject(function() {
      var nutrientMediumType = createValid()
      nutrientMediumType.potassiumPercentage = -1
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('new type must be valid ', inject(function() {
      var nutrientMediumType = {}
      var nutrientMediumType = createValid()
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeTruthy()
    }))

    it('new type with metabolisableEnergyInMJPerKg must be invalid ', inject(function() {
      var nutrientMediumType = {}
      var nutrientMediumType = createValidWithMetabolisableEnergyInMJPerKg()
      nutrientMediumType.metabolisableEnergyInMJPerKg = -1
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeFalsy()
    }))

    it('new type with metabolisableEnergyInMJPerKg() must be valid ', inject(function() {
      var nutrientMediumType = {}
      var nutrientMediumType = createValidWithMetabolisableEnergyInMJPerKg()
      expect(nutrientMediumTypes.validate(nutrientMediumType)).toBeTruthy()
    }))
  })

  afterEach(function() {
    fixture.cleanup()
  });
});

