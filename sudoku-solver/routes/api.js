'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = app => {
  let solver = new SudokuSolver();
  const puzzleRegex = /^[1-9.]+$/;
  const valueRegex = /^[1-9]$/;
  const coordRegex = /^[A-I][1-9]$/;

  app.route('/api/check')
    .post((req, res) => {
      let testString = solver.validate(req.body.puzzle, "check");

      if (testString != req.body.puzzle) {
        res.json(testString);
      } else if (req.body.coordinate == undefined || req.body.value == undefined) {
        res.json({"error": "Required field(s) missing"});
      } else if (!valueRegex.test(req.body.value)) {
        res.json({"error": "Invalid value"});
      } else if (!coordRegex.test(req.body.coordinate)) {
        res.json({"error": "Invalid coordinate"});
      } else {
        // result is true if no conflict, false otherwise
        let row = solver.checkRowPlacement(req.body.puzzle, req.body.coordinate[0], parseInt(req.body.coordinate[1]), req.body.value);
        let col = solver.checkColPlacement(req.body.puzzle, req.body.coordinate[0], parseInt(req.body.coordinate[1]), req.body.value);
        let region = solver.checkRegionPlacement(req.body.puzzle, req.body.coordinate[0], parseInt(req.body.coordinate[1]), req.body.value);

        // store conflict types to be used in return message
        let conflict = [];
        if (!row) conflict.push("row");
        if (!col) conflict.push("column");
        if (!region) conflict.push("region");

        if (conflict.length != 0) {
          res.json({
            "valid": false,
            "conflict": conflict
          });
        } else {
          res.json({"valid": true});
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let testString = solver.validate(req.body.puzzle, "solve");
      
      if (testString != req.body.puzzle) {
        res.json(testString);
      } else {
        let solvedPuzzle = solver.solve(req.body.puzzle);

        if (!solvedPuzzle) {
          res.json({"error": "Puzzle cannot be solved"});
        } else {
          res.json({
            solution: solvedPuzzle
          });
        }
      }
    });
};
