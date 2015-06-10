/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientCalculatorSession',
  function ($log, farmdata, validations) {

    var nutrientCalculatorSession = {},
      _isDefined = validations.isDefined;

    function load() {
      var root = farmdata.session.find();

      if(!_isDefined(root)) {
        return undefined;
      }

      return root.nutrientCalculator;
    }


    nutrientCalculatorSession.saveSection = function(section, value) {
      var loaded = load();

      if(!_isDefined(loaded)) {
        $log.error('Unable to find an existing farmData! please create then save.');
        return nutrientCalculatorSession
      }

      loaded[section] = value;

      return save(loaded);
    }

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

    nutrientCalculatorSession.loadSection = function(section) {
      var loaded = load();
      debugger;
      return loaded?loaded[section]:null;
    }

    nutrientCalculatorSession.isLoadFlagSet = farmdata.session.isLoadFlagSet;

    nutrientCalculatorSession.find = function() {
      return farmdata.session.find();
    }

    nutrientCalculatorSession.export = function(document, farmData) {
      return farmdata.session.export(document, save(farmData));
    }

    return nutrientCalculatorSession;

  });
