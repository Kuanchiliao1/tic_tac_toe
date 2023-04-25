const Gameboard = (function () {
  return ['', '', '', '', '', '', '', '', ''];
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
    console.log(cellId);
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
