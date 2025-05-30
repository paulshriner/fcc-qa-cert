'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = app => {
  let solver = new SudokuSolver();
  let regex = /^[1-9.]+$/;

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (req.body.puzzle == undefined) {
        res.json({"error": "Required field missing"});
      } else if (req.body.puzzle.length != 81) {
        res.json({"error": "Expected puzzle to be 81 characters long"});
      } else {
        if (!regex.test(req.body.puzzle)) {
          res.json({"error": "Invalid characters in puzzle"});
        } else {
          res.json({"error": "Not really an error!"});
        }        
      }
    });
};
