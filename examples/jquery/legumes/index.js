'use strict';
$(function(){
	
	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	var errorMsg = $('#errorMsg');	
	errorMsg.hide();		
	var utilisationFactorSel= $("#utilisationFactor");
	var result;
	var noResult = false;
	var legumes = [];
	var utilisationFactors = nc.legumes.utilisationFactors();
	for(var i=0; i<utilisationFactors.length; i++){
		utilisationFactorSel
         .append($("<option></option>")
         .attr("value",utilisationFactors[i].weight)
         .text(utilisationFactors[i].name)); 	
	}
	$("#calculate").click(function () {
		
		var milkSoldPerYearInLitre=$("#milkSoldPerYearInLitre").val(), milkFatInKg = $("#milkFatInKg").val(),
		                             milkProteinInKg = $("#milkProteinInKg").val(), numberOfMilkingCows = $("#numberOfMilkingCows").val(),
		                             numberOfMilkingDays = $("#numberOfMilkingDays").val(), averageCowWeightInKg = $("#averageCowWeightInKg").val(),
		                             forageMetabolisableEnergyInMJ = $("#forageMetabolisableEnergyInMJ").val(), concentrateMetabolisableEnergyInMJ = $("#concentrateMetabolisableEnergyInMJ").val(),
		                             milkingAreaInHa = $("#milkingAreaInHa").val(), utilisationFactor = $("#utilisationFactor :selected").val(),
		                             nitrogenFromFertiliserInKg = $("#nitrogenFromFertiliserInKg").val(), legumePercentage = $("#legumePercentage").val();
		
		 
			result = nc.legumes.calculate(milkSoldPerYearInLitre, milkFatInKg,
				milkProteinInKg, numberOfMilkingCows,
				numberOfMilkingDays, averageCowWeightInKg,
				forageMetabolisableEnergyInMJ, concentrateMetabolisableEnergyInMJ,
				milkingAreaInHa, utilisationFactor,
				nitrogenFromFertiliserInKg, legumePercentage);
		
		
			//saveInSessionStorage($scope.result);
				noResult = !result;
				
			if(noResult==true){
				errorMsg.show();	
			}else{				
				errorMsg.hide();
				var result_milkSoldPerYearInLitre = $("#result_milkSoldPerYearInLitre");
				var result_milkFatInKg = $("#result_milkFatInKg");
				var result_milkProteinInKg = $("#result_milkProteinInKg");
				var result_milkEnergyInMJ = $("#result_milkEnergyInMJ");
				var result_milkEnergyNotSoldInMJ = $("#result_milkEnergyNotSoldInMJ");
				var result_importedEnergyConsumedInMJ = $("#result_importedEnergyConsumedInMJ");
				var result_cattleEnergyUsedInMJ = $("#result_cattleEnergyUsedInMJ");
				var result_dryMatterConsumedPerHaInKg = $("#result_dryMatterConsumedPerHaInKg");
				var result_dryMatterGrownPerHaInKg = $("#result_dryMatterGrownPerHaInKg");
				var result_utilisationFactor = $("#result_utilisationFactor");
				var result_averageNitrogenAppliedPerHaInKg = $("#result_averageNitrogenAppliedPerHaInKg");
				var result_availableNitrogenFromLegumesPerHaInKg = $("#result_availableNitrogenFromLegumesPerHaInKg");
				var result_availableNitrogenToPasturePerHaInKg = $("#result_availableNitrogenToPasturePerHaInKg");
				var result_legumePerHaInKg = $("#result_legumePerHaInKg");
				var result_legumePercentage = $("#result_legumePercentage");
				
				result_milkSoldPerYearInLitre.text(parseFloat(result.milkSoldPerYearInLitre).toFixed(decimalPrecision));		
				result_milkFatInKg.text(parseFloat(result.milkFatInKg).toFixed(decimalPrecision));		
				result_milkProteinInKg.text(parseFloat(result.milkProteinInKg).toFixed(decimalPrecision));
				result_milkEnergyInMJ.text(parseFloat(result.milkEnergyInMJ).toFixed(decimalPrecision));		
				result_milkEnergyNotSoldInMJ.text(parseFloat(result.milkEnergyNotSoldInMJ).toFixed(decimalPrecision));		
				result_importedEnergyConsumedInMJ.text(parseFloat(result.importedEnergyConsumedInMJ).toFixed(decimalPrecision));		
				result_cattleEnergyUsedInMJ.text(parseFloat(result.cattleEnergyUsedInMJ).toFixed(decimalPrecision));		
				result_dryMatterConsumedPerHaInKg.text(parseFloat(result.dryMatterConsumedPerHaInKg).toFixed(decimalPrecision));		
				result_dryMatterGrownPerHaInKg.text(parseFloat(result.dryMatterGrownPerHaInKg).toFixed(decimalPrecision));		
				result_utilisationFactor.text(result.utilisationFactor);		
				result_averageNitrogenAppliedPerHaInKg.text(parseFloat(result.averageNitrogenAppliedPerHaInKg).toFixed(decimalPrecision));		
				result_availableNitrogenFromLegumesPerHaInKg.text(parseFloat(result.availableNitrogenFromLegumesPerHaInKg).toFixed(decimalPrecision));		
				result_availableNitrogenToPasturePerHaInKg.text(parseFloat(result.availableNitrogenToPasturePerHaInKg).toFixed(decimalPrecision));		
				result_legumePerHaInKg.text(parseFloat(result.legumePerHaInKg).toFixed(decimalPrecision));		
				result_legumePercentage.text(parseFloat(result.legumePercentage).toFixed(decimalPrecision));					
			}	

			
		});

	});