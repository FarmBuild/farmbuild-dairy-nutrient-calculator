/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('nutrientMediumTypes', function (collections, validations, $log) {

    var nutrientMediumTypes,
      _isPositiveNumber = validations.isPositiveNumber,
      _isPositiveNumberOrZero = validations.isPositiveNumberOrZero,
      _isEmpty = validations.isEmpty,
      _isDefined = validations.isDefined,
      _types = [];

    function _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage,
                     nitrogenPercentage, metabolisableEnergyInMJPerKg) {
      var type = {
        name: name,
        dryMatterPercentage: dryMatterPercentage,
        sulphurPercentage: sulphurPercentage,
        potassiumPercentage: potassiumPercentage,
        phosphorusPercentage: phosphorusPercentage,
        nitrogenPercentage: nitrogenPercentage
      };
      if(_isDefined(metabolisableEnergyInMJPerKg)) {
        type.metabolisableEnergyInMJPerKg = metabolisableEnergyInMJPerKg;
      }
      return type
    }

    function _validate(type) {
      $log.info('validating type  ...', type);

      var valid =
        !(_isEmpty(type)) &&
        !(_isEmpty(type.name) ||
          !_isPositiveNumber(type.dryMatterPercentage) ||
          !_isPositiveNumberOrZero(type.potassiumPercentage) ||
          !_isPositiveNumberOrZero(type.phosphorusPercentage) ||
          !_isPositiveNumberOrZero(type.nitrogenPercentage) ||
          !_isPositiveNumberOrZero(type.sulphurPercentage));

      if(_isDefined(type) && type.hasOwnProperty('metabolisableEnergyInMJPerKg')) {
        valid = valid && _isPositiveNumber(type.metabolisableEnergyInMJPerKg);
      }

      if(!valid) {
        $log.error('invalid type: %j', type);
      }

      return valid;
    }

    function _add(types, name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage,
                  metabolisableEnergyInMJPerKg) {
      var type = _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage,
        nitrogenPercentage, metabolisableEnergyInMJPerKg);
      $log.info('adding a type ...', type);

      if (!_validate(type)) {
        return undefined;
      }

      return collections.add(types, type);
    };

    nutrientMediumTypes = {
      add: _add,
      at: function(index) { return collections.at(_types, index)},
      size: function() { return collections.size(_types)},
      byName: function(name) { return collections.byProperty(_types, 'name', name)},
      toArray: function() { return angular.copy(_types) },
      removeAt: function(index) { return collections.removeAt(_types, index)},
      last: function() { return collections.last(_types) },
      validate: _validate,
      create: _create
    };

    return nutrientMediumTypes;
  });