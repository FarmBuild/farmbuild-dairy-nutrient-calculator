angular.module('farmbuild.nutrientCalculator')
  .factory('Validations',
  function ($log) {

    var Validations = {};

    Validations.isNumber = function(value) {
      return !isNaN(value) && angular.isNumber(value);
    };

    Validations.isAlphabet =  function(value){
      var regex = /^[A-Za-z]+$/ig;
      return regex.test(value);
    };


    return Validations;

  }
);
