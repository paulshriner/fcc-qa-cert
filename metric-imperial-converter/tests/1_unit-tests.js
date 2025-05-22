const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
    // #1
    test('convertHandler should correctly read a whole number input', () => {
        assert.equal(convertHandler.getNum("1gal"), 1);
        assert.equal(convertHandler.getNum("5mi"), 5);
    });

    // #2
    test('convertHandler should correctly read a decimal number input', () => {
        assert.equal(convertHandler.getNum("1.5gal"), 1.5);
        assert.equal(convertHandler.getNum("5.2341mi"), 5.2341);
    });

    // #3
    test('convertHandler should correctly read a fractional input', () => {
        assert.equal(convertHandler.getNum("1/2gal"), 0.5);
        assert.equal(convertHandler.getNum("3/4"), 0.75);
    });
    
    // #4
    test('convertHandler should correctly read a fractional input with a decimal', () => {
        assert.approximately(convertHandler.getNum("3.7692/5.9324mi"), 0.63532, 0.0001);
        assert.approximately(convertHandler.getNum("5.2752/1.5832mi"), 3.33198, 0.0001);
    });

    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
        assert.equal(convertHandler.getNum("1/2/2gal"), false);
        assert.equal(convertHandler.getNum("4/2/3gal"), false);
    });

    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.equal(convertHandler.getNum("gal"), 1);
        assert.equal(convertHandler.getNum("L"), 1);
        assert.equal(convertHandler.getNum("mi"), 1);
        assert.equal(convertHandler.getNum("km"), 1);
        assert.equal(convertHandler.getNum("lbs"), 1);
        assert.equal(convertHandler.getNum("kg"), 1);
    });

    // #7
    test('convertHandler should correctly read each valid input unit', () => {
        assert.equal(convertHandler.getUnit("1gal"), "gal");
        assert.equal(convertHandler.getUnit("1L"), "L");
        assert.equal(convertHandler.getUnit("1mi"), "mi");
        assert.equal(convertHandler.getUnit("1km"), "km");
        assert.equal(convertHandler.getUnit("1lbs"), "lbs");
        assert.equal(convertHandler.getUnit("1kg"), "kg");
    });

    // #8
    test('convertHandler should correctly return an error for an invalid input unit', () => {
        assert.equal(convertHandler.getUnit("1gg"), false);
        assert.equal(convertHandler.getUnit("1"), false);     
    });

    // #9
    test('convertHandler should return the correct return unit for each valid input unit', () => {
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });

    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
        assert.equal(convertHandler.spellOutUnit("L"), "liters");
        assert.equal(convertHandler.spellOutUnit("mi"), "miles");
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });

    // #11
    test('convertHandler should correctly convert gal to L', () => {
        assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });

    // #11
    test('convertHandler should correctly convert L to gal', () => {
        assert.equal(convertHandler.convert(3.78541, "L"), 1);
    });

    // #11
    test('convertHandler should correctly convert mi to km', () => {
        assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });

    // #11
    test('convertHandler should correctly convert km to mi', () => {
        assert.equal(convertHandler.convert(1.60934, "km"), 1);
    });

    // #11
    test('convertHandler should correctly convert lbs to kg', () => {
        assert.equal(convertHandler.convert(1, "lbs"), 0.453592);
    });

    // #11
    test('convertHandler should correctly convert kg to lbs', () => {
        assert.equal(convertHandler.convert(0.453592, "kg"), 1);
    });
});
