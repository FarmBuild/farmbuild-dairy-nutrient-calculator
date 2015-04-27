'use strict';

// Inject modules
angular.module('farmbuild.nutrientCalculator').run(function(nutrientCalculator){});

// Init api by instantiating angular module internally, users are not tied to angular for using farmbuild.
angular.injector(['ng', 'farmbuild.nutrientCalculator']);