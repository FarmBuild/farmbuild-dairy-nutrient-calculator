'use strict';

$(function(){

	var nc = farmbuild.nutrientcalculator;
	nc.googleAnalytic.username = 'SpatialVision';

	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	$('#calculateByPercentage').submit(function(event){
		var milkSoldPerYearInLitre = $('#milkSoldPerYearInLitreP').val(),
			milkProteinPercentage = $('#milkProteinPercentage').val(),
			milkFatPercentage = $('#milkFatPercentage').val(),
			resultMilkSoldPerYearInLitre = $('#resultMilkSoldPerYearInLitre'),
			resultMilkFatInKg = $('#resultMilkFatInKg'),
			resultMilkFatPercentage = $('#resultMilkFatPercentage'),
			resultMilkProteinInKg = $('#resultMilkProteinInKg'),
			resultMilkProteinPercentage = $('#resultMilkProteinPercentage'),
			resultNitrogenInKg = $('#resultNitrogenInKg'),
			resultNitrogenPercentage = $('#resultNitrogenPercentage'),
			resultPhosphorusInKg = $('#resultPhosphorusInKg'),
			resultPhosphorusPercentage = $('#resultPhosphorusPercentage'),
			resultPotassiumInKg = $('#resultPotassiumInKg'),
			resultPotassiumPercentage = $('#resultPotassiumPercentage'),
			resultSulphurInKg = $('#resultSulphurInKg'),
			resultSulphurPercentage = $('#resultSulphurPercentage'),
			errorMsg = $('#errorMsg'),
			result;

		console.log('calculateByPercentage form Submit > MilkSold.calculateByPercent');

		errorMsg.hide();
		result = nc.milkSold.calculateByPercent(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage);
		if(result) {
			resultMilkSoldPerYearInLitre.text(result.totalPerYearInLitre);
			resultMilkFatInKg.text(result.fatInKg);
			resultMilkFatPercentage.text(result.fatPercentage);
			resultMilkProteinInKg.text(result.proteinInKg);
			resultMilkProteinPercentage.text(result.proteinPercentage);
			resultNitrogenInKg.text(result.nitrogenInKg);
			resultNitrogenPercentage.text(result.nitrogenPercentage);
			resultPhosphorusInKg.text(result.phosphorusInKg);
			resultPhosphorusPercentage.text(result.phosphorusPercentage);
			resultPotassiumInKg.text(result.potassiumInKg);
			resultPotassiumPercentage.text(result.potassiumPercentage);
			resultSulphurInKg.text(result.sulphurInKg);
			resultSulphurPercentage.text(result.sulphurPercentage);
		} else {
			errorMsg.show();
		}
		event.preventDefault();
		return false;
	});

	$('#calculateByKg').submit(function(event){
		var milkSoldPerYearInLitre = $('#milkSoldPerYearInLitreKg').val(),
			milkProteinInKg = $('#milkProteinInKg').val(),
			milkFatInKg = $('#milkFatInKg').val(),
			resultMilkSoldPerYearInLitre = $('#resultMilkSoldPerYearInLitre'),
			resultMilkFatInKg = $('#resultMilkFatInKg'),
			resultMilkFatPercentage = $('#resultMilkFatPercentage'),
			resultMilkProteinInKg = $('#resultMilkProteinInKg'),
			resultMilkProteinPercentage = $('#resultMilkProteinPercentage'),
			resultNitrogenInKg = $('#resultNitrogenInKg'),
			resultNitrogenPercentage = $('#resultNitrogenPercentage'),
			resultPhosphorusInKg = $('#resultPhosphorusInKg'),
			resultPhosphorusPercentage = $('#resultPhosphorusPercentage'),
			resultPotassiumInKg = $('#resultPotassiumInKg'),
			resultPotassiumPercentage = $('#resultPotassiumPercentage'),
			resultSulphurInKg = $('#resultSulphurInKg'),
			resultSulphurPercentage = $('#resultSulphurPercentage'),
			errorMsg = $('#errorMsg'),
			result;

		console.log('calculateByKg form Submit > MilkSold.calculateByKg');

		errorMsg.hide();
		result = nc.milkSold.calculateByKg(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg);
		if(result) {
			resultMilkSoldPerYearInLitre.text(result.totalPerYearInLitre);
			resultMilkFatInKg.text(result.fatInKg);
			resultMilkFatPercentage.text(result.fatPercentage);
			resultMilkProteinInKg.text(result.proteinInKg);
			resultMilkProteinPercentage.text(result.proteinPercentage);
			resultNitrogenInKg.text(result.nitrogenInKg);
			resultNitrogenPercentage.text(result.nitrogenPercentage);
			resultPhosphorusInKg.text(result.phosphorusInKg);
			resultPhosphorusPercentage.text(result.phosphorusPercentage);
			resultPotassiumInKg.text(result.potassiumInKg);
			resultPotassiumPercentage.text(result.potassiumPercentage);
			resultSulphurInKg.text(result.sulphurInKg);
			resultSulphurPercentage.text(result.sulphurPercentage);
		} else {
			errorMsg.show();
		}
		event.preventDefault();
		return false;
	});

});