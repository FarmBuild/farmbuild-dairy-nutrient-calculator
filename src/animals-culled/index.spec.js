'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var AnimalsCulled;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_AnimalsPurchased_) {
    AnimalsCulled = _AnimalsPurchased_;
  }));

  describe('AnimalsCulled factory', function(){

    it('AnimalsCulled should be defined', inject(function() {
      expect(AnimalsCulled).toBeDefined();
    }));

    it('AnimalsCulled.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(AnimalsCulled.addType(2, 50)).toBeUndefined();
      expect(AnimalsCulled.addType('!2', 50)).toBeUndefined();
      expect(AnimalsCulled.addType('new', 'w')).toBeUndefined();
    }));

    it('AnimalsCulled.addTypes should return new type if type\'s is valid', inject(function() {
      expect(AnimalsCulled.addType('newType', 50)).toBeDefined();
      expect(AnimalsCulled.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('AnimalsCulled.calculate should return nutrient data', inject(function() {
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}])).toBeDefined();
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).animals).toBeDefined();
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).weight).toEqual(1800);
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).numberOfAnimals).toEqual(3);
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).sulphurInKg).toEqual(14.4);
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:2}, {type:'averageAdult', numberOfAnimals:1}]).nitrogenInKg).toEqual(50.4);
    }));

    it('AnimalsCulled.addType should return undefined if animals parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(AnimalsCulled.addType('@', 50)).toBeUndefined();
      expect(AnimalsCulled.addType('newType', -50)).toBeUndefined();
    }));

    it('AnimalsCulled.calculate should return undefined for negative number', inject(function() {
      expect(AnimalsCulled.calculate([{type:'heavyAdult', numberOfAnimals:-2}, {type:'averageAdult', numberOfAnimals:-1}])).toBeUndefined();
    }));

  });
  
});
