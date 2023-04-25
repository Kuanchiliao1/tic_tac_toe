const Gameboard = (function() {
  return ["X", "X", "X", "X", "X", "X", "X", "X", "X"]
})()

const PlayerFactory = (name, marker) => {
  const markSpot = (gridElement) => {
    gridElement.textContent = marker
  }

  return {name, marker}
}

const DisplayController = (function() {
  const playerOne = PlayerFactory("Tony", "O")

  const renderGameboard = () => {
    const gameboardEl = document.getElementById("gameboard")

    for (let i = 0; i < Gameboard.length; i++) {
      const cellEl = document.createElement("div")
      cellEl.classList.add("gameboard__cell")
      cellEl.textContent = Gameboard[i]
      gameboardEl.append(cellEl)
    }
  }

  return {renderGameboard}
})()

DisplayController.renderGameboard()