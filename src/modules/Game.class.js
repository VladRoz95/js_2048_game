'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
export default class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    this.size = 4;
    this.score = 0;
    this.status = 'idle';
    this.board = initialState || this.createEmptyBoard();
  }

  createEmptyBoard() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(0));
  }

  moveLeft() {
    const oldBoard = this.copyBoard(this.board);

    for (let i = 0; i < this.size; i++) {
      let row = this.board[i].filter((val) => val !== 0);

      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          this.score += row[j];
          row[j + 1] = 0;
        }
      }
      row = row.filter((val) => val !== 0);

      while (row.length < this.size) {
        row.push(0);
      }
      this.board[i] = row;
    }
    this.afterMove(oldBoard);
  }

  moveRight() {
    this.reverseBoard();
    this.moveLeft();
    this.reverseBoard();
  }
  moveUp() {
    this.transposeBoard();
    this.moveLeft();
    this.transposeBoard();
  }
  moveDown() {
    this.transposeBoard();
    this.moveRight();
    this.transposeBoard();
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    this.status = 'playing';
    this.board = this.createEmptyBoard();
    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Resets the game.
   */
  restart() {
    return this.start;
  }

  // Add your own methods here
  afterMove(oldBoard) {
    if (!this.boardsAreEqual(oldBoard, this.board)) {
      this.addRandomTile();
    }

    if (this.isWin()) {
      this.status = 'win';
    } else if (!this.canMove()) {
      this.status = 'lose';
    }
  }

  isWin() {
    return this.board.flat().includes(2048);
  }

  canMove() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 0) {
          return true;
        }

        if (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1]) {
          return true;
        }

        if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) {
          return true;
        }
      }
    }

    return false;
  }

  addRandomTile() {
    const empty = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }

    if (empty.length === 0) {
      return;
    }

    const [x, y] = empty[Math.floor(Math.random() * empty.length)];

    this.board[x][y] = Math.random() < 0.1 ? 4 : 2;
  }

  copyBoard(board) {
    return board.map((row) => row.slice());
  }

  boardsAreEqual(b1, b2) {
    return JSON.stringify(b1) === JSON.stringify(b2);
  }

  transposeBoard() {
    const newBoard = this.createEmptyBoard();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        newBoard[i][j] = this.board[j][i];
      }
    }
    this.board = newBoard;
  }

  reverseBoard() {
    this.board = this.board.map((row) => row.reverse());
  }
}

// module.exports = Game;
