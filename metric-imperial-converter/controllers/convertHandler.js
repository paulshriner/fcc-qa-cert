// Matches strings with numbers, decimal points, and slashes from beginning
const numRegex = /^[\d\.\/]+/g;
// starts from end of string, checks for valid unit
const unitRegex = /[gal|L|mi|km|lbs|kg]+$/gi;
// checks if no number was provided
const beginUnitRegex = /^[gal|L|mi|km|lbs|kg]+$/gi;

function ConvertHandler() {
  this.getNum = function(input) {
    // check against regex
    let result = input.match(numRegex);

    if (result !== null && result[0] != 0) {
      // check for fractions
      // thanks https://stackoverflow.com/questions/7142657/convert-fraction-string-to-decimal for converting string fraction to number
      let split = result[0].split('/');
      if (split.length === 2) {
        // check for valid decimal points
        let splitNum = split[0].split('.');
        let splitDen = split[1].split('.');

        if (splitNum.length <= 2 && splitDen.length <= 2 && split[1] != 0) {
          return split[0] / split[1];
        }
      } else if (split.length < 2) {
        let split = result[0].split('.');

        if (split.length <= 2) {
          return Number(split);
        }
      }
    } else {
      let unit = input.match(beginUnitRegex);
      
      if (unit !== null) {
        return 1;
      }
    }

    return false;
  };
  
  this.getUnit = function(input) {
    // check against regex
    let result = input.match(unitRegex);

    if (result !== null) {
      let lowerResult = result[0].toLowerCase();

      // liters needs to be capital, rest are lowercase
      if (lowerResult === "l") {
        return "L";
      }

      return lowerResult;
    }
    
    return false;
  };
  
  this.getReturnUnit = function(initUnit) {
    // this assumes that initUnit has been correctly processed by getUnit
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "??";
    }
  };

  this.spellOutUnit = function(unit) {
    // this assumes that unit has been correctly processed by getUnit
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "??";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch (initUnit) {
      // this assumes that unit has been correctly processed by getUnit
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum / galToL;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
      default:
        return "??";
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };
}

module.exports = ConvertHandler;
