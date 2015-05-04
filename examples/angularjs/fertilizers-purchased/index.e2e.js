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
      expect(element.all(by.css('body h3')).first().getText()).toContain(title);
    });

    var selectDropdownbyNum = function ( element, optionNum ) {
      if (!optionNum){
        return undefined;
      };
      var options = element.findElements(by.tagName('option'))
        .then(function(options){
          options[optionNum].click();
        });
    };
    it('Select a Fertilizer Purchased Type to be "DAP"', function() {
//      var select =element(by.id('fertilizerType'));

//      expect(select).toBe();

//      expect(selectDropdownbyNum(select, 1));

//      expect(element(by.model('newFertilizer.weight')).sendKeys('1000').getAttribute('value')).
//        toBe('1000');
//      element(by.buttonText('Add fertilizer')).click().then(function(){
//        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
//          toMatch(3);
//      });
    });

//    it('Enter 1000 kg/year as Amount Purchased', function() {
//      var weight = 1000, type = 'Lucerne Hay';
//      expect(element(by.model('newFertilizer.type')).sendKeys(type));
//      expect(element(by.model('newFertilizer.weight')).sendKeys(weight).getAttribute('value')).
//        toBe('1000');
//      element(by.buttonText('Add fertilizer')).click().then(function(){
//        expect(element.all(by.css('table#fertilizersTbl tr')).count()).
//          toMatch(3);
//      })
//      element(by.buttonText('Calculate nutrient')).click().then(function(){
//        expect(element.all(by.css('summary .form-group')).first().getText()).
//          toMatch('1,000');
//      });
//    });

  });

});
