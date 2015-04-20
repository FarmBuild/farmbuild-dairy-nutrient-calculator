'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var AnimalPurchased;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_AnimalPurchased_) {
    AnimalPurchased = _AnimalPurchased_;
  }));

  describe('AnimalPurchased factory', function(){

    it('AnimalPurchased should be defined', inject(function() {
      expect(AnimalPurchased).toBeDefined();
    }));

  });
  
});
