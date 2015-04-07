'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('milk-sold', function() {

    beforeEach(function() {
      browser.get('milk-sold/milk-sold.html');
    });

    it('should render sample when user navigates to /milk-sold.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toMatch('Farm Build Nutrient Calculator');
    });

    it('should render sample when user navigates to /milk-sold.html', function() {
      expect(element(by.model('milkSoldPerYearInLitre')).sendKeys('10000').getAttribute('value')).
        toBe('10000');
      expect(element(by.model('milkProteinPercentage')).sendKeys('10').getAttribute('value')).
        toBe('10');
      expect(element(by.model('milkFatPercentage')).sendKeys('90').getAttribute('value')).
        toBe('90');
      element(by.buttonText('Calculate by percentage')).click().then(function(){
        expect(element.all(by.css('.summary .form-group')).first().getText()).
          toMatch('10000');
      });
    });

  });

});
