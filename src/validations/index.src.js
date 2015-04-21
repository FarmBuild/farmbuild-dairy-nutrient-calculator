angular.module('farmbuild.nutrientCalculator')
  .factory('Validations',
  function ($log) {

    var Validations = {};

    Validations.isPositiveNumber = function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
    };

    Validations.isAlphabet =  function(value){
      var regex = /^[A-Za-z]+$/ig;
      return regex.test(value);
    };

    Validations.isAlphanumeric =  function(value){
      var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9 _]*$/ig;
      return regex.test(value);
    };


    return Validations;

  }
);
