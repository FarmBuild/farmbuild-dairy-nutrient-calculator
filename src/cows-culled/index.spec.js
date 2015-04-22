'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var CowsCulled;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_CowsPurchased_) {
    CowsCulled = _CowsPurchased_;
  }));

  describe('CowsCulled factory', function(){

    it('CowsCulled should be defined', inject(function() {
      expect(CowsCulled).toBeDefined();
    }));

    it('CowsCulled.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(CowsCulled.addType(2, 50)).toBeUndefined();
      expect(CowsCulled.addType('!2', 50)).toBeUndefined();
      expect(CowsCulled.addType('new', 'w')).toBeUndefined();
    }));

    it('CowsCulled.addTypes should return new type if type\'s is valid', inject(function() {
      expect(CowsCulled.addType('newType', 50)).toBeDefined();
      expect(CowsCulled.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('CowsCulled.calculate should return nutrient data', inject(function() {
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}])).toBeDefined();
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).cows).toBeDefined();
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).weight).toEqual(1800);
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).numberOfCows).toEqual(3);
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).sulphurInKg).toEqual(14.4);
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).nitrogenInKg).toEqual(50.4);
    }));

    it('CowsCulled.addType should return undefined if cows parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(CowsCulled.addType('@', 50)).toBeUndefined();
      expect(CowsCulled.addType('newType', -50)).toBeUndefined();
    }));

    it('CowsCulled.calculate should return undefined for negative number', inject(function() {
      expect(CowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:-2}, {name:'Average adult cattle', weight: 500, numberOfCows:-1}])).toBeUndefined();
    }));

  });
  
});
