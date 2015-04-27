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
		],

		forageTypes: [
			{
				name: 'Average crop',
				mePercentage: 9.75,
				dryMatterPercentage: 44.45,
				sulphurPercentage: 0.5,
				potassiumPercentage: 2.68,
				phosphorusPercentage: 0.34,
				nitrogenPercentage: 2.99,
				unknown: 18.68
			},
			{
				name: 'Average hay',
				mePercentage: 9.39,
				dryMatterPercentage: 85,
				sulphurPercentage: 0.23,
				potassiumPercentage: 2.29,
				phosphorusPercentage: 0.38,
				nitrogenPercentage: 2.44,
				unknown: 15.24
			},
			{
				name: 'Average silage',
				mePercentage: 8.76,
				dryMatterPercentage: 49.01,
				sulphurPercentage: 0.27,
				potassiumPercentage: 2.35,
				phosphorusPercentage: 0.34,
				nitrogenPercentage: 2.12,
				unknown: 13.25
			},
			{
				name: 'Average straw',
				mePercentage: 9.18,
				dryMatterPercentage: 45.1,
				sulphurPercentage: 0.28,
				potassiumPercentage: 2.7,
				phosphorusPercentage: 0.4,
				nitrogenPercentage: 2.6,
				unknown: 16.27
			},
			{
				name: 'Brassica crop',
				mePercentage: 11.32,
				dryMatterPercentage: 25.99,
				sulphurPercentage: 0.64,
				potassiumPercentage: 2.85,
				phosphorusPercentage: 0.33,
				nitrogenPercentage: 3.72,
				unknown: 23.25
			},
			{
				name: 'Cereal hay',
				mePercentage: 8.32,
				dryMatterPercentage: 84.74,
				sulphurPercentage: 0.17,
				potassiumPercentage: 1.83,
				phosphorusPercentage: 0.22,
				nitrogenPercentage: 1.54,
				unknown: 18
			},
			{
				name: 'Canola silage',
				mePercentage: 9.45,
				dryMatterPercentage: 23.77,
				sulphurPercentage: 0.51,
				potassiumPercentage: 2.88,
				phosphorusPercentage: 0.3,
				nitrogenPercentage: 2.75,
				unknown: 17.2
			},
			{
				name: 'Cereal hay',
				mePercentage: 8.32,
				dryMatterPercentage: 84.74,
				sulphurPercentage: 0.17,
				potassiumPercentage: 1.83,
				phosphorusPercentage: 0.22,
				nitrogenPercentage: 1.54,
				unknown: 9.6
			},
			{
				name: 'Cereal silage',
				mePercentage: 9.14,
				dryMatterPercentage: 36.28,
				sulphurPercentage: 0.17,
				potassiumPercentage: 2.02,
				phosphorusPercentage: 0.35,
				nitrogenPercentage: 2.02,
				unknown: 12.61
			},
			'Cereal straw',
			'Clover hay',
			'Forage blend',
			'Kikuyu pasture',
			'Kikuyu silage',
			'Lucerne hay',
			'Lucerne pasture',
			'Lucerne silage',
			'Maize silage',
			'Millett crop',
			'Oat Hay',
			'Oats & peas silage',
			'Paspalum silage',
			'Pasture hay',
			'Pasture silage',
			'Prairie grass silage',
			'Ryegrass pasture',
			'Seteria silage',
			'Sorghum crop',
			'Sorghum hay',
			'Sorghum/millet hay',
			'Sorghum/millet silage',
			'Turnip crop'
		]

	});