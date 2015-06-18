#FarmBuild Dairy Nutrient Calculator

This is the dairy nutrient calculator component of FarmBuild project.

version 1.0.0


## Getting Started

To get you started use the navigation on the left side of this page to explore different function of nutrient calculator.


## Units
In all calculations we are using metric units.

* Weight unit is Kg. If you need other units, like tonnes, you need to convert it in your application.

## Exception handling
All functions return undefined in case that there is an error related to wrong input values.

## Google Analytics for tracking API usage
DEDJTR wants to understand the usage of the API, so please include the below API when you call calculate function.
The track API calls GA using its own tracking name so you can embedded in your application even though you already have
GA implementation.

Example
```
//Calling the calculate API
farmbuild.nutrientCalculator.calculate(farmData);
var organisationName = 'your organisation name';
//Calling the track API for the usage
farmbuild.nutrientCalculator.ga.trackCalculate(organisationName);
```

