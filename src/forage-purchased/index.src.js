/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/foragesPurchased singleton
 * @module nutrientCalculator/foragesPurchased
 */
angular.module('farmbuild.nutrientCalculator')

	.factory('foragesPurchased', function (validations, references) {

		var foragesPurchased = {},
			_isPositiveNumber = validations.isPositiveNumber,
			_isAlphanumeric = validations.isAlphanumeric,
			_types = angular.copy(references.forageTypes);

		/**
		 * Calculates total nutrient imported on to the farm in forages
		 * @method calculate
		 * @param {!array} forages - Array of purchased forages, each item contains details of the forage {type, weight, isDry}
		 * @returns {object} nutrient data of forages purchased
		 * @public
		 * @static
		 */
		foragesPurchased.calculate = function (forages) {
      var totalDryAmountWeight = 832.3, i = 0;

      for (i; i < forages.length; i++) {
        var weight,
          forage = forages[i],
          isDry;
        if(!angular.isDefined(forage.weight) ||
          !_isPositiveNumber(forage.weight)) {
          return undefined;
        }

      }

			return {
        dryAmountPurchased: totalDryAmountWeight
			};

		};
		
		/**
		 * Adds a new forage type for nutrient calculation
		 * @method addType
		 * @param {!string} name - name of new type, can only contain alphanumeric values with space or underscore but no other special characters
		 * @param {!number} mePercentage - value must be > 0
		 * @param {!number} dryMatterPercentage - value must be > 0
		 * @param {!number} sulphurPercentage - value must be > 0
		 * @param {!number} potassiumPercentage - value must be > 0
		 * @param {!number} phosphorusPercentage - value must be > 0
		 * @param {!number} nitrogenPercentage - value must be > 0
		 * @returns {object} foragesPurchased - useful for chaining multiple add()
		 * @public
		 * @static
		 */
		foragesPurchased.addType = function (name, mePercentage, dryMatterPercentage, sulphurPercentage, potassiumPercentage, phosphorusPercentage, nitrogenPercentage) {
			if (!_isPositiveNumber(mePercentage) ||
				!_isPositiveNumber(dryMatterPercentage) ||
				!_isPositiveNumber(sulphurPercentage) ||
				!_isPositiveNumber(potassiumPercentage) ||
				!_isPositiveNumber(phosphorusPercentage) ||
				!_isPositiveNumber(nitrogenPercentage)) {
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


		/**
		 * Returns current cow types
		 * @method types
		 * @returns {object} Types - cow types array
		 * @public
		 * @static
		 */
		foragesPurchased.types = function () {
			return _types;
		};

		return foragesPurchased;
	});

//function Calculate_Forage_Nutrient_(section) {
//	var i = 0;
//	var forage_purchased_total = 0.0;
//	var forage_amount_total = 0.0;
//	var avgNPC, avgPPC, avgKPC, avgSPC;
//	var totalNKg, totalPKg, totalKKg, totalSKg, totalMEKg;
//	avgNPC = avgPPC = avgKPC = avgSPC = totalNKg = totalPKg = totalKKg = totalSKg = totalMEKg = 0.0;
//	var forageNKg, foragePKg, forageKKg, forageSKg, forageMEKg;
//	var forageNPC, foragePPC, forageKPC, forageSPC, forageME;
//	var forage_amount;
//	var forage_purchased;
//	var forageDMPC;
//	var count = 0;
//	if (section.substr(0, "forage".length) == "forage")feedtype = "forage";
//	else if (section.substr(0, "conc".length) == "conc") feedtype = "conc";
//	else if (section.substr(0, "fert".length) == "fert") feedtype = "fert";
//	else alert("Wrong type");
//
//
//	try {
//		for (i = 1; i <= 9; i++) { //number of rows is four at this moment
//
//			forage_purchased = document.getElementById(feedtype + "_purchased" + i).value;
//
//			forage_amount = document.getElementById(feedtype + "_amount" + i).value;
//			if (i > 4) forage_amount += "1000";
//			forageNPC = document.getElementById(feedtype + "NPC" + i).value;
//
//			foragePPC = document.getElementById(feedtype + "PPC" + i).value;
//
//			forageKPC = document.getElementById(feedtype + "KPC" + i).value;
//
//			forageSPC = document.getElementById(feedtype + "SPC" + i).value;
//
//			if (forage_purchased.length > 0 && forage_amount.length > 0 && forageNPC.length > 0 && foragePPC.length > 0 && forageKPC.length > 0 && forageSPC.length > 0) {
//				forage_purchased_total += parseFloat(forage_purchased);
//				if (i > 4) {
//					var ind = i - 4;
//					forageDMPC = parseFloat(document.getElementById(feedtype + "DMPC" + ind).value);
//					forage_amount = forage_purchased * forageDMPC / 100;
//					document.getElementById(feedtype + "_amount" + i).value = forage_amount;
//				}
//				forage_amount_total += parseFloat(forage_amount);
//				avgNPC += parseFloat(forageNPC);
//				avgPPC += parseFloat(foragePPC);
//				avgKPC += parseFloat(forageKPC);
//				avgSPC += parseFloat(forageSPC);
//
//				totalNKg += forageNKg = forage_amount * forageNPC * 10;
//				totalPKg += foragePKg = forage_amount * foragePPC * 10;
//				totalKKg += forageKKg = forage_amount * forageKPC * 10;
//				totalSKg += forageSKg = forage_amount * forageSPC * 10;
//				if (feedtype != "fert") {
//					forageME = parseFloat(document.getElementById(feedtype + "ME" + i).value);
//					totalMEKg += forageMEKg = forage_amount * forageME * 1000;
//				}
//				document.getElementById(feedtype + "NKg" + i).value = forageNKg.toFixed(0);
//				document.getElementById(feedtype + "PKg" + i).value = foragePKg.toFixed(0);
//				document.getElementById(feedtype + "KKg" + i).value = forageKKg.toFixed(0);
//				document.getElementById(feedtype + "SKg" + i).value = forageSKg.toFixed(0);
//				if (feedtype != "fert") document.getElementById(feedtype + "MEKg" + i).value = forageMEKg.toFixed(0);
//				count++;
//
//			}
//
//
//		}
//		avgNPC /= count;
//		avgKPC /= count;
//		avgPPC /= count;
//		avgSPC /= count;
//		document.getElementById(feedtype + "_purchased_total").value = forage_purchased_total.toFixed(2);
//		document.getElementById(feedtype + "_amount_total").value = forage_amount_total.toFixed(2);
//
//		document.getElementById(feedtype + "NPCavg").value = avgNPC.toFixed(2);
//		document.getElementById(feedtype + "KPCavg").value = avgKPC.toFixed(2);
//		document.getElementById(feedtype + "PPCavg").value = avgPPC.toFixed(2);
//		document.getElementById(feedtype + "SPCavg").value = avgSPC.toFixed(2);
//
//		document.getElementById(feedtype + "NKg_total").value = totalNKg.toFixed(0);
//		document.getElementById(feedtype + "KKg_total").value = totalKKg.toFixed(0);
//		document.getElementById(feedtype + "PKg_total").value = totalPKg.toFixed(0);
//		document.getElementById(feedtype + "SKg_total").value = totalSKg.toFixed(0);
//		if (feedtype != "fert") document.getElementById(feedtype + "MEKg_total").value = totalMEKg.toFixed(0);
//	} catch (err) {
//		alert(err.message);
//	}
//
//}