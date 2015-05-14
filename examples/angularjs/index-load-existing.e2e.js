'use strict';
var path = require('path');

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Farm web nutrient calculator', function() {

  describe('animals-culled', function() {

    beforeEach(function() {
      browser.get('angularjs/index.html');
    });

    it('should render sample when user navigates to angularjs/index.html', function() {
      expect(element.all(by.css('body h3')).first().getText()).
        toContain('Farmbuild Dairy Nutrient Calculator');
    });

    function sleep(mils) {
      var on = true,
        now = new Date().getTime(),
        stop = now + mils
        ;
      while(on) {
        if(new Date().getTime() > stop) {
          on = false;
          console.log('sleep time is over');
        }
      }
      return;
    }

    it('should render sample when user navigates to angularjs/index.html', function() {
      var susanFarmJson = path.resolve(__dirname, "examples/data/farmdata-susan.json"),
        farmName = "Susan's Farm",
        fileInput = element(by.css('#loadFile'));

      //element(by.css('#loadFile')).sendKeys('/home/hxg/Development/sefs/farmbuild-dairy-nutrient-calculator/examples/data/farmdata-susan.json')
      fileInput.sendKeys(susanFarmJson);
      //element(by.css('#loadButton')).click()

      sleep(2000);

      console.log('after sleep');

      browser.pause();

      expect(element.all(by.css('summary')).first().getText()).
        toContain(farmName);


//      expect(element.all(by.css('body h3')).first().getText()).
//        toContain('Farmbuild Dairy Nutrient Calculator');
    });



  });

});
