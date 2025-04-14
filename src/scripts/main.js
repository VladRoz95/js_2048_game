'use strict';

// Uncomment the next lines to use your game instance in the browser
// const Game = require('../modules/Game.class');
// const game = new Game();

// Write your code here

import Game from '../modules/Game.class.js';

const game = new Game();

const gameTable = document.querySelector('.game-field');
const scoreDisplay = document.querySelector('.game-score');
const startButton = document.querySelector('.start');
const messages = {
  start: document.querySelector('.message-start'),
  win: document.querySelector('.message-win'),
  lose: document.querySelector('.message-lose'),
};

function render() {
  const cells = gameTable.querySelectorAll('.field-cell');
  const state = game.getState().flat();

  cells.forEach((cell, index) => {
    const value = state[index];

    cell.textContent = value === 0 ? '' : value;
    cell.className = 'field-cell';

    if (value) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  scoreDisplay.textContent = game.getScore();

  if (game.getStatus() === 'win') {
    messages.win.classList.remove('hidden');
  } else if (game.getStatus() === 'lose') {
    messages.lose.classList.remove('hidden');
  } else {
    messages.win.classList.add('hidden');
    messages.lose.classList.add('hidden');
  }
}

startButton.addEventListener('click', () => {
  game.start();
  render();
  startButton.textContent = 'Restart';
  messages.start.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  render();
});
