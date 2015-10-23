'use strict';

describe('farmbuild.nutrientCalculator module', function() {
  beforeEach(function() {
    fixture.setBase('examples/data')
  })

  // instantiate service
  var nutrientCalculatorSession, nutrientCalculator,
    milkSold, fertilizersPurchased,
    susanFarmJson = 'farmdata-susan.json',
    $log;

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(function(){
    this.result = fixture.load(susanFarmJson);
  });

  beforeEach(inject(function (_nutrientCalculatorSession_, _nutrientCalculator_,
                              _milkSold_,
                              _fertilizersPurchased_,
                              _$log_) {
    nutrientCalculatorSession = _nutrientCalculatorSession_;
    nutrientCalculator = _nutrientCalculator_;
    milkSold = _milkSold_;
    fertilizersPurchased = _fertilizersPurchased_;
    $log = _$log_;
  }));

  describe('load an existing calclator from session', function(){
    it('nutrientCalculatorSession should be defined', inject(function() {
      expect(nutrientCalculatorSession).toBeDefined();
    }));
  });

  describe('load an existing farmdata from session', function(){
    it('farmdataSession.load should return null.', inject(function() {
      sessionStorage.setItem('farmdata', null);

      var data = nutrientCalculatorSession.loadSection();

      expect(data).toBe(undefined);
    }));
  });

  describe('save an existing farmdata to session', function(){

    it('farmdataSession.load.', inject(function() {
      var loaded = fixture.load(susanFarmJson),
        typesSize = 30,
        section = 'fertilizersPurchased';

      loaded = nutrientCalculator.load(loaded)

      var found = nutrientCalculatorSession.loadSection(section);

      expect(found).toBeDefined();
      expect(found.types).toBeDefined();
      expect(found.types.length).toBe(typesSize);
    }));
  });


  afterEach(function() {
    fixture.cleanup()
  });

});
