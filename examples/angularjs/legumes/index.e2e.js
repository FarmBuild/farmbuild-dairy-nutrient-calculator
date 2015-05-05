'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function () {

	describe('legumes', function () {

		beforeEach(function () {
			browser.get('angularjs/legumes/index.html');
		});

		it('should render sample when user navigates to angularjs/legumes/index.html', function () {
			expect(element.all(by.css('body h3')).first().getText()).
				toContain('Farmbuild Diary Nutrient Calculator - Legumes Purchased');
		});

		it('should render sample when user navigates to angularjs/milk-sold/index.html', function () {
			expect(element(by.model('milkSoldPerYearInLitre')).sendKeys('1751317').getAttribute('value')).
				toBe('1751317');
			expect(element(by.model('milkProteinInKg')).sendKeys('74080.71').getAttribute('value')).
				toBe('74080.71');
			expect(element(by.model('milkFatInKg')).sendKeys('59895.04').getAttribute('value')).
				toBe('59895.04');
			expect(element(by.model('numberOfMilkingCows')).sendKeys('228').getAttribute('value')).
				toBe('228');
			expect(element(by.model('numberOfMilkingDays')).sendKeys('365').getAttribute('value')).
				toBe('365');
			expect(element(by.model('averageCowWeightInKg')).sendKeys('550').getAttribute('value')).
				toBe('550');
			expect(element(by.model('forageMetabolisableEnergyInMJ')).sendKeys('6298085').getAttribute('value')).
				toBe('6298085');
			expect(element(by.model('concentrateMetabolisableEnergyInMJ')).sendKeys('4954078').getAttribute('value')).
				toBe('4954078');
			expect(element(by.model('milkingAreaInHa')).sendKeys('70.39').getAttribute('value')).
				toBe('70.39');
			expect(element(by.model('nitrogenFromFertiliserInKg')).sendKeys('5780').getAttribute('value')).
				toBe('5780');
			expect(element(by.model('legumePercentage')).sendKeys('3.5').getAttribute('value')).
				toBe('3.5');
			element(by.model('utilisationFactor')).sendKeys('Average');

			element(by.buttonText('Calculate')).click().then(function () {
				expect(element.all(by.css('summary .form-group p span')).first().getText()).
					toContain('1,751,317.00');
			});
		});

	});

});
