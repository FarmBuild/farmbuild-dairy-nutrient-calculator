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

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("collections", function(validations, $log) {
    var collections = {}, _isDefined = validations.isDefined, _collections = [];
    function _byProperty(_types, property, value) {}
    function _add(collection, item, index) {
        if (_isDefined(index)) {
            collection.splice(index, 0, item);
        } else {
            collection.push(item);
        }
        return collection;
    }
    function _isEmpty() {
        return _collections.length === 0;
    }
    function _count(collection) {
        if (!angular.isArray(collection)) {
            return -1;
        }
        return collection.length;
    }
    function _toArray() {
        return _collections;
    }
    function _at(collection, index) {
        return collection[index];
    }
    function _removeAt(collection, index) {
        if (!angular.isArray(collection)) {
            return collection;
        }
        if (!index || index < 0 || index > collection.length - 1) {
            return collection;
        }
        collection.splice(index, 1);
        return collection;
    }
    function _remove(forage) {
        $log.info("removing forage type ", forage);
        if (!_isDefined(forage)) {
            return undefined;
        }
        return _collections;
    }
    function _first(collection) {
        return collection[0];
    }
    function _last(collection) {
        var length = _count(collection);
        return collection[length - 1];
    }
    collections = {
        add: _add,
        at: _at,
        size: _count,
        byProperty: _byProperty,
        removeAt: _removeAt,
        remove: _remove,
        first: _first,
        last: _last,
        isEmpty: _isEmpty
    };
    return collections;
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

angular.module("farmbuild.nutrientCalculator").factory("fertilizerCalculator", function(fertilizerValidator, fertilizerDefaults, fertilizerTypes, $log) {
    var fertilizerCalculator = {}, validator = fertilizerValidator;
    function createResult(total) {
        return {
            fertilizers: total.incomings,
            weight: total.weight,
            dryMatterWeight: total.dryMatterWeight,
            nitrogenInKg: total.nitrogenInKg,
            nitrogenPercentage: 0,
            phosphorusInKg: total.phosphorusInKg,
            phosphorusPercentage: 0,
            potassiumInKg: total.potassiumInKg,
            potassiumPercentage: 0,
            sulphurInKg: total.sulphurInKg,
            sulphurPercentage: 0
        };
    }
    function _calculatePercentage(nutrientWeight, totalWeight) {
        return nutrientWeight / totalWeight * 100;
    }
    function _calculatePercentages(total) {
        var result = createResult(total);
        result.nitrogenPercentage = _calculatePercentage(total.nitrogenInKg, total.dryMatterWeight);
        result.phosphorusPercentage = _calculatePercentage(total.phosphorusInKg, total.dryMatterWeight);
        result.potassiumPercentage = _calculatePercentage(total.potassiumInKg, total.dryMatterWeight);
        result.sulphurPercentage = _calculatePercentage(total.sulphurInKg, total.dryMatterWeight);
        return result;
    }
    function _createTotal() {
        return {
            weight: 0,
            dryMatterWeight: 0,
            nitrogenInKg: 0,
            phosphorusInKg: 0,
            potassiumInKg: 0,
            sulphurInKg: 0,
            incomings: []
        };
    }
    function _calculateNutrientWeight(weight, percentage) {
        return weight * percentage / 100;
    }
    function updateTotal(fertilizer, total) {
        var type = fertilizer.type, weight = fertilizer.weight, dryMatterWeight = fertilizer.isDry ? weight : _calculateNutrientWeight(weight, type.dryMatterPercentage);
        total.weight += weight;
        total.dryMatterWeight += dryMatterWeight;
        total.nitrogenInKg += _calculateNutrientWeight(dryMatterWeight, type.nitrogenPercentage);
        total.phosphorusInKg += _calculateNutrientWeight(dryMatterWeight, type.phosphorusPercentage);
        total.potassiumInKg += _calculateNutrientWeight(dryMatterWeight, type.potassiumPercentage);
        total.sulphurInKg += _calculateNutrientWeight(dryMatterWeight, type.sulphurPercentage);
        total.incomings.push({
            type: fertilizer.type,
            weight: fertilizer.weight,
            isDry: fertilizer.isDry
        });
        return total;
    }
    function calculateAll(fertilizers) {
        $log.info("fertilizerCalculator.calculateAll...");
        var i = 0, total = _createTotal();
        for (i; i < fertilizers.length; i++) {
            var fertilizer = fertilizers[i];
            if (!validator.validate(fertilizer)) {
                $log.error("fertilizerCalculator.calculateAll invalid fertilizer at %s: %j", i, fertilizer);
                return undefined;
            }
            total = updateTotal(fertilizer, total);
        }
        return total;
    }
    fertilizerCalculator.calculate = function(fertilizers) {
        var itemsTotal = calculateAll(fertilizers);
        return _calculatePercentages(itemsTotal);
    };
    return fertilizerCalculator;
});

angular.module("farmbuild.nutrientCalculator").constant("fertilizerDefaults", {
    types: [ {
        name: "Dairy manure stockpile",
        nitrogenPercentage: 1.44,
        phosphorusPercentage: .55,
        potassiumPercentage: 1.38,
        sulphurPercentage: .3,
        dryMatterPercentage: 76.83
    }, {
        name: "DAP",
        nitrogenPercentage: 18,
        phosphorusPercentage: 20,
        potassiumPercentage: 0,
        sulphurPercentage: 1.6,
        dryMatterPercentage: 100
    }, {
        name: "Double Super",
        nitrogenPercentage: 0,
        phosphorusPercentage: 16.8,
        potassiumPercentage: 0,
        sulphurPercentage: 4,
        dryMatterPercentage: 100
    }, {
        name: "Effluent solids",
        nitrogenPercentage: 1.65,
        phosphorusPercentage: .3,
        potassiumPercentage: .4,
        sulphurPercentage: .25,
        dryMatterPercentage: 11.3
    }, {
        name: "Fodder Blend",
        nitrogenPercentage: 11.5,
        phosphorusPercentage: 8.1,
        potassiumPercentage: 19.8,
        sulphurPercentage: 5.5,
        dryMatterPercentage: 100
    }, {
        name: "Fodderbooster",
        nitrogenPercentage: 11.6,
        phosphorusPercentage: 7.6,
        potassiumPercentage: 19.6,
        sulphurPercentage: 6,
        dryMatterPercentage: 100
    }, {
        name: "General Compost",
        nitrogenPercentage: 1.2,
        phosphorusPercentage: .8,
        potassiumPercentage: .8,
        sulphurPercentage: .7,
        dryMatterPercentage: 77
    }, {
        name: "Grass Blend",
        nitrogenPercentage: 29.5,
        phosphorusPercentage: 0,
        potassiumPercentage: 0,
        sulphurPercentage: 15.8,
        dryMatterPercentage: 100
    }, {
        name: "Grassbooster",
        nitrogenPercentage: 29.7,
        phosphorusPercentage: 0,
        potassiumPercentage: 0,
        sulphurPercentage: 14.6,
        dryMatterPercentage: 100
    }, {
        name: "Hay Blend",
        nitrogenPercentage: 13.4,
        phosphorusPercentage: 4.5,
        potassiumPercentage: 23.8,
        sulphurPercentage: 4.7,
        dryMatterPercentage: 100
    }, {
        name: "Hayboosta",
        nitrogenPercentage: 11.8,
        phosphorusPercentage: 4.7,
        potassiumPercentage: 23.6,
        sulphurPercentage: 4.6,
        dryMatterPercentage: 100
    }, {
        name: "Legume Gold",
        nitrogenPercentage: 0,
        phosphorusPercentage: 15,
        potassiumPercentage: 0,
        sulphurPercentage: 10,
        dryMatterPercentage: 100
    }, {
        name: "MAP",
        nitrogenPercentage: 10,
        phosphorusPercentage: 21.8,
        potassiumPercentage: 0,
        sulphurPercentage: 1.5,
        dryMatterPercentage: 100
    }, {
        name: "Muriate of Potash",
        nitrogenPercentage: 0,
        phosphorusPercentage: 0,
        potassiumPercentage: 50,
        sulphurPercentage: 0,
        dryMatterPercentage: 100
    }, {
        name: "Pasture Blend",
        nitrogenPercentage: 23.8,
        phosphorusPercentage: 3.6,
        potassiumPercentage: 13,
        sulphurPercentage: 5.3,
        dryMatterPercentage: 100
    }, {
        name: "Pasture Gold",
        nitrogenPercentage: 0,
        phosphorusPercentage: 14,
        potassiumPercentage: 0,
        sulphurPercentage: 17,
        dryMatterPercentage: 100
    }, {
        name: "Potassium Nitate",
        nitrogenPercentage: 13,
        phosphorusPercentage: 0,
        potassiumPercentage: 36.5,
        sulphurPercentage: 0,
        dryMatterPercentage: 100
    }, {
        name: "Poultry Manure (fresh)",
        nitrogenPercentage: 3.9,
        phosphorusPercentage: 1.8,
        potassiumPercentage: 1.9,
        sulphurPercentage: .5,
        dryMatterPercentage: 90
    }, {
        name: "Shed bedding",
        nitrogenPercentage: .21,
        phosphorusPercentage: .06,
        potassiumPercentage: .24,
        sulphurPercentage: .04,
        dryMatterPercentage: 69.05
    }, {
        name: "Sulphate of Ammonia",
        nitrogenPercentage: 20.5,
        phosphorusPercentage: 0,
        potassiumPercentage: 0,
        sulphurPercentage: 23.5,
        dryMatterPercentage: 100
    }, {
        name: "Sulphate of Potash",
        nitrogenPercentage: 0,
        phosphorusPercentage: 0,
        potassiumPercentage: 40.5,
        sulphurPercentage: 17,
        dryMatterPercentage: 100
    }, {
        name: "Superphosphate (Super)",
        nitrogenPercentage: 0,
        phosphorusPercentage: 8.8,
        potassiumPercentage: 0,
        sulphurPercentage: 11,
        dryMatterPercentage: 100
    }, {
        name: "Triple Super",
        nitrogenPercentage: 0,
        phosphorusPercentage: 20.2,
        potassiumPercentage: 0,
        sulphurPercentage: 1,
        dryMatterPercentage: 100
    }, {
        name: "Urea",
        nitrogenPercentage: 46,
        phosphorusPercentage: 0,
        potassiumPercentage: 0,
        sulphurPercentage: 0,
        dryMatterPercentage: 100
    }, {
        name: "Super and Potash 1:1",
        nitrogenPercentage: 0,
        phosphorusPercentage: 4.4,
        potassiumPercentage: 25,
        sulphurPercentage: 5.5,
        dryMatterPercentage: 100
    }, {
        name: "Super and Potash 2:1",
        nitrogenPercentage: 0,
        phosphorusPercentage: 5.9,
        potassiumPercentage: 16.8,
        sulphurPercentage: 7.3,
        dryMatterPercentage: 100
    }, {
        name: "Super and Potash 3:1",
        nitrogenPercentage: 0,
        phosphorusPercentage: 6.6,
        potassiumPercentage: 12.7,
        sulphurPercentage: 8.2,
        dryMatterPercentage: 100
    }, {
        name: "Super and Potash 4:1",
        nitrogenPercentage: 0,
        phosphorusPercentage: 7,
        potassiumPercentage: 10,
        sulphurPercentage: 8.8,
        dryMatterPercentage: 100
    }, {
        name: "Super and Potash 5:1",
        nitrogenPercentage: 0,
        phosphorusPercentage: 7.4,
        potassiumPercentage: 8,
        sulphurPercentage: 9.2,
        dryMatterPercentage: 100
    }, {
        name: "Pasturebooster",
        nitrogenPercentage: 23.8,
        phosphorusPercentage: 3.7,
        potassiumPercentage: 12.8,
        sulphurPercentage: 4,
        dryMatterPercentage: 100
    } ]
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("fertilizerPurchased", function(validations, fertilizerDefaults, fertilizerTypes, fertilizerValidator, fertilizerCalculator, collections, $log) {
    var fertilizerPurchased = {
        types: fertilizerTypes
    }, _fertilizers = [], calculator = fertilizerCalculator, validator = fertilizerValidator;
    fertilizerPurchased.fertilizers = function() {
        return _fertilizers;
    };
    function _create(type, weight, isDry) {
        return {
            type: type,
            weight: weight,
            isDry: isDry
        };
    }
    function _add(type, weight, isDry) {
        var fertilizer = _create(type, weight, isDry);
        $log.info("adding fertilizer ...", fertilizer);
        if (!validator.validate(fertilizer)) {
            return undefined;
        }
        collections.add(_fertilizers, fertilizer);
        return fertilizerPurchased;
    }
    fertilizerPurchased.create = _create;
    fertilizerPurchased.add = _add;
    fertilizerPurchased.calculate = function(fertilizers) {
        $log.info("fertilizerPurchased.calculate...");
        if (!validator.validateAll(fertilizers)) {
            $log.error("fertilizerPurchased.calculate invalid fertilizers, see the error above and fix based on API...");
            return undefined;
        }
        return calculator.calculate(fertilizers);
    };
    return fertilizerPurchased;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("fertilizerTypes", function(collections, validations, fertilizerDefaults, $log) {
    var fertilizerTypes, _isPositiveNumber = validations.isPositiveNumber, _isPositiveNumberOrZero = validations.isPositiveNumberOrZero, _isAlphanumeric = validations.isAlphanumeric, _types = angular.copy(fertilizerDefaults.types);
    function _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
        return {
            name: name,
            dryMatterPercentage: dryMatterPercentage,
            sulphurPercentage: sulphurPercentage,
            potassiumPercentage: potassiumPercentage,
            phosphorusPercentage: phosphorusPercentage,
            nitrogenPercentage: nitrogenPercentage
        };
    }
    function _validate(type) {
        $log.info("validating type  ...", type);
        var valid = !(!_isAlphanumeric(type.name) || !_isPositiveNumber(type.dryMatterPercentage) || !_isPositiveNumberOrZero(type.potassiumPercentage) || !_isPositiveNumberOrZero(type.phosphorusPercentage) || !_isPositiveNumberOrZero(type.nitrogenPercentage) || !_isPositiveNumberOrZero(type.sulphurPercentage));
        if (!valid) {
            $log.error("invalid type: %j", type);
        }
        return valid;
    }
    function _add(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {
        var type = _create(name, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
        $log.info("adding fertilizer type ...", type);
        if (!_validate(type)) {
            return undefined;
        }
        return collections.add(_types, type, index);
    }
    fertilizerTypes = {
        add: _add,
        at: function(index) {
            return collections.at(_types, index);
        },
        size: function() {
            return collections.size(_types);
        },
        byName: function(name) {
            return collections.byProperty(_types, "name", name);
        },
        last: function() {
            return collections.last(_types);
        },
        validate: _validate
    };
    return fertilizerTypes;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("fertilizerValidator", function(validations, fertilizerTypes, $log) {
    var fertilizerValidator = {}, _isDefined = validations.isDefined;
    function _validate(fertilizer) {
        $log.info("validating fertilizer...", fertilizer);
        if (!_isDefined(fertilizer.type) || !_isDefined(fertilizer.weight) || !_isDefined(fertilizer.isDry)) {
            $log.error("invalid fertilizer, must have type, weight and isDry: %j", fertilizer);
            return false;
        }
        return fertilizerTypes.validate(fertilizer.type);
    }
    fertilizerValidator.validate = _validate;
    fertilizerValidator.validateAll = function(fertilizers) {
        var i = 0;
        for (i; i < fertilizers.length; i++) {
            var fertilizer = fertilizers[i];
            if (!_validate(fertilizer)) {
                $log.error("validator invalid at %s: %j", i, fertilizer);
                return false;
            }
        }
        return true;
    };
    return fertilizerValidator;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("foragesPurchased", function(validations, references, $log) {
    var forages = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _isDefined = validations.isDefined, _types = angular.copy(references.forageTypes), _forages = [];
    function _validate(forage) {
        $log.info("validating forage ...", forage);
        if (!_isDefined(forage.type) || !_isDefined(forage.weight) || !_isDefined(forage.isDry)) {
            return false;
        }
        return _validateType(forage.type);
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
        var totalWeight = 0, totalDMWeight = 0, nitrogenInKg = 0, phosphorusInKg = 0, potassiumInKg = 0, sulphurInKg = 0, meInKg = 0, incomings = [], i = 0;
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
            meInKg += type.metabolisableEnergyPercentage * dmWeight / 100;
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
            metabolisableEnergyInKg: meInKg,
            metabolisableEnergyPercentage: meInKg / totalDMWeight * 100
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
        $log.info("removing forage type at index " + index);
        if (!index || index < 0 || index > _forages.length - 1) {
            return undefined;
        }
        _forages.splice(index, 1);
        return _forages;
    }
    function _remove(forage) {
        $log.info("removing forage type ", forage);
        if (!_isDefined(forage)) {
            return undefined;
        }
        angular.forEach(_forages, function(item, index) {
            if (angular.equals(item, forage)) {
                _removeTypeByIndex(index);
            }
        });
        return _forages;
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
        removeIndex: _removeIndex,
        remove: _remove,
        first: _first,
        last: _last,
        isEmpty: _isEmpty,
        calculate: _calculate
    };
    function _validateType(forageType) {
        $log.info("validating forageType  ...", forageType);
        return !(!_isAlphanumeric(forageType.name) || !_isPositiveNumber(forageType.metabolisableEnergyPercentage) || !_isPositiveNumber(forageType.dryMatterPercentage) || !_isPositiveNumber(forageType.potassiumPercentage) || !_isPositiveNumber(forageType.phosphorusPercentage) || !_isPositiveNumber(forageType.nitrogenPercentage) || !_isPositiveNumber(forageType.sulphurPercentage));
    }
    function _createType(name, metabolisableEnergyPercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
        return {
            name: name,
            metabolisableEnergyPercentage: metabolisableEnergyPercentage,
            dryMatterPercentage: dryMatterPercentage,
            sulphurPercentage: sulphurPercentage,
            potassiumPercentage: potassiumPercentage,
            phosphorusPercentage: phosphorusPercentage,
            nitrogenPercentage: nitrogenPercentage
        };
    }
    function _addType(name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage, index) {
        var forageType = _createType(name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage);
        $log.info("adding forage type ...", forageType);
        if (!_validateType(forageType)) {
            return undefined;
        }
        if (_isDefined(index)) {
            _types.splice(index, 0, forageType);
        } else {
            _types.push(forageType);
        }
        return forages.types;
    }
    function _getTypeByIndex(index) {
        var forageType;
        $log.info("getting forage type at index: ", index);
        if (!_isDefined(index) || index < 0) {
            return undefined;
        }
        forageType = _types[index];
        return forageType;
    }
    function _getLastType() {
        $log.info("getting last forage type ...");
        var length = _countTypes();
        return _types[length - 1];
    }
    function _getFirstType() {
        $log.info("getting first forage type ...");
        return _types[0];
    }
    function _countTypes() {
        $log.info("counting forage types ...", _types);
        return _types.length;
    }
    function _typesToArray() {
        $log.info("toArray types ...", _types);
        return _types;
    }
    function _removeTypeByIndex(index) {
        $log.info("removing forage type at index " + index);
        if (!index || index < 0 || index > _types.length - 1) {
            return undefined;
        }
        _types.splice(index, 1);
        return _types;
    }
    function _removeType(forageType) {
        $log.info("removing forage type ", forageType);
        if (!_isDefined(forageType)) {
            return undefined;
        }
        angular.forEach(_types, function(item, index) {
            if (angular.equals(item, forageType)) {
                _removeTypeByIndex(index);
            }
        });
        return _types;
    }
    function _isTypesEmpty() {
        $log.info("Is forage types empty?", forages.types.size() === 0);
        return forages.types.size() === 0;
    }
    forages.types = {
        add: _addType,
        at: _getTypeByIndex,
        size: _countTypes,
        toArray: _typesToArray,
        removeIndex: _removeTypeByIndex,
        remove: _removeType,
        first: _getFirstType,
        last: _getLastType,
        isEmpty: _isTypesEmpty
    };
    return forages;
});

"use strict";

angular.module("farmbuild.nutrientCalculator").factory("incomings", function(validations, $log) {
    var incomings = {}, _isPositiveNumber = validations.isPositiveNumber, _isAlphanumeric = validations.isAlphanumeric, _isDefined = validations.isDefined, _fertilizer = [];
    return incomings;
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
    validations.isPositiveNumberOrZero = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;
    };
    validations.isPositiveNumber = function(value) {
        return validations.isPositiveNumberOrZero(value) && parseFloat(value) > 0;
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
        metabolisableEnergyPercentage: 9.75,
        dryMatterPercentage: 44.45,
        sulphurPercentage: .5,
        potassiumPercentage: 2.68,
        phosphorusPercentage: .34,
        nitrogenPercentage: 2.99
    }, {
        name: "Average hay",
        metabolisableEnergyPercentage: 9.39,
        dryMatterPercentage: 85,
        sulphurPercentage: .23,
        potassiumPercentage: 2.29,
        phosphorusPercentage: .38,
        nitrogenPercentage: 2.44
    }, {
        name: "Average silage",
        metabolisableEnergyPercentage: 8.76,
        dryMatterPercentage: 49.01,
        sulphurPercentage: .27,
        potassiumPercentage: 2.35,
        phosphorusPercentage: .34,
        nitrogenPercentage: 2.12
    }, {
        name: "Average straw",
        metabolisableEnergyPercentage: 9.18,
        dryMatterPercentage: 45.1,
        sulphurPercentage: .28,
        potassiumPercentage: 2.7,
        phosphorusPercentage: .4,
        nitrogenPercentage: 2.6
    }, {
        name: "Brassica crop",
        metabolisableEnergyPercentage: 11.32,
        dryMatterPercentage: 25.99,
        sulphurPercentage: .64,
        potassiumPercentage: 2.85,
        phosphorusPercentage: .33,
        nitrogenPercentage: 3.72
    }, {
        name: "Cereal hay",
        metabolisableEnergyPercentage: 8.32,
        dryMatterPercentage: 84.74,
        sulphurPercentage: .17,
        potassiumPercentage: 1.83,
        phosphorusPercentage: .22,
        nitrogenPercentage: 1.54
    }, {
        name: "Canola silage",
        metabolisableEnergyPercentage: 9.45,
        dryMatterPercentage: 23.77,
        sulphurPercentage: .51,
        potassiumPercentage: 2.88,
        phosphorusPercentage: .3,
        nitrogenPercentage: 2.75
    }, {
        name: "Cereal hay",
        metabolisableEnergyPercentage: 8.32,
        dryMatterPercentage: 84.74,
        sulphurPercentage: .17,
        potassiumPercentage: 1.83,
        phosphorusPercentage: .22,
        nitrogenPercentage: 1.54
    }, {
        name: "Cereal silage",
        metabolisableEnergyPercentage: 9.14,
        dryMatterPercentage: 36.28,
        sulphurPercentage: .17,
        potassiumPercentage: 2.02,
        phosphorusPercentage: .35,
        nitrogenPercentage: 2.02
    }, "Cereal straw", "Clover hay", "Forage blend", "Kikuyu pasture", "Kikuyu silage", "Lucerne hay", "Lucerne pasture", "Lucerne silage", "Maize silage", "Millett crop", "Oat Hay", "Oats & peas silage", "Paspalum silage", "Pasture hay", "Pasture silage", "Prairie grass silage", "Ryegrass pasture", "Seteria silage", "Sorghum crop", "Sorghum hay", "Sorghum/millet hay", "Sorghum/millet silage", "Turnip crop" ]
});

"use strict";

angular.module("farmbuild.nutrientCalculator").run(function(nutrientCalculator) {});

angular.injector([ "ng", "farmbuild.nutrientCalculator" ]);