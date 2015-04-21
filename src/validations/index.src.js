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


    return Validations;

  }
);
