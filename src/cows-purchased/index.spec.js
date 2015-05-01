//Automated test case as described by TC05

'use strict';

describe('farmbuild.nutrientCalculator module', function() {
  
  // instantiate service
  var cowsPurchased;
  
  beforeEach(module('farmbuild.nutrientCalculator'));
  
  beforeEach(inject(function (_cowsPurchased_) {
    cowsPurchased = _cowsPurchased_;
  }));
  
  describe('cowsPurchased factory', function(){
    
    it('cowsPurchased should be defined', inject(function() {
      expect(cowsPurchased).toBeDefined();
    }));
    
    it('cowsPurchased.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(cowsPurchased.addType(2, 50)).toBeUndefined();
      expect(cowsPurchased.addType('!2', 50)).toBeUndefined();
      expect(cowsPurchased.addType('new', 'w')).toBeUndefined();
    }));
    
    it('cowsPurchased.addTypes should return new type if type\'s is valid', inject(function() {
      expect(cowsPurchased.addType('newType', 50)).toBeDefined();
      expect(cowsPurchased.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('cowsPurchased.removeTypeByIndex should return undefined for invalid index', inject(function() {
      expect(cowsPurchased.removeTypeByIndex(cowsPurchased.types().length)).toBeUndefined();
      expect(cowsPurchased.removeTypeByIndex(-1)).toBeUndefined();
    }));

    it('cowsPurchased.removeTypeByIndex should remove item for valid index', inject(function() {
      var count = cowsPurchased.types().length;
      expect(cowsPurchased.removeTypeByIndex(count-1).length).toEqual(count-1);
    }));

    it('cowsPurchased.removeTypeByIndex should remove correct item for valid index', inject(function() {
      var item = cowsPurchased.types()[2],
        name = item.name, weight = item.weight,
        found = '',
      reducedCows = cowsPurchased.removeTypeByIndex(2);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name && cow.weight === weight){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('cowsPurchased.removeTypeByName should remove correct item for valid name', inject(function() {
      var item = cowsPurchased.types()[2],
        name = item.name,
        found = '',
      reducedCows = cowsPurchased.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('cowsPurchased.removeTypeByName should remove all correct items with the specified name', inject(function() {
      var item = cowsPurchased.types()[2],
        name = item.name,
        found = '',
        reducedCows;
      cowsPurchased.addType(name, 100001);
      reducedCows = cowsPurchased.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));
    
    it('cowsPurchased.calculate should return nutrient data', inject(function() {
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}])).toBeDefined();
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).cows).toBeDefined();
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).weight).toEqual(1800);
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).numberOfCows).toEqual(3);
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).sulphurInKg).toEqual(14.4);
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).nitrogenInKg).toEqual(50.4);
    }));
    
    it('cowsPurchased.addType should return undefined if cows parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(cowsPurchased.addType('@', 50)).toBeUndefined();
      expect(cowsPurchased.addType('newType', -50)).toBeUndefined();
    }));
    
    it('cowsPurchased.calculate should return undefined for negative number', inject(function() {
      expect(cowsPurchased.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:-2}, {name:'Average adult cattle', weight: 500, numberOfCows:-1}])).toBeUndefined();
    }));
    
  });
  
});
