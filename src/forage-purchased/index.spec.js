'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var foragesPurchased;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_foragesPurchased_) {
    foragesPurchased = _foragesPurchased_;
  }));

  describe('foragesPurchased factory', function(){
    it('foragesPurchased should be defined', inject(function() {
      expect(foragesPurchased).toBeDefined();
    }));
  });

  describe('calculate the weighted average for Forage Purchased', function(){
    it('Lucerne Hay type with undefined amount should fail', inject(function() {
      var lucerneHay = foragesPurchased.types()[0],
        weight = 1000;
      var result = foragesPurchased.calculate([{type: lucerneHay, isDry:true}])
      expect(result).toBeUndefined()
    }));
    it('Lucerne Hay type and amount of 1000 should be calculated', inject(function() {
      var lucerneHay = foragesPurchased.types()[0],
        weight = 1000;
      var result = foragesPurchased.calculate([{type: lucerneHay, weight:weight, isDry:true}])
      expect(result.dryAmountPurchased).toEqual(832.3)

    }));
  });

});
