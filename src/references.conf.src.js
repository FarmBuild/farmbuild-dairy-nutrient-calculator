angular.module('farmbuild.nutrientCalculator').
	constant('references', {
		cowTypes: [
			{
				name: 'Heavy adult cattle',
				weight: 650
			},
			{
				name: 'Average adult cattle',
				weight: 500
			},
			{
				name: 'Yearling',
				weight: 300
			},
			{
				name: 'Weaned young stock',
				weight: 120
			},
			{
				name: 'Bobby calve',
				weight: 40
			}
		]
	});