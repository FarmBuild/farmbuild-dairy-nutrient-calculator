'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('cows-purchased', function() {

    beforeEach(function() {
      browser.get('angularjs/fertilizers-purchased/index.html');
    });

    function enterValueAndVerifyInput(model, val) {
      expect(element(by.model('type.'+model)).
        sendKeys(val).getAttribute('value')).toBe(val.toString());
    }


    it('adding empty new fertilizer type should present validation error', function() {
      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('h3.modal-title')).getText()).
          toContain('Validation failed');
      });
    });

    it('adding new fertilizer type with metabolisableEnergyInMJPerKg = 0 should present validation error', function() {
      var dryMatterPercentage = 0, name = 'Apple';
      expect(element(by.model('type.name')).sendKeys(name));
      enterValueAndVerifyInput('dryMatterPercentage', dryMatterPercentage)

      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('h3.modal-title')).getText()).
          toContain('Validation failed');
      });
    });

    it('adding new fertilizer type with metabolisableEnergyInMJPerKg = 0 should present validation error', function() {
      var name = 'Apple base',
        dryMatterPercentage = 76.83, sulphurPercentage = 0.3, potassiumPercentage = 1.38,
        phosphorusPercentage = 0.55, nitrogenPercentage = 1.44;
      expect(element(by.model('type.name')).sendKeys(name));

      enterValueAndVerifyInput('dryMatterPercentage', dryMatterPercentage)
      enterValueAndVerifyInput('sulphurPercentage', sulphurPercentage)
      enterValueAndVerifyInput('potassiumPercentage', potassiumPercentage)
      enterValueAndVerifyInput('phosphorusPercentage', phosphorusPercentage)
      enterValueAndVerifyInput('nitrogenPercentage', nitrogenPercentage)

      element(by.buttonText('Add Type')).click().then(function(){
        expect(element.all(by.css('table#fertilizerTypesTbl tr')).count()).
          toMatch(33);
      });

    });
  });

});
