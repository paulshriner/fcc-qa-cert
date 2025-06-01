// thanks https://stackoverflow.com/a/51368342 for import syntax
import {puzzlesAndSolutions, invalidCharsValidLength, validCharsInvalidLength} from '../controllers/puzzle-strings.js';

const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    // #1
    test('Logic handles a valid puzzle string of 81 characters', () => {
        for (let i = 0; i < puzzlesAndSolutions.length; ++i) {
            assert.equal(puzzlesAndSolutions[i][0], solver.validate(puzzlesAndSolutions[i][0], "solve"));
            assert.equal(puzzlesAndSolutions[i][1], solver.validate(puzzlesAndSolutions[i][1], "solve"));
        }
    });

    // #2
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.equal(JSON.stringify({"error": "Invalid characters in puzzle"}), JSON.stringify(solver.validate(invalidCharsValidLength, "solve")));
    });

    // #3
    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.equal(JSON.stringify({"error": "Expected puzzle to be 81 characters long"}), JSON.stringify(solver.validate(validCharsInvalidLength, "solve")));
    });

    // #4
    test('Logic handles a valid row placement', () => {
        assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'D', 5, 1));
        assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'G', 7, 5));
    });

    // #5
    test('Logic handles an invalid row placement', () => {
        assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'B', 1, 1));
        assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'E', 4, 3));        
    });

    // #6
    test('Logic handles a valid column placement', () => {
        assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'D', 5, 1));
        assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'G', 7, 5));        
    });

    // #7
    test('Logic handles an invalid column placement', () => {
        assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'B', 1, 1));
        assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'E', 4, 3));         
    });

    // #8
    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'D', 5, 1));
        assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'G', 7, 5));         
    });

    // #9
    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'B', 1, 1));
        assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'E', 4, 3));         
    });

    // #10
    test('Valid puzzle strings pass the solver', () => {
        for (let i = 0; i < puzzlesAndSolutions.length; ++i) {
            assert.isNotFalse(solver.solve(puzzlesAndSolutions[i][0]));
        }        
    });

    // #11
    test('Invalid puzzle strings fail the solver', () => {
        assert.isFalse(solver.solve(invalidCharsValidLength));
        assert.isFalse(solver.solve(validCharsInvalidLength));
    });

    // #12
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        for (let i = 0; i < puzzlesAndSolutions.length; ++i) {
            assert.equal(puzzlesAndSolutions[i][1], solver.solve(puzzlesAndSolutions[i][0]));
        }        
    });
});
