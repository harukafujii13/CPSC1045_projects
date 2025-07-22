let board = [];

for (let row = 0; row < 8; row++) {
  board[row] = [];

  for (let col = 0; col < 8; col++) {
    if (row < 3 && (row + col) % 2 === 1) {
      board[row][col] = "gray";
    } else if (row > 4 && (row + col) % 2 === 1) {
      board[row][col] = "red";
    } else {
      board[row][col] = "";
    }
  }
}

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function drawPieces() {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] == "red" || board[x][y] == "gray") {
        ctx.fillStyle = board[x][y];
        ctx.beginPath();
        ctx.arc(y * 100 + 50, x * 100 + 50, 35, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

//Step3
function drawBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "black";
      }

      ctx.fillRect(col * 100, row * 100, 100, 100);
      ctx.strokeRect(col * 100, row * 100, 100, 100);
    }
  }
}

//Step5
window.addEventListener("load", () => {
  drawBoard();
  drawPieces();
});

//Step6
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor(x / 100);
  const row = Math.floor(y / 100);

  console.log(`row: ${row}, col: ${col}`);
});
