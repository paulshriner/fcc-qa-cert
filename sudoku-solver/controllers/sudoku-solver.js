const puzzleRegex = /^[1-9.]+$/;

class SudokuSolver {
  // mode is either "check" or "solve", this is because both have different "required fields" message
  // return either error msg or string
  validate(puzzleString, mode) {
    if (puzzleString == undefined) {
      return mode == "check" ? {"error": "Required field(s) missing"} : {"error": "Required field missing"};
    } else if (puzzleString.length != 81) {
      return {"error": "Expected puzzle to be 81 characters long"};
    } else if (!puzzleRegex.test(puzzleString)) {
      return {"error": "Invalid characters in puzzle"};
    }

    return puzzleString;
  }
  
  checkRowPlacement(puzzleString, row, column, value) {
    // row is just the sequence of 9 numbers starting with beginning, which is the offset
    let offset = this.letterToNum(row);
    let checkRow = puzzleString.slice(offset, offset + 9);
    let count = 0;

    // get count of value in row
    for (let i = 0; i < checkRow.length; ++i) {
      if (checkRow[i] == value) ++count;
    }

    // can't have value twice
    if (count > 1) return false;

    // if it isn't there then it's valid, if it is then see if it was already there
    return count == 0 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    // each value in the column is from a different row, so we skip by 9 to get each one
    let checkColumn = "";
    for (let i = parseInt(column) - 1; i < 81; i += 9) {
      checkColumn = checkColumn.concat(puzzleString[i]);
    }

    // (index finding similar to checkRowPlacement)
    let offset = this.letterToNum(row);
    let count = 0;

    for (let i = 0; i < checkColumn.length; ++i) {
      if (checkColumn[i] == value) ++count;
    }

    if (count > 1) return false;

    return count == 0 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // represents upper left cell of region we are looking in
    let regionRow = this.getStartOfRegionRow(row);
    let regionCol = this.getStartOfRegionCol(parseInt(column));

    // get each row of the region
    let checkRegion = "";
    for (let i = regionRow; i < regionRow + 27; i += 9) {
      checkRegion = checkRegion.concat(puzzleString.slice(i + regionCol, i + regionCol + 3));
    }

    // (index finding similar to checkRowPlacement)
    let offset = this.letterToNum(row);
    let count = 0;

    for (let i = 0; i < checkRegion.length; ++i) {
      if (checkRegion[i] == value) ++count;
    }

    if (count > 1) return false;

    return count == 0 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
  }

  solve(puzzleString) {
    let slots = [];
    let solved = false;

    while (!solved) {
      // go through entire puzzleString
      // for each slot, find which numbers would be valid, add to slots array
      for (let i = 0; i < 81; i += 9) {
        for (let j = 1; j <= 9; ++j) {
          let nums = [];
          if (puzzleString[i + j - 1] != '.') {
            // here, the number was already in the string, so as long as there's no conflict then just insert this number
            // if there is a conflict, we immediately know the puzzle is unsolvable
            if (this.insertIntoPuzzle(puzzleString, i, j, puzzleString[i + j - 1])) {
              nums.push(parseInt(puzzleString[i + j - 1]));
            } else {
              return false;
            }
          } else {
            // slot in puzzleString is not filled, so go through 1-9 and push numbers that don't immediately cause a conflict
            for (let k = 1; k <= 9; ++k) {
              if (this.insertIntoPuzzle(puzzleString, i, j, k)) {
                nums.push(k);
              }
            }
  
            // if no nums were found, puzzle can't be solved
            if (nums.length == 0) return false;
          }
  
          // set corresponding slots position to nums found
          slots[i + j - 1] = nums;
        }
      }

      // if there was only 1 number found then set it's slot in the puzzle
      let newPuzzle = puzzleString.split('');
      for (let i = 0; i < 81; ++i) {
        if (slots[i].length == 1) {
          newPuzzle[i] = slots[i];
        }
      }
      newPuzzle = newPuzzle.join('');

      // here, the puzzle wasn't changed because no new slots were filled where only 1 number was possible
      if (puzzleString == newPuzzle) {
        // find slot with smallest number of possibilites
        let index = -1;
        for (let i = 0; i < 81; ++i) {
          if (index == -1 && slots[i].length > 1) {
            index = i;
          } else if (slots[i].length > 1 && slots[i].length < slots[index].length) {
            index = i;
          }
        }

        // go through each num, if it fails then use backtracking to try again
        for (let i = 0; i < slots[index].length; ++i) {
          newPuzzle = newPuzzle.split('');
          newPuzzle[index] = slots[index][i];
          newPuzzle = newPuzzle.join('');
          if (this.solve(newPuzzle)) break;
        }
      }

      puzzleString = newPuzzle;

      // no empty slots means we are done!
      if (!puzzleString.includes('.')) {
        solved = true;
      }
    }

    return puzzleString;
  }

  // Returns if the value can be inserted at the position given by row and column
  insertIntoPuzzle(puzzleString, row, column, value) {
    return this.checkRowPlacement(puzzleString, row, column, value) && this.checkColPlacement(puzzleString, row, column, value) && this.checkRegionPlacement(puzzleString, row, column, value);
  }

  // Helper function to get string index corresponding to beginning of row
  // if non-letter is passed, it simply gets returned (helpful if you already have num equiv)
  letterToNum(letter) {
    switch (letter) {
      case 'A':
        return 0;
      case 'B':
        return 9;
      case 'C':
        return 18;
      case 'D':
        return 27;
      case 'E':
        return 36;
      case 'F':
        return 45;
      case 'G':
        return 54;
      case 'H':
        return 63;
      case 'I':
        return 72;
    }

    return letter;
  }

  // Helper function to get row corresponding to beginning of region, works with both letter and number
  getStartOfRegionRow(value) {
    switch (value) {
      case 'A':
      case 'B':
      case 'C':
      case 0:
      case 9:
      case 18:
        return 0;
      case 'D':
      case 'E':
      case 'F':
      case 27:
      case 36:
      case 45:
        return 27;
      case 'G':
      case 'H':
      case 'I':
      case 54:
      case 63:
      case 72:
        return 54;
    }

    return -1;
  }

  // Helper function to get column corresponding to beginning of region
  getStartOfRegionCol(value) {
    switch (value) {
      case 1:
      case 2:
      case 3:
        return 0;
      case 4:
      case 5:
      case 6:
        return 3;
      case 7:
      case 8:
      case 9:
        return 6;
    }

    return value;
  }
}

module.exports = SudokuSolver;

