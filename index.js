const restartBtnEl = document.getElementById('restart-btn');
const nameInputBtnEl = document.getElementById('name-input-btn');
const formEl = document.getElementById('name-input');
const playerMarkerEl = document.getElementById('player-marker-display');
const gameboardEl = document.getElementById('gameboard');

const Gameboard = (function () {
  const board = new Array(9);

  // Private methods
  const markerCount = function () {
    return this.board.filter((cell) => cell).length;
  };

  // Public methods
  const getWinningMarker = function () {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    let winningMarker = '';
    const currentBoard = this.board;

    winningLines.forEach((array) => {
      const [firstCell, secondCell, thirdCell] = array;

      if (
        currentBoard[firstCell] === currentBoard[secondCell] &&
        currentBoard[secondCell] === currentBoard[thirdCell] &&
        currentBoard[firstCell]
      ) {
        winningMarker = currentBoard[firstCell];
      }
    });

    return winningMarker;
  };

  const isCatsGame = function () {
    return (
      markerCount.call(this) === this.board.length &&
      !getWinningMarker.call(this)
    );
  };

  const freeze = function () {
    Object.freeze(this.board);
  };

  const resetBoard = function () {
    this.board = new Array(9);
  };

  return {
    board,
    getWinningMarker,
    markerCount,
    isCatsGame,
    freeze,
    resetBoard,
  };
})();

const PlayerFactory = (name, marker) => {
  const markSpot = function (id, otherPlayer) {
    const isCellEmpty = !Gameboard.board[id];

    if (isCellEmpty) {
      Gameboard.board[id] = marker;
      this.isCurrentPlayer = false;
      otherPlayer.isCurrentPlayer = true;
    } else {
      alert('cell is full!');
    }
  };

  const isCurrentPlayer = false;

  return { name, marker, isCurrentPlayer, markSpot };
};

const DisplayController = (function () {
  const playerOne = PlayerFactory('Tony', 'O');
  const playerTwo = PlayerFactory('Sam', 'X');

  const addEventListeners = () => {
    gameboardEl.addEventListener('click', (event) => {
      const cellId = event.target.id;

      if (playerOne.isCurrentPlayer) {
        playerOne.markSpot(cellId, playerTwo);
      } else {
        playerTwo.markSpot(cellId, playerOne);
      }

      // if cell empty => 
        // else => alert that cell is full

      const winningMarker = Gameboard.getWinningMarker();
      if (winningMarker) {
        Gameboard.freeze();
        DisplayController.renderGameboard();
        alert(`Game is over! ${"Default player"} has won`);
      }

      if (Gameboard.isCatsGame()) {
        alert('cats game!');
      }
      DisplayController.renderGameboard();
    });

    formEl.addEventListener('submit', (event) => {
      const formData = new FormData(formEl);
      event.preventDefault();
      formEl.style.display = 'none';
      playerMarkerEl.textContent = `${formData.get(
        'player-one'
      )} is "X" || ${formData.get('player-two')} is "O"`;
    });

    restartBtnEl.addEventListener('click', (event) => {
      formEl.style.display = 'flex';
      clearGameboard();
    });
  };

  const renderGameboard = () => {
    gameboardEl.innerHTML = '';

    for (let i = 0; i < Gameboard.board.length; i++) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('gameboard__cell');
      cellEl.id = i;
      cellEl.textContent = Gameboard.board[i];
      gameboardEl.append(cellEl);
    }
  };

  const clearGameboard = () => {
    Gameboard.resetBoard();
    renderGameboard();
  };

  return { renderGameboard, addEventListeners };
})();

DisplayController.addEventListeners();
DisplayController.renderGameboard();
