let board = [];

for (let row = 0; row < 8; row++) {
  board[row] = [];

  for (let col = 0; col < 8; col++) {
    if (row < 3 && (row + col) % 2 === 1) {
      board[row][col] = new Piece(row, col, "gray");
    } else if (row > 4 && (row + col) % 2 === 1) {
      board[row][col] = new Piece(row, col, "red");
    } else {
      board[row][col] = null;
    }
  }
}

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function drawPieces() {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] != null) {
        ctx.fillStyle = board[x][y];
        board[x][y].draw(ctx);
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

//Step6_assignment2
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor(x / 100);
  const row = Math.floor(y / 100);

  // console.log(`row: ${row}, col: ${col}`);

  const clickedPiece = board[row][col];
  if (clickedPiece !== null) {
    const selectedPiece = getSelectedPiece();

    if (selectedPiece && selectedPiece !== clickedPiece) {
      selectedPiece.isClicked = false;
      clickedPiece.isClicked = !clickedPiece.isClicked;
    } else if (!selectedPiece || selectedPiece === clickedPiece) {
      clickedPiece.isClicked = !clickedPiece.isClicked;
    }
  }
  drawBoard();
  drawPieces();
});

// step1,2_assignment2
function Piece(row, col, color) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.isClicked = false;
  this.isKing = false;

  // step5_assignment2
  this.draw = function (ctx) {
    const centerX = this.col * 100 + 50;
    const centerY = this.row * 100 + 50;

    if (this.isClicked) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, 2 * Math.PI);
    ctx.fill();
  };
}

// step3_assignment2
// refactored some functions

// step4_assignment2
function getSelectedPiece() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      let piece = board[row][col];
      if (piece !== null && piece.isClicked === true) {
        return piece;
      }
    }
  }
  return null;
}
