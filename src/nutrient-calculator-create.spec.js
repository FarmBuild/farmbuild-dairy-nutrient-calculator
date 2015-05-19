/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  //access test data under data dir
  beforeEach(function() {
    fixture.setBase('examples/data')
  })

  // instantiate log
  var $log, nutrientCalculator,
    susanFarmJson = 'farmdata-new.json',
    susanFarmName = "My New Farm",
    susanFarmArea = 89.95,
    milkingAreaInHa= 70.39,
    averageCowWeightInKg= 550,
    numberOfMilkingCows= 228,
    numberOfMilkingDays= 365;
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _nutrientCalculator_) {
    $log = _$log_
    nutrientCalculator = _nutrientCalculator_
  }))

  describe('Loading the new susans farm data', function() {
    it('Load from file should create the complete farmdata.nutrientCalculator section', inject(function() {
      var loaded = fixture.load(susanFarmJson);
      $log.info('loaded: %j', loaded)

      expect(loaded).toBeDefined()
      expect(nutrientCalculator.farmdata.isFarmData(loaded)).toBeTruthy()
      loaded = nutrientCalculator.load(loaded)
      expect(loaded).toBeDefined()
      expect(loaded.name).toBe(susanFarmName)
      expect(loaded.nutrientCalculator).toBeDefined()
      expect(loaded.nutrientCalculator.summary).toBeDefined()
      expect(loaded.nutrientCalculator.summary.milkingAreaInHa).toBe(0)
      expect(loaded.nutrientCalculator.summary.averageCowWeightInKg).toBe(0)
      expect(loaded.nutrientCalculator.balance).toBeDefined()
      expect(loaded.nutrientCalculator.efficiency).toBeDefined()

      expect(loaded.nutrientCalculator.cowsCulled).toBeDefined()
      expect(loaded.nutrientCalculator.cowsCulled.cows).toBeDefined()
      expect(loaded.nutrientCalculator.cowsCulled.types).toBeDefined()

      expect(loaded.nutrientCalculator.cowsPurchased).toBeDefined()
      expect(loaded.nutrientCalculator.cowsPurchased.cows).toBeDefined()
      expect(loaded.nutrientCalculator.cowsPurchased.types).toBeDefined()


      expect(loaded.nutrientCalculator.fertilizersPurchased).toBeDefined()
      expect(loaded.nutrientCalculator.fertilizersPurchased.fertilizers).toBeDefined()
      expect(loaded.nutrientCalculator.fertilizersPurchased.types).toBeDefined()

      expect(loaded.nutrientCalculator.foragesPurchased).toBeDefined()
      expect(loaded.nutrientCalculator.foragesPurchased.forages).toBeDefined()
      expect(loaded.nutrientCalculator.foragesPurchased.types).toBeDefined()

      expect(loaded.nutrientCalculator.concentratesPurchased).toBeDefined()
      expect(loaded.nutrientCalculator.concentratesPurchased.concentrates).toBeDefined()
      expect(loaded.nutrientCalculator.concentratesPurchased.types).toBeDefined()

      expect(loaded.nutrientCalculator.milkSold).toBeDefined()
      expect(loaded.nutrientCalculator.milkSold.totalPerYearInLitre).toBeDefined()
      expect(loaded.nutrientCalculator.milkSold.fatInKg).toBeDefined()
      expect(loaded.nutrientCalculator.milkSold.fatPercentage).toBeDefined()
      expect(loaded.nutrientCalculator.milkSold.proteinInKg).toBeDefined()
      expect(loaded.nutrientCalculator.milkSold.proteinPercentage).toBeDefined()


    }))
  })

//  describe('Loading the existing susans farm data and calculate', function() {
//    it('Update ', inject(function() {
//      var loaded = fixture.load(susanFarmJson);
//      $log.info('loaded: %j', loaded)
//
//      var calculated = nutrientCalculator.calculate(loaded)
//      expect(calculated.nutrientCalculator.balance).toBeDefined()
//      expect(calculated.nutrientCalculator.efficiency).toBeDefined()
//    }))
//  })


  afterEach(function() {
    fixture.cleanup()
  });
});
