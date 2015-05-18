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

    function calculateFeedBalance(nutrientCalculator, result) {
//      //calculate feed balance
//      var B8 = parseFloat(forms_data['concentrates_purchased_frm'].mass);
//      var B9 = parseFloat(forms_data['forages_purchased_frm'].mass);
//      var B15 = parseFloat(decommafy(document.getElementById("DM_Consumed_kg_per_ha").value)) * parseFloat(milkingarea) / 1000;
//DM_Consumed_kg_per_ha in legume
//
//      var forage_totalfeed_ratio = 100 * B9 / (B8 + B9 + B15);
//      var supplement_totalfeed_ratio = 100 * B8 / (B8 + B9 + B15);
//      var homegrown_totalfeed_ratio = 100 * B15 / (B8 + B9 + B15);

    }

    function calculateMilkProduction(nutrientCalculator) {
      var summary = nutrientCalculator.summary,
        milkSold = nutrientCalculator.milkSold,
        legume = nutrientCalculator.legume
        ;
      if(!_isDefined(summary) ||
        !_isDefined(summary.numberOfMilkingCows) ||
        !_isDefined(summary.milkingAreaInHa)) {
        $log.error('nutrientCalculator.summary must be populated for numberOfMilkingCows, milkingAreaInHa');
        return undefined;
      }

      if(!_isDefined(milkSold) ||
        !_isDefined(milkSold.fatInKg) ||
        !_isDefined(milkSold.proteinInKg) ||
        !_isDefined(milkSold.totalPerYearInLitre)) {
        $log.error('nutrientCalculator.milkSold must be populated for totalPerYearInLitre, fatInKg, proteinInKg');
        return undefined;
      }
//
//      if(!_isDefined(legume) ||
//        !_isDefined(legume.fatInKg) ||
//        !_isDefined(milkSold.proteinInKg)) {
//        $log.error('nutrientCalculator.legume must be populated for fatInKg, proteinInKg');
//        return undefined;
//      }

      var result = {},
        numberOfMilkingCows = summary.numberOfMilkingCows,
        milkingAreaInHa = summary.milkingAreaInHa,
        milkSoldPerYearInLitre = milkSold.totalPerYearInLitre,
        fatInKg = milkSold.fatInKg,
        proteinInKg = milkSold.proteinInKg,
        fatNProteinInKg = fatInKg+proteinInKg;

      result.milkSoldPerYearInLitre = milkSoldPerYearInLitre;
      result.milkSoldPerCowInLitre = milkSoldPerYearInLitre/numberOfMilkingCows;
      result.milkSoldPerHectareInLitre = milkSoldPerYearInLitre/milkingAreaInHa;

      //((fat_kg+prot_kg)/totalmilkingcows)
      result.milkSoldPerCowInKg = fatNProteinInKg/numberOfMilkingCows;
      //(fat_kg+prot_kg)/totalfarmarea
      result.milkSoldPerHectareInInKg = fatNProteinInKg/milkingAreaInHa;

      //(total_milk * (forage_totalfeed_ratio+supplement_totalfeed_ratio)/100
      //result.

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
    milkProduction.calculate = calculateMilkProduction;

    return milkProduction;
  });