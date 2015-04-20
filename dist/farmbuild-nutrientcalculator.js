"use strict";

angular.module("farmbuild.nutrientCalculator", [ "farmbuild.core", "farmbuild.farmdata" ]).factory("NutrientCalculator", function(MilkSold, GoogleAnalytic, AnimalPurchased, FarmData) {
    var NutrientCalculator = {};
    NutrientCalculator.load = function(farmData) {
        if (!FarmData.isFarmData(farmData)) {
            return undefined;
        }
        if (!farmData.nutrientCalculator) {
            farmData.nutrientCalculator = {
                milkSold: {}
            };
        }
        return farmData;
    };
    NutrientCalculator.milkSold = MilkSold;
    NutrientCalculator.googleAnalytic = GoogleAnalytic;
    NutrientCalculator.animalPurchased = AnimalPurchased;
    window.farmbuild.nutrientcalculator = NutrientCalculator;
    return NutrientCalculator;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("AnimalPurchased", function(Validations) {
    var AnimalPurchased = {}, _isNumber = Validations.isNumber;
    AnimalPurchased.incoming = [];
    AnimalPurchased.calculate = function(incomings) {
        AnimalPurchased.incoming = incomings;
        if (incomings.length === 0) {
            return undefined;
        }
        return "";
    };
    AnimalPurchased.add = function(type, count) {
        count = parseInt(count);
        if (!_isNumber(count)) {
            return undefined;
        }
        AnimalPurchased.incoming.push({
            type: type,
            count: count
        });
        return AnimalPurchased;
    };
    return AnimalPurchased;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("GoogleAnalytic", function() {
    var exports = {};
    exports.username = "anonymous";
    return exports;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("MilkSold", function(Validations) {
    var MilkSold = {}, _isNumber = Validations.isNumber;
    MilkSold.calculateByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
        var milkProteinInKg, milkFatInKg;
        milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
        milkProteinPercentage = parseFloat(milkProteinPercentage);
        milkFatPercentage = parseFloat(milkFatPercentage);
        if (!_validateInputs(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage, "%")) {
            return undefined;
        }
        milkProteinInKg = _percentageToKg(milkProteinPercentage, milkSoldPerYearInLitre);
        milkFatInKg = _percentageToKg(milkFatPercentage, milkSoldPerYearInLitre);
        return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);
    };
    MilkSold.calculateByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
        var milkProteinPercentage, milkFatPercentage;
        milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
        milkProteinInKg = parseFloat(milkProteinInKg);
        milkFatInKg = parseFloat(milkFatInKg);
        if (!_validateInputs(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg, "kg")) {
            return undefined;
        }
        milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
        milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
        return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);
    };
    function _validateInputs(milkSoldPerYearInLitre, milkProtein, milkFat, unit) {
        if (!milkSoldPerYearInLitre || !milkProtein || !milkFat || !unit) {
            return false;
        }
        if (!_isNumber(milkSoldPerYearInLitre) || !_isNumber(milkProtein) || !_isNumber(milkFat)) {
            return false;
        }
        if (milkSoldPerYearInLitre < 0 || milkProtein < 0 || milkFat < 0) {
            return false;
        }
        if (unit === "%" && milkProtein + milkFat > 100) {
            return false;
        }
        if (unit === "kg" && milkProtein + milkFat > milkSoldPerYearInLitre) {
            return false;
        }
        return true;
    }
    function _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage) {
        var nitrogenPercentage = milkProteinPercentage / 6.33, phosphorusPercentage = .0111 * milkFatPercentage + .05255, potassiumPercentage = .14, sulphurPercentage = .06, nitrogenInKg = milkSoldPerYearInLitre * nitrogenPercentage / 100, potassiumInKg = milkSoldPerYearInLitre * potassiumPercentage / 100, sulphurInKg = milkSoldPerYearInLitre * sulphurPercentage / 100, phosphorusInKg = milkSoldPerYearInLitre * phosphorusPercentage / 100;
        return {
            totalPerYearInLitre: _toFixNumber(milkSoldPerYearInLitre, 2),
            fatInKg: _toFixNumber(milkFatInKg, 2),
            fatPercentage: _toFixNumber(milkFatPercentage, 2),
            proteinInKg: _toFixNumber(milkProteinInKg, 2),
            proteinPercentage: _toFixNumber(milkProteinPercentage, 2),
            nitrogenInKg: _toFixNumber(nitrogenInKg, 2),
            nitrogenPercentage: _toFixNumber(nitrogenPercentage, 2),
            phosphorusInKg: _toFixNumber(phosphorusInKg, 2),
            phosphorusPercentage: _toFixNumber(phosphorusPercentage, 2),
            potassiumInKg: _toFixNumber(potassiumInKg, 2),
            potassiumPercentage: _toFixNumber(potassiumPercentage, 2),
            sulphurInKg: _toFixNumber(sulphurInKg, 2),
            sulphurPercentage: _toFixNumber(sulphurPercentage, 2)
        };
    }
    function _kgToPercentage(valueInKg, totalInLitre) {
        return valueInKg / totalInLitre * 100;
    }
    function _percentageToKg(valuePercentage, totalInLitre) {
        return valuePercentage * totalInLitre / 100;
    }
    function _toFixNumber(value, decimalPrecision) {
        return parseFloat(value.toFixed(decimalPrecision));
    }
    return MilkSold;
});

angular.module("farmbuild.nutrientCalculator").factory("Validations", function($log) {
    var Validations = {};
    Validations.isNumber = angular.isNumber;
    return Validations;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").run(function(NutrientCalculator) {});

if (typeof window.farmbuild === "undefined") {
    window.farmbuild = {
        nutrientcalculator: {}
    };
} else {
    window.farmbuild.nutrientcalculator = {};
}

angular.injector([ "ng", "farmbuild.nutrientCalculator" ]);