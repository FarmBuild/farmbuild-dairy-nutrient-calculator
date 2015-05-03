exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'examples/**/*.e2e.js'
  ],

  multiCapabilities: [
    {
        'browserName': 'chrome'
    }
    /*, {
        'browserName': 'safari'
    }*/
    , {
        'browserName': 'firefox'
    }
    /*, {
        'browserName': 'internet explorer'
    }*/
  ],

  baseUrl: 'https://rawgit.com/FarmBuild/farmbuild-dairy-nutrient-calculator/master/examples/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
