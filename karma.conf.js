module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      'bower_components/farmbuild-core/dist/farmbuild-core.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/farmbuild-farmdata/dist/farmbuild-farmdata.js',
      'src/nutrient-calculator.js',

      'src/reporting/aggregator.src.js',
      'src/reporting/balance.src.js',
      'src/reporting/efficiency.src.js',
      'src/reporting/milk-production.src.js',
      'src/reporting/feed-balance.src.js',
      'src/reporting/stocking-rate.src.js',
      'src/nutrient-medium/validator.src.js',
      'src/nutrient-medium/types.src.js',
      'src/nutrient-medium/calculator.src.js',
      'src/nutrient-medium/index.src.js',
      'src/cows/index.src.js',
      'src/cows/types.src.js',
      'src/cows/validator.src.js',
      'src/cows/cows.conf.src.js',
      'src/cows-purchased/index.src.js',
      'src/cows-culled/index.src.js',
      'src/milk-sold/index.src.js',
      'src/forages-purchased/forages.conf.src.js',
      'src/forages-purchased/types.src.js',
      'src/forages-purchased/validator.src.js',
      'src/forages-purchased/index.src.js',
      'src/legumes/utilisation-factors.conf.src.js',
      'src/legumes/calculator.src.js',
      'src/legumes/index.src.js',
      'src/collections/index.src.js',
      'src/fertilizers-purchased/defaults.conf.src.js',
      'src/fertilizers-purchased/types.src.js',
      'src/fertilizers-purchased/validator.src.js',
      'src/fertilizers-purchased/calculator.src.js',
      'src/fertilizers-purchased/index.src.js',
      'src/concentrates-purchased/defaults.conf.src.js',
      'src/concentrates-purchased/types.src.js',
      'src/concentrates-purchased/validator.src.js',
      'src/concentrates-purchased/calculator.src.js',
      'src/concentrates-purchased/index.src.js',
      'src/session/index.src.js',
      'src/ga/index.src.js',
      'src/index.js',
//      'src/blank.spec.js',//use this as a basis of creating your module test
      'src/nutrient-calculator-load.spec.js',
//      'src/nutrient-calculator-create.spec.js',
//      'src/cows/types.spec.js',
//      'src/cows/validator.spec.js',
//      'src/cows-culled/index.spec.js',
//      'src/cows-purchased/index.spec.js',
//      'src/nutrient-medium/validator.spec.js',
//      'src/nutrient-medium/types.spec.js',
//      'src/index.spec.js',
//      'src/legumes/calculator.spec.js',
//      'src/legumes/index.spec.js',
//      'src/forages-purchased/index.spec.js',
//      'src/forages-purchased/types.spec.js',
//      'src/fertilizers-purchased/types.spec.js',
//      'src/fertilizers-purchased/index.spec.js',
//      'src/concentrates-purchased/types.spec.js',
//      'src/concentrates-purchased/index.spec.js',
//      'src/session/index.spec.js',
//      'src/collections/index.spec.js',
//      'src/ga/index.spec.js',
//      'src/**/*.spec.js',
      {pattern: 'examples/data/*.json'}
    ],

    autoWatch : true,
    frameworks: ['jasmine', 'fixture'],
    browsers : ['Chrome'],
    //logLevel: 'LOG_INFO', //this it NOT application log level, it's karma's log level.
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-fixture',
            'karma-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    preprocessors: {
      '**/*.html'   : ['html2js'],
      '**/*.json'   : ['html2js']
    }

  });
};
