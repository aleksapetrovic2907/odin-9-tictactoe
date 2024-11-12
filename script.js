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