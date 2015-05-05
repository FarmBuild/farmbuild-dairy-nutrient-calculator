/*
 * https://github.com/FarmBuild/farmbuild-dairy-nutrient-calculator/wiki/TC09:-Calculate-nutrient-of-fertilizer-purchased-(new-farm-data)
 * */

describe('Calculate nutrient of fertilizer purchased (new farm data)', function() {

  describe('Using FarmBuild Nutrient Calculator to calculate the weighted average for fertilizer purchased (Dried & Wet)', function() {

    var page = 'angularjs/fertilizers-purchased/index.html',
      title = 'Farmbuild Diary Nutrient Calculator - Fertilizer Purchased (angularJS)'

    beforeEach(function() {
      browser.get(page);
    });

    it('should render sample when user navigates to angularjs/fertilizers-purchased/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Fertilizers Purchased');
    });

    it('should add new fertilizer', function() {
      expect(element(by.model('newFertilizer.type')).sendKeys('DAP'));
      expect(element(by.model('newFertilizer.weight')).sendKeys('4000').getAttribute('value')).
        toBe('4000');
      element(by.buttonText('Add fertilizer')).click().then(function(){
        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
          toMatch(3);
      });
    });

    it('should calculate nutrient of fertilizer', function() {
      var weight = 4000, type = 'DAP';
      expect(element(by.model('newFertilizer.type')).sendKeys(type));
      expect(element(by.model('newFertilizer.weight')).sendKeys(weight).getAttribute('value')).
        toBe('4000');
      element(by.buttonText('Add fertilizer')).click().then(function(){
        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
          toMatch(3);
      })
      element(by.buttonText('Calculate nutrient')).click().then(function(){
        expect(element.all(by.css('summary .form-group')).first().getText()).
          toMatch('4,000');
      });
    });
  });

});
