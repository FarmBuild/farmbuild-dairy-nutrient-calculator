"use strict";

angular.module("farmbuild.nutrientCalculator", [ "farmbuild.core", "farmbuild.farmdata" ]).factory("NutrientCalculator", function(MilkSold, GoogleAnalytic, AnimalsPurchased, FarmData) {
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
    NutrientCalculator.animalsPurchased = AnimalsPurchased;
    window.farmbuild.nutrientcalculator = NutrientCalculator;
    return NutrientCalculator;
});

angular.module("farmbuild.nutrientCalculator").constant("animalTypes", {
    heavyAdult: {
        name: "Heavy adult cattle",
        weight: 650
    },
    averageAdult: {
        name: "Average adult cattle",
        weight: 500
    },
    yearling: {
        name: "Yearling",
        weight: 300
    },
    weanedYoungStock: {
        name: "Weaned young stock",
        weight: 120
    },
    bobbyCalves: {
        name: "Bobby calve",
        weight: 40
    }
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("AnimalsPurchased", function(Validations, animalTypes) {
    var AnimalsPurchased = {}, _isPositiveNumber = Validations.isPositiveNumber, _isAlphabet = Validations.isAlphabet, _types = animalTypes;
    AnimalsPurchased.calculate = function(animals) {
        var numberOfAnimals = 0, weight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, nitrogenPercentage = 2.8, phosphorusPercentage = .72, potassiumPercentage = .2, sulphurPercentage = .8, incomings = [], i = 0;
        if (!animals || animals.length === 0) {
            return undefined;
        }
        for (i; i < animals.length; i++) {
            var animalWeight, animalCount, animal = animals[i];
            if (!animal.type || !_types[animal.type]) {
                return undefined;
            }
            animalWeight = _types[animal.type].weight;
            animalCount = animal.numberOfAnimals;
            if (!_isPositiveNumber(animalCount)) {
                return undefined;
            }
            weight += animalWeight * animalCount;
            numberOfAnimals += animalCount;
            nitrogenInKg += nitrogenPercentage * animalWeight * animalCount / 100;
            phosphorusInKg += phosphorusPercentage * animalWeight * animalCount / 100;
            potassiumInKg += potassiumPercentage * animalWeight * animalCount / 100;
            sulphurInKg += sulphurPercentage * animalWeight * animalCount / 100;
            incomings.push({
                name: _types[animal.type].name,
                numberOfAnimals: animalCount,
                weight: _types[animal.type].weight
            });
        }
        return {
            animals: incomings,
            numberOfAnimals: numberOfAnimals,
            weight: weight,
            nitrogenInKg: nitrogenInKg,
            phosphorusInKg: phosphorusInKg,
            potassiumInKg: potassiumInKg,
            sulphurInKg: sulphurInKg
        };
    };
    AnimalsPurchased.addType = function(name, weight) {
        if (!_isPositiveNumber(weight)) {
            return undefined;
        }
        if (!name || !_isAlphabet(name)) {
            return undefined;
        }
        weight = parseFloat(weight);
        _types[name] = {
            name: name,
            weight: weight
        };
        return AnimalsPurchased;
    };
    AnimalsPurchased.types = function() {
        return _types;
    };
    return AnimalsPurchased;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("GoogleAnalytic", function() {
    var exports = {};
    exports.username = "anonymous";
    return exports;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("MilkSold", function(Validations) {
    var MilkSold = {}, _isPositiveNumber = Validations.isPositiveNumber;
    MilkSold.calculateByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
        var milkProteinInKg, milkFatInKg;
        if (!_validateInputs(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage, "%")) {
            return undefined;
        }
        milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
        milkProteinPercentage = parseFloat(milkProteinPercentage);
        milkFatPercentage = parseFloat(milkFatPercentage);
        milkProteinInKg = _percentageToKg(milkProteinPercentage, milkSoldPerYearInLitre);
        milkFatInKg = _percentageToKg(milkFatPercentage, milkSoldPerYearInLitre);
        return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);
    };
    MilkSold.calculateByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
        var milkProteinPercentage, milkFatPercentage;
        if (!_validateInputs(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg, "kg")) {
            return undefined;
        }
        milkSoldPerYearInLitre = parseFloat(milkSoldPerYearInLitre);
        milkProteinInKg = parseFloat(milkProteinInKg);
        milkFatInKg = parseFloat(milkFatInKg);
        milkFatPercentage = _kgToPercentage(milkFatInKg, milkSoldPerYearInLitre);
        milkProteinPercentage = _kgToPercentage(milkProteinInKg, milkSoldPerYearInLitre);
        return _calculate(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg, milkProteinPercentage, milkFatPercentage);
    };
    function _validateInputs(milkSoldPerYearInLitre, milkProtein, milkFat, unit) {
        if (!milkSoldPerYearInLitre || !milkProtein || !milkFat || !unit) {
            return false;
        }
        if (!_isPositiveNumber(milkSoldPerYearInLitre) || !_isPositiveNumber(milkProtein) || !_isPositiveNumber(milkFat)) {
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
            totalPerYearInLitre: milkSoldPerYearInLitre,
            fatInKg: milkFatInKg,
            fatPercentage: milkFatPercentage,
            proteinInKg: milkProteinInKg,
            proteinPercentage: milkProteinPercentage,
            nitrogenInKg: nitrogenInKg,
            nitrogenPercentage: nitrogenPercentage,
            phosphorusInKg: phosphorusInKg,
            phosphorusPercentage: phosphorusPercentage,
            potassiumInKg: potassiumInKg,
            potassiumPercentage: potassiumPercentage,
            sulphurInKg: sulphurInKg,
            sulphurPercentage: sulphurPercentage
        };
    }
    function _kgToPercentage(valueInKg, totalInLitre) {
        return valueInKg / totalInLitre * 100;
    }
    function _percentageToKg(valuePercentage, totalInLitre) {
        return valuePercentage * totalInLitre / 100;
    }
    return MilkSold;
});

angular.module("farmbuild.nutrientCalculator").factory("Validations", function($log) {
    var Validations = {};
    Validations.isPositiveNumber = function(value) {
        return !isNaN(value) && angular.isNumber(value) && isFinite(value) && parseFloat(value) > 0;
    };
    Validations.isAlphabet = function(value) {
        var regex = /^[A-Za-z]+$/gi;
        return regex.test(value);
    };
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