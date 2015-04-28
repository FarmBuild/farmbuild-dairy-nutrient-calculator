'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var foragesPurchased, lucerneHay;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_foragesPurchased_) {
    foragesPurchased = _foragesPurchased_;
    lucerneHay = foragesPurchased.types()[0];
  }));

  describe('foragesPurchased factory', function(){
    it('foragesPurchased should be defined', inject(function() {
      expect(foragesPurchased).toBeDefined();
    }));
  });

  function createdForages(type, weight, isDry) {
    return [{type: type, weight:weight, isDry:isDry}];
  }

  describe('calculate the weighted average for Forage Purchased', function(){

    it('Lucerne Hay type with undefined amount should fail', inject(function() {
      var result = foragesPurchased.calculate(createdForages(lucerneHay, true))
      expect(result).toBeUndefined()
    }));

    it('Lucerne Hay type and amount of 1000 should be calculated', inject(function() {
      var weight = 1000;
      var result = foragesPurchased.calculate(createdForages(lucerneHay, weight, true))
      expect(result.dryAmountPurchased).toEqual(832.3)
    }));
  });

});
