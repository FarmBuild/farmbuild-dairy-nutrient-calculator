/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
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
