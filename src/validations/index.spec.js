'use strict';

describe('Service: Validations', function () {

  // load the service's module
  beforeEach(module('farmbuild.nutrientCalculator'));

  // instantiate service
  var Validations;
  beforeEach(inject(function (_Validations_) {
    Validations = _Validations_;
  }));

  describe('requires should return false for "P"', function() {

    it('requires should return false for "P"', inject(function () {
      expect(Validations.isNumber('P')).toBeFalsy();
    }));

    it('requires should return true for "2"', inject(function () {
      expect(Validations.isNumber(2)).toBeTruthy();
    }));

    it('requires should return true for "2.1"', inject(function () {
      expect(Validations.isNumber(2.1)).toBeTruthy();
    }));

  });

});
