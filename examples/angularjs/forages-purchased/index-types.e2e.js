'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('cows-purchased', function() {

    beforeEach(function() {
      browser.get('angularjs/forages-purchased/index.html');
    });

    it('adding empty new forage type should present validation error', function() {
      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('h3.modal-title')).getText()).
          toContain('Validation failed');
      });
    });

    it('adding new forage type with metabolisableEnergyInMJPerKg = 0 should present validation error', function() {
      var metabolisableEnergyInMJPerKg = 0, name = 'Apple';
      expect(element(by.model('type.name')).sendKeys(name));
      expect(element(by.model('type.metabolisableEnergyInMJPerKg')).sendKeys(metabolisableEnergyInMJPerKg).getAttribute('value')).
        toBe('0');
      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('h3.modal-title')).getText()).
          toContain('Validation failed');
      });
    });

    function enterValueAndVerifyInput(model, val) {
      expect(element(by.model('type.'+model)).
        sendKeys(val).getAttribute('value')).toBe(val.toString());
    }

    function rowCount(tableRowSelector, count) {
      return element.all(by.css(tableRowSelector)).count();
    }

    function verifyRowCount(tableRowSelector, count) {
        expect(rowCount(tableRowSelector)).
          toMatch(count);
    }

    it('adding new forage type with metabolisableEnergyInMJPerKg = 0 should present validation error', function() {
      var count;
      rowCount('table#forageTypesTbl tr').then(function(c) {
        count = c
      })

      var metabolisableEnergyInMJPerKg = 12.62, name = 'Apple',
        dryMatterPercentage = 76.00, sulphurPercentage = 0.32, potassiumPercentage = 0.74,
        phosphorusPercentage = 0.64, nitrogenPercentage = 3.88;
      expect(element(by.model('type.name')).sendKeys(name));

      enterValueAndVerifyInput('metabolisableEnergyInMJPerKg', metabolisableEnergyInMJPerKg)
      enterValueAndVerifyInput('dryMatterPercentage', dryMatterPercentage)
      enterValueAndVerifyInput('sulphurPercentage', sulphurPercentage)
      enterValueAndVerifyInput('potassiumPercentage', potassiumPercentage)
      enterValueAndVerifyInput('phosphorusPercentage', phosphorusPercentage)
      enterValueAndVerifyInput('nitrogenPercentage', nitrogenPercentage)
      element(by.buttonText('Add Type')).click().then(function(){
        verifyRowCount('table#forageTypesTbl tr', count+1)
//        expect(element.all(by.css('table#forageTypesTbl tr')).count()).
//          toMatch(34);
      });

    });
  });

});
