'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var CowsCulled;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_CowsCulled_) {
    CowsCulled = _CowsCulled_;
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

    it('CowsCulled.removeTypeByIndex should return undefined for invalid index', inject(function() {
      expect(CowsCulled.removeTypeByIndex(CowsCulled.types().length)).toBeUndefined();
      expect(CowsCulled.removeTypeByIndex(-1)).toBeUndefined();
    }));

    it('CowsCulled.removeTypeByIndex should remove item for valid index', inject(function() {
      var count = CowsCulled.types().length;
      expect(CowsCulled.removeTypeByIndex(count-1).length).toEqual(count-1);
    }));

    it('CowsCulled.removeTypeByIndex should remove correct item for valid index', inject(function() {
      var item = CowsCulled.types()[2],
        name = item.name, weight = item.weight,
        found = '',
        reducedCows = CowsCulled.removeTypeByIndex(2);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name && cow.weight === weight){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('CowsCulled.removeTypeByName should remove correct item for valid name', inject(function() {
      var item = CowsCulled.types()[2],
        name = item.name,
        found = '',
        reducedCows = CowsCulled.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('CowsCulled.removeTypeByName should remove all correct items with the specified name', inject(function() {
      var item = CowsCulled.types()[2],
        name = item.name,
        found = '',
        reducedCows;
      CowsCulled.addType(name, 100001);
      reducedCows = CowsCulled.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
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
