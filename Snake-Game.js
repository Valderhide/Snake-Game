const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
var gameboard;
let snake;
let food;
let headX = Math.floor(ROW_SIZE / 2);
let headY = Math.floor(COLUMN_SIZE / 2);
initialize();

function initialize() {
  initializeGameBoard();
  initializeSnake();
  initializeFood();
  drawBoard();
}


function initializeGameBoard() {
  gameboard = new Array(ROW_SIZE);
  for (let row = 0; row < ROW_SIZE; row++) {
    gameboard[row] = new Array(COLUMN_SIZE);
    for (let column = 0; column < COLUMN_SIZE; column++) {
      let div = document.createElement('div');
      let gameboardDiv = document.getElementById("gameboard");
      gameboardDiv.appendChild(div);
      div.className = "pixel";
      div.style.left = column * PIXEL_WIDTH;
      div.style.top = row * PIXEL_WIDTH;
      gameboard[row][column] = div;
    }
  }
}

function drawBoard() {
  initializeGameBoard();
  drawFood(food);
  drawSnake(snake);
  snakeGrowth();
}

function snakeGrowth(){
  if (gameboard[food.x][food.y] == gameboard[snake[0].x][snake[0].y]) {
  snake.push(snake);
  initializeFood();
  }
}

function drawFood(food) {
  gameboard[food.x][food.y].style.backgroundColor = "black";
}

function drawSnake(snake) {
  for (position of snake) {
    gameboard[position.x][position.y].style.backgroundColor = "blue";
  }
  gameboard[snake[0].x][snake[0].y].style.backgroundColor = "red";
}

function initializeSnake() {
  snake =[{ x: headX, y: headY }, { x: headX, y: headY + 1 }, { x: headX, y: headY + 2 }, { x: headX, y: headY + 3 }];
}

function initializeFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * ROW_SIZE);
    y = Math.floor(Math.random() * COLUMN_SIZE);
  }
  while (snakeIncludes([x, y]));

  food = { x, y };
}

function snakeIncludes(position) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i][0] == position[0] && snake[i][1] == position[1]) {
      return true;
    }
  }

  return false;
}

function moveSnake(newSnakePosition) {
  snake.unshift(newSnakePosition);
  snake.pop();
}

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      headX--;
      moveSnake({ x: headX, y: headY });
      drawBoard();
      break;
    case 'ArrowDown':
      headX++;
      moveSnake({ x: headX, y: headY });
      drawBoard();
      break;
    case 'ArrowLeft':
      headY--;
      moveSnake({ x: headX, y: headY });
      drawBoard();
      break;
    case 'ArrowRight':
      headY++
      moveSnake({ x: headX, y: headY });
      drawBoard();
      break;
  }

}