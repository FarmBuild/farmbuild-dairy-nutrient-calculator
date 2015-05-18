/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * feedBalance
 * @module feedBalance
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('feedBalance',
  function (validations,
            $log) {
    var feedBalance = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

//      //calculate feed balance
//      var B8 = parseFloat(forms_data['concentrates_purchased_frm'].mass);
//      var B9 = parseFloat(forms_data['forages_purchased_frm'].mass);
//      var B15 = parseFloat(decommafy(document.getElementById("DM_Consumed_kg_per_ha").value)) * parseFloat(milkingarea) / 1000;
//DM_Consumed_kg_per_ha in legume
//
//      var forage_totalfeed_ratio = 100 * B9 / (B8 + B9 + B15);
//      var supplement_totalfeed_ratio = 100 * B8 / (B8 + B9 + B15);
//      var homegrown_totalfeed_ratio = 100 * B15 / (B8 + B9 + B15);
//    document.getElementById("forage_totalfeed_ratio").value = commafy(forage_totalfeed_ratio.toFixed(0));
//    document.getElementById("supplement_totalfeed_ratio").value = commafy(supplement_totalfeed_ratio.toFixed(0));
//    document.getElementById("homegrown_totalfeed_ratio").value = commafy(homegrown_totalfeed_ratio.toFixed(0));
//    document.getElementById("supplement_homegrown_ratio").value = commafy((100*(forage_totalfeed_ratio+supplement_totalfeed_ratio)/homegrown_totalfeed_ratio).toFixed(0));

    function validate(summary, concentratesPurchased, foragesPurchased, legumes) {
      if(!_isDefined(summary) ||
        !_isDefined(summary.milkingAreaInHa)) {
        $log.error('nutrientCalculator.summary must be populated for milkingAreaInHa');
        return false;
      }

      if(!_isDefined(concentratesPurchased) ||
        !_isDefined(concentratesPurchased.dryMatterWeight)) {
        $log.error('nutrientCalculator.concentratesPurchased must be populated for dryMatterWeightCombined');
        return false;
      }
      if(!_isDefined(foragesPurchased) ||
        !_isDefined(foragesPurchased.dryMatterWeight)) {
        $log.error('nutrientCalculator.foragesPurchased must be populated for dryMatterWeightCombined');
        return false;
      }

      if(!_isDefined(legumes) ||
        !_isDefined(legumes.dryMatterConsumedPerHaInKg)) {
        $log.error('nutrientCalculator.legumes must be populated for dryMatterConsumedPerHaInKg');
        return false;
      }

      return true;
    }

    function calculate(nutrientCalculator) {
      var summary = nutrientCalculator.summary,
        concentratesPurchased = nutrientCalculator.concentratesPurchased,
        foragesPurchased = nutrientCalculator.foragesPurchased,
        legumes = nutrientCalculator.legumes;

      if(!validate(summary, concentratesPurchased, foragesPurchased, legumes)) {
        return undefined;
      }

      var result = {},
        milkingAreaInHa = summary.milkingAreaInHa,
        //B8+B9
        dryMatterWeightCombined = foragesPurchased.dryMatterWeight + concentratesPurchased.dryMatterWeight,
        dryMatterConsumedPerHaInKg = legumes.dryMatterConsumedPerHaInKg,
        //B15
        dryMatterConsumedPerMilkingAreaInKg = dryMatterConsumedPerHaInKg * milkingAreaInHa / 1000,
        dryMatterTotal = dryMatterWeightCombined + dryMatterConsumedPerMilkingAreaInKg
        ;
      var forageTotalFeedRatio =
          100 * foragesPurchased.dryMatterWeight / dryMatterTotal,
        supplementTotalFeedRatio =
          100 * concentratesPurchased.dryMatterWeight / dryMatterTotal,
        homegrownTotalFeedRatio = 100 * dryMatterConsumedPerMilkingAreaInKg / dryMatterTotal,
        supplementHomegrownRatio = 100*(dryMatterWeightCombined)/homegrownTotalFeedRatio;
      //(100*(forage_totalfeed_ratio+supplement_totalfeed_ratio)/homegrown_totalfeed_ratio

      //home_forage_consumed = B15*1000/parseFloat(milkingarea)
      result.homeForageConsumed = dryMatterConsumedPerMilkingAreaInKg/milkingAreaInHa;
      result.forageTotalFeedRatio = forageTotalFeedRatio;
      result.supplementTotalFeedRatio = supplementTotalFeedRatio;
      result.homegrownTotalFeedRatio = homegrownTotalFeedRatio;
      result.supplementHomegrownRatio = supplementHomegrownRatio;

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
    feedBalance.calculate = calculate;

    return feedBalance;
  });