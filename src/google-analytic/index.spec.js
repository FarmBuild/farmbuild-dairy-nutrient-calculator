'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // instantiate service
  var GoogleAnalytic;

  beforeEach(module('farmbuild.nutrientCalculator'));

  beforeEach(inject(function (_GoogleAnalytic_) {
    GoogleAnalytic = _GoogleAnalytic_;
  }));

  describe('GoogleAnalytic factory', function(){
    it('GoogleAnalytic should be defined', inject(function() {
      expect(GoogleAnalytic).toBeDefined();
    }));

  });
});
