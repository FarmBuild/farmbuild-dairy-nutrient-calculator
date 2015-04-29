'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var fertilizerTypes, averageCrop;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_fertilizerTypes_) {
    fertilizerTypes = _fertilizerTypes_;
    //averageCrop = fertilizerTypes.at(0);
  }));

  describe('fertilizerTypes factory', function(){
    it('fertilizerTypes should be defined', inject(function() {
      expect(fertilizerTypes).toBeDefined();
    }));
  });

//  function createdFertilizer(type, weight, isDry) {
//    return {type: type, weight:weight, isDry:isDry};
//  }
//
//  function addFertilizer(type, weight, isDry) {
//    return [createdFertilizer(type, weight, isDry)];
//  }

  describe('calculate nutrient of forage purchased', function(){

//    it('Average crop type with undefined amount should fail', inject(function() {
//      var result = fertilizerTypes.calculate(addFertilizer(averageCrop, true))
//      expect(result).toBeUndefined()
//    }));

//    it('Average crop type and amount of 1000 and basis of dry should be calculated', inject(function() {
//    }));

  });

});

