/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.nutrientCalculator')
  .factory('feedBalance',
  function (validations,
            $log) {
    var feedBalance = {},
      _isPositiveNumber = validations.isPositiveNumber,
      _isDefined = validations.isDefined;

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
        weightCombined = foragesPurchased.weight + concentratesPurchased.weight,
        dryMatterConsumedPerHaInKg = legumes.dryMatterConsumedPerHaInKg,
      //B15
        dryMatterConsumedPerMilkingAreaInKg = dryMatterConsumedPerHaInKg * milkingAreaInHa,
        weightTotal = weightCombined + dryMatterConsumedPerMilkingAreaInKg,
        forageTotalFeedRatio =
          100 * foragesPurchased.weight / weightTotal,
        supplementTotalFeedRatio =
          100 * concentratesPurchased.weight / weightTotal,
        homegrownTotalFeedRatio = 100 * dryMatterConsumedPerMilkingAreaInKg / weightTotal,
        supplementHomegrownRatio = 100*(forageTotalFeedRatio+supplementTotalFeedRatio)/homegrownTotalFeedRatio;

      result.homeForageConsumed = dryMatterConsumedPerMilkingAreaInKg/milkingAreaInHa;
      result.forageTotalFeedRatio = forageTotalFeedRatio;
      result.supplementTotalFeedRatio = supplementTotalFeedRatio;
      result.homegrownTotalFeedRatio = homegrownTotalFeedRatio;
      result.supplementHomegrownRatio = supplementHomegrownRatio;

      return result;
    }

    feedBalance.calculate = calculate;

    return feedBalance;
  });