console.log("Hello from form-chess/script.js");
function moveAllChess(moves) {
    let autoPlayInterval = null; // Lưu trữ interval cho Auto Play
    function letterToColumn(letter) {
      return letter.charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1, ...
    }
    function numberToRow(number) {
      return 8 - number;
    }
    function algebraicToCoordinates(move) {
      return {
        from: [numberToRow(parseInt(move[1])), letterToColumn(move[0])],
        to: [numberToRow(parseInt(move[3])), letterToColumn(move[2])],
      };
    }
    const chessBoard = document.getElementById("chessBoard");
    const prevMove = document.getElementById("prevMove");
    const nextMove = document.getElementById("nextMove");
    const goToFirst = document.getElementById("goToFirst");
    const goToLast = document.getElementById("goToLast");
    const initialBoard = [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ];

    let boardHistory = [cloneBoard(initialBoard)];
    let moveIndex = 0;

    const capturedPieces = { white: [], black: [] };

    function cloneBoard(board) {
      return board.map((row) => [...row]);
    }
    function goToFirstHandler() {
      moveIndex = 0;
      boardHistory = [cloneBoard(initialBoard)];
      renderBoard(boardHistory[0]);
    }
    function goToLastHandler() {
      while (moveIndex < moves.length) {
        const move = algebraicToCoordinates(moves[moveIndex]);
        applyMove(boardHistory[boardHistory.length - 1], move);
        moveIndex++;
      }
      renderBoard(boardHistory[boardHistory.length - 1]);
    }
    function autoPlayHandler() {
      const autoPlayButton = document.getElementById("autoPlay");
      if (autoPlayInterval) {
        // Nếu Auto Play đang chạy -> dừng lại
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayButton.textContent = "Auto Play";
      } else {
        // Nếu Auto Play đang dừng -> bắt đầu
        autoPlayInterval = setInterval(() => {
          if (moveIndex < moves.length) {
            const move = algebraicToCoordinates(moves[moveIndex]);
            applyMove(boardHistory[boardHistory.length - 1], move);
            renderBoard(boardHistory[boardHistory.length - 1]);
            moveIndex++;
          } else {
            // Dừng Auto Play nếu đã hết nước đi
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            autoPlayButton.textContent = "Auto Play";
          }
        }, 1000); // Mỗi bước đi sẽ thực hiện sau 1 giây
        autoPlayButton.textContent = "Pause";
      }
    }
    function renderBoard(board) {
      const fragment = document.createDocumentFragment();
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = document.createElement("div");
          square.textContent = board[row][col] || "";
          square.style.backgroundColor =
            (row + col) % 2 === 0 ? "#739552" : "#EBECD0";
          fragment.appendChild(square);
        }
      }
      chessBoard.innerHTML = "";
      chessBoard.appendChild(fragment);
    }

    function applyMove(board, move) {
      const [fromRow, fromCol] = move.from;
      const [toRow, toCol] = move.to;

      const newBoard = cloneBoard(board);

      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = "";

      boardHistory.push(newBoard);
    }

    function nextMoveHandler() {
      if (moveIndex < moves.length) {
        const move = algebraicToCoordinates(moves[moveIndex]);
        applyMove(boardHistory[boardHistory.length - 1], move);
        renderBoard(boardHistory[boardHistory.length - 1]);
        moveIndex++;
      }
    }

    function prevMoveHandler() {
      if (moveIndex > 0) {
        moveIndex--;
        boardHistory.pop();
        renderBoard(boardHistory[boardHistory.length - 1]);
      }
    }
    prevMove.addEventListener("click", prevMoveHandler);
    nextMove.addEventListener("click", nextMoveHandler);
    goToFirst.addEventListener("click", goToFirstHandler);
    goToLast.addEventListener("click", goToLastHandler);
    document
      .getElementById("autoPlay")
      .addEventListener("click", autoPlayHandler);
    renderBoard(boardHistory[0]);
  }
  const moves = [
    "e2e4",
    "d7d5",
    "e4d5",
    "d8d5",
    "d2d4",
    "d5d4",
    "c2c4",
    "d4c3",
    "b1c3",
    "b8d7",
    "c1e3",
    "g8f6",
    "e1g1",
    "f8e7",
    "f1d3",
    "e7d6",
    "d1d6",
    "c7c6",
    "d6d8",
    "e8d8",
    "d3d8",
    "c8d8",
  ];
  moveAllChess(moves);