/**
 * Created by gota on 12/05/15.
 */
'use strict';

describe('farmbuild.nutrientCalculator module', function() {

    // instantiate service
    var googleAnalyticsCalculator, $log;

    beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
        $provide.value('$log', console);
    }));

    beforeEach(module('farmbuild.nutrientCalculator'));

    beforeEach(inject(function (_googleAnalyticsCalculator_,_$log_) {
        googleAnalyticsCalculator = _googleAnalyticsCalculator_;
        $log = _$log_;
    }));

    describe('Track the calculate ', function(){
        it('googleAnalyticsCalculator should be defined', inject(function() {
            expect(googleAnalyticsCalculator).toBeDefined();
        }));

        it('googleAnalyticsCalculator.track should create a track', inject(function() {
            googleAnalyticsCalculator.trackCalculate('farmbuild-test-client')
        }));
    });



});
