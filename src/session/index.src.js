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
 * @private-module nutrientCalculator/nutrientCalculatorSession
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientCalculatorSession',
  function ($log, farmdata, validations) {

    var nutrientCalculatorSession = {},
      _isDefined = validations.isDefined;


//    function findInSessionStorage() {
//      var root = farmdata.session.find();
//      return root.nutrientCalculator.milkSold;
//    };
//
//    function saveInSessionStorage(result) {
//      var farmData = farmdata.session.find();
//      farmData.dateLastUpdated = new Date();
//      farmData.nutrientCalculator.milkSold = result;
//      farmdata.session.save(farmData);
//    };

    function load() {
      var root = farmdata.session.find();

      if(!_isDefined(root)) {
        return undefined;
      }

      return root.nutrientCalculator;
    }
    //nutrientCalculatorSession

    /**
     * Saves the farmData.nutrientCalculator into the sessionStorage
     * @method saveSection
     * @param {!object} farmData.nutrientCalculator
     * @returns {Object} farmData.nutrientCalculator
     * @private
     * @static
     */
    nutrientCalculatorSession.saveSection = function(section, value) {
      var loaded = load();

      if(!_isDefined(loaded)) {
        $log.error('Unable to find an existing farmData! please create then save.');
        return nutrientCalculatorSession
      }

      loaded[section] = value;

      return save(loaded);
    }

    /**
     * Saves the farmData.nutrientCalculator into the sessionStorage
     * @method save
     * @param {!object} farmData.nutrientCalculator
     * @returns {Object} farmData.nutrientCalculator
     * @public
     * @static
     */
    function save(toSave) {
      var farmData = farmdata.session.find();

      if(!_isDefined(farmData)) {
        $log.error('Unable to find the farmData in the session!');
        return undefined;
      }

      farmData.dateLastUpdated = new Date();

      farmData.nutrientCalculator = toSave;
      farmdata.session.save(farmData);
      return toSave;
    }
    nutrientCalculatorSession.save = save;

    /**
     * Returns a section of the farmData as an object from the sessionStorage
     * @method loadSection
     * @returns {Object} the farmdata, null, if not found.
     * @public
     * @static
     */
    nutrientCalculatorSession.loadSection = function(section) {
      var loaded = load();
      return loaded?loaded[section]:null;
    }

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

    nutrientCalculatorSession.find = function() {
      return farmdata.session.find();
    }

    return nutrientCalculatorSession;

  });
