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

    checkForWinner() {
        // Vertical check.
        for (let i = 0; i < this.board.columns; i++) {
            if (this.board.cells[0][i].isOccupied() &&
                this.board.cells.every(row => row[i].token === this.board.cells[0][i].token)) {
                return this.getPlayerByToken(this.board.cells[0][i].token);
            }
        }

        // Horizontal check.
        for (let i = 0; i < this.board.rows; i++) {
            if (this.board.cells[i][0].isOccupied() &&
                this.board.cells[i].every(cell => cell.token === this.board.cells[i][0].token)) {
                return this.getPlayerByToken(this.board.cells[i][0].token);
            }
        }

        // Diagonal check (top-left to bottom-right).
        if (this.board.cells[0][0].isOccupied() &&
            this.board.cells.every((row, i) => row[i].token === this.board.cells[0][0].token)) {
            return this.getPlayerByToken(this.board.cells[0][0].token);
        }

        // Diagonal check (top-right to bottom-left).
        if (this.board.cells[0][this.board.columns - 1].isOccupied() &&
            this.board.cells.every((row, i) => row[this.board.columns - 1 - i].token === this.board.cells[0][this.board.columns - 1].token)) {
            return this.getPlayerByToken(this.board.cells[0][this.board.columns - 1].token);
        }

        return null;
    }
}