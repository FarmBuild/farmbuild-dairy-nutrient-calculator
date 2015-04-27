'use strict';

$(function(){
	
	var nc = farmbuild.nutrientcalculator,
		decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	

	$('#app-version').text(farmbuild.examples.nutrientcalculator.version);

	var errorMsg = $('#errorMsg');
	
	errorMsg.hide();		
	
	var result={};
	var noResult = false;
	
	var cows = [];
	var cowTypes = nc.cowsPurchased.types();
	var cowtypesel = $('#cowTypeSelect');	
	for(var i=0; i<cowTypes.length; i++){
		$('#cowTypesTbl').append('<tr><td>'+cowTypes[i].name+'</td><td>'+cowTypes[i].weight+'</td><td></td></tr>');		
		//add select options
		cowtypesel
         .append($("<option></option>")
         .attr("value",cowTypes[i].name)
         .text(cowTypes[i].name+' ('+cowTypes[i].weight+' Kg)')); 
	}
	
	
	function addCowType(type) {

			//Validate type
			if(!type || !type.name || !type.weight){
				noResult = true;
				return;
			}

			noResult = !nc.cowsPurchased.addType(type.name, type.weight);
			cowTypes = nc.cowsPurchased.types();
			type = '';
		};	
	//select onchange function
	cowtypesel.on('change', function() {
		var noselection=true;
		
		for(var i=0; i<cowTypes.length; i++){
		if(cowTypes[i].name==this.value) {			
			$('#avgCowWeight').text(cowTypes[i].weight);
			noselection=false;
		}
		}
		if(noselection==true) $('#avgCowWeight').text('');
	});
	
	//Calculate total weight to show in the table
	$("#numberOfCows").keyup(function() {
			$("#totalCowWeight").text(parseFloat($('#avgCowWeight').text())*parseInt($('#numberOfCows').val()));			
	});
	
	
    //add cow type to the API and also to the cowTypesTbl table
	$('#addCowType').submit(function(event){
		try{
		alert('in add type cow');
		var newtype={name:'', weight:''};
		newtype.name=$('#typeName').val();
		newtype.weight=$('#typeWeight').val();
		addCowType(newtype);
		$('#cowTypesTbl').append('<tr><td>'+newtype.name+'</td><td>'+newtype.weight+'</td><td></td></tr>');
		//add to select
		cowtypesel
         .append($("<option></option>")
         .attr("value",newtype.name)
         .text(newtype.name+' ('+newtype.weight+' Kg)')); 	
		 
		alert(nc.cowsPurchased.types());
		}catch(error){alert(error.message);}
		var errorMsg = $('#errorMsg');
	
		
		//reset form
		$('#typeName').val('');
		$('#typeWeight').val('');
		//event.preventDefault();
		return false;
	});
	//adds cows to the cow table and also in cows array/object to be used in later calculate
	$("#addCows").click(function() {
            
			noResult = false;
			var cowType; 
			for(var i=0; i<cowTypes.length; i++){
				if(cowTypes[i].name==cowtypesel.val()) cowType=cowTypes[i];
			} //get curretnly selected cowType
			
			var numberOfCows = parseInt($("#numberOfCows").val());
			
			//Validate numberOfCows to be a valid number
			//if(!cowType || !isPositiveNumber(numberOfCows)){
			//	noResult = true;			
			//	return;
			//}

			cows.push({
				type: cowType.name,
				weight: cowType.weight,
				numberOfCows: numberOfCows
			});
			
			
			//add to cowsTbl
			$('#cowsTbl').append('<tr><td>'+cowType.name+'</td><td>'+numberOfCows+'</td><td>'+cowType.weight+'</td><td>'+numberOfCows * cowType.weight+'</td><td><button type="button" class="btn btn-link" id="deleteRow"  > Remove</button></td></tr>');
        
			
			//reset form 
			$("#numberOfCows").val('');
			$("#cowTypeSelect").val("default");	
			$('#avgCowWeight').text('');
			$("#totalCowWeight").text('');
			cowType = '';
			numberOfCows = '';
			result = {};
		});
		
	//this function is used to remove a row of cows added
	$("body").on("click", "#deleteRow", function(e){	
		
		var index = $(this).closest('tr').index()-2; //cows array row i = table row index - 2 to exclude two top rows
		
		if(index > -1) {
			$(this).closest('tr').remove(); //remove the table row
			cows.splice(index, 1); //remove from the cows array
		}
		
	});
	
	$("#calculateNutrient").click(function () {
			//call the nutrient calculator API function
			result = nc.cowsPurchased.calculate(cows);		
			
			noResult = !result;
			var resultNumberOfCows = $('#resultNumberOfCows');
			var resultWeight = $('#resultWeight');
			var resultPhosphorusInKg= $('#resultPhosphorusInKg');
			var resultPotassiumInKg= $('#resultPotassiumInKg');
			var resultSulphurInKg= $('#resultSulphurInKg');
			var resultNitrogenInKg= $('#resultNitrogenInKg');
			
			resultNumberOfCows.text(parseInt(result.numberOfCows));
			resultWeight.text(parseFloat(result.weight));
			resultPhosphorusInKg.text(parseFloat(result.phosphorusInKg).toFixed(decimalPrecision));
			resultPotassiumInKg.text(parseFloat(result.potassiumInKg).toFixed(decimalPrecision));
			resultSulphurInKg.text(parseFloat(result.sulphurInKg).toFixed(decimalPrecision));
			resultNitrogenInKg.text(parseFloat(result.nitrogenInKg).toFixed(decimalPrecision));
			
		});
	
});