const EMPTY_CELL_TOKEN = undefined;

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.token = EMPTY_CELL_TOKEN;
    }

    isEmpty() {
        return this.token === EMPTY_CELL_TOKEN;
    }

    isOccupied() {
        return this.token !== EMPTY_CELL_TOKEN;
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

    trySetCellToken(row, col, token) {
        const targetCell = this.cells[row][col];
        if (targetCell.isOccupied()) {
            return false;
        }

        targetCell.token = token;
        return true;
    }
}

class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}