const Gameboard = (function () {
  const board = new Array(9);

  const isGameOver = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 6],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    const isThereWinner = winningLines.some(array => {
      const [firstCell, secondCell, thirdCell] = array
      return (firstCell === secondCell) && (secondCell === thirdCell)
    })

    const isBoardFull = board.filter(typeof cell === "string") === 0
  };

  const getWinnerMarker = () => {

  }
  const isGameOver = () => {}

  return board;
})();

const PlayerFactory = (name, marker) => {
  const markSpot = function (gridElement, otherPlayer) {
    const cellId = gridElement.id;
    const isCellEmpty = !Gameboard[cellId];

    if (isCellEmpty) {
      Gameboard[cellId] = marker;
      this.isCurrentPlayer = false;
      otherPlayer.isCurrentPlayer = true;
    } else {
      alert('pick something else!');
    }
    DisplayController.renderGameboard();
  };

  const isCurrentPlayer = false;

  return { name, marker, isCurrentPlayer, markSpot };
};

const DisplayController = (function () {
  const playerOne = PlayerFactory('Tony', 'O');
  const playerTwo = PlayerFactory('Sam', 'X');
  const gameboardEl = document.getElementById('gameboard');

  const addEventListeners = () => {
    gameboardEl.addEventListener('click', (event) => {
      const cellEl = event.target;
      if (playerOne.isCurrentPlayer) {
        playerOne.markSpot(cellEl, playerTwo);
      } else {
        playerTwo.markSpot(cellEl, playerOne);
      }
    });
  };

  const renderGameboard = () => {
    gameboardEl.innerHTML = '';

    for (let i = 0; i < Gameboard.length; i++) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('gameboard__cell');
      cellEl.id = i;
      cellEl.textContent = Gameboard[i];
      gameboardEl.append(cellEl);
    }
  };

  return { renderGameboard, addEventListeners };
})();

DisplayController.addEventListeners();
DisplayController.renderGameboard();
