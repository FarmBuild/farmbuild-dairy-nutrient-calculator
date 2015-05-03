exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'examples/**/*.e2e.js'
    //'examples/angularjs/milk-sold/index.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/examples/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
