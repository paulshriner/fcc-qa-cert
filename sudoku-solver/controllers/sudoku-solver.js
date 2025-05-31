class SudokuSolver {
  checkRowPlacement(puzzleString, row, column, value) {
    // row is just the sequence of 9 numbers starting with beginning, which is the offset
    let offset = this.letterToNum(row);
    let checkRow = puzzleString.slice(offset, offset + 9);

    // find index within row
    let index = checkRow.indexOf(parseInt(value));

    // if index is -1 then it wasn't found. otherwise it was, but we need to make sure it's not the same
    // as one that's already filled (since that is valid)
    return index == -1 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    // each value in the column is from a different row, so we skip by 9 to get each one
    let checkColumn = "";
    for (let i = parseInt(column) - 1; i < 81; i += 9) {
      checkColumn = checkColumn.concat(puzzleString[i]);
    }

    // (index finding similar to checkRowPlacement)
    let offset = this.letterToNum(row);
    let index = checkColumn.indexOf(parseInt(value));

    return index == -1 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
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
    let index = checkRegion.indexOf(parseInt(value));

    return index == -1 || puzzleString[offset + parseInt(column) - 1] == parseInt(value);
  }

  solve(puzzleString) {
    
  }

  // Helper function to get string index corresponding to beginning of row
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

    return -1;
  }

  // Helper function to get row corresponding to beginning of region
  getStartOfRegionRow(letter) {
    switch (letter) {
      case 'A':
      case 'B':
      case 'C':
        return 0;
      case 'D':
      case 'E':
      case 'F':
        return 27;
      case 'G':
      case 'H':
      case 'I':
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

    return -1;
  }
}

module.exports = SudokuSolver;

