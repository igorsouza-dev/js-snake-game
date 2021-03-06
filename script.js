'use strict';
var startGame;
const boardColor= '#4d4d4d';
const fruitColor = '#f40066';
const snakeColor = '#448f00';

window.onload = () => {
  var timerId;
  var gameSpeed = 120;
  var stepValue = 1;
  var stepX = stepValue;
  var stepY = 0;
  
  var piecesSize = 20;
  var piecesAmount = 20;
  var boardWidth = piecesAmount * piecesSize;
  var boardHeight = piecesAmount * piecesSize;
  
  var snakeHeadPosX = 10;
  var snakeHeadPosY = 10;

  var applePosX = Math.floor(Math.random() * piecesAmount);
  var applePosY = Math.floor(Math.random() * piecesAmount);
  
  var trail = [];
  var snakeLength = 4;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  const movementListener = (event) => {
    switch (event.keyCode) {
      case 37:
        stepX = -stepValue;
        stepY = 0;
        break;
      case 38:
        stepX = 0;
        stepY = -stepValue;
        break;
      case 39:
        stepX = stepValue;
        stepY = 0;
        break;
      case 40:
        stepX = 0;
        stepY = stepValue;
        break;
      default:
        break;
    }
  }
  const drawBoard = () => {
    ctx.fillStyle = boardColor;
    ctx.fillRect(0,0, boardWidth, boardHeight);
  }
  const drawFruit = () => {
    ctx.fillStyle = fruitColor;
    ctx.fillRect(applePosX * piecesSize, applePosY * piecesSize, piecesSize, piecesSize);
  }
  const spawnApple = () => {
    applePosX = Math.floor(Math.random() * piecesAmount);
    applePosY = Math.floor(Math.random() * piecesAmount);
  }
  const startTimer = () => {
    if(timerId) clearInterval(timerId);
    timerId = setInterval(gameLoop, gameSpeed);
  }
  const gameLoop = () => {
    
    snakeHeadPosX += stepX;
    snakeHeadPosY += stepY;
    
    if(snakeHeadPosX < 0) {
      snakeHeadPosX = piecesAmount - 1;
    }
    if(snakeHeadPosX > (piecesAmount - 1)) {
      snakeHeadPosX = 0;
    }
    if(snakeHeadPosY < 0) {
      snakeHeadPosY = piecesAmount - 1;
    }
    if(snakeHeadPosY > (piecesAmount - 1)) {
      snakeHeadPosY = 0;
    }
    drawBoard();
    drawFruit();

    ctx.fillStyle = snakeColor;
    // draws snake
    for (let i=0; i<trail.length; i++) {
      ctx.fillRect(trail[i].x * piecesSize, trail[i].y * piecesSize, piecesSize, piecesSize);

      // check for hits
      if(trail[i].x === snakeHeadPosX && trail[i].y === snakeHeadPosY && stepX > 0) {
        stepX = stepY = 0;
        alert('Game Over!');
      }
    }
    
    trail.push({ x: snakeHeadPosX, y: snakeHeadPosY});
    while(trail.length > snakeLength) {
      trail.shift();
    }

    // checks if fruit was eaten
    if(applePosX === snakeHeadPosX && applePosY === snakeHeadPosY) {
      snakeLength++;
      gameSpeed = gameSpeed - 5;
      startTimer();
      spawnApple();
    }
  }
  
  const resetGame = () => {
    gameSpeed = 120;
    stepValue = 1;
    stepX = stepValue;
    stepY = 0;
    
    snakeHeadPosX = 10;
    snakeHeadPosY = 10;
    
    trail = [];
    snakeLength = 4;
    spawnApple();
  }
  startGame = () => {
    resetGame();
    startTimer();
    document.addEventListener('keydown', movementListener);
  }
  
}


