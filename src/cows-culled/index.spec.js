'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var cowsCulled;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_cowsCulled_) {
    cowsCulled = _cowsCulled_;
  }));

  describe('cowsCulled factory', function(){

    it('cowsCulled should be defined', inject(function() {
      expect(cowsCulled).toBeDefined();
    }));

    it('cowsCulled.addTypes should return undefined if type\'s name is not alphabetical', inject(function() {
      expect(cowsCulled.addType(2, 50)).toBeUndefined();
      expect(cowsCulled.addType('!2', 50)).toBeUndefined();
      expect(cowsCulled.addType('new', 'w')).toBeUndefined();
    }));

    it('cowsCulled.addTypes should return new type if type\'s is valid', inject(function() {
      expect(cowsCulled.addType('newType', 50)).toBeDefined();
      expect(cowsCulled.addType('newType', 50.4).addType).toBeDefined();
    }));

    it('cowsCulled.removeTypeByIndex should return undefined for invalid index', inject(function() {
      expect(cowsCulled.removeTypeByIndex(cowsCulled.types().length)).toBeUndefined();
      expect(cowsCulled.removeTypeByIndex(-1)).toBeUndefined();
    }));

    it('cowsCulled.removeTypeByIndex should remove item for valid index', inject(function() {
      var count = cowsCulled.types().length;
      expect(cowsCulled.removeTypeByIndex(count-1).length).toEqual(count-1);
    }));

    it('cowsCulled.removeTypeByIndex should remove correct item for valid index', inject(function() {
      var item = cowsCulled.types()[2],
        name = item.name, weight = item.weight,
        found = '',
        reducedCows = cowsCulled.removeTypeByIndex(2);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name && cow.weight === weight){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('cowsCulled.removeTypeByName should remove correct item for valid name', inject(function() {
      var item = cowsCulled.types()[2],
        name = item.name,
        found = '',
        reducedCows = cowsCulled.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('cowsCulled.removeTypeByName should remove all correct items with the specified name', inject(function() {
      var item = cowsCulled.types()[2],
        name = item.name,
        found = '',
        reducedCows;
      cowsCulled.addType(name, 100001);
      reducedCows = cowsCulled.removeTypeByName(name);
      angular.forEach(reducedCows, function(cow){
        if(cow.name === name){
          found = cow;
        }
      });
      expect(found).toEqual('');
    }));

    it('cowsCulled.calculate should return nutrient data', inject(function() {
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}])).toBeDefined();
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).cows).toBeDefined();
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).weight).toEqual(1800);
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).numberOfCows).toEqual(3);
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).sulphurInKg).toEqual(14.4);
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:2}, {name:'Average adult cattle', weight: 500, numberOfCows:1}]).nitrogenInKg).toEqual(50.4);
    }));

    it('cowsCulled.addType should return undefined if cows parameter passed is not correct (alphabetical name, number for weight)', inject(function() {
      expect(cowsCulled.addType('@', 50)).toBeUndefined();
      expect(cowsCulled.addType('newType', -50)).toBeUndefined();
    }));

    it('cowsCulled.calculate should return undefined for negative number', inject(function() {
      expect(cowsCulled.calculate([{name:'Heavy adult cattle', weight: 650, numberOfCows:-2}, {name:'Average adult cattle', weight: 500, numberOfCows:-1}])).toBeUndefined();
    }));

  });
  
});
