const EMPTY_CELL = undefined;

function Cell(row, col, value = EMPTY_CELL) {
    this.row = row;
    this.col = col;
    this.value = value;
}