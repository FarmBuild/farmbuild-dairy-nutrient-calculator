"use strict";

angular.module("farmbuild.nutrientCalculator", [ "farmbuild.core", "farmbuild.farmdata" ]).factory("nutrientCalculator", function(milkSold, cowsPurchased, cowsCulled, FarmData) {
    var nutrientCalculator = {};
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
    window.farmbuild.nutrientcalculator = nutrientCalculator;
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

function Calculate_Forage_Nutrient_(section) {
    var i = 0;
    var forage_purchased_total = 0;
    var forage_amount_total = 0;
    var avgNPC, avgPPC, avgKPC, avgSPC;
    var totalNKg, totalPKg, totalKKg, totalSKg, totalMEKg;
    avgNPC = avgPPC = avgKPC = avgSPC = totalNKg = totalPKg = totalKKg = totalSKg = totalMEKg = 0;
    var forageNKg, foragePKg, forageKKg, forageSKg, forageMEKg;
    var forageNPC, foragePPC, forageKPC, forageSPC, forageME;
    var forage_amount;
    var forage_purchased;
    var forageDMPC;
    var count = 0;
    if (section.substr(0, "forage".length) == "forage") feedtype = "forage"; else if (section.substr(0, "conc".length) == "conc") feedtype = "conc"; else if (section.substr(0, "fert".length) == "fert") feedtype = "fert"; else alert("Wrong type");
    try {
        for (i = 1; i <= 9; i++) {
            forage_purchased = document.getElementById(feedtype + "_purchased" + i).value;
            forage_amount = document.getElementById(feedtype + "_amount" + i).value;
            if (i > 4) forage_amount += "1000";
            forageNPC = document.getElementById(feedtype + "NPC" + i).value;
            foragePPC = document.getElementById(feedtype + "PPC" + i).value;
            forageKPC = document.getElementById(feedtype + "KPC" + i).value;
            forageSPC = document.getElementById(feedtype + "SPC" + i).value;
            if (forage_purchased.length > 0 && forage_amount.length > 0 && forageNPC.length > 0 && foragePPC.length > 0 && forageKPC.length > 0 && forageSPC.length > 0) {
                forage_purchased_total += parseFloat(forage_purchased);
                if (i > 4) {
                    var ind = i - 4;
                    forageDMPC = parseFloat(document.getElementById(feedtype + "DMPC" + ind).value);
                    forage_amount = forage_purchased * forageDMPC / 100;
                    document.getElementById(feedtype + "_amount" + i).value = forage_amount;
                }
                forage_amount_total += parseFloat(forage_amount);
                avgNPC += parseFloat(forageNPC);
                avgPPC += parseFloat(foragePPC);
                avgKPC += parseFloat(forageKPC);
                avgSPC += parseFloat(forageSPC);
                totalNKg += forageNKg = forage_amount * forageNPC * 10;
                totalPKg += foragePKg = forage_amount * foragePPC * 10;
                totalKKg += forageKKg = forage_amount * forageKPC * 10;
                totalSKg += forageSKg = forage_amount * forageSPC * 10;
                if (feedtype != "fert") {
                    forageME = parseFloat(document.getElementById(feedtype + "ME" + i).value);
                    totalMEKg += forageMEKg = forage_amount * forageME * 1e3;
                }
                document.getElementById(feedtype + "NKg" + i).value = forageNKg.toFixed(0);
                document.getElementById(feedtype + "PKg" + i).value = foragePKg.toFixed(0);
                document.getElementById(feedtype + "KKg" + i).value = forageKKg.toFixed(0);
                document.getElementById(feedtype + "SKg" + i).value = forageSKg.toFixed(0);
                if (feedtype != "fert") document.getElementById(feedtype + "MEKg" + i).value = forageMEKg.toFixed(0);
                count++;
            }
        }
        avgNPC /= count;
        avgKPC /= count;
        avgPPC /= count;
        avgSPC /= count;
        document.getElementById(feedtype + "_purchased_total").value = forage_purchased_total.toFixed(2);
        document.getElementById(feedtype + "_amount_total").value = forage_amount_total.toFixed(2);
        document.getElementById(feedtype + "NPCavg").value = avgNPC.toFixed(2);
        document.getElementById(feedtype + "KPCavg").value = avgKPC.toFixed(2);
        document.getElementById(feedtype + "PPCavg").value = avgPPC.toFixed(2);
        document.getElementById(feedtype + "SPCavg").value = avgSPC.toFixed(2);
        document.getElementById(feedtype + "NKg_total").value = totalNKg.toFixed(0);
        document.getElementById(feedtype + "KKg_total").value = totalKKg.toFixed(0);
        document.getElementById(feedtype + "PKg_total").value = totalPKg.toFixed(0);
        document.getElementById(feedtype + "SKg_total").value = totalSKg.toFixed(0);
        if (feedtype != "fert") document.getElementById(feedtype + "MEKg_total").value = totalMEKg.toFixed(0);
    } catch (err) {
        alert(err.message);
    }
}

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
    } ]
});

"use strict";

angular.module("farmbuild.nutrientCalculator").run(function(nutrientCalculator) {});

if (typeof window.farmbuild === "undefined") {
    window.farmbuild = {
        nutrientcalculator: {}
    };
} else {
    window.farmbuild.nutrientcalculator = {};
}

angular.injector([ "ng", "farmbuild.nutrientCalculator" ]);