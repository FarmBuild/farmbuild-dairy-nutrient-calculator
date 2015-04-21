'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {
  
  describe('animals-culled', function() {
    
    beforeEach(function() {
      browser.get('angularjs/index.html');
    });
    
    it('should render sample when user navigates to angularjs/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Farmbuild Diary Nutrient Calculator');
    });

    it('should have correct version', function() {
      expect(element.all(by.css('version span')).first().getText()).
        toContain('0.1');
    });
    
  });
  
});
