'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var legume;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_legume_) {
    legume = _legume_;
  }));

  describe('legume factory', function(){
    it('legume should be defined', inject(function() {
      expect(legume).toBeDefined();
    }));
  });

  describe('calculate milk energy per litre', function(){

    //var milk_energy_per_litre = 1.694*(0.386*Fat_pc*100 + 0.205*(5.8+Prot_pc*100)-0.236);
    //var milk_energy_produced = milk_energy_per_litre * milk_sold_total;
    //var milk_energy_not_sold = milk_energy_produced * 0.04; //4% not sold

    it('Calculating milk energy', inject(function() {
      var milk_energy_per_litre = 1.694*(0.386*Fat_pc*100 + 0.205*(5.8+Prot_pc*100)-0.236);
      var result = legume.calculate();
      expect(result).toBeUndefined();

    }));

  });

});

