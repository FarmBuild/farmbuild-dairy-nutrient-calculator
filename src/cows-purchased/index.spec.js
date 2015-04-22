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

    it('CowsPurchased.removeTypeByIndex should return undefined for invalid index', inject(function() {
      expect(CowsPurchased.removeTypeByIndex(CowsPurchased.types().length)).toBeUndefined();
      expect(CowsPurchased.removeTypeByIndex(-1)).toBeUndefined();
    }));

    it('CowsPurchased.removeTypeByIndex should remove item for valid index', inject(function() {
      var count = CowsPurchased.types().length;
      expect(CowsPurchased.removeTypeByIndex(count-1).length).toEqual(count-1);
    }));

    it('CowsPurchased.removeTypeByIndex should remove correct item for valid index', inject(function() {
      var item = CowsPurchased.types()[2],
        name = item.name, weight = item.weight,
        found = '',
      reducedCows = CowsPurchased.removeTypeByIndex(2);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name && cow.weight === weight){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('CowsPurchased.removeTypeByName should remove correct item for valid name', inject(function() {
      var item = CowsPurchased.types()[2],
        name = item.name,
        found = '',
      reducedCows = CowsPurchased.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('CowsPurchased.removeTypeByName should remove all correct items with the specified name', inject(function() {
      var item = CowsPurchased.types()[2],
        name = item.name,
        found = '',
        reducedCows;
      CowsPurchased.addType(name, 100001);
      reducedCows = CowsPurchased.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
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
