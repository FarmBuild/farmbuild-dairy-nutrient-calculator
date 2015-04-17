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

		console.log('calculateByPercentage form Submit > MilkSold.nutrientOfMilkSoldByPercent');

		errorMsg.hide();
		result = nc.milkSold.nutrientOfMilkSoldByPercent(milkSoldPerYearInLitre, milkProteinPercentage, milkFatPercentage);
		if(result) {
			resultMilkSoldPerYearInLitre.text(result.milkSoldPerYearInLitre);
			resultMilkFatInKg.text(result.milkFatInKg);
			resultMilkFatPercentage.text(result.milkFatPercentage);
			resultMilkProteinInKg.text(result.milkProteinInKg);
			resultMilkProteinPercentage.text(result.milkProteinPercentage);
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

		console.log('calculateByKg form Submit > MilkSold.nutrientOfMilkSoldByKg');

		errorMsg.hide();
		result = nc.milkSold.nutrientOfMilkSoldByKg(milkSoldPerYearInLitre, milkProteinInKg, milkFatInKg);
		if(result) {
			resultMilkSoldPerYearInLitre.text(result.milkSoldPerYearInLitre);
			resultMilkFatInKg.text(result.milkFatInKg);
			resultMilkFatPercentage.text(result.milkFatPercentage);
			resultMilkProteinInKg.text(result.milkProteinInKg);
			resultMilkProteinPercentage.text(result.milkProteinPercentage);
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