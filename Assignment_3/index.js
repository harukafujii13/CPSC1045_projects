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
  } else {
    const selectedPiece = getSelectedPiece();

    if (selectedPiece && selectedPiece.isValidMove(row, col)) {
      board[selectedPiece.row][selectedPiece.col] = null;

      selectedPiece.move(row, col);

      board[row][col] = selectedPiece;

      selectedPiece.isClicked = false;
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
  this.checkKing = function () {
    if (
      (this.color == "red" && this.row == 0) ||
      (this.color == "gray" && this.row == 7)
    ) {
      this.isKing = true;
    }
  };

  this.move = function (newRow, newCol) {
    this.row = newRow;
    this.col = newCol;
    this.checkKing();
  };

  this.isValidMove = function (newRow, newCol) {
    if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
      return false;
    }
    if ((newRow + newCol) % 2 == 0) {
      return false;
    }
    if (board[newRow][newCol] != null) {
      return false;
    }

    let rowDiff = newRow - this.row;
    let colDiff = newCol - this.col;

    if (
      (colDiff == 1 || colDiff == -1) &&
      ((this.isKing && (rowDiff == 1 || rowDiff == -1)) ||
        (this.color == "red" && rowDiff == -1) ||
        (this.color == "gray" && rowDiff == 1))
    ) {
      return true;
    }

    if (
      (colDiff === 2 || colDiff === -2) &&
      ((this.isKing && (rowDiff === 2 || rowDiff === -2)) ||
        (this.color === "red" && rowDiff === -2) ||
        (this.color === "gray" && rowDiff === 2))
    ) {
      const middleRow = (this.row + newRow) / 2;
      const middleCol = (this.col + newCol) / 2;
      const middlePiece = board[middleRow][middleCol];

      if (middlePiece !== null && middlePiece.color !== this.color) {
        board[middleRow][middleCol] = null;
        return true;
      }
    }

    return false;
  };

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

    if (this.isKing) {
      // eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(centerX - 10, centerY - 10, 3, 0, 2 * Math.PI);
      ctx.arc(centerX + 10, centerY - 10, 3, 0, 2 * Math.PI);
      ctx.fill();

      // smile
      ctx.beginPath();
      ctx.arc(centerX, centerY + 5, 8, 0, Math.PI);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };
}

// step5_assignment2

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
