/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  // instantiate log
  var $log, cowValidator,cowTypes;
  var name = 'New Type 1', weight = 700;

  function createValid() {
    return cowTypes.create(name, weight);
  }

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _cowValidator_, _cowTypes_) {
    $log = _$log_;
    cowValidator = _cowValidator_;
    cowTypes = _cowTypes_;
  }))

  describe('cowValidator.validate should validate the weight, type, isDry', function() {
    it('empty cowType must be invalid ', inject(function() {
      var cowType = {};
      expect(cowValidator.validate(cowType)).toBeFalsy()
    }))

    it('empty weight must be invalid ', inject(function() {
      var cowType = {type:{}, weight:undefined,numberOfCows:1};
      expect(cowValidator.validate(cowType)).toBeFalsy()
    }))

    it('negative weight must be invalid ', inject(function() {
      var cowType = {type:{}, weight:-1,numberOfCows:1};
      expect(cowValidator.validate(cowType)).toBeFalsy()
    }))

    it('0 weight must be invalid ', inject(function() {
      var cowType = {type:{}, weight:0,numberOfCows:1};
      expect(cowValidator.validate(cowType)).toBeFalsy()
    }))

    it('positive weight must be valid ', inject(function() {
      var cowType = {name:'', weight:0.1 ,numberOfCows:1};
      expect(cowValidator.validate(cowType)).toBeTruthy()
    }))
  })

  afterEach(function() {
    fixture.cleanup()
  });
});
