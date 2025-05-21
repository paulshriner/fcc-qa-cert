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
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let outString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    // output to user
    if (initNum === -1 && initUnit === -1) {
      res.send("invalid number and unit");
    } else if (initNum === -1) {
      res.send("invalid number");
    } else if (initUnit === -1) {
      res.send("invalid unit");
    } else {
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
