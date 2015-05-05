'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {
  
  describe('cows-culled', function() {
    
    beforeEach(function() {
      browser.get('angularjs/cows-culled/index.html');
    });
    
    it('should render sample when user navigates to angularjs/cows-culled/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Cows Culled');
    });
    
    it('should add new cow', function() {
      expect(element(by.model('cowType')).sendKeys('Heavy adult cattle (650 Kg)'));
      expect(element(by.model('numberOfCows')).sendKeys('12').getAttribute('value')).
        toBe('12');
      element(by.buttonText('Add Cow')).click().then(function(){
        expect(element.all(by.css('table#cowsTbl tr')).count()).
          toMatch(3);
      });
    });
    
    it('should calculate nutrient', function() {
      expect(element(by.model('cowType')).sendKeys('Heavy adult cattle (650 Kg)'));
      expect(element(by.model('numberOfCows')).sendKeys('12').getAttribute('value')).
        toBe('12');
      element(by.buttonText('Add Cow')).click().then(function(){
        expect(element.all(by.css('table#cowsTbl tr')).count()).
          toMatch(3);
      })
      element(by.buttonText('Calculate nutrient')).click().then(function(){
        expect(element.all(by.css('summary .form-group')).first().getText()).
          toMatch(12);
      });
    });
    
    it('should add new cow type and use it for adding a new cow', function() {
      expect(element(by.model('type.name')).sendKeys('Test').getAttribute('value')).
        toBe('Test');
      expect(element(by.model('type.weight')).sendKeys('100').getAttribute('value')).
        toBe('100');
      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('table#cowTypesTbl tr')).count()).
          toMatch(8);
      });
      
      expect(element(by.model('cowType')).sendKeys('Test (100)'));
      expect(element(by.model('numberOfCows')).sendKeys('2').getAttribute('value')).
        toBe('2');
      element(by.buttonText('Add Cow')).click().then(function(){
        expect(element.all(by.css('table#cowsTbl tr')).count()).
          toMatch(3);
      })
      
    });
    
  });
  
});
