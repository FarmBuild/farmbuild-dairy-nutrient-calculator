"use strict";

angular.module("farmbuild.nutrientCalculator", [ "farmbuild.core", "farmbuild.farmdata" ]).factory("nutrientCalculator", function(milkSold, cowsPurchased, cowsCulled, foragePurchased, FarmData, $log) {
    var nutrientCalculator = {};
    $log.info("Welcome to Farm Dairy Nutrient Calculator ...");
    console.log(window.farmbuild.nutrientcalculator);
    nutrientCalculator.load = function(farmData) {
        if (!FarmData.isFarmData(farmData)) {
            return undefined;
        }
        if (!farmData.nutrientCalculator) {
            farmData.nutrientCalculator = {
                milkSold: {},
                cowsCulled: {},
                cowsPurchased: {}
            };
        }
        return farmData;
    };
    nutrientCalculator.milkSold = milkSold;
    nutrientCalculator.cowsPurchased = cowsPurchased;
    nutrientCalculator.cowsCulled = cowsCulled;
    nutrientCalculator.foragePurchased = foragePurchased;
    nutrientCalculator.version = "0.1.0";
    if (typeof window.farmbuild === "undefined") {
        window.farmbuild = {
            nutrientcalculator: nutrientCalculator
        };
    } else {
        window.farmbuild.nutrientcalculator = nutrientCalculator;
    }
    return nutrientCalculator;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("cowsCulled", function(validations, references) {
    var cowsCulled = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(references.cowTypes);
    cowsCulled.calculate = function(cows) {
        var numberOfCows = 0, weight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, nitrogenPercentage = 2.8, phosphorusPercentage = .72, potassiumPercentage = .2, sulphurPercentage = .8, incomings = [], i = 0;
        if (!cows || cows.length === 0) {
            return undefined;
        }
        for (i; i < cows.length; i++) {
            var cowWeight, cowCount, cow = cows[i];
            if (!cow.name || !cow.weight) {
                return undefined;
            }
            cowWeight = cow.weight;
            cowCount = cow.numberOfCows;
            if (!_isPositiveNumber(cowCount)) {
                return undefined;
            }
            weight += cowWeight * cowCount;
            numberOfCows += cowCount;
            nitrogenInKg += nitrogenPercentage * cowWeight * cowCount / 100;
            phosphorusInKg += phosphorusPercentage * cowWeight * cowCount / 100;
            potassiumInKg += potassiumPercentage * cowWeight * cowCount / 100;
            sulphurInKg += sulphurPercentage * cowWeight * cowCount / 100;
            incomings.push({
                name: cow.name,
                numberOfCows: cowCount,
                weight: cow.weight
            });
        }
        return {
            cows: incomings,
            numberOfCows: numberOfCows,
            weight: weight,
            nitrogenInKg: nitrogenInKg,
            phosphorusInKg: phosphorusInKg,
            potassiumInKg: potassiumInKg,
            sulphurInKg: sulphurInKg
        };
    };
    cowsCulled.addType = function(name, weight) {
        if (!_isPositiveNumber(weight)) {
            return undefined;
        }
        if (!name || !_isAlphanumeric(name)) {
            return undefined;
        }
        weight = parseFloat(weight);
        _types.push({
            name: name,
            weight: weight
        });
        return cowsCulled;
    };
    cowsCulled.removeTypeByName = function(name) {
        if (!name) {
            return undefined;
        }
        angular.forEach(_types, function(type, i) {
            if (type.name === name) {
                _types.splice(i, 1);
            }
        });
        return _types;
    };
    cowsCulled.removeTypeByIndex = function(index) {
        if (!index || index < 0 || index > _types.length - 1) {
            return undefined;
        }
        _types.splice(index, 1);
        return _types;
    };
    cowsCulled.types = function() {
        return _types;
    };
    return cowsCulled;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("cowsPurchased", function(validations, references) {
    var cowsPurchased = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(references.cowTypes);
    cowsPurchased.calculate = function(cows) {
        var numberOfCows = 0, weight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, nitrogenPercentage = 2.8, phosphorusPercentage = .72, potassiumPercentage = .2, sulphurPercentage = .8, incomings = [], i = 0;
        if (!cows || cows.length === 0) {
            return undefined;
        }
        for (i; i < cows.length; i++) {
            var cowWeight, cowCount, cow = cows[i];
            if (!cow.name || !cow.weight) {
                return undefined;
            }
            cowWeight = cow.weight;
            cowCount = cow.numberOfCows;
            if (!_isPositiveNumber(cowCount)) {
                return undefined;
            }
            weight += cowWeight * cowCount;
            numberOfCows += cowCount;
            nitrogenInKg += nitrogenPercentage * cowWeight * cowCount / 100;
            phosphorusInKg += phosphorusPercentage * cowWeight * cowCount / 100;
            potassiumInKg += potassiumPercentage * cowWeight * cowCount / 100;
            sulphurInKg += sulphurPercentage * cowWeight * cowCount / 100;
            incomings.push({
                name: cow.name,
                numberOfCows: cowCount,
                weight: cow.weight
            });
        }
        return {
            cows: incomings,
            numberOfCows: numberOfCows,
            weight: weight,
            nitrogenInKg: nitrogenInKg,
            phosphorusInKg: phosphorusInKg,
            potassiumInKg: potassiumInKg,
            sulphurInKg: sulphurInKg
        };
    };
    cowsPurchased.addType = function(name, weight) {
        if (!_isPositiveNumber(weight)) {
            return undefined;
        }
        if (!name || !_isAlphanumeric(name)) {
            return undefined;
        }
        weight = parseFloat(weight);
        _types.push({
            name: name,
            weight: weight
        });
        return cowsPurchased;
    };
    cowsPurchased.removeTypeByName = function(name) {
        if (!name) {
            return undefined;
        }
        angular.forEach(_types, function(type, i) {
            if (type.name === name) {
                _types.splice(i, 1);
            }
        });
        return _types;
    };
    cowsPurchased.removeTypeByIndex = function(index) {
        if (!index || index < 0 || index > _types.length - 1) {
            return undefined;
        }
        _types.splice(index, 1);
        return _types;
    };
    cowsPurchased.types = function() {
        return _types;
    };
    return cowsPurchased;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("foragesPurchased", function(validations, references) {
    var foragesPurchased = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(references.forageTypes);
    foragesPurchased.calculate = function(forages) {
        var totalWeight = 0, totalDMWeight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, meInKg = 0, nitrogenPercentage = 0, phosphorusPercentage = 0, potassiumPercentage = 0, sulphurPercentage = 0, mePercentage = 0, incomings = [], i = 0;
        if (!forages || forages.length === 0) {
            return undefined;
        }
        for (i; i < forages.length; i++) {
            var weight, forage = forages[i], isDry;
            if (!forage.name || !forage.weight) {
                return undefined;
            }
            weight = forage.weight;
            isDry = forage.isDry;
            if (!_isPositiveNumber(weight)) {
                return undefined;
            }
            totalWeight += weight;
            nitrogenInKg += nitrogenPercentage * weight / 100;
            phosphorusInKg += phosphorusPercentage * weight / 100;
            potassiumInKg += potassiumPercentage * weight / 100;
            sulphurInKg += sulphurPercentage * weight / 100;
            incomings.push({
                name: forage.name,
                weight: forage.weight,
                isDry: forage.isDry
            });
        }
        return {
            forages: incomings,
            weight: totalWeight,
            dmWeight: totalDMWeight,
            nitrogenInKg: nitrogenInKg,
            phosphorusInKg: phosphorusInKg,
            phosphorusPercentage: phosphorusPercentage,
            potassiumInKg: potassiumInKg,
            potassiumPercentage: potassiumPercentage,
            sulphurInKg: sulphurInKg,
            sulphurPercentage: sulphurPercentage,
            meInKg: meInKg,
            mePercentage: mePercentage
        };
    };
    foragesPurchased.addType = function(name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
        if (!_isPositiveNumber(mePercentage) || !_isPositiveNumber(dryMatterPercentage) || !_isPositiveNumber(sulphurPercentage) || !_isPositiveNumber(potassiumPercentage) || !_isPositiveNumber(phosphorusPercentage) || !_isPositiveNumber(nitrogenPercentage)) {
            return undefined;
        }
        if (!name || !_isAlphanumeric(name)) {
            return undefined;
        }
        mePercentage = parseFloat(mePercentage);
        dryMatterPercentage = parseFloat(dryMatterPercentage);
        sulphurPercentage = parseFloat(sulphurPercentage);
        potassiumPercentage = parseFloat(potassiumPercentage);
        phosphorusPercentage = parseFloat(phosphorusPercentage);
        nitrogenPercentage = parseFloat(nitrogenPercentage);
        _types.push({
            name: name,
            mePercentage: parseFloat(mePercentage),
            dryMatterPercentage: parseFloat(dryMatterPercentage),
            sulphurPercentage: parseFloat(sulphurPercentage),
            potassiumPercentage: parseFloat(potassiumPercentage),
            phosphorusPercentage: parseFloat(phosphorusPercentage),
            nitrogenPercentage: parseFloat(nitrogenPercentage)
        });
        return foragesPurchased;
    };
    foragesPurchased.types = function() {
        return _types;
    };
    return foragesPurchased;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("milkSold", function(validations) {
    var milkSold = {}, _isPositiveNumber = validations.isPositiveNumber;
    milkSold.calculateByPercent = function(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage) {
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
    milkSold.calculateByKg = function(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg) {
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
    return milkSold;
});

angular.module("farmbuild.nutrientCalculator").factory("validations", function($log) {
    var validations = {};
    validations.isPositiveNumber = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
    };
    validations.isAlphabet = function(value) {
        var regex = /^[A-Za-z]+$/gi;
        return regex.test(value);
    };
    validations.isAlphanumeric = function(value) {
        var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9 _]*$/gi;
        return regex.test(value);
    };
    return validations;
});

angular.module("farmbuild.nutrientCalculator").constant("references", {
    cowTypes: [ {
        name: "Heavy adult cattle",
        weight: 650
    }, {
        name: "Average adult cattle",
        weight: 500
    }, {
        name: "Yearling",
        weight: 300
    }, {
        name: "Weaned young stock",
        weight: 120
    }, {
        name: "Bobby calve",
        weight: 40
    } ],
    forageTypes: [ {
        name: "Average crop",
        mePercentage: 9.75,
        dryMatterPercentage: 44.45,
        sulphurPercentage: .5,
        potassiumPercentage: 2.68,
        phosphorusPercentage: .34,
        nitrogenPercentage: 2.99,
        unknown: 18.68
    }, {
        name: "Average hay",
        mePercentage: 9.39,
        dryMatterPercentage: 85,
        sulphurPercentage: .23,
        potassiumPercentage: 2.29,
        phosphorusPercentage: .38,
        nitrogenPercentage: 2.44,
        unknown: 15.24
    }, {
        name: "Average silage",
        mePercentage: 8.76,
        dryMatterPercentage: 49.01,
        sulphurPercentage: .27,
        potassiumPercentage: 2.35,
        phosphorusPercentage: .34,
        nitrogenPercentage: 2.12,
        unknown: 13.25
    }, {
        name: "Average straw",
        mePercentage: 9.18,
        dryMatterPercentage: 45.1,
        sulphurPercentage: .28,
        potassiumPercentage: 2.7,
        phosphorusPercentage: .4,
        nitrogenPercentage: 2.6,
        unknown: 16.27
    }, {
        name: "Brassica crop",
        mePercentage: 11.32,
        dryMatterPercentage: 25.99,
        sulphurPercentage: .64,
        potassiumPercentage: 2.85,
        phosphorusPercentage: .33,
        nitrogenPercentage: 3.72,
        unknown: 23.25
    }, {
        name: "Cereal hay",
        mePercentage: 8.32,
        dryMatterPercentage: 84.74,
        sulphurPercentage: .17,
        potassiumPercentage: 1.83,
        phosphorusPercentage: .22,
        nitrogenPercentage: 1.54,
        unknown: 18
    }, {
        name: "Canola silage",
        mePercentage: 9.45,
        dryMatterPercentage: 23.77,
        sulphurPercentage: .51,
        potassiumPercentage: 2.88,
        phosphorusPercentage: .3,
        nitrogenPercentage: 2.75,
        unknown: 17.2
    }, {
        name: "Cereal hay",
        mePercentage: 8.32,
        dryMatterPercentage: 84.74,
        sulphurPercentage: .17,
        potassiumPercentage: 1.83,
        phosphorusPercentage: .22,
        nitrogenPercentage: 1.54,
        unknown: 9.6
    }, {
        name: "Cereal silage",
        mePercentage: 9.14,
        dryMatterPercentage: 36.28,
        sulphurPercentage: .17,
        potassiumPercentage: 2.02,
        phosphorusPercentage: .35,
        nitrogenPercentage: 2.02,
        unknown: 12.61
    }, "Cereal straw", "Clover hay", "Forage blend", "Kikuyu pasture", "Kikuyu silage", "Lucerne hay", "Lucerne pasture", "Lucerne silage", "Maize silage", "Millett crop", "Oat Hay", "Oats & peas silage", "Paspalum silage", "Pasture hay", "Pasture silage", "Prairie grass silage", "Ryegrass pasture", "Seteria silage", "Sorghum crop", "Sorghum hay", "Sorghum/millet hay", "Sorghum/millet silage", "Turnip crop" ]
});

"use strict";

angular.module("farmbuild.nutrientCalculator").run(function(nutrientCalculator) {});

angular.injector([ "ng", "farmbuild.nutrientCalculator" ]);