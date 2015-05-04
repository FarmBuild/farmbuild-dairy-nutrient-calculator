angular.module('farmbuild.nutrientCalculator').
	constant('utilisationFactors', [
		{
			name: 'Low',
			weight: 60
		},
		{
			name: 'Average',
			weight: 75
		},
		{
			name: 'High',
			weight: 80
		},
		{
			name: 'Very High',
			weight: 90
		}
	]
);