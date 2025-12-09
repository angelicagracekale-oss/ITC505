const SIZE = 5;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const shuffleBtn = document.getElementById("shuffleBtn");

    createTiles(board);
    scramble(board);

    shuffleBtn.addEventListener("click", () => {
        resetBoard(board);
        scramble(board);
        document.getElementById("message").textContent = "New puzzle ready!";
    });

    board.addEventListener("click", (e) => {
        const tile = e.target.closest(".tile");
        if (!tile) return;

        const row = Number(tile.dataset.row);
        const col = Number(tile.dataset.col);
        toggleGroup(board, row, col, true);
    });
});

/* Create the tile elements */
function createTiles(board) {
    board.innerHTML = "";

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const div = document.createElement("div");
            div.classList.add("tile", "on");
            div.dataset.row = r;
            div.dataset.col = c;
            board.appendChild(div);
        }
    }
}

/* Reset to solved (all ON) */
function resetBoard(board) {
    board.querySelectorAll(".tile").forEach(tile => {
        tile.classList.remove("off");
        tile.classList.add("on");
    });
}

/* Random solvable scramble */
function scramble(board) {
    const moves = random(12, 25);

    for (let i = 0; i < moves; i++) {
        const r = random(0, SIZE - 1);
        const c = random(0, SIZE - 1);
        toggleGroup(board, r, c, false); // don't check win during shuffle
    }
}

/* Toggle tile + neighbors */
function toggleGroup(board, r, c, checkWin) {
    toggle(board, r, c);     // self
    toggle(board, r - 1, c); // up
    toggle(board, r + 1, c); // down
    toggle(board, r, c - 1); // left
    toggle(board, r, c + 1); // right

    if (checkWin && isClear(board)) {
        window.alert("You win!");
        document.getElementById("message").textContent = "Congratulations!";
    }
}

/* Toggle a single tile */
function toggle(board, r, c) {
    if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return;

    const tile = board.querySelector(`.tile[data-row="${r}"][data-col="${c}"]`);
    tile.classList.toggle("on");
    tile.classList.toggle("off");
}

/* Check win: all tiles ON */
function isClear(board) {
    return !board.querySelector(".off");
}

/* Random helper */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
