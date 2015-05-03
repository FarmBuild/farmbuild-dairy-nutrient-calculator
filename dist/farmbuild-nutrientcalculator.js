"use strict";

angular.module("farmbuild.nutrientCalculator", [ "farmbuild.core", "farmbuild.farmdata" ]).factory("nutrientCalculator", function(milkSold, cowsPurchased, cowsCulled, foragesPurchased, FarmData, $log) {
    var nutrientCalculator = {};
    $log.info("Welcome to Farm Dairy Nutrient Calculator ...");
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
    nutrientCalculator.foragesPurchased = foragesPurchased;
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

angular.module("farmbuild.nutrientCalculator").constant("cowTypes", [ {
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
} ]);

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("cowsCulled", function(validations, cowTypes) {
    var cowsCulled = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(cowTypes);
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

angular.module("farmbuild.nutrientCalculator").factory("cowsPurchased", function(validations, cowTypes) {
    var cowsPurchased = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(cowTypes);
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

angular.module("farmbuild.nutrientCalculator").constant("forageTypeValues", [ {
    name: "Average crop",
    nitrogenPercentage: "2.99",
    phosphorusPercentage: "0.34",
    potassiumPercentage: "2.68",
    sulphurPercentage: "0.5",
    dryMatterPercentage: "44.45",
    metabolisableEnergyInMJPerKg: "9.75"
}, {
    name: "Average hay",
    nitrogenPercentage: "2.44",
    phosphorusPercentage: "0.38",
    potassiumPercentage: "2.29",
    sulphurPercentage: "0.23",
    dryMatterPercentage: "85",
    metabolisableEnergyInMJPerKg: "9.39"
}, {
    name: "Average silage",
    nitrogenPercentage: "2.12",
    phosphorusPercentage: "0.34",
    potassiumPercentage: "2.35",
    sulphurPercentage: "0.27",
    dryMatterPercentage: "49.01",
    metabolisableEnergyInMJPerKg: "8.76"
}, {
    name: "Average straw",
    nitrogenPercentage: "2.6",
    phosphorusPercentage: "0.4",
    potassiumPercentage: "2.7",
    sulphurPercentage: "0.28",
    dryMatterPercentage: "45.1",
    metabolisableEnergyInMJPerKg: "9.18"
}, {
    name: "Brassica crop",
    nitrogenPercentage: "3.72",
    phosphorusPercentage: "0.33",
    potassiumPercentage: "2.85",
    sulphurPercentage: "0.64",
    dryMatterPercentage: "25.99",
    metabolisableEnergyInMJPerKg: "11.32"
}, {
    name: "Canola hay",
    nitrogenPercentage: "2.88",
    phosphorusPercentage: "0.33",
    potassiumPercentage: "2.29",
    sulphurPercentage: "0.57",
    dryMatterPercentage: "82.93",
    metabolisableEnergyInMJPerKg: "9.06"
}, {
    name: "Canola silage",
    nitrogenPercentage: "2.75",
    phosphorusPercentage: "0.3",
    potassiumPercentage: "2.88",
    sulphurPercentage: "0.51",
    dryMatterPercentage: "23.77",
    metabolisableEnergyInMJPerKg: "9.45"
}, {
    name: "Cereal hay",
    nitrogenPercentage: "1.54",
    phosphorusPercentage: "0.22",
    potassiumPercentage: "1.83",
    sulphurPercentage: "0.17",
    dryMatterPercentage: "84.74",
    metabolisableEnergyInMJPerKg: "8.32"
}, {
    name: "Cereal silage",
    nitrogenPercentage: "2.02",
    phosphorusPercentage: "0.35",
    potassiumPercentage: "2.02",
    sulphurPercentage: "0.17",
    dryMatterPercentage: "36.28",
    metabolisableEnergyInMJPerKg: "9.14"
}, {
    name: "Cereal straw",
    nitrogenPercentage: "0.62",
    phosphorusPercentage: "0.1",
    potassiumPercentage: "1.05",
    sulphurPercentage: "0.1",
    dryMatterPercentage: "87.22",
    metabolisableEnergyInMJPerKg: "5.99"
}, {
    name: "Clover hay",
    nitrogenPercentage: "2.99",
    phosphorusPercentage: "0.28",
    potassiumPercentage: "2.51",
    sulphurPercentage: "0.25",
    dryMatterPercentage: "88.26",
    metabolisableEnergyInMJPerKg: "9.31"
}, {
    name: "Forage blend",
    nitrogenPercentage: "1.94",
    phosphorusPercentage: "0.38",
    potassiumPercentage: "2.29",
    sulphurPercentage: "0.2",
    dryMatterPercentage: "84.18",
    metabolisableEnergyInMJPerKg: "8.47"
}, {
    name: "Kikuyu pasture",
    nitrogenPercentage: "3.07",
    phosphorusPercentage: "0.46",
    potassiumPercentage: "2.82",
    sulphurPercentage: "0.23",
    dryMatterPercentage: "20.67",
    metabolisableEnergyInMJPerKg: "9.57"
}, {
    name: "Kikuyu silage",
    nitrogenPercentage: "1.7",
    phosphorusPercentage: "0.39",
    potassiumPercentage: "1.85",
    sulphurPercentage: "0.13",
    dryMatterPercentage: "57.95",
    metabolisableEnergyInMJPerKg: "10.16"
}, {
    name: "Lucerne hay",
    nitrogenPercentage: "3.34",
    phosphorusPercentage: "0.38",
    potassiumPercentage: "2.03",
    sulphurPercentage: "0.29",
    dryMatterPercentage: "83.23",
    metabolisableEnergyInMJPerKg: "9.54"
}, {
    name: "Lucerne pasture",
    nitrogenPercentage: "3.53",
    phosphorusPercentage: "0.41",
    potassiumPercentage: "2.89",
    sulphurPercentage: "0.35",
    dryMatterPercentage: "23.34",
    metabolisableEnergyInMJPerKg: "10.22"
}, {
    name: "Lucerne silage",
    nitrogenPercentage: "2.64",
    phosphorusPercentage: "0.45",
    potassiumPercentage: "2.29",
    sulphurPercentage: "0.23",
    dryMatterPercentage: "53.54",
    metabolisableEnergyInMJPerKg: "8.75"
}, {
    name: "Maize silage",
    nitrogenPercentage: "1.2",
    phosphorusPercentage: "0.26",
    potassiumPercentage: "1.12",
    sulphurPercentage: "0.1",
    dryMatterPercentage: "41.27",
    metabolisableEnergyInMJPerKg: "9.12"
}, {
    name: "Millett crop",
    nitrogenPercentage: "2.82",
    phosphorusPercentage: "0.41",
    potassiumPercentage: "3.56",
    sulphurPercentage: "0.41",
    dryMatterPercentage: "52.68",
    metabolisableEnergyInMJPerKg: "9.54"
}, {
    name: "Oat Hay",
    nitrogenPercentage: "1.4",
    phosphorusPercentage: "0.24",
    potassiumPercentage: "1.64",
    sulphurPercentage: "0.15",
    dryMatterPercentage: "87.32",
    metabolisableEnergyInMJPerKg: "8.42"
}, {
    name: "Oats & peas silage",
    nitrogenPercentage: "2.26",
    phosphorusPercentage: "0.39",
    potassiumPercentage: "2.43",
    sulphurPercentage: "0.2",
    dryMatterPercentage: "47.5",
    metabolisableEnergyInMJPerKg: "9.16"
}, {
    name: "Paspalum silage",
    nitrogenPercentage: "1.91",
    phosphorusPercentage: "0.32",
    potassiumPercentage: "2.06",
    sulphurPercentage: "0.18",
    dryMatterPercentage: "52.39",
    metabolisableEnergyInMJPerKg: "8.21"
}, {
    name: "Pasture hay",
    nitrogenPercentage: "1.87",
    phosphorusPercentage: "0.28",
    potassiumPercentage: "1.87",
    sulphurPercentage: "0.24",
    dryMatterPercentage: "85.53",
    metabolisableEnergyInMJPerKg: "8.17"
}, {
    name: "Pasture silage",
    nitrogenPercentage: "2.6",
    phosphorusPercentage: "0.4",
    potassiumPercentage: "2.7",
    sulphurPercentage: "0.28",
    dryMatterPercentage: "45.1",
    metabolisableEnergyInMJPerKg: "9.18"
}, {
    name: "Prairie grass silage",
    nitrogenPercentage: "1.9",
    phosphorusPercentage: "0.19",
    potassiumPercentage: "1.3",
    sulphurPercentage: "0.14",
    dryMatterPercentage: "64.37",
    metabolisableEnergyInMJPerKg: "8.51"
}, {
    name: "Ryegrass pasture",
    nitrogenPercentage: "3.61",
    phosphorusPercentage: "0.45",
    potassiumPercentage: "2.78",
    sulphurPercentage: "0.34",
    dryMatterPercentage: "20.82",
    metabolisableEnergyInMJPerKg: "10.46"
}, {
    name: "Seteria silage",
    nitrogenPercentage: "1.91",
    phosphorusPercentage: "0.27",
    potassiumPercentage: "2.08",
    sulphurPercentage: "0.12",
    dryMatterPercentage: "31.98",
    metabolisableEnergyInMJPerKg: "8.04"
}, {
    name: "Sorghum crop",
    nitrogenPercentage: "2.2",
    phosphorusPercentage: "0.39",
    potassiumPercentage: "2.5",
    sulphurPercentage: "0.14",
    dryMatterPercentage: "30.16",
    metabolisableEnergyInMJPerKg: "8.59"
}, {
    name: "Sorghum hay",
    nitrogenPercentage: "1.87",
    phosphorusPercentage: "0.34",
    potassiumPercentage: "2",
    sulphurPercentage: "0.13",
    dryMatterPercentage: "88.05",
    metabolisableEnergyInMJPerKg: "7.6"
}, {
    name: "Sorghum/millet hay",
    nitrogenPercentage: "1.86",
    phosphorusPercentage: "0.41",
    potassiumPercentage: "1.72",
    sulphurPercentage: "0.38",
    dryMatterPercentage: "79.1",
    metabolisableEnergyInMJPerKg: "8.46"
}, {
    name: "Sorghum/millet silage",
    nitrogenPercentage: "1.3",
    phosphorusPercentage: "0.35",
    potassiumPercentage: "3.36",
    sulphurPercentage: "0.4",
    dryMatterPercentage: "33.91",
    metabolisableEnergyInMJPerKg: "7.53"
}, {
    name: "Turnip crop",
    nitrogenPercentage: "2.03",
    phosphorusPercentage: "0.28",
    potassiumPercentage: "3.18",
    sulphurPercentage: "0.52",
    dryMatterPercentage: "11.06",
    metabolisableEnergyInMJPerKg: "11.1"
} ]);

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("foragesPurchased", function(validations, forageTypes, $log) {
    var forages = {}, _isDefined = validations.isDefined, _forages = [];
    function _validate(forage) {
        $log.info("validating forage ...", forage);
        if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
            return false;
        }
        return forageTypes.validate(forage.type);
    }
    function _create(type, weight, isDry) {
        return {
            type: type,
            weight: weight,
            isDry: isDry
        };
    }
    function _add(type, weight, isDry) {
        var forage = _create(type, weight, isDry);
        _forages.push(forage);
        return forages;
    }
    function _calculate(forages) {
        $log.info("calculating forages nutrient ...", forages);
        var totalWeight = 0, totalDMWeight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, meInMJ = 0, incomings = [], i = 0;
        if (!forages || forages.length === 0) {
            return undefined;
        }
        for (i; i < forages.length; i++) {
            var weight = 0, dmWeight = 0, forage = forages[i], type = forage.type;
            if (!_validate(forage)) {
                return undefined;
            }
            weight = forage.weight;
            dmWeight = weight;
            if (!forage.isDry) {
                dmWeight = weight * forage.type.dryMatterPercentage / 100;
            }
            totalWeight += weight;
            totalDMWeight += dmWeight;
            nitrogenInKg += type.nitrogenPercentage * dmWeight / 100;
            phosphorusInKg += type.phosphorusPercentage * dmWeight / 100;
            potassiumInKg += type.potassiumPercentage * dmWeight / 100;
            sulphurInKg += type.sulphurPercentage * dmWeight / 100;
            meInMJ += type.metabolisableEnergyInMJPerKg * dmWeight;
            incomings.push({
                type: forage.type,
                weight: forage.weight,
                isDry: forage.isDry
            });
        }
        return {
            forages: incomings,
            weight: totalWeight,
            dryMatterWeight: totalDMWeight,
            nitrogenInKg: nitrogenInKg,
            nitrogenPercentage: nitrogenInKg / totalDMWeight * 100,
            phosphorusInKg: phosphorusInKg,
            phosphorusPercentage: phosphorusInKg / totalDMWeight * 100,
            potassiumInKg: potassiumInKg,
            potassiumPercentage: potassiumInKg / totalDMWeight * 100,
            sulphurInKg: sulphurInKg,
            sulphurPercentage: sulphurInKg / totalDMWeight * 100,
            metabolisableEnergyInMJ: meInMJ,
            metabolisableEnergyInMJPerKg: parseFloat(type.metabolisableEnergyInMJPerKg)
        };
    }
    function _isEmpty() {
        return _forages.length === 0;
    }
    function _count() {
        return _forages.length;
    }
    function _toArray() {
        return _forages;
    }
    function _at(index) {
        return _forages[index];
    }
    function _removeIndex(index) {
        $log.info("removing forage at index " + index);
        if (!_isDefined(index) || index < 0 || index > _forages.length - 1) {
            return forages;
        }
        _forages.splice(index, 1);
        return forages;
    }
    function _remove(forage) {
        $log.info("removing forage ", forage);
        if (!_isDefined(forage)) {
            return forages;
        }
        angular.forEach(_forages, function(item, index) {
            if (angular.equals(item, forage)) {
                _removeIndex(index);
            }
        });
        return forages;
    }
    function _first() {
        return _forages[0];
    }
    function _last() {
        $log.info("getting last forage ...");
        var length = _count();
        return _forages[length - 1];
    }
    forages = {
        add: _add,
        at: _at,
        size: _count,
        toArray: _toArray,
        removeAt: _removeIndex,
        remove: _remove,
        first: _first,
        last: _last,
        isEmpty: _isEmpty,
        calculate: _calculate,
        types: forageTypes
    };
    return forages;
});

angular.module("farmbuild.nutrientCalculator").factory("forageTypes", function(validations, forageTypeValues, $log) {
    var _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _isDefined = validations.isDefined, _types = angular.copy(forageTypeValues), forageTypes = {};
    function _validate(type) {
        $log.info("validating type  ...", type);
        return !(!_isAlphanumeric(type.name) || !_isPositiveNumber(type.metabolisableEnergyInMJPerKg) || !_isPositiveNumber(type.dryMatterPercentage) || !_isPositiveNumber(type.potassiumPercentage) || !_isPositiveNumber(type.phosphorusPercentage) || !_isPositiveNumber(type.nitrogenPercentage) || !_isPositiveNumber(type.sulphurPercentage));
    }
    function _create(name, metabolisableEnergyPercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
        return {
            name: name,
            metabolisableEnergyInMJPerKg: metabolisableEnergyPercentage,
            dryMatterPercentage: dryMatterPercentage,
            sulphurPercentage: sulphurPercentage,
            potassiumPercentage: potassiumPercentage,
            phosphorusPercentage: phosphorusPercentage,
            nitrogenPercentage: nitrogenPercentage
        };
    }
    function _addType(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {
        var type = _create(name, metabolisableEnergyInMJPerKg, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
        $log.info("adding forage type ...", type);
        if (!_validate(type)) {
            return undefined;
        }
        if (_isDefined(index)) {
            _types.splice(index, 0, type);
        } else {
            _types.push(type);
        }
        return forageTypes;
    }
    function _at(index) {
        var type;
        $log.info("getting forage type at index: ", index);
        if (!_isDefined(index) || index < 0) {
            return undefined;
        }
        return _types[index];
    }
    function _last() {
        $log.info("getting last forage type ...");
        var length = _count();
        return _types[length - 1];
    }
    function _first() {
        $log.info("getting first forage type ...");
        return _types[0];
    }
    function _count() {
        $log.info("counting forage types ...", _types);
        return _types.length;
    }
    function _toArray() {
        $log.info("toArray types ...", _types);
        return _types;
    }
    function _removeAt(index) {
        $log.info("removing forage type at index " + index);
        if (!_isDefined(index) || index < 0 || index > _types.length - 1) {
            return forageTypes;
        }
        _types.splice(index, 1);
        return forageTypes;
    }
    function _remove(type) {
        $log.info("removing forage type ", type);
        if (!_isDefined(type)) {
            return forageTypes;
        }
        angular.forEach(_types, function(item, index) {
            if (angular.equals(item, type)) {
                _removeAt(index);
            }
        });
        return forageTypes;
    }
    function _isEmpty() {
        $log.info("Is forage types empty?", types.types.size() === 0);
        return forageTypes.size() === 0;
    }
    forageTypes = {
        add: _addType,
        at: _at,
        size: _count,
        toArray: _toArray,
        removeAt: _removeAt,
        remove: _remove,
        first: _first,
        last: _last,
        isEmpty: _isEmpty,
        validate: _validate
    };
    return forageTypes;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("legume", function(validations, $log) {
    var legume = {}, _isDefined = validations.isDefined, milk_sold_total, milk_fat_kg, milk_prot_kg, forage_ME_total, conc_ME_total, pasture_utilisation, Legume_pc;
    function _validate(forage) {
        $log.info("validating forage ...", forage);
        if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
            return false;
        }
        return true;
    }
    function _create(type, weight, isDry) {
        return {
            type: type,
            weight: weight,
            isDry: isDry
        };
    }
    function _calculate(forages) {
        $log.info("calculating forages nutrient ...", forages);
        var totalWeight = 0, totalDMWeight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, meInMJ = 0, incomings = [], i = 0;
        if (!forages || forages.length === 0) {
            return undefined;
        }
        for (i; i < forages.length; i++) {
            var weight = 0, dmWeight = 0, forage = forages[i], type = forage.type;
            if (!_validate(forage)) {
                return undefined;
            }
            weight = forage.weight;
            dmWeight = weight;
            if (!forage.isDry) {
                dmWeight = weight * forage.type.dryMatterPercentage / 100;
            }
            totalWeight += weight;
            totalDMWeight += dmWeight;
            nitrogenInKg += type.nitrogenPercentage * dmWeight / 100;
            phosphorusInKg += type.phosphorusPercentage * dmWeight / 100;
            potassiumInKg += type.potassiumPercentage * dmWeight / 100;
            sulphurInKg += type.sulphurPercentage * dmWeight / 100;
            meInMJ += type.metabolisableEnergyInMJPerKg * dmWeight;
            incomings.push({
                type: forage.type,
                weight: forage.weight,
                isDry: forage.isDry
            });
        }
        return {
            forages: incomings,
            weight: totalWeight,
            dryMatterWeight: totalDMWeight,
            nitrogenInKg: nitrogenInKg,
            nitrogenPercentage: nitrogenInKg / totalDMWeight * 100,
            phosphorusInKg: phosphorusInKg,
            phosphorusPercentage: phosphorusInKg / totalDMWeight * 100,
            potassiumInKg: potassiumInKg,
            potassiumPercentage: potassiumInKg / totalDMWeight * 100,
            sulphurInKg: sulphurInKg,
            sulphurPercentage: sulphurInKg / totalDMWeight * 100,
            metabolisableEnergyInMJ: meInMJ,
            metabolisableEnergyInMJPerKg: parseFloat(type.metabolisableEnergyInMJPerKg)
        };
    }
    legume = {
        calculate: _calculate
    };
    return legume;
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
    validations.isDefined = angular.isDefined;
    return validations;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").run(function(nutrientCalculator) {});

angular.injector([ "ng", "farmbuild.nutrientCalculator" ]);