const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return { getSign }
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
    for(let i = 0 ; i < board.length; i++) {
      board[i] = '';
    };
  };

  return { setField, getField, reset }
})();


const displayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const text = document.getElementById('text');
  const button = document.getElementById('restart')
})