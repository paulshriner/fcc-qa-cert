// Start at beginning of string, look for fraction, decimal, or whole number. Then look for unit.
const regex = /^(\d+\/[1-9]+|\d*\.\d+|\d+)(gal|L|mi|km|lbs|kg)/;
// Similar but start at end to get unit
const unitRegex = /(\d+\/[1-9]+|\d*\.\d+|\d+)?(gal|L|mi|km|lbs|kg)$/;

function ConvertHandler() {
  this.getNum = function(input) {
    // check against regex
    let result = input.match(regex);

    if (result === null) {
      // invalid number, possibly with invalid or valid unit, but that is not checked here
      return -1;
    } else if (result[1] === undefined) {
      // did not enter in number, default to 1
      return 1;
    }

    // thanks https://stackoverflow.com/questions/7142657/convert-fraction-string-to-decimal for converting string fraction to number
    let split = result[1].split('/');
    if (split.length === 2) {
      return split[0] / split[1];
    }
    
    return parseFloat(result[1]);
  };
  
  this.getUnit = function(input) {
    // check against regex
    let result = input.match(unitRegex);

    if (result === null) {
      // invalid result
      return -1;
    } else if (result[2] === undefined) {
      // invalid unit, possibly with invalid or valid number, but that is not checked here
      return -1;
    }
    
    return result[2];
  };
  
  this.getReturnUnit = function(initUnit) {
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
