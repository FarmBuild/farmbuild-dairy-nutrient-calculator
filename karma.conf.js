module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/farmbuild-farmdata/dist/farmbuild-farmdata.js',
      'src/nutrient-calculator.js',
      'src/google-analytic/index.src.js',
      'src/animals-purchased/animalTypes.conf.src.js',
      'src/animals-purchased/index.src.js',
      'src/validations/index.src.js',
      'src/milk-sold/index.src.js',
      'src/index.js',
      'src/*.js',
      'src/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
