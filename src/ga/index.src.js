/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/googleAnalyticsCalculator singleton
 * @private-module nutrientCalculator/googleAnalyticsCalculator
 */
angular.module('farmbuild.nutrientCalculator')
    .factory('googleAnalyticsCalculator',
    function ($log, validations, googleAnalytics) {

        var googleAnalyticsCalculator = {}, api = 'farmbuild-dairy-nutrient-calculator',
            _isDefined = validations.isDefined;

        googleAnalyticsCalculator.trackCalculate = function(clientName) {
            $log.info('googleAnalyticsCalculator.trackCalculate clientName: %s', clientName);
            googleAnalytics.track(api, clientName)
        }



        return googleAnalyticsCalculator;

    });
