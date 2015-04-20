angular.module('farmbuild.nutrientCalculator')
  .factory('Validations',
  function ($log) {

    var Validations = {};

    Validations.isNumber = angular.isNumber;

    Validations.isAlphabet =  function(value){
      var regex = /^[A-Za-z]+$/ig;
      return regex.test(value);
    };


    return Validations;

  }
);
