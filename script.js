const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return {
    getSign
  }
};

const GameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index, sign) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    };
  };

  return {
    setField,
    getField,
    reset
  }
})();


const displayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const text = document.getElementById('text');
  const button = document.getElementById('restart');

  const updateGameBoard = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = GameBoard.getField(i);
    }
  };

  cells.forEach((cell) =>
    cell.addEventListener('click', (e) => {
      if (gameController.getIsOver() || e.target.textContent !== '') return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameBoard();
    }));

  button.addEventListener('click', (e) => {
    GameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setTurnMessage(`It is player X's turn`)
  });

  const setResultText = (winner) => {
    if (winner === 'Draw') {
      setTurnMessage(`It is a draw!`)
    } else {
      setTurnMessage(`Player ${winner} has won!`);
    };
  };

  const setTurnMessage = (message) => {
    text.textContent = message;
  };

  return {
    setResultText,
    setTurnMessage
  }
})();

const gameController = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let round = 1;
  isGameOver = false;

  const playRound = (index) => {
    GameBoard.setField(index, getCurrentPlayerSign());
    if (checkWinner(index)) {
      displayController.setResultText(getCurrentPlayerSign());
      isGameOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultText('Draw');
      isGameOver = true;
      return;
    }

    round++;
    displayController.setTurnMessage(`It is ${getCurrentPlayerSign()}'s turn .`);
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (index) => {
    const WinningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return WinningConditions.filter((combinations) => combinations.includes(index)).some((winningCase) => winningCase.every((cell) => GameBoard.getField(cell) === getCurrentPlayerSign()));
  };

  const getIsOver = () => {
    return isGameOver;
  };

  const reset = () => {
    round = 1;
    isGameOver = false;
  };

  return {
    playRound,
    getIsOver,
    reset
  }
})();