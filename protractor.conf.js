var timeout = 60000;

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'examples/**/*.e2e.js'
    //'examples/angularjs/milk-sold/index.e2e.js'
    //'examples/angularjs/fertilizers-purchased/*.e2e.js'
    //'examples/angularjs/concentrates-purchased/index-types.e2e.js'
    //'examples/angularjs/concentrates-purchased/index.e2e.js'
    //'examples/angularjs/forages-purchased/*.e2e.js'
    //'examples/angularjs/legumes/*.e2e.js'
    //'examples/angularjs/index.e2e.js'
    //'examples/angularjs/index-load-existing.e2e.js'

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
