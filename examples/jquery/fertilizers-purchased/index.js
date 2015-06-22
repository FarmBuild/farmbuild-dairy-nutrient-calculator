'use strict';

$(function(){
	
	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	

	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	var errorMsg = $('.errorMsg');
	
	errorMsg.hide();		
	
	var result={};
	var noResult = false;
	
	var fertilizers = [];
	
	var fertilizerTypes = nc.fertilizersPurchased.types.defaultTypes();
	
	var fertilizertypesel = $('#fertilizerTypeSelect');	
	for(var i=0; i<fertilizerTypes.length; i++){
		$('#fertilizerTypesTbl').append('<tr><td>'+fertilizerTypes[i].name+'</td><td>'+fertilizerTypes[i].dryMatterPercentage+'</td><td>'+fertilizerTypes[i].sulphurPercentage+'</td><td>'+fertilizerTypes[i].potassiumPercentage+'</td><td>'+fertilizerTypes[i].phosphorusPercentage+'</td><td>'+fertilizerTypes[i].nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteFertilizerTypeRow"  > Remove</button>'+'</td><td></td></tr>');		
		//add select options
		fertilizertypesel
         .append($("<option></option>")
         .attr("value",fertilizerTypes[i].name)
         .text(fertilizerTypes[i].name)); 
	}

	
	//select onchange function
	fertilizertypesel.on('change', function() {
		var noselection=true;
		
		for(var i=0; i<fertilizerTypes.length; i++){
		if(fertilizerTypes[i].name==this.value) {			
			
			$('#newFertilizerType_dryMatterPercentage').text(fertilizerTypes[i].dryMatterPercentage);
			$('#newFertilizerType_sulphurPercentage').text(fertilizerTypes[i].sulphurPercentage);
			$('#newFertilizerType_potassiumPercentage').text(fertilizerTypes[i].potassiumPercentage);
			$('#newFertilizerType_phosphorusPercentage').text(fertilizerTypes[i].phosphorusPercentage);
			$('#newFertilizerType_nitrogenPercentage').text(fertilizerTypes[i].nitrogenPercentage);
			
			noselection=false;
		}
		}
		if(noselection==true) {
			
			$('#newFertilizerType_dryMatterPercentage').text('');
			$('#newFertilizerType_sulphurPercentage').text('');
			$('#newFertilizerType_potassiumPercentage').text('');
			$('#newFertilizerType_phosphorusPercentage').text('');
			$('#newFertilizerType_nitrogenPercentage').text('');
		}
	});	
	
    //add fertilizer type to the API and also to the fertilizerTypesTbl table
	$('#addFertilizerType').submit(function(event){		
		
		var newtype={name:'', dryMatterPercentage:'', sulphurPercentage:'', potassiumPercentage:'', phosphorusPercentage:'', nitrogenPercentage:'' };
		newtype.name=$('#name').val();
		
		newtype.dryMatterPercentage=parseFloat($('#dryMatterPercentage').val());
		newtype.sulphurPercentage=parseFloat($('#sulphurPercentage').val());
		newtype.potassiumPercentage=parseFloat($('#potassiumPercentage').val());
		newtype.phosphorusPercentage=parseFloat($('#phosphorusPercentage').val());
		newtype.nitrogenPercentage=parseFloat($('#nitrogenPercentage').val());
		
		if(!nc.fertilizersPurchased.types.validate(newtype)) {
			noResult = true;			
		}
		
		if(noResult==false){			
			errorMsg.hide();
			fertilizerTypes = nc.fertilizersPurchased.types.add(newtype.name, newtype.dryMatterPercentage, newtype.sulphurPercentage, newtype.potassiumPercentage, newtype.phosphorusPercentage, newtype.nitrogenPercentage);
			$('#fertilizerTypesTbl').append('<tr><td>'+newtype.name+'</td><td>'+newtype.dryMatterPercentage+'</td><td>'+newtype.sulphurPercentage+'</td><td>'+newtype.potassiumPercentage+'</td><td>'+newtype.phosphorusPercentage+'</td><td>'+newtype.nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteFertilizerTypeRow"  > Remove</button>'+'</td><td></td></tr>');
				//add to select
				fertilizertypesel
					.append($("<option></option>")
					.attr("value",newtype.name)
					.text(newtype.name)); 
		}else{
			errorMsg.show();							
			noResult=false;
		}		
		
		newtype = '';
		//reset form
		$('#name').val('');
		
		$('#dryMatterPercentage').val('');
		$('#sulphurPercentage').val('');
		$('#potassiumPercentage').val('');
		$('#phosphorusPercentage').val('');
		$('#nitrogenPercentage').val('');
		
		//event.preventDefault();
		return false;
	});
	//adds cows to the cow table and also in cows array/object to be used in later calculate
	$("#addFertilizer").click(function() {
            
			noResult = false;
			var fertilizerType; 
			for(var i=0; i<fertilizerTypes.length; i++){
				if(fertilizerTypes[i].name==fertilizertypesel.val()) fertilizerType=fertilizerTypes[i];
			} //get curretnly selected cowType
			
			// get wet dry selection
			var DryWetSel = $("#isDry").val();
			var isDry = (DryWetSel === 'true');
			var DryOrWet = isDry ? 'Dry': 'Wet';
			var weight = parseFloat($("#newFertilizerWeight").val());
			
			 if(!nc.fertilizersPurchased.validateNew(fertilizerType, weight, isDry)) {
				noResult = true;			
			 }			
			
			if(noResult==false){
				fertilizers = nc.fertilizersPurchased.add(fertilizerType, weight, isDry).fertilizers();				
				errorMsg.hide();			  
				var addedFertilizer = fertilizers[fertilizers.length -1];
					
				var DryMatter = addedFertilizer.isDry ? addedFertilizer.weight : (parseFloat(addedFertilizer.weight)*parseFloat(addedFertilizer.type.dryMatterPercentage)/100);
				//add to fertilizerssTbl
				
				$('#fertilizersTbl').append('<tr><td>'+addedFertilizer.type.name+'</td><td>'+addedFertilizer.weight+'</td><td>'+DryMatter+'</td><td>'+DryOrWet+'</td><td>'+addedFertilizer.type.dryMatterPercentage+'</td><td>'+addedFertilizer.type.sulphurPercentage+'</td><td>'+addedFertilizer.type.potassiumPercentage+'</td><td>'+addedFertilizer.type.phosphorusPercentage+'</td><td>'+addedFertilizer.type.nitrogenPercentage+'</td><td><button type="button" class="btn btn-link" id="deleteFertilizerRow"  > Remove</button></td></tr>');
			  
			}else{
				errorMsg.show();
			}			
			//reset form 
			fertilizerType = '';
			$("#fertilizerTypeSelect").val("default");
			$("#newFertilizerWeight").val('');
			$("#isDry").val("default");
			
			$("#newFertilizerType_dryMatterPercentage").text('');
			$("#newFertilizerType_sulphurPercentage").text('');
			$("#newFertilizerType_potassiumPercentage").text('');
			$("#newFertilizerType_phosphorusPercentage").text('');
			$("#newFertilizerType_nitrogenPercentage").text('');
			
		});
		
	//this function is used to remove a row of fertilizerType added
	$("body").on("click", "#deleteFertilizerTypeRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			fertilizerTypes = nc.fertilizersPurchased.types.removeAt(index);
			
			//update fertilizerType select options
			$('#fertilizerTypeSelect option:gt(0)').remove();
			for(var i=0; i<fertilizerTypes.length; i++){	
			//add select options
				fertilizertypesel
				.append($("<option></option>")
				.attr("value",fertilizerTypes[i].name)
				.text(fertilizerTypes[i].name)); 
			}			
		}		
	});
	
	//this function is used to remove a row of fertilizerType added
	$("body").on("click", "#deleteFertilizerRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			fertilizers = nc.fertilizersPurchased.removeAt(index).fertilizers();							
		}		
	});
	
	
	$("#calculateNutrient").click(function () {
			//call the nutrient calculator API function
			result = nc.fertilizersPurchased.calculate(fertilizers);
						
			noResult = !result;
			if(noResult==false){
				errorMsg.hide();
				
				var result_weight = $('#result_weight');
				var result_dryMatterWeight = $('#result_dryMatterWeight');
				
				var result_phosphorusInKg= $('#result_phosphorusInKg');
				var result_potassiumInKg= $('#result_potassiumInKg');
				var result_sulphurInKg= $('#result_sulphurInKg');
				var result_nitrogenInKg= $('#result_nitrogenInKg');
				
				var result_phosphorusPercentage= $('#result_phosphorusPercentage');
				var result_potassiumPercentage= $('#result_potassiumPercentage');
				var result_sulphurPercentage= $('#result_sulphurPercentage');
				var result_nitrogenPercentage= $('#result_nitrogenPercentage');
			
				
				
				
				result_weight.text(result.weight);
				result_dryMatterWeight.text(result.dryMatterWeight);
				
				result_phosphorusInKg.text(parseFloat(result.phosphorusInKg).toFixed(decimalPrecision));
				result_potassiumInKg.text(parseFloat(result.potassiumInKg).toFixed(decimalPrecision));
				result_sulphurInKg.text(parseFloat(result.sulphurInKg).toFixed(decimalPrecision));
				result_nitrogenInKg.text(parseFloat(result.nitrogenInKg).toFixed(decimalPrecision));
				
				result_phosphorusPercentage.text(parseFloat(result.phosphorusPercentage).toFixed(decimalPrecision));
				result_potassiumPercentage.text(parseFloat(result.potassiumPercentage).toFixed(decimalPrecision));
				result_sulphurPercentage.text(parseFloat(result.sulphurPercentage).toFixed(decimalPrecision));
				result_nitrogenPercentage.text(parseFloat(result.nitrogenPercentage).toFixed(decimalPrecision));
				
				
				
				
				
			}else{
				errorMsg.show();
			}
			});
	
});