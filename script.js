const EMPTY_CELL = undefined;

class Cell {
    constructor(row, col, value = EMPTY_CELL) {
        this.row = row;
        this.col = col;
        this.value = value;
    }

    isEmpty() {
        return this.value === EMPTY_CELL;
    }

    isOccupied() {
        return this.value !== EMPTY_CELL;
    }
}

class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];

        for (let i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < columns; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }
}