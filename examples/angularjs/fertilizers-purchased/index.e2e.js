'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('cows-purchased', function() {

    beforeEach(function() {
      browser.get('angularjs/fertilizers-purchased/index.html');
    });

    it('should render sample when user navigates to angularjs/fertilizers-purchased/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Farmbuild Diary Nutrient Calculator - Fertilizers Purchased');
    });

    it('should add new fertilizer', function() {
      expect(element(by.model('newFertilizer.Type')).sendKeys('Lucerne Hay'));
      expect(element(by.model('newFertilizer.weight')).sendKeys('1000').getAttribute('value')).
        toBe('1000');
      element(by.buttonText('Add fertilizer')).click().then(function(){
        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
          toMatch(3);
      });
    });

    it('should calculate nutrient of fertilizer', function() {
      var weight = 1000, type = 'Lucerne Hay';
      expect(element(by.model('newFertilizer.Type')).sendKeys(type));
      expect(element(by.model('newFertilizer.weight')).sendKeys(weight).getAttribute('value')).
        toBe('1000');
      element(by.buttonText('Add fertilizer')).click().then(function(){
        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
          toMatch(3);
      })
      element(by.buttonText('Calculate nutrient')).click().then(function(){
        expect(element.all(by.css('summary .form-group')).first().getText()).
          toMatch('1,000');
      });
    });

  });

});
