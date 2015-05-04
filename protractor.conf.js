var timeout = 60000;

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    //'examples/**/*.e2e.js'
    //'examples/angularjs/milk-sold/index.e2e.js'
    'examples/angularjs/fertilizers-purchased/*.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/examples/angularjs',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: timeout
  },

  getPageTimeout: timeout
};
