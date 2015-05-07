'use strict';

$(function(){
	
	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	

	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	var errorMsg = $('.errorMsg');
	
	errorMsg.hide();		
	
	var result={};
	var noResult = false;
	
	var concentrates = [];
	
	var concentrateTypes = nc.concentratesPurchased.types.defaultTypes();
	
	var concentratetypesel = $('#concentrateTypeSelect');	
	for(var i=0; i<concentrateTypes.length; i++){
		$('#concentrateTypesTbl').append('<tr><td>'+concentrateTypes[i].name+'</td><td>'+ concentrateTypes[i].metabolisableEnergyInMJPerKg+'</td><td>'+concentrateTypes[i].dryMatterPercentage+'</td><td>'+concentrateTypes[i].sulphurPercentage+'</td><td>'+concentrateTypes[i].potassiumPercentage+'</td><td>'+concentrateTypes[i].phosphorusPercentage+'</td><td>'+concentrateTypes[i].nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteConcentrateTypeRow"  > Remove</button>'+'</td><td></td></tr>');		
		//add select options
		concentratetypesel
         .append($("<option></option>")
         .attr("value",concentrateTypes[i].name)
         .text(concentrateTypes[i].name)); 
	}

	
	//select onchange function
	concentratetypesel.on('change', function() {
		var noselection=true;
		
		for(var i=0; i<concentrateTypes.length; i++){
		if(concentrateTypes[i].name==this.value) {			
			$('#newConcentrateType_metabolisableEnergyInMJPerKg').text(concentrateTypes[i].metabolisableEnergyInMJPerKg);
			$('#newConcentrateType_dryMatterPercentage').text(concentrateTypes[i].dryMatterPercentage);
			$('#newConcentrateType_sulphurPercentage').text(concentrateTypes[i].sulphurPercentage);
			$('#newConcentrateType_potassiumPercentage').text(concentrateTypes[i].potassiumPercentage);
			$('#newConcentrateType_phosphorusPercentage').text(concentrateTypes[i].phosphorusPercentage);
			$('#newConcentrateType_nitrogenPercentage').text(concentrateTypes[i].nitrogenPercentage);
			
			noselection=false;
		}
		}
		if(noselection==true) {
			$('#newConcentrateType_metabolisableEnergyInMJPerKg').text('');
			$('#newConcentrateType_dryMatterPercentage').text('');
			$('#newConcentrateType_sulphurPercentage').text('');
			$('#newConcentrateType_potassiumPercentage').text('');
			$('#newConcentrateType_phosphorusPercentage').text('');
			$('#newConcentrateType_nitrogenPercentage').text('');
		}
	});	
	
    //add concentrate type to the API and also to the concentrateTypesTbl table
	$('#addConcentrateType').submit(function(event){		
		
		var newtype={name:'', metabolisableEnergyInMJPerKg:'', dryMatterPercentage:'', sulphurPercentage:'', potassiumPercentage:'', phosphorusPercentage:'', nitrogenPercentage:'' };
		newtype.name=$('#name').val();
		newtype.metabolisableEnergyInMJPerKg=$('#metabolisableEnergyInMJPerKg').val();
		newtype.dryMatterPercentage=$('#dryMatterPercentage').val();
		newtype.sulphurPercentage=$('#sulphurPercentage').val();
		newtype.potassiumPercentage=$('#potassiumPercentage').val();
		newtype.phosphorusPercentage=$('#phosphorusPercentage').val();
		newtype.nitrogenPercentage=$('#nitrogenPercentage').val();
		
		
		concentrateTypes = nc.concentratesPurchased.types.add(newtype.name, newtype.metabolisableEnergyInMJPerKg, newtype.dryMatterPercentage, newtype.sulphurPercentage, newtype.potassiumPercentage, newtype.phosphorusPercentage, newtype.nitrogenPercentage);
		
		if(noResult==true){
			errorMsg.show();
		}else{
			errorMsg.hide();
			$('#concentrateTypesTbl').append('<tr><td>'+newtype.name+'</td><td>'+newtype.metabolisableEnergyInMJPerKg+'</td><td>'+newtype.dryMatterPercentage+'</td><td>'+newtype.sulphurPercentage+'</td><td>'+newtype.potassiumPercentage+'</td><td>'+newtype.phosphorusPercentage+'</td><td>'+newtype.nitrogenPercentage+'</td><td>'+'<button type="button" class="btn btn-link" id="deleteConcentrateTypeRow"  > Remove</button>'+'</td><td></td></tr>');
				//add to select
				concentratetypesel
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
	$("#addConcentrate").click(function() {
            
			noResult = false;
			var concentrateType; 
			for(var i=0; i<concentrateTypes.length; i++){
				if(concentrateTypes[i].name==concentratetypesel.val()) concentrateType=concentrateTypes[i];
			} //get curretnly selected cowType
			
			// get wet dry selection
			var DryWetSel = $("#isDry").val();
			var isDry = (DryWetSel === 'true');
			var DryOrWet = isDry ? 'Dry': 'Wet';
			var weight = parseFloat($("#newConcentrateWeight").val());
			
			concentrates = nc.concentratesPurchased.add(concentrateType, weight, isDry).concentrates();
			noResult = !concentrates;
			if(noResult==false){				
				errorMsg.hide();			  
				var addedConcentrate = concentrates[concentrates.length -1];
					
				var DryMatter = addedConcentrate.isDry ? addedConcentrate.weight : (parseFloat(addedConcentrate.weight)*parseFloat(addedConcentrate.type.dryMatterPercentage)/100);
				//add to concentratessTbl
				
				$('#concentratesTbl').append('<tr><td>'+addedConcentrate.type.name+'</td><td>'+addedConcentrate.weight+'</td><td>'+DryMatter+'</td><td>'+DryOrWet+'</td><td>'+addedConcentrate.type.metabolisableEnergyInMJPerKg+'</td><td>'+addedConcentrate.type.dryMatterPercentage+'</td><td>'+addedConcentrate.type.sulphurPercentage+'</td><td>'+addedConcentrate.type.potassiumPercentage+'</td><td>'+addedConcentrate.type.phosphorusPercentage+'</td><td>'+addedConcentrate.type.nitrogenPercentage+'</td><td><button type="button" class="btn btn-link" id="deleteConcentrateRow"  > Remove</button></td></tr>');
			  
			}else{
				errorMsg.show();
			}			
			//reset form 
			concentrateType = '';
			$("#concentrateTypeSelect").val("default");
			$("#newConcentrateWeight").val('');
			$("#isDry").val("default");
			$("#newConcentrateType_metabolisableEnergyInMJPerKg").text('');
			$("#newConcentrateType_dryMatterPercentage").text('');
			$("#newConcentrateType_sulphurPercentage").text('');
			$("#newConcentrateType_potassiumPercentage").text('');
			$("#newConcentrateType_phosphorusPercentage").text('');
			$("#newConcentrateType_nitrogenPercentage").text('');
			
		});
		
	//this function is used to remove a row of concentrateType added
	$("body").on("click", "#deleteConcentrateTypeRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			concentrateTypes = nc.concentratesPurchased.types.removeAt(index);
			
			//update concentrateType select options
			$('#concentrateTypeSelect option:gt(0)').remove();
			for(var i=0; i<concentrateTypes.length; i++){	
			//add select options
				concentratetypesel
				.append($("<option></option>")
				.attr("value",concentrateTypes[i].name)
				.text(concentrateTypes[i].name)); 
			}			
		}		
	});
	
	//this function is used to remove a row of concentrateType added
	$("body").on("click", "#deleteConcentrateRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {			
			$(this).closest('tr').remove(); //remove the table row			
			concentrates = nc.concentratesPurchased.removeAt(index).concentrates();							
		}		
	});
	
	
	$("#calculateNutrient").click(function () {
			//call the nutrient calculator API function
			result = nc.concentratesPurchased.calculate(concentrates);
						
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