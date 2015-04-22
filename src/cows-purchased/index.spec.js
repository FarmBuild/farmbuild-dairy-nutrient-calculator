'use strict';

describe('farmbuild.nutrientCalculator module', function() {
  
  // instantiate service
  var CowsPurchased;
  
  beforeEach(module('farmbuild.nutrientCalculator'));
  
  beforeEach(inject(function (_CowsPurchased_) {
    CowsPurchased = _CowsPurchased_;
  }));
  
  describe('CowsPurchased factory', function(){
    
    it('CowsPurchased should be defined', inject(function() {
      expect(CowsPurchased).toBeDefined();
    }));
    
    it('CowsPurchased.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(CowsPurchased.addType(2, 50)).toBeUndefined();
      expect(CowsPurchased.addType('!2', 50)).toBeUndefined();
      expect(CowsPurchased.addType('new', 'w')).toBeUndefined();
    }));
    
    it('CowsPurchased.addTypes should return new type if type\'s is valid', inject(function() {
      expect(CowsPurchased.addType('newType', 50)).toBeDefined();
      expect(CowsPurchased.addType('newType', 50.4).addType).toBeDefined();
    }));
    
    it('CowsPurchased.calculate should return nutrient data', inject(function() {
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}])).toBeDefined();
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).cows).toBeDefined();
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).weight).toEqual(1800);
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).numberOfCows).toEqual(3);
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).sulphurInKg).toEqual(14.4);
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).nitrogenInKg).toEqual(50.4);
    }));
    
    it('CowsPurchased.addType should return undefined if cows parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(CowsPurchased.addType('@', 50)).toBeUndefined();
      expect(CowsPurchased.addType('newType', -50)).toBeUndefined();
    }));
    
    it('CowsPurchased.calculate should return undefined for negative number', inject(function() {
      expect(CowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:-2}, {name:'Average adult cattle', weight: 500, numberOfCows:-1}])).toBeUndefined();
    }));
    
  });
  
});
