module.exports = function(config){
  config.set({

    basePath : '',

    files : [
      'bower_components/farmbuild-core/dist/farmbuild-core.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/farmbuild-farmdata/dist/farmbuild-farmdata.js',
      'src/nutrient-calculator.js',
      'src/references.conf.src.js',
      'src/cows-purchased/index.src.js',
      'src/cows-culled/index.src.js',
      'src/validations/index.src.js',
      'src/milk-sold/index.src.js',
      'src/forage-purchased/index.src.js',
      'src/collections/index.src.js',
      'src/fertilizer-purchased/fertilizers.conf.src.js',
      'src/fertilizer-purchased/types.src.js',
      'src/fertilizer-purchased/validator.src.js',
      'src/fertilizer-purchased/calculator.src.js',
      'src/fertilizer-purchased/index.src.js',
      'src/collections/index.spec.js',
      'src/fertilizer-purchased/types.spec.js',
      'src/fertilizer-purchased/index.spec.js',
      'src/index.js',
      //'src/*.js',
      //'src/**/*.js'
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
