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
        concentratesPurchased = nutrientCalculator.concentratesPurchased,
        foragesPurchased = nutrientCalculator.foragesPurchased,
        legumes = nutrientCalculator.legumes
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

      if(!_isDefined(concentratesPurchased) ||
        !_isDefined(concentratesPurchased.dryMatterWeight)) {
        $log.error('nutrientCalculator.concentratesPurchased must be populated for dryMatterWeightCombined');
        return undefined;
      }
      if(!_isDefined(foragesPurchased) ||
        !_isDefined(foragesPurchased.dryMatterWeight)) {
        $log.error('nutrientCalculator.foragesPurchased must be populated for dryMatterWeightCombined');
        return undefined;
      }

      if(!_isDefined(legumes) ||
        !_isDefined(legumes.dryMatterConsumedPerHaInKg)) {
        $log.error('nutrientCalculator.legumes must be populated for dryMatterConsumedPerHaInKg');
        return undefined;
      }

      var result = {},
        numberOfMilkingCows = summary.numberOfMilkingCows,
        milkingAreaInHa = summary.milkingAreaInHa,
        milkSoldPerYearInLitre = milkSold.totalPerYearInLitre,
        fatInKg = milkSold.fatInKg,
        proteinInKg = milkSold.proteinInKg,
        fatNProteinInKg = fatInKg+proteinInKg,
        dryMatterWeightCombined = foragesPurchased.dryMatterWeight + concentratesPurchased.dryMatterWeight,
        dryMatterConsumedPerHaInKg = legumes.dryMatterConsumedPerHaInKg,
        dryMatterConsumedPerMilkingAreaInKg = dryMatterConsumedPerHaInKg * milkingAreaInHa / 1000,
        dryMatterTotal = dryMatterWeightCombined + dryMatterConsumedPerMilkingAreaInKg
        ;
      var forageTotalFeedRatio =
          100 * foragesPurchased.dryMatterWeight / dryMatterTotal,
      supplementTotalFeedRatio =
        100 * concentratesPurchased.dryMatterWeight / dryMatterTotal,
      homegrownTotalFeedRatio = 100 * dryMatterConsumedPerMilkingAreaInKg / dryMatterTotal;

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
    milkProduction.calculate = calculateMilkProduction;

    return milkProduction;
  });