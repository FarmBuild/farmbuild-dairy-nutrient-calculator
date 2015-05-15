/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  // instantiate log
  var $log, cowTypes;
  var name = 'New Type 1', weight = 700;

  function createValid() {
    return cowTypes.create(name);
  }

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _cowTypes_) {
    $log = _$log_;
    cowTypes = _cowTypes_;
  }))

  describe('cowTypes.validate should validate the name, weight', function() {
    it('empty cowType must be invalid ', inject(function() {
      var cowType = {};
      expect(cowTypes.validate(cowType)).toBeFalsy()
    }))

//    it('empty name must be invalid', inject(function() {
//      var cowType = createValid()
//      cowType.name = ''
//      expect(cowTypes.validate(cowType)).toBeFalsy()
//    }))
//
//    it('0 weight must be invalid', inject(function() {
//      var cowType = createValid()
//      cowType.weight = 0
//      expect(cowTypes.validate(cowType)).toBeFalsy()
//    }))
//
//    it('new type must be valid ', inject(function() {
//      var cowType = {}
//      var cowType = createValid()
//      expect(cowTypes.validate(cowType)).toBeTruthy()
//    }))

  })

  afterEach(function() {
    fixture.cleanup()
  });
});

