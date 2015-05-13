/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  // instantiate log
  var $log, nutrientMediumValidator,nutrientMediumTypes;
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

  beforeEach(inject(function (_$log_, _nutrientMediumValidator_, _nutrientMediumTypes_) {
    $log = _$log_;
    nutrientMediumValidator = _nutrientMediumValidator_;
    nutrientMediumTypes = _nutrientMediumTypes_;
  }))

  describe('nutrientMediumValidator.validate should validate the weight, type, isDry', function() {
    it('empty nutrientMedium must be invalid ', inject(function() {
      var nutrientMedium = {};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeFalsy()
    }))

    it('empty weight must be invalid ', inject(function() {
      var nutrientMedium = {type:{}, weight:undefined,isDry:true};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeFalsy()
    }))

    it('negative weight must be invalid ', inject(function() {
      var nutrientMedium = {type:{}, weight:-1,isDry:true};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeFalsy()
    }))

    it('0 weight must be invalid ', inject(function() {
      var nutrientMedium = {type:{}, weight:0,isDry:true};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeFalsy()
    }))

    it('poritive weight must be invalid ', inject(function() {
      var nutrientMedium = {type:createValid(), weight:0.1,isDry:true};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeTruthy()
    }))

    it('poritive weight must be invalid ', inject(function() {
      var nutrientMedium = {type:createValidWithMetabolisableEnergyInMJPerKg(), weight:0.1,isDry:true};
      expect(nutrientMediumValidator.validate(nutrientMedium)).toBeTruthy()
    }))
  })

  afterEach(function() {
    fixture.cleanup()
  });
});
