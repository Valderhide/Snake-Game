const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
let gameboard;
let snake;
let food;
let headX = Math.floor(ROW_SIZE / 2);
let headY = Math.floor(COLUMN_SIZE / 2);
let snakeDirection =
  initialize();

const snakeMove = setInterval(snakeMovement, 200)

function initialize() {
  initializeGameBoard();
  initializeSnake();
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

function drawBoardSquare(position) {
  if (position)
    gameboard[position.x][position.y].style.backgroundColor = "#B6D7A8";

}

function drawBoard(position) {
  foodReposition(position);
  if (food) {
    drawFood(food);
  }
  drawSnake(snake);
  drawBoardSquare(position);
}

function snakeEatFood() {
  if (gameboard[food.x][food.y] == gameboard[snake[0].x][snake[0].y]) {
    return true;
  }
  return false
}

function foodReposition(position) {
  if (!position) {
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
  snake = [{ x: headX, y: headY }, { x: headX, y: headY + 1 }, { x: headX, y: headY + 2 }, { x: headX, y: headY + 3 }];
}

function initializeFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * ROW_SIZE);
    y = Math.floor(Math.random() * COLUMN_SIZE);
  }
  while (snakeIncludes({ x, y }));

  food = { x, y };
}

function snakeIncludes(position, omitHead) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x == position.x && snake[i].y == position.y) {
      return true;
    }
  }
  return false;
}

function omitHead() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true;
    }
  }
  return false;
}


function moveSnake(newSnakePosition) {
  snake.unshift(newSnakePosition);
  gameOver(snake);
  if (snakeEatFood() === false) {
    const position = snake.pop();
    return position;
  }
  return undefined;
}

/* 
up = x--
down = x++
left = y--
right = y++
*/

function snakeMovement() {
  switch (snakeDirection) {
    case 'up':
      headX--;
      break;
    case 'down':
      headX++;
      break;
    case 'left':
      headY--;
      break;
    case 'right':
      headY++;
      break;
    default:
  }

  if (snakeDirection) {
    const position = moveSnake({ x: headX, y: headY });
    drawBoard(position);
  }
}

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      snakeDirection = 'up';
      break;
    case 'ArrowDown':
      snakeDirection = 'down';
      break;
    case 'ArrowLeft':
      snakeDirection = 'left';
      break;
    case 'ArrowRight':
      snakeDirection = 'right';
      break;
  }
}

function gameOver(snake) {
  if (snake[0].x < COLUMN_SIZE - 20 || snake[0].x > COLUMN_SIZE - 1 || snake[0].y < ROW_SIZE - 20 || snake[0].y > ROW_SIZE - 1) {
    clearInterval(snakeMove);
    window.alert("Game Over");
    { window.location.reload() };
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(snakeMove);
      window.alert("Game Over");
      { window.location.reload() };
    }
  }
}