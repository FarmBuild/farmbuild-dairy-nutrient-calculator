'use strict';

describe('Service: Validations', function () {

  // load the service's module
  beforeEach(module('farmbuild.nutrientCalculator'));

  // instantiate service
  var Validations;
  beforeEach(inject(function (_Validations_) {
    Validations = _Validations_;
  }));

  describe('Testing isNumber function with different inputs', function() {

    it('isNumber should return false for "P"', inject(function () {
      expect(Validations.isNumber('P')).toBeFalsy();
    }));

    it('isNumber should return true for "2"', inject(function () {
      expect(Validations.isNumber(2)).toBeTruthy();
    }));

    it('isNumber should return true for "2.1"', inject(function () {
      expect(Validations.isNumber(2.1)).toBeTruthy();
    }));

  });

});
