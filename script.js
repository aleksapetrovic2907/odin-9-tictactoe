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

    tryPlayMove(row, column) {
        if (this.board.trySetCellToken(row, column, this.turn.token)) {
            this.swapTurn();
            return true;
        }

        return false;
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

    checkForDraw() {
        const isBoardFull = this.board.cells.every(row => row.every(cell => cell.isOccupied()));
        const noWinner = this.checkForWinner() === null;

        return isBoardFull && noWinner;
    }
}

// Generate players.
const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

// Generate game.
const game = new Game(player1, player2);

// Generate board in DOM.
const board = document.querySelector(".board");

for (let i = 0; i < game.board.rows; i++) {
    for (let j = 0; j < game.board.columns; j++) {
        let empty_cell = document.createElement("div");
        empty_cell.classList.add("cell");
        empty_cell.id = `${i},${j}`;
        empty_cell.addEventListener("click", () => {
            makeMove(empty_cell.id);
        });

        board.appendChild(empty_cell);
    }
}

function makeMove(cellId) {
    let cellIdArray = cellId.split(',');
    let x = cellIdArray[0];
    let y = cellIdArray[1];
    game.tryPlayMove(x, y);
}