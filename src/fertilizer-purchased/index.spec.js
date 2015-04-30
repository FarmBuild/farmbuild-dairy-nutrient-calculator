describe('fertilizerPurchased module', function() {

  // instantiate service
  var $log;
  var fertilizerPurchased,
    dap, dapName = 'DAP',
    dairyManureStockpile, dairyManureStockpileName = 'Dairy manure stockpile';

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(inject(function (_$log_, _fertilizerPurchased_) {
    $log = _$log_;
    fertilizerPurchased = _fertilizerPurchased_;
    dairyManureStockpile = fertilizerPurchased.types.at(0);
    dap = fertilizerPurchased.types.at(1);
    $log.info(dairyManureStockpileName + ' loaded: %j', dap)
    $log.info(dap + ' loaded: %j', dap)
    expect(dairyManureStockpile.name).toEqual(dairyManureStockpileName)
    expect(dap.name).toEqual(dapName)
  }));

  describe('Given fertilizerPurchased factory', function(){
    it('fertilizerPurchased should be defined', inject(function() {
      expect(fertilizerPurchased).toBeDefined();
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

  describe('Given the default value, calculate nutrient of fertilizer purchased', function(){
    it('DAP type with undefined amount should fail', inject(function() {
      var result = fertilizerPurchased.calculate(addFertilizer(dap, true))
      expect(result).toBeUndefined()
    }));

    it('DAP type and the weight of 4000kg should calculate', inject(function() {
      var weight = 4000,
        fertilizer = addFertilizer(dap, weight, true);
      $log.info('fertilizer: %j', fertilizer);
      var result = fertilizerPurchased.calculate(fertilizer)

      $log.info('result generated: %j', result);

      expect(result.weight).toEqual(4000)
      expect(result.dryMatterWeight).toEqual(4000)
      expect(result.nitrogenPercentage).toEqual(18)
      expect(result.nitrogenInKg).toEqual(720)
      expect(result.phosphorusInKg).toEqual(800)
      expect(result.phosphorusPercentage).toBe(20)
      expect(result.potassiumInKg).toEqual(0)
      expect(result.potassiumPercentage).toEqual(0)
      expect(result.sulphurInKg).toEqual(64)
      expect(result.sulphurPercentage).toEqual(1.6)
    }));

    it('Dairy manure stockpile type and the weight of 4000kg with wet weight', inject(function() {
      var weight = 4000,
        fertilizer = addFertilizer(dairyManureStockpile, weight, false);
      $log.info('fertilizer: %j', fertilizer);
      var result = fertilizerPurchased.calculate(fertilizer)

      $log.info('result generated: %j', result);

      expect(result.weight).toEqual(4000)
      expect(between(result.dryMatterWeight, 3073.2, 3073.3)).toBeTruthy()
      expect(result.nitrogenPercentage).toEqual(1.44)
      expect(between(result.nitrogenInKg, 44.254, 44.255)).toBeTruthy()
//      expect(result.phosphorusInKg).toEqual(800)
//      expect(result.phosphorusPercentage).toBe(20)
//      expect(result.potassiumInKg).toEqual(0)
//      expect(result.potassiumPercentage).toEqual(0)
//      expect(result.sulphurInKg).toEqual(64)
//      expect(result.sulphurPercentage).toEqual(1.6)
    }));

//    it('DAP, Super and Urea type and the weight of 4000kg, 13000kg, 11000kg', inject(function() {
//      var weightDap = 4000,
//        fertilizer = addFertilizer(dap, weightDap, true);
//      $log.info('fertilizer: %j', fertilizer);
//      var result = fertilizerPurchased.calculate(fertilizer)
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

  });

});

