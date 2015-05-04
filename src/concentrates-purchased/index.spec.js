describe('concentratesPurchased  module', function() {

  // instantiate service
  var $log;
  var concentratesPurchased,
    dap, dapName = 'DAP',
    dairyManureStockpile, dairyManureStockpileName = 'Dairy manure stockpile',
    superphosphate, superphosphateName = 'Superphosphate (Super)',
    urea, ureaName = 'Urea';

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(inject(function (_$log_, _concentratesPurchased_) {
    $log = _$log_;
    concentratesPurchased  = _concentratesPurchased_;
    dairyManureStockpile = concentratesPurchased.types.at(0);
    dap = concentratesPurchased.types.at(1);
    $log.info(dairyManureStockpileName + ' loaded: %j', dap)
    $log.info(dap + ' loaded: %j', dap)
    expect(dairyManureStockpile.name).toEqual(dairyManureStockpileName)
    expect(dap.name).toEqual(dapName)
    superphosphate =  concentratesPurchased.types.byName(superphosphateName);
    expect(superphosphate.name).toEqual(superphosphateName)
    urea =  concentratesPurchased.types.byName(ureaName);
    expect(urea.name).toEqual(ureaName)
  }));

  describe('Given concentratesPurchased  factory', function(){
    it('concentratesPurchased  should be defined', inject(function() {
      expect(concentratesPurchased).toBeDefined();
    }));
  });

  function createdFertilizer(type, weight, isDry) {
    return {type: type, weight:weight, isDry:isDry};
  }

  function addFertilizer(type, weight, isDry) {
    return [createdFertilizer(type, weight, isDry)];
  }

  function between(val, min, max) {
    return val >= min && val <= max;
  }
//
//  describe('Given the default value, calculate nutrient of concentrate  purchased', function(){
//    it('DAP type with undefined amount should fail', inject(function() {
//      var result = concentratesPurchased.calculate(addFertilizer(dap, true))
//      expect(result).toBeUndefined()
//    }));
//
//    it('DAP type and the weight of 4000kg should calculate', inject(function() {
//      var weight = 4000,
//        concentrate  = addFertilizer(dap, weight, true);
//      $log.info('concentrate : %j', concentrate );
//      var result = concentratesPurchased.calculate(concentrate )
//
//      $log.info('result generated: %j', result);
//
//      expect(result.weight).toEqual(4000)
//      expect(result.dryMatterWeight).toEqual(4000)
//      expect(result.nitrogenPercentage).toEqual(18)
//      expect(result.nitrogenInKg).toEqual(720)
//      expect(result.phosphorusInKg).toEqual(800)
//      expect(result.phosphorusPercentage).toBe(20)
//      expect(result.potassiumInKg).toEqual(0)
//      expect(result.potassiumPercentage).toEqual(0)
//      expect(result.sulphurInKg).toEqual(64)
//      expect(result.sulphurPercentage).toEqual(1.6)
//    }));
//
//    it('Dairy manure stockpile type and the weight of 4000kg with wet weight', inject(function() {
//      var weight = 4000,
//        concentrate  = addFertilizer(dairyManureStockpile, weight, false);
//      $log.info('concentrate : %j', concentrate );
//      var result = concentratesPurchased.calculate(concentrate )
//
//      $log.info('result generated: %j', result);
//
//      expect(result.weight).toEqual(4000)
//      expect(between(result.dryMatterWeight, 3073.2, 3073.3)).toBeTruthy()
//      expect(result.nitrogenPercentage).toEqual(1.44)
//      expect(between(result.nitrogenInKg, 44.254, 44.255)).toBeTruthy()
//      expect(between(result.phosphorusInKg,16.9026,17.0)).toBeTruthy()
//      expect(result.phosphorusPercentage).toBe(0.55)
//      expect(result.potassiumInKg).toEqual(42.41016)
//      expect(result.potassiumPercentage).toEqual(1.38)
//      expect(result.sulphurInKg).toEqual(9.2196)
//      expect(result.sulphurPercentage).toEqual(0.3)
//    }));
//
//    it('Dairy manure stockpile type and the weight of 4000kg with wet weight', inject(function() {
//      var weight = 13000,
//        concentrate  = addFertilizer(superphosphate, weight, false);
//      $log.info('concentrate : %j', concentrate );
//      var result = concentratesPurchased.calculate(concentrate )
//
//      $log.info('result generated: %j', result);
//
//      expect(result.weight).toEqual(13000)
//      expect(result.dryMatterWeight).toEqual(13000)
//      expect(result.nitrogenPercentage).toEqual(0)
//      expect(result.nitrogenInKg).toEqual(0)
//      expect(between(result.phosphorusInKg,1144,1144.1)).toBeTruthy()
//      expect(between(result.phosphorusPercentage,8.8,8.89)).toBeTruthy()
//
//      expect(result.potassiumInKg).toEqual(0)
//      expect(result.potassiumPercentage).toEqual(0)
//      expect(result.sulphurInKg).toEqual(1430)
//      expect(result.sulphurPercentage).toEqual(11)
//    }));
//
//    it('DAP, Super and Urea type and the weight of 4000kg, 13000kg, 11000kg', inject(function() {
//      var weightDairyManureStockpile = 4000, weightSuperphosphate = 13000,
//        weightUrea = 11000,
//        concentrates  = concentratesPurchased
//          .add(dairyManureStockpile, weightDairyManureStockpile, true)
//          .add(superphosphate, weightSuperphosphate, true)
//          .add(urea, weightUrea, true)
//          .concentrates ()
//
//      $log.info('concentrates  created: %j', concentrates )
//
//      expect(angular.isArray(concentrates )).toBeTruthy()
//
//      var result = concentratesPurchased.calculate(concentrates )
//
//      $log.info('result generated: %j', result);
//
//      expect(result.weight).toEqual(28000)
//      expect(result.dryMatterWeight).toEqual(28000)
//      expect(result.nitrogenInKg).toEqual(5117.6)
//      expect(result.nitrogenPercentage).toEqual(18.27714285714286)
//      expect(result.phosphorusInKg).toEqual(1166.0000000000002)
//      expect(result.phosphorusPercentage).toBe(4.164285714285715)
//      expect(result.potassiumInKg).toEqual(55.2)
//      expect(result.potassiumPercentage).toEqual(0.19714285714285715)
//      expect(result.sulphurInKg).toEqual(1442)
//      expect(result.sulphurPercentage).toEqual(5.1499999999999995)
//    }));
//
//  });

});

