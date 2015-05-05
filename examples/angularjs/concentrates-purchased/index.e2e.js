'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('cows-purchased', function() {

    beforeEach(function() {
      browser.get('angularjs/concentrates-purchased/index.html');
    });

    it('should render sample when user navigates to angularjs/concentrates-purchased/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Concentrates Purchased');
    });

    it('should add new concentrate', function() {
      expect(element(by.model('newConcentrate.type')).sendKeys('Pellets Calf'));
      expect(element(by.model('newConcentrate.weight')).sendKeys('1850').getAttribute('value')).
        toBe('1850');
      element(by.buttonText('Add concentrate')).click().then(function(){
        expect(element.all(by.css('table#concentratesTbl tr')).count()).
          toMatch(3);
      });
    });

    it('should calculate nutrient of concentrate', function() {
      var weight = 1850, type = 'Pellets Calf';
      expect(element(by.model('newConcentrate.type')).sendKeys(type));
      expect(element(by.model('newConcentrate.weight')).sendKeys(weight).getAttribute('value')).
        toBe('1850');
      element(by.buttonText('Add concentrate')).click().then(function(){
        expect(element.all(by.css('table#concentratesTbl tr')).count()).
          toMatch(3);
      })
      element(by.buttonText('Calculate nutrient')).click().then(function(){
        expect(element.all(by.css('summary .form-group')).first().getText()).
          toMatch('1,850');
      });
    });

  });

});
