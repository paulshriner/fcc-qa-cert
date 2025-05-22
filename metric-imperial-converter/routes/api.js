'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // handles /api/convert?input=3.1gal
  app.get('/api/convert', (req, res) => {
    // use ConvertHandler to find all values based on input
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    
    // output to user
    if (!initNum && !initUnit) {
      res.send("invalid number and unit");
    } else if (!initNum) {
      res.send("invalid number");
    } else if (!initUnit) {
      res.send("invalid unit");
    } else {
      // thanks https://www.sitepoint.com/rounding-numbers-javascript/ for toFixed and Number
      // rounds to 5 decimal places, ensures value is numeric
      let returnNum = Number(convertHandler.convert(initNum, initUnit).toFixed(5));
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let outString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": outString
      });
    }
  });
};
