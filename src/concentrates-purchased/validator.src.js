///**
// * @since 0.0.1
// * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
// * @license The MIT License
// * @author Spatial Vision
// * @version 0.1.0
// */
//
//'use strict';
//
///**
// * nutrientCalculator/concentrateValidator singleton
// * @private-module nutrientCalculator/concentrateValidator
// */
//angular.module('farmbuild.nutrientCalculator')
//.factory('concentrateValidator',
//  function (nutrientMediumValidator,
//            $log) {
//
//    var concentrateValidator = {};
//
//     function _validate(concentrate) {
//      $log.info('validating concentrate...', concentrate);
//      return nutrientMediumValidator.validate(concentrate);
//    };
//
//    concentrateValidator.validate = _validate;
//
//    concentrateValidator.validateAll = function(concentrates) {
//      return nutrientMediumValidator.validateAll(concentrates);
//    }
//
//
//    return concentrateValidator;
//  });