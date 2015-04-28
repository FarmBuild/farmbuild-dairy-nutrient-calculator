'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var foragesPurchased, averageCrop;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_foragesPurchased_) {
    foragesPurchased = _foragesPurchased_;
    averageCrop = foragesPurchased.types()[0];
  }));

  describe('foragesPurchased factory', function(){
    it('foragesPurchased should be defined', inject(function() {
      expect(foragesPurchased).toBeDefined();
    }));
  });

  function Forages() {

  }

  function createdForage(type, weight, isDry) {
    return {type: type, weight:weight, isDry:isDry};
  }

  function addForage(type, weight, isDry) {
    return [createdForage(type, weight, isDry)];
  }

  describe('calculate nutrient of forage purchased', function(){

    it('Average crop type with undefined amount should fail', inject(function() {
      var result = foragesPurchased.calculate(addForage(averageCrop, true))
      expect(result).toBeUndefined()
    }));

    it('Average crop type and amount of 1000 should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(addForage(averageCrop, weight, true));
      expect(result.dryMatterWeight).toEqual(1000);
      expect(result.weight).toEqual(1000);
      expect(result.nitrogenInKg).toEqual(29.9);
    }));
  });

});

