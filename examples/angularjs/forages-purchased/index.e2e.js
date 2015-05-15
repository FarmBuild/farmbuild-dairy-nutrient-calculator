'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('cows-purchased', function() {

    beforeEach(function() {
      browser.get('angularjs/forages-purchased/index.html');
    });

    it('should render sample when user navigates to angularjs/cows-purchased/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Forages Purchased');
    });

    it('should add new forage', function() {
      expect(element(by.model('newForage.type')).sendKeys('Lucerne Hay'));
      expect(element(by.model('newForage.weight')).sendKeys('1000').getAttribute('value')).
        toBe('1000');
      element(by.buttonText('Add forage')).click().then(function(){
        expect(element.all(by.css('table#foragesTbl tr')).count()).
          toMatch(3);
      });
    });

    it('should calculate nutrient of forage', function() {
      var weight = 1000, type = 'Lucerne Hay';
      expect(element(by.model('newForage.type')).sendKeys(type));
      expect(element(by.model('newForage.weight')).sendKeys(weight).getAttribute('value')).
        toBe('1000');
      element(by.buttonText('Add forage')).click().then(function(){
        expect(element.all(by.css('table#foragesTbl tr')).count()).
          toMatch(3);
      })
      element(by.buttonText('Calculate nutrient')).click().then(function(){
        expect(element.all(by.css('summary .form-group')).first().getText()).
          toMatch('1,000');
      });
    });

  });

});
