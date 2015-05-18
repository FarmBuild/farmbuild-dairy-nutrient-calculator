/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * milkProduction
 * @module milkProduction
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('milkProduction',
  function (validations,
            $log) {
    var milkProduction = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;


    function calculateStockingRates(nutrientCalculator, result) {
      //stocking_rate_milker
      //totalmilkingcows / milkingarea

      //stocking_rate_whole_farm
      //totalmilkingcows / totalfarmarea


    }

    function validate(summary, milkSold, feedBalance) {

      if(!_isDefined(summary) ||
        !_isDefined(summary.numberOfMilkingCows) ||
        !_isDefined(summary.milkingAreaInHa)) {
        $log.error('nutrientCalculator.summary must be populated for numberOfMilkingCows, milkingAreaInHa');
        return false;
      }

      if(!_isDefined(milkSold) ||
        !_isDefined(milkSold.fatInKg) ||
        !_isDefined(milkSold.proteinInKg) ||
        !_isDefined(milkSold.totalPerYearInLitre)) {
        $log.error('nutrientCalculator.milkSold must be populated for totalPerYearInLitre, fatInKg, proteinInKg');
        return false;
      }

      if(!_isDefined(feedBalance)) {
        $log.error('nutrientCalculator.feedBalance must be populated');
        return false;
      }

      return true;
    }

    function calculate(nutrientCalculator) {
      var summary = nutrientCalculator.summary,
        milkSold = nutrientCalculator.milkSold,
        feedBalance = nutrientCalculator.feedBalance;

      if(!validate(summary, milkSold, feedBalance)) {
        return undefined;
      }

      var result = {},
        numberOfMilkingCows = summary.numberOfMilkingCows,
        milkingAreaInHa = summary.milkingAreaInHa,
        milkSoldPerYearInLitre = milkSold.totalPerYearInLitre,
        fatInKg = milkSold.fatInKg,
        proteinInKg = milkSold.proteinInKg,
        fatNProteinInKg = fatInKg+proteinInKg,
        forageTotalFeedRatio = feedBalance.forageTotalFeedRatio,
        supplementTotalFeedRatio = feedBalance.supplementTotalFeedRatio,
        homegrownTotalFeedRatio = feedBalance.homegrownTotalFeedRatio;

      result.milkSoldPerYearInLitre = milkSoldPerYearInLitre;
      result.milkSoldPerCowInLitre = milkSoldPerYearInLitre/numberOfMilkingCows;
      result.milkSoldPerHectareInLitre = milkSoldPerYearInLitre/milkingAreaInHa;

      //((fat_kg+prot_kg)/totalmilkingcows)
      result.milkSoldPerCowInKg = fatNProteinInKg/numberOfMilkingCows;
      //(fat_kg+prot_kg)/totalfarmarea
      result.milkSoldPerHectareInInKg = fatNProteinInKg/milkingAreaInHa;

      //(total_milk * (forage_totalfeed_ratio+supplement_totalfeed_ratio)/100
      result.milkSoldFromImportedFeedInKg = milkSoldPerYearInLitre * (forageTotalFeedRatio+supplementTotalFeedRatio)/100;
      //total_milk * homegrown_totalfeed_ratio/100
      result.milkSoldFromHomeGrownFeedInKg = milkSoldPerYearInLitre * homegrownTotalFeedRatio/100;

      return result;
    }

    /**
     * Calculates milk production
     * @method calculate
     * @param {!Object} farmData
     * @returns {Object} milkProduction
     * @public
     * @static
     */
    milkProduction.calculate = calculate;

    return milkProduction;
  });