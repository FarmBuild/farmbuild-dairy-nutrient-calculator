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

    it('AnimalPurchased.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(AnimalPurchased.addType(2, 50)).toBeUndefined();
      expect(AnimalPurchased.addType('!2', 50)).toBeUndefined();
      expect(AnimalPurchased.addType('new', 'w')).toBeUndefined();
    }));

    it('AnimalPurchased.addTypes should return new type if type\'s is valid', inject(function() {
      expect(AnimalPurchased.addType('newType', 50)).toBeDefined();
      expect(AnimalPurchased.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('AnimalPurchased.calculate should return nutrient data', inject(function() {
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}])).toBeDefined();
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}]).animals).toBeDefined();
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}]).weight).toEqual(1800);
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}]).numberOfAnimals).toEqual(3);
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}]).sulphurInKg).toEqual(14.4);
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:2}, {type:'averageAdult', count:1}]).nitrogenInKg).toEqual(50.4);
    }));

    it('AnimalPurchased.addType should return undefined if animals parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(AnimalPurchased.addType('@', 50)).toBeUndefined();
      expect(AnimalPurchased.addType('newType', -50)).toBeUndefined();
    }));

    it('AnimalPurchased.calculate should return undefined for negative number', inject(function() {
      expect(AnimalPurchased.calculate([{type:'heavyAdult', count:-2}, {type:'averageAdult', count:-1}])).toBeUndefined();
    }));

  });
  
});
