module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      'bower_components/farmbuild-core/dist/farmbuild-core.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/farmbuild-farmdata/dist/farmbuild-farmdata.js',
      'src/nutrient-calculator.js',
      'src/cows-culled/cows.conf.src.js',
      'src/cows-purchased/index.src.js',
      'src/cows-culled/index.src.js',
      'src/validations/index.src.js',
      'src/milk-sold/index.src.js',
      'src/forages-purchased/forages.conf.src.js',
      'src/forages-purchased/types.src.js',
      'src/forages-purchased/index.src.js',
      'src/legumes/utilisation-factors.conf.src.js',
      'src/legumes/calculator.src.js',
      'src/legumes/index.src.js',
      'src/collections/index.src.js',
      'src/fertilizers-purchased/fertilizers.conf.src.js',
      'src/fertilizers-purchased/types.src.js',
      'src/fertilizers-purchased/validator.src.js',
      'src/fertilizers-purchased/calculator.src.js',
      'src/fertilizers-purchased/index.src.js',
      'src/fertilizers-purchased/index.spec.js',
      'src/index.js',
      'src/*.js',
      'src/**/*.js'
    ],

    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    //logLevel: 'LOG_INFO', //this it NOT application log level, it's karma's log level.
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
