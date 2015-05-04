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
      'src/forage-purchased/forages.conf.src.js',
      'src/forage-purchased/types.src.js',
      'src/forage-purchased/index.src.js',
      'src/legume/utilisation-factors.conf.src.js',
      'src/legume/calculator.src.js',
      'src/legume/calculator.spec.js',
      'src/legume/index.src.js',
      'src/legume/index.spec.js',
      'src/index.js'
      //'src/*.js',
      //'src/**/*.js'
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
