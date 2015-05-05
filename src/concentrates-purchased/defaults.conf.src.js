angular.module('farmbuild.nutrientCalculator').
  constant('concentrateDefaults', {
    "types": [
      {
        "name": "Average concentrate",
        "nitrogenPercentage": 3.88,
        "phosphorusPercentage": 0.64,
        "potassiumPercentage": 0.74,
        "sulphurPercentage": 0.32,
        "dryMatterPercentage": 76,
        "metabolisableEnergyInMJPerKg": 12.62
      },
      {
        "name": "Average grain",
        "nitrogenPercentage": 2.42,
        "phosphorusPercentage": 0.52,
        "potassiumPercentage": 1.29,
        "sulphurPercentage": 0.23,
        "dryMatterPercentage": 66.94,
        "metabolisableEnergyInMJPerKg": 11.78
      },
      {
        "name": "Barley grain",
        "nitrogenPercentage": 2.05,
        "phosphorusPercentage": 0.37,
        "potassiumPercentage": 0.54,
        "sulphurPercentage": 0.15,
        "dryMatterPercentage": 89.75,
        "metabolisableEnergyInMJPerKg": 12.33
      },
      {
        "name": "Bread",
        "nitrogenPercentage": 2.74,
        "phosphorusPercentage": 0.28,
        "potassiumPercentage": 0.31,
        "sulphurPercentage": 0.17,
        "dryMatterPercentage": 52.64,
        "metabolisableEnergyInMJPerKg": 13.19
      },
      {
        "name": "Brewers grain",
        "nitrogenPercentage": 4.33,
        "phosphorusPercentage": 0.75,
        "potassiumPercentage": 0.75,
        "sulphurPercentage": 0.27,
        "dryMatterPercentage": 71.57,
        "metabolisableEnergyInMJPerKg": 11.72
      },
      {
        "name": "Canola meal",
        "nitrogenPercentage": 6.39,
        "phosphorusPercentage": 1.16,
        "potassiumPercentage": 1.37,
        "sulphurPercentage": 0.68,
        "dryMatterPercentage": 90.03,
        "metabolisableEnergyInMJPerKg": 13.25
      },
      {
        "name": "Citrus pulp",
        "nitrogenPercentage": 1.38,
        "phosphorusPercentage": 0.23,
        "potassiumPercentage": 1.19,
        "sulphurPercentage": 0.1,
        "dryMatterPercentage": 15.83,
        "metabolisableEnergyInMJPerKg": 10.06
      },
      {
        "name": "Corn grain",
        "nitrogenPercentage": 1.62,
        "phosphorusPercentage": 0.33,
        "potassiumPercentage": 0.37,
        "sulphurPercentage": 0.14,
        "dryMatterPercentage": 90.78,
        "metabolisableEnergyInMJPerKg": 12.87
      },
      {
        "name": "Cotton seed meal",
        "nitrogenPercentage": 4.36,
        "phosphorusPercentage": 1.25,
        "potassiumPercentage": 1.54,
        "sulphurPercentage": 0.48,
        "dryMatterPercentage": 88.52,
        "metabolisableEnergyInMJPerKg": 11.44
      },
      {
        "name": "Fruit",
        "nitrogenPercentage": 2.74,
        "phosphorusPercentage": 0.5,
        "potassiumPercentage": 3.66,
        "sulphurPercentage": 0.21,
        "dryMatterPercentage": 3.85,
        "metabolisableEnergyInMJPerKg": 11.6
      },
      {
        "name": "Linseed meal",
        "nitrogenPercentage": 0.15,
        "phosphorusPercentage": 0.54,
        "potassiumPercentage": 0.85,
        "sulphurPercentage": 0.29,
        "dryMatterPercentage": 90.97,
        "metabolisableEnergyInMJPerKg": 10.75
      },
      {
        "name": "Lupins grain",
        "nitrogenPercentage": 4.08,
        "phosphorusPercentage": 0.36,
        "potassiumPercentage": 0.77,
        "sulphurPercentage": 0.18,
        "dryMatterPercentage": 89.49,
        "metabolisableEnergyInMJPerKg": 13.26
      },
      {
        "name": "Mixed grain",
        "nitrogenPercentage": 2.63,
        "phosphorusPercentage": 0.43,
        "potassiumPercentage": 0.66,
        "sulphurPercentage": 0.19,
        "dryMatterPercentage": 89.14,
        "metabolisableEnergyInMJPerKg": 12.46
      },
      {
        "name": "Molasses",
        "nitrogenPercentage": 0.64,
        "phosphorusPercentage": 0.23,
        "potassiumPercentage": 4.68,
        "sulphurPercentage": 0.5,
        "dryMatterPercentage": 72,
        "metabolisableEnergyInMJPerKg": 12.7
      },
      {
        "name": "Palm kernels",
        "nitrogenPercentage": 2.63,
        "phosphorusPercentage": 0.61,
        "potassiumPercentage": 0.67,
        "sulphurPercentage": 0.2,
        "dryMatterPercentage": 87.66,
        "metabolisableEnergyInMJPerKg": 8.17
      },
      {
        "name": "Pea pollard",
        "nitrogenPercentage": 2.11,
        "phosphorusPercentage": 0.25,
        "potassiumPercentage": 0.96,
        "sulphurPercentage": 0.1,
        "dryMatterPercentage": 89.9,
        "metabolisableEnergyInMJPerKg": 9.87
      },
      {
        "name": "Pellets Calf",
        "nitrogenPercentage": 3.14,
        "phosphorusPercentage": 0.67,
        "potassiumPercentage": 0.84,
        "sulphurPercentage": 0.28,
        "dryMatterPercentage": 88.78,
        "metabolisableEnergyInMJPerKg": 12.72
      },
      {
        "name": "Pellets Dairy",
        "nitrogenPercentage": 2.37,
        "phosphorusPercentage": 0.72,
        "potassiumPercentage": 0.7,
        "sulphurPercentage": 0.24,
        "dryMatterPercentage": 89.64,
        "metabolisableEnergyInMJPerKg": 12.54
      },
      {
        "name": "Pellets Springer",
        "nitrogenPercentage": 2.5,
        "phosphorusPercentage": 0.57,
        "potassiumPercentage": 0.59,
        "sulphurPercentage": 1.06,
        "dryMatterPercentage": 86.67,
        "metabolisableEnergyInMJPerKg": 12.62
      },
      {
        "name": "Pellets Weaner",
        "nitrogenPercentage": 2.73,
        "phosphorusPercentage": 0.74,
        "potassiumPercentage": 0.79,
        "sulphurPercentage": 0.5,
        "dryMatterPercentage": 88.83,
        "metabolisableEnergyInMJPerKg": 13.1
      },
      {
        "name": "Safflower grain",
        "nitrogenPercentage": 2.69,
        "phosphorusPercentage": 0.47,
        "potassiumPercentage": 0.69,
        "sulphurPercentage": 0.15,
        "dryMatterPercentage": 90.85,
        "metabolisableEnergyInMJPerKg": 9
      },
      {
        "name": "Soybean meal",
        "nitrogenPercentage": 7.56,
        "phosphorusPercentage": 0.75,
        "potassiumPercentage": 2.32,
        "sulphurPercentage": 0.38,
        "dryMatterPercentage": 92.51,
        "metabolisableEnergyInMJPerKg": 14.65
      },
      {
        "name": "Sugar by product",
        "nitrogenPercentage": 2.62,
        "phosphorusPercentage": 0.27,
        "potassiumPercentage": 2.28,
        "sulphurPercentage": 0.54,
        "dryMatterPercentage": 68.04,
        "metabolisableEnergyInMJPerKg": 13.04
      },
      {
        "name": "Triticale grain",
        "nitrogenPercentage": 2.05,
        "phosphorusPercentage": 0.29,
        "potassiumPercentage": 0.45,
        "sulphurPercentage": 0.16,
        "dryMatterPercentage": 90.68,
        "metabolisableEnergyInMJPerKg": 12.66
      },
      {
        "name": "Wheat grain",
        "nitrogenPercentage": 2.25,
        "phosphorusPercentage": 0.36,
        "potassiumPercentage": 0.46,
        "sulphurPercentage": 0.16,
        "dryMatterPercentage": 90.04,
        "metabolisableEnergyInMJPerKg": 12.82
      }
    ]
  });