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
			'Average crop',
			'Average hay',
			'Average silage',
			'Average straw',
			'Brassica crop',
			'Canola hay',
			'Canola silage',
			'Cereal hay',
			'Cereal silage',
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