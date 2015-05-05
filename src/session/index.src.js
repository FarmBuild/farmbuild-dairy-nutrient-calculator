/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/nutrientCalculatorSession singleton
 * @module nutrientCalculator/nutrientCalculatorSession
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientCalculatorSession',
  function (farmdata, validations) {

    var nutrientCalculatorSession = {},
      _isPositiveNumber = validations.isPositiveNumber;

    /**
     * Returns true if the location.search has ?load=true, false otherwise
     * @method isLoadFlagSet
     * @param {object} location instance
     * @returns {boolean} Returns true if the location.search has ?load=true, false otherwise
     * @public
     * @static
     */
    nutrientCalculatorSession.isLoadFlagSet = function(location) {
      var load = false;

      if(location.href.split('?').length > 1 &&
        location.href.split('?')[1].indexOf('load') === 0){
        load = (location.href.split('?')[1].split('=')[1] === 'true');
      }

      return load;
    }

    return nutrientCalculatorSession;

  });
