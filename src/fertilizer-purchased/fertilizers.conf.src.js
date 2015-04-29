angular.module('farmbuild.nutrientCalculator').
  constant('fertilizerValues', {
    "types": [
      {
        "name": "Dairy manure stockpile",
        "nitrogenPercentage": 1.44,
        "phosphorusPercentage": 0.55,
        "potassiumPercentage": 1.38,
        "sulphurPercentage": 0.3,
        "dryMatterPercentage": 76.83
      },
      {
        "name": "DAP",
        "nitrogenPercentage": 18,
        "phosphorusPercentage": 20,
        "potassiumPercentage": 0,
        "sulphurPercentage": 1.6,
        "dryMatterPercentage": 100
      },
      {
        "name": "Double Super",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 16.8,
        "potassiumPercentage": 0,
        "sulphurPercentage": 4,
        "dryMatterPercentage": 100
      },
      {
        "name": "Effluent solids",
        "nitrogenPercentage": 1.65,
        "phosphorusPercentage": 0.3,
        "potassiumPercentage": 0.4,
        "sulphurPercentage": 0.25,
        "dryMatterPercentage": 11.3
      },
      {
        "name": "Fodder Blend",
        "nitrogenPercentage": 11.5,
        "phosphorusPercentage": 8.1,
        "potassiumPercentage": 19.8,
        "sulphurPercentage": 5.5,
        "dryMatterPercentage": 100
      },
      {
        "name": "Fodderbooster",
        "nitrogenPercentage": 11.6,
        "phosphorusPercentage": 7.6,
        "potassiumPercentage": 19.6,
        "sulphurPercentage": 6,
        "dryMatterPercentage": 100
      },
      {
        "name": "General Compost",
        "nitrogenPercentage": 1.2,
        "phosphorusPercentage": 0.8,
        "potassiumPercentage": 0.8,
        "sulphurPercentage": 0.7,
        "dryMatterPercentage": 77
      },
      {
        "name": "Grass Blend",
        "nitrogenPercentage": 29.5,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 0,
        "sulphurPercentage": 15.8,
        "dryMatterPercentage": 100
      },
      {
        "name": "Grassbooster",
        "nitrogenPercentage": 29.7,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 0,
        "sulphurPercentage": 14.6,
        "dryMatterPercentage": 100
      },
      {
        "name": "Hay Blend",
        "nitrogenPercentage": 13.4,
        "phosphorusPercentage": 4.5,
        "potassiumPercentage": 23.8,
        "sulphurPercentage": 4.7,
        "dryMatterPercentage": 100
      },
      {
        "name": "Hayboosta",
        "nitrogenPercentage": 11.8,
        "phosphorusPercentage": 4.7,
        "potassiumPercentage": 23.6,
        "sulphurPercentage": 4.6,
        "dryMatterPercentage": 100
      },
      {
        "name": "Legume Gold",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 15,
        "potassiumPercentage": 0,
        "sulphurPercentage": 10,
        "dryMatterPercentage": 100
      },
      {
        "name": "MAP",
        "nitrogenPercentage": 10,
        "phosphorusPercentage": 21.8,
        "potassiumPercentage": 0,
        "sulphurPercentage": 1.5,
        "dryMatterPercentage": 100
      },
      {
        "name": "Muriate of Potash",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 50,
        "sulphurPercentage": 0,
        "dryMatterPercentage": 100
      },
      {
        "name": "Pasture Blend",
        "nitrogenPercentage": 23.8,
        "phosphorusPercentage": 3.6,
        "potassiumPercentage": 13,
        "sulphurPercentage": 5.3,
        "dryMatterPercentage": 100
      },
      {
        "name": "Pasture Gold",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 14,
        "potassiumPercentage": 0,
        "sulphurPercentage": 17,
        "dryMatterPercentage": 100
      },
      {
        "name": "Potassium Nitate",
        "nitrogenPercentage": 13,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 36.5,
        "sulphurPercentage": 0,
        "dryMatterPercentage": 100
      },
      {
        "name": "Poultry Manure (fresh)",
        "nitrogenPercentage": 3.9,
        "phosphorusPercentage": 1.8,
        "potassiumPercentage": 1.9,
        "sulphurPercentage": 0.5,
        "dryMatterPercentage": 90
      },
      {
        "name": "Shed bedding",
        "nitrogenPercentage": 0.21,
        "phosphorusPercentage": 0.06,
        "potassiumPercentage": 0.24,
        "sulphurPercentage": 0.04,
        "dryMatterPercentage": 69.05
      },
      {
        "name": "Sulphate of Ammonia",
        "nitrogenPercentage": 20.5,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 0,
        "sulphurPercentage": 23.5,
        "dryMatterPercentage": 100
      },
      {
        "name": "Sulphate of Potash",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 40.5,
        "sulphurPercentage": 17,
        "dryMatterPercentage": 100
      },
      {
        "name": "Superphosphate (Super)",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 8.8,
        "potassiumPercentage": 0,
        "sulphurPercentage": 11,
        "dryMatterPercentage": 100
      },
      {
        "name": "Triple Super",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 20.2,
        "potassiumPercentage": 0,
        "sulphurPercentage": 1,
        "dryMatterPercentage": 100
      },
      {
        "name": "Urea",
        "nitrogenPercentage": 46,
        "phosphorusPercentage": 0,
        "potassiumPercentage": 0,
        "sulphurPercentage": 0,
        "dryMatterPercentage": 100
      },
      {
        "name": "Super and Potash 1:1",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 4.4,
        "potassiumPercentage": 25,
        "sulphurPercentage": 5.5,
        "dryMatterPercentage": 100
      },
      {
        "name": "Super and Potash 2:1",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 5.9,
        "potassiumPercentage": 16.8,
        "sulphurPercentage": 7.3,
        "dryMatterPercentage": 100
      },
      {
        "name": "Super and Potash 3:1",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 6.6,
        "potassiumPercentage": 12.7,
        "sulphurPercentage": 8.2,
        "dryMatterPercentage": 100
      },
      {
        "name": "Super and Potash 4:1",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 7,
        "potassiumPercentage": 10,
        "sulphurPercentage": 8.8,
        "dryMatterPercentage": 100
      },
      {
        "name": "Super and Potash 5:1",
        "nitrogenPercentage": 0,
        "phosphorusPercentage": 7.4,
        "potassiumPercentage": 8,
        "sulphurPercentage": 9.2,
        "dryMatterPercentage": 100
      },
      {
        "name": "Pasturebooster",
        "nitrogenPercentage": 23.8,
        "phosphorusPercentage": 3.7,
        "potassiumPercentage": 12.8,
        "sulphurPercentage": 4,
        "dryMatterPercentage": 100
      }
    ]
  });