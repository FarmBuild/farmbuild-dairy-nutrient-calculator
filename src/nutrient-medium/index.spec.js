describe('nutrientMedium module', function() {

  // instantiate service
  var $log;
  var nutrientMedium,
    dap, dapName = 'DAP',
    dairyManureStockpile, dairyManureStockpileName = 'Dairy manure stockpile',
    superphosphate, superphosphateName = 'Superphosphate (Super)',
    urea, ureaName = 'Urea';

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(inject(function (_$log_, _nutrientMedium_) {
    $log = _$log_;
    nutrientMedium = _nutrientMedium_;
  }));

});

