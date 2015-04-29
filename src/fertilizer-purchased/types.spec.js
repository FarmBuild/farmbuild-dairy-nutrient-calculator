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

  describe('types', function(){

    it('New fertilizer type should be added on top of the existing', inject(function() {
      var name = 'New Fertilizer Type 1', dryMatterPercentage = 0.8,
        nitrogenPercentage = 2, phosphorusPercentage = 0.3,
        potassiumPercentage = 2.1, sulphurPercentage = 0.4,
        countExisting = fertilizerTypes.size(),
        result = fertilizerTypes.add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage ),
        newCount = fertilizerTypes.size();
      expect(newCount-countExisting).toEqual(1);
      expect(fertilizerTypes.last().name).toEqual(name);
    }));

  });

});

