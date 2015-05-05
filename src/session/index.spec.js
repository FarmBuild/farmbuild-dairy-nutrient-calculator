'use strict';

describe('farmbuild.nutrientCalculator module', function() {

  // instantiate service
  var nutrientCalculatorSession, nutrientCalculator, milkSold,$log;

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_nutrientCalculatorSession_, _nutrientCalculator_,_milkSold_,_$log_) {
    nutrientCalculatorSession = _nutrientCalculatorSession_;
    nutrientCalculator = _nutrientCalculator_;
    milkSold = _milkSold_;
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

      expect(data).toBe(null);
    }));
  });

//  describe('save an existing farmdata to session', function(){
//
//    it('farmdataSession.load should return undefined.', inject(function() {
//
//      var nutrientByKg = milkSold.calculateByKg(100, 10, 90),
//        nutrientCalculatorData = nutrientCalculator.load({name:'My Farm'}),
//        section = 'milkSold';
//
//      expect(nutrientCalculatorData).toBeDefined();
//      $log.info('nutrientCalculatorData: %j', nutrientCalculatorData);
//
//      nutrientCalculatorData = nutrientCalculatorSession.save(nutrientCalculatorData);
//
//      nutrientCalculatorSession.saveSection(section, nutrientByKg);
//
//      var found = nutrientCalculatorSession.loadSection(section);
//
//      expect(found).toBeDefined();
//    }));
//  });


});
