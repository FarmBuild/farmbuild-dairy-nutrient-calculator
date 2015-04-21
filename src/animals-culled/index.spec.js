'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var AnimalsPurchased;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_AnimalsPurchased_) {
    AnimalsPurchased = _AnimalsPurchased_;
  }));

  describe('AnimalsPurchased factory', function(){

    it('AnimalsPurchased should be defined', inject(function() {
      expect(AnimalsPurchased).toBeDefined();
    }));

    it('AnimalsPurchased.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(AnimalsPurchased.addType(2, 50)).toBeUndefined();
      expect(AnimalsPurchased.addType('!2', 50)).toBeUndefined();
      expect(AnimalsPurchased.addType('new', 'w')).toBeUndefined();
    }));

    it('AnimalsPurchased.addTypes should return new type if type\'s is valid', inject(function() {
      expect(AnimalsPurchased.addType('newType', 50)).toBeDefined();
      expect(AnimalsPurchased.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('AnimalsPurchased.calculate should return nutrient data', inject(function() {
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}])).toBeDefined();
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).animals).toBeDefined();
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).weight).toEqual(1800);
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).numberOfAnimals).toEqual(3);
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).sulphurInKg).toEqual(14.4);
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).nitrogenInKg).toEqual(50.4);
    }));

    it('AnimalsPurchased.addType should return undefined if animals parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(AnimalsPurchased.addType('@', 50)).toBeUndefined();
      expect(AnimalsPurchased.addType('newType', -50)).toBeUndefined();
    }));

    it('AnimalsPurchased.calculate should return undefined for negative number', inject(function() {
      expect(AnimalsPurchased.calculate([{type:'heavyAdult', numberOfAnimals:-2}, {type:'averageAdult', numberOfAnimals:-1}])).toBeUndefined();
    }));

  });
  
});
