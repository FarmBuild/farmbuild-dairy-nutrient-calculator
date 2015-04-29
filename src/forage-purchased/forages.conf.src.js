angular.module('farmbuild.nutrientCalculator').
	constant('forageTypeValues',[
	{
		"name": "Average crop",
		"nitrogenPercentage": "2.99",
		"phosphorusPercentage": "0.34",
		"potassiumPercentage": "2.68",
		"sulphurPercentage": "0.5",
		"dryMatterPercentage": "44.45",
		"metabolisableEnergyRatio": "9.75"
	},
	{
		"name": "Average hay",
		"nitrogenPercentage": "2.44",
		"phosphorusPercentage": "0.38",
		"potassiumPercentage": "2.29",
		"sulphurPercentage": "0.23",
		"dryMatterPercentage": "85",
		"metabolisableEnergyRatio": "9.39"
	},
	{
		"name": "Average silage",
		"nitrogenPercentage": "2.12",
		"phosphorusPercentage": "0.34",
		"potassiumPercentage": "2.35",
		"sulphurPercentage": "0.27",
		"dryMatterPercentage": "49.01",
		"metabolisableEnergyRatio": "8.76"
	},
	{
		"name": "Average straw",
		"nitrogenPercentage": "2.6",
		"phosphorusPercentage": "0.4",
		"potassiumPercentage": "2.7",
		"sulphurPercentage": "0.28",
		"dryMatterPercentage": "45.1",
		"metabolisableEnergyRatio": "9.18"
	},
	{
		"name": "Brassica crop",
		"nitrogenPercentage": "3.72",
		"phosphorusPercentage": "0.33",
		"potassiumPercentage": "2.85",
		"sulphurPercentage": "0.64",
		"dryMatterPercentage": "25.99",
		"metabolisableEnergyRatio": "11.32"
	},
	{
		"name": "Canola hay",
		"nitrogenPercentage": "2.88",
		"phosphorusPercentage": "0.33",
		"potassiumPercentage": "2.29",
		"sulphurPercentage": "0.57",
		"dryMatterPercentage": "82.93",
		"metabolisableEnergyRatio": "9.06"
	},
	{
		"name": "Canola silage",
		"nitrogenPercentage": "2.75",
		"phosphorusPercentage": "0.3",
		"potassiumPercentage": "2.88",
		"sulphurPercentage": "0.51",
		"dryMatterPercentage": "23.77",
		"metabolisableEnergyRatio": "9.45"
	},
	{
		"name": "Cereal hay",
		"nitrogenPercentage": "1.54",
		"phosphorusPercentage": "0.22",
		"potassiumPercentage": "1.83",
		"sulphurPercentage": "0.17",
		"dryMatterPercentage": "84.74",
		"metabolisableEnergyRatio": "8.32"
	},
	{
		"name": "Cereal silage",
		"nitrogenPercentage": "2.02",
		"phosphorusPercentage": "0.35",
		"potassiumPercentage": "2.02",
		"sulphurPercentage": "0.17",
		"dryMatterPercentage": "36.28",
		"metabolisableEnergyRatio": "9.14"
	},
	{
		"name": "Cereal straw",
		"nitrogenPercentage": "0.62",
		"phosphorusPercentage": "0.1",
		"potassiumPercentage": "1.05",
		"sulphurPercentage": "0.1",
		"dryMatterPercentage": "87.22",
		"metabolisableEnergyRatio": "5.99"
	},
	{
		"name": "Clover hay",
		"nitrogenPercentage": "2.99",
		"phosphorusPercentage": "0.28",
		"potassiumPercentage": "2.51",
		"sulphurPercentage": "0.25",
		"dryMatterPercentage": "88.26",
		"metabolisableEnergyRatio": "9.31"
	},
	{
		"name": "Forage blend",
		"nitrogenPercentage": "1.94",
		"phosphorusPercentage": "0.38",
		"potassiumPercentage": "2.29",
		"sulphurPercentage": "0.2",
		"dryMatterPercentage": "84.18",
		"metabolisableEnergyRatio": "8.47"
	},
	{
		"name": "Kikuyu pasture",
		"nitrogenPercentage": "3.07",
		"phosphorusPercentage": "0.46",
		"potassiumPercentage": "2.82",
		"sulphurPercentage": "0.23",
		"dryMatterPercentage": "20.67",
		"metabolisableEnergyRatio": "9.57"
	},
	{
		"name": "Kikuyu silage",
		"nitrogenPercentage": "1.7",
		"phosphorusPercentage": "0.39",
		"potassiumPercentage": "1.85",
		"sulphurPercentage": "0.13",
		"dryMatterPercentage": "57.95",
		"metabolisableEnergyRatio": "10.16"
	},
	{
		"name": "Lucerne hay",
		"nitrogenPercentage": "3.34",
		"phosphorusPercentage": "0.38",
		"potassiumPercentage": "2.03",
		"sulphurPercentage": "0.29",
		"dryMatterPercentage": "83.23",
		"metabolisableEnergyRatio": "9.54"
	},
	{
		"name": "Lucerne pasture",
		"nitrogenPercentage": "3.53",
		"phosphorusPercentage": "0.41",
		"potassiumPercentage": "2.89",
		"sulphurPercentage": "0.35",
		"dryMatterPercentage": "23.34",
		"metabolisableEnergyRatio": "10.22"
	},
	{
		"name": "Lucerne silage",
		"nitrogenPercentage": "2.64",
		"phosphorusPercentage": "0.45",
		"potassiumPercentage": "2.29",
		"sulphurPercentage": "0.23",
		"dryMatterPercentage": "53.54",
		"metabolisableEnergyRatio": "8.75"
	},
	{
		"name": "Maize silage",
		"nitrogenPercentage": "1.2",
		"phosphorusPercentage": "0.26",
		"potassiumPercentage": "1.12",
		"sulphurPercentage": "0.1",
		"dryMatterPercentage": "41.27",
		"metabolisableEnergyRatio": "9.12"
	},
	{
		"name": "Millett crop",
		"nitrogenPercentage": "2.82",
		"phosphorusPercentage": "0.41",
		"potassiumPercentage": "3.56",
		"sulphurPercentage": "0.41",
		"dryMatterPercentage": "52.68",
		"metabolisableEnergyRatio": "9.54"
	},
	{
		"name": "Oat Hay",
		"nitrogenPercentage": "1.4",
		"phosphorusPercentage": "0.24",
		"potassiumPercentage": "1.64",
		"sulphurPercentage": "0.15",
		"dryMatterPercentage": "87.32",
		"metabolisableEnergyRatio": "8.42"
	},
	{
		"name": "Oats & peas silage",
		"nitrogenPercentage": "2.26",
		"phosphorusPercentage": "0.39",
		"potassiumPercentage": "2.43",
		"sulphurPercentage": "0.2",
		"dryMatterPercentage": "47.5",
		"metabolisableEnergyRatio": "9.16"
	},
	{
		"name": "Paspalum silage",
		"nitrogenPercentage": "1.91",
		"phosphorusPercentage": "0.32",
		"potassiumPercentage": "2.06",
		"sulphurPercentage": "0.18",
		"dryMatterPercentage": "52.39",
		"metabolisableEnergyRatio": "8.21"
	},
	{
		"name": "Pasture hay",
		"nitrogenPercentage": "1.87",
		"phosphorusPercentage": "0.28",
		"potassiumPercentage": "1.87",
		"sulphurPercentage": "0.24",
		"dryMatterPercentage": "85.53",
		"metabolisableEnergyRatio": "8.17"
	},
	{
		"name": "Pasture silage",
		"nitrogenPercentage": "2.6",
		"phosphorusPercentage": "0.4",
		"potassiumPercentage": "2.7",
		"sulphurPercentage": "0.28",
		"dryMatterPercentage": "45.1",
		"metabolisableEnergyRatio": "9.18"
	},
	{
		"name": "Prairie grass silage",
		"nitrogenPercentage": "1.9",
		"phosphorusPercentage": "0.19",
		"potassiumPercentage": "1.3",
		"sulphurPercentage": "0.14",
		"dryMatterPercentage": "64.37",
		"metabolisableEnergyRatio": "8.51"
	},
	{
		"name": "Ryegrass pasture",
		"nitrogenPercentage": "3.61",
		"phosphorusPercentage": "0.45",
		"potassiumPercentage": "2.78",
		"sulphurPercentage": "0.34",
		"dryMatterPercentage": "20.82",
		"metabolisableEnergyRatio": "10.46"
	},
	{
		"name": "Seteria silage",
		"nitrogenPercentage": "1.91",
		"phosphorusPercentage": "0.27",
		"potassiumPercentage": "2.08",
		"sulphurPercentage": "0.12",
		"dryMatterPercentage": "31.98",
		"metabolisableEnergyRatio": "8.04"
	},
	{
		"name": "Sorghum crop",
		"nitrogenPercentage": "2.2",
		"phosphorusPercentage": "0.39",
		"potassiumPercentage": "2.5",
		"sulphurPercentage": "0.14",
		"dryMatterPercentage": "30.16",
		"metabolisableEnergyRatio": "8.59"
	},
	{
		"name": "Sorghum hay",
		"nitrogenPercentage": "1.87",
		"phosphorusPercentage": "0.34",
		"potassiumPercentage": "2",
		"sulphurPercentage": "0.13",
		"dryMatterPercentage": "88.05",
		"metabolisableEnergyRatio": "7.6"
	},
	{
		"name": "Sorghum/millet hay",
		"nitrogenPercentage": "1.86",
		"phosphorusPercentage": "0.41",
		"potassiumPercentage": "1.72",
		"sulphurPercentage": "0.38",
		"dryMatterPercentage": "79.1",
		"metabolisableEnergyRatio": "8.46"
	},
	{
		"name": "Sorghum/millet silage",
		"nitrogenPercentage": "1.3",
		"phosphorusPercentage": "0.35",
		"potassiumPercentage": "3.36",
		"sulphurPercentage": "0.4",
		"dryMatterPercentage": "33.91",
		"metabolisableEnergyRatio": "7.53"
	},
	{
		"name": "Turnip crop",
		"nitrogenPercentage": "2.03",
		"phosphorusPercentage": "0.28",
		"potassiumPercentage": "3.18",
		"sulphurPercentage": "0.52",
		"dryMatterPercentage": "11.06",
		"metabolisableEnergyRatio": "11.1"
	}]
);