angular.module('farmbuild.nutrientCalculator')
  .factory('validations',
  function ($log) {

    var validations = {};

    validations.isPositiveNumberOrZero = function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;
    };

    validations.isPositiveNumber = function(value) {
      return validations.isPositiveNumberOrZero(value) && parseFloat(value) > 0;
    };

    validations.isAlphabet =  function(value){
      var regex = /^[A-Za-z]+$/ig;
      return regex.test(value);
    };

    validations.isAlphanumeric =  function(value){
      var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9 _]*$/ig;
      return regex.test(value);
    };

    validations.isDefined =  angular.isDefined;

    return validations;

  }
);
