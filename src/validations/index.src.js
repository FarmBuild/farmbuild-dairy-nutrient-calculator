angular.module('farmbuild.nutrientCalculator')
  .factory('Validations',
  function ($log) {

    var Validations = {};

    Validations.isNumber = angular.isNumber;

    return Validations;

  }
);
