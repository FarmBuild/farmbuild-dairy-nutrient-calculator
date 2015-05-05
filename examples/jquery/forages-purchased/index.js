'use strict';

$(function(){
	try{
	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	

	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	var errorMsg = $('.errorMsg');
	
	errorMsg.hide();		
	
	var result={};
	var noResult = false;
	
	var forages = [];
	var forageTypes = nc.foragesPurchased.types.toArray();
	
	var foragetypesel = $('#forageTypeSelect');	
	for(var i=0; i<forageTypes.length; i++){
		$('#forageTypesTbl').append('<tr><td>'+forageTypes[i].name+'</td><td>'+ forageTypes[i].metabolisableEnergyInMJPerKg+'</td><td>'+forageTypes[i].dryMatterPercentage+'</td><td>'+forageTypes[i].sulphurPercentage+'</td><td>'+forageTypes[i].potassiumPercentage+'</td><td>'+forageTypes[i].phosphorusPercentage+'</td><td>'+forageTypes[i].nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteForageTypeRow"  > Remove</button>'+'</td><td></td></tr>');		
		//add select options
		foragetypesel
         .append($("<option></option>")
         .attr("value",forageTypes[i].name)
         .text(forageTypes[i].name)); 
	}
	
	}catch(err){alert(err.message);}
	
	//select onchange function
	foragetypesel.on('change', function() {
		var noselection=true;
		
		for(var i=0; i<forageTypes.length; i++){
		if(forageTypes[i].name==this.value) {			
			$('#newForageType_metabolisableEnergyInMJPerKg').text(forageTypes[i].metabolisableEnergyInMJPerKg);
			$('#newForageType_dryMatterPercentage').text(forageTypes[i].dryMatterPercentage);
			$('#newForageType_sulphurPercentage').text(forageTypes[i].sulphurPercentage);
			$('#newForageType_potassiumPercentage').text(forageTypes[i].potassiumPercentage);
			$('#newForageType_phosphorusPercentage').text(forageTypes[i].phosphorusPercentage);
			$('#newForageType_nitrogenPercentage').text(forageTypes[i].nitrogenPercentage);
			
			noselection=false;
		}
		}
		if(noselection==true) {
			$('#newForageType_metabolisableEnergyInMJPerKg').text('');
			$('#newForageType_dryMatterPercentage').text('');
			$('#newForageType_sulphurPercentage').text('');
			$('#newForageType_potassiumPercentage').text('');
			$('#newForageType_phosphorusPercentage').text('');
			$('#newForageType_nitrogenPercentage').text('');
		}
	});
	function isPositiveInteger(s)
	{    
		return /^\d+$/.test(s);	
	}
	//Calculate total weight to show in the table
	$("#numberOfCows").keyup(function() {
			var numofcows = $('#numberOfCows').val();
			
		     if(!isPositiveInteger(numofcows)){
				 noResult = true;
				 errorMsg.show();				
			 }else{ 
				$("#totalCowWeight").text(parseFloat($('#avgCowWeight').text())*parseInt($('#numberOfCows').val()));			
				errorMsg.hide();
			 }
	});
	
	
    //add forage type to the API and also to the forageTypesTbl table
	$('#addForageType').submit(function(event){		
		
		var newtype={name:'', metabolisableEnergyInMJPerKg:'', dryMatterPercentage:'', sulphurPercentage:'', potassiumPercentage:'', phosphorusPercentage:'', nitrogenPercentage:'' };
		newtype.name=$('#name').val();
		newtype.metabolisableEnergyInMJPerKg=$('#metabolisableEnergyInMJPerKg').val();
		newtype.dryMatterPercentage=$('#dryMatterPercentage').val();
		newtype.sulphurPercentage=$('#sulphurPercentage').val();
		newtype.potassiumPercentage=$('#potassiumPercentage').val();
		newtype.phosphorusPercentage=$('#phosphorusPercentage').val();
		newtype.nitrogenPercentage=$('#nitrogenPercentage').val();
		
		//addForageType(newtype);
		forageTypes = nc.foragesPurchased.types.add(newtype.name, newtype.metabolisableEnergyInMJPerKg, newtype.dryMatterPercentage, newtype.sulphurPercentage, newtype.potassiumPercentage, newtype.phosphorusPercentage, newtype.nitrogenPercentage).toArray();			
		
		
		if(noResult==true){
			errorMsg.show();
		}else{
			errorMsg.hide();
			$('#forageTypesTbl').append('<tr><td>'+newtype.name+'</td><td>'+newtype.metabolisableEnergyInMJPerKg+'</td><td>'+newtype.dryMatterPercentage+'</td><td>'+newtype.sulphurPercentage+'</td><td>'+newtype.potassiumPercentage+'</td><td>'+newtype.phosphorusPercentage+'</td><td>'+newtype.nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteForageTypeRow"  > Remove</button>'+'</td><td></td></tr>');
				//add to select
				foragetypesel
					.append($("<option></option>")
					.attr("value",newtype.name)
					.text(newtype.name)); 
						
		 
		}		
		
		newtype = '';
		//reset form
		$('#name').val('');
		$('#metabolisableEnergyInMJPerKg').val('');
		$('#dryMatterPercentage').val('');
		$('#sulphurPercentage').val('');
		$('#potassiumPercentage').val('');
		$('#phosphorusPercentage').val('');
		$('#nitrogenPercentage').val('');
		//event.preventDefault();
		return false;
	});
	//adds cows to the cow table and also in cows array/object to be used in later calculate
	$("#addForage").click(function() {
            
			noResult = false;
			var forageType; 
			for(var i=0; i<forageTypes.length; i++){
				if(forageTypes[i].name==foragetypesel.val()) forageType=forageTypes[i];
			} //get curretnly selected cowType
			// get wet dry selection
			var DryWetSel = $("#isDry").val();
			var isDry = (DryWetSel === 'true');
			var DryOrWet = isDry ? 'Dry': 'Wet';
			var weight = parseFloat($("#newForageWeight").val());
			
			forages = nc.foragesPurchased.add(forageType, weight, isDry).toArray();
			
			if(noResult==false){				
				errorMsg.hide();			  
				var addedForage = forages[forages.length -1];
					
				var DryMatter = addedForage.isDry ? addedForage.weight : (parseFloat(addedForage.weight)*parseFloat(addedForage.type.dryMatterPercentage)/100);
				//add to foragessTbl
				
				$('#foragesTbl').append('<tr><td>'+addedForage.type.name+'</td><td>'+addedForage.weight+'</td><td>'+DryMatter+'</td><td>'+DryOrWet+'</td><td>'+addedForage.type.metabolisableEnergyInMJPerKg+'</td><td>'+addedForage.type.dryMatterPercentage+'</td><td>'+addedForage.type.sulphurPercentage+'</td><td>'+addedForage.type.potassiumPercentage+'</td><td>'+addedForage.type.phosphorusPercentage+'</td><td>'+addedForage.type.nitrogenPercentage+'</td><td><button type="button" class="btn btn-link" id="deleteForageRow"  > Remove</button></td></tr>');
			  
			}else{
				errorMsg.show();
			}			
			//reset form 
			forageType = '';		
			
		});
		
	//this function is used to remove a row of forageType added
	$("body").on("click", "#deleteForageTypeRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			forageTypes = nc.foragesPurchased.types.removeAt(index).toArray();
			//cows.splice(index, 1); //remove from the cows array
			//$('#forageTypeSelect option[value='']').remove()
			
			//update forageType select options
			$('#forageTypeSelect option:gt(0)').remove();
			for(var i=0; i<forageTypes.length; i++){	
			//add select options
				foragetypesel
				.append($("<option></option>")
				.attr("value",forageTypes[i].name)
				.text(forageTypes[i].name)); 
			}			
		}		
	});
	
	//this function is used to remove a row of forageType added
	$("body").on("click", "#deleteForageRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			forages = nc.foragesPurchased.removeAt(index).toArray();							
		}		
	});
	
	
	$("#calculateNutrient").click(function () {
			//call the nutrient calculator API function
			result = nc.foragesPurchased.calculate(forages);
						
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
			
				var result_metabolisableEnergyInMJPerKg = $('#result_metabolisableEnergyInMJPerKg');
				var result_metabolisableEnergyInMJ = $('#result_metabolisableEnergyInMJ');				
				
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
				
				result_metabolisableEnergyInMJPerKg.text(parseFloat(result.metabolisableEnergyInMJPerKg).toFixed(decimalPrecision));
				result_metabolisableEnergyInMJ.text(parseFloat(result.metabolisableEnergyInMJ).toFixed(decimalPrecision));
				
				
			}else{
				errorMsg.show();
			}
			});
	
});