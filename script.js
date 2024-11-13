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

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Board(3, 3);
        this.turn = this.player1;
    }

    swapTurn() {
        this.turn = this.turn === this.player1 ? this.player2 : this.player1;
    }

    getPlayerByToken(token) {
        if (token === this.player1.token) return this.player1;
        if (token === this.player2.token) return this.player2;
        return null;
    }
}