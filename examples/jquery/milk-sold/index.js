'use strict';

$(function(){

	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
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
			resultMilkSoldPerYearInLitre.text(parseFloat(result.totalPerYearInLitre).toFixed(decimalPrecision));
			resultMilkFatInKg.text(parseFloat(result.fatInKg).toFixed(decimalPrecision));
			resultMilkFatPercentage.text(parseFloat(result.fatPercentage).toFixed(decimalPrecision));
			resultMilkProteinInKg.text(parseFloat(result.proteinInKg).toFixed(decimalPrecision));
			resultMilkProteinPercentage.text(parseFloat(result.proteinPercentage).toFixed(decimalPrecision));
			resultNitrogenInKg.text(parseFloat(result.nitrogenInKg).toFixed(decimalPrecision));
			resultNitrogenPercentage.text(parseFloat(result.nitrogenPercentage).toFixed(decimalPrecision));
			resultPhosphorusInKg.text(parseFloat(result.phosphorusInKg).toFixed(decimalPrecision));
			resultPhosphorusPercentage.text(parseFloat(result.phosphorusPercentage).toFixed(decimalPrecision));
			resultPotassiumInKg.text(parseFloat(result.potassiumInKg).toFixed(decimalPrecision));
			resultPotassiumPercentage.text(parseFloat(result.potassiumPercentage).toFixed(decimalPrecision));
			resultSulphurInKg.text(parseFloat(result.sulphurInKg).toFixed(decimalPrecision));
			resultSulphurPercentage.text(parseFloat(result.sulphurPercentage).toFixed(decimalPrecision));
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
			resultMilkSoldPerYearInLitre.text(parseFloat(result.totalPerYearInLitre).toFixed(decimalPrecision));
			resultMilkFatInKg.text(parseFloat(result.fatInKg).toFixed(decimalPrecision));
			resultMilkFatPercentage.text(parseFloat(result.fatPercentage).toFixed(decimalPrecision));
			resultMilkProteinInKg.text(parseFloat(result.proteinInKg).toFixed(decimalPrecision));
			resultMilkProteinPercentage.text(parseFloat(result.proteinPercentage).toFixed(decimalPrecision));
			resultNitrogenInKg.text(parseFloat(result.nitrogenInKg).toFixed(decimalPrecision));
			resultNitrogenPercentage.text(parseFloat(result.nitrogenPercentage).toFixed(decimalPrecision));
			resultPhosphorusInKg.text(parseFloat(result.phosphorusInKg).toFixed(decimalPrecision));
			resultPhosphorusPercentage.text(parseFloat(result.phosphorusPercentage).toFixed(decimalPrecision));
			resultPotassiumInKg.text(parseFloat(result.potassiumInKg).toFixed(decimalPrecision));
			resultPotassiumPercentage.text(parseFloat(result.potassiumPercentage).toFixed(decimalPrecision));
			resultSulphurInKg.text(parseFloat(result.sulphurInKg).toFixed(decimalPrecision));
			resultSulphurPercentage.text(parseFloat(result.sulphurPercentage).toFixed(decimalPrecision));
		} else {
			errorMsg.show();
		}
		event.preventDefault();
		return false;
	});

});