const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
let gameboard;
let snake;
let food;
let headX = Math.floor(ROW_SIZE / 2);
let headY = Math.floor(COLUMN_SIZE / 2);
let snakeDirection;
let score = 0
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

function drawScore(){
  const scoreBoard =document.getElementById("score")
  scoreBoard.innerHTML = `Score: ${score}`;
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
  drawScore();
}

function snakeEatFood() {
  if (gameboard[food.x][food.y] == gameboard[snake[0].x][snake[0].y]) {
    score++;
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
  snake = [{ x: headX, y: headY }];
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
    case 'w':
    case 'W':
    case 'ArrowUp':
      if(snakeDirection == 'down') {break}
      snakeDirection = 'up';
      break;
    case 's':
    case 'S':
    case 'ArrowDown':
      if(snakeDirection == 'up') {break}
      snakeDirection = 'down';
      break;
    case 'a':
    case 'A':
    case 'ArrowLeft':
      if(snakeDirection == 'right') {break}
      snakeDirection = 'left';
      break;
    case 'd':
    case 'D':
    case 'ArrowRight':
      if(snakeDirection == 'left') {break}
      snakeDirection = 'right';
      break;
  }
}

document.getElementById('UP').addEventListener('touchstart', u);

    function u(ev){
        snakeDirection = 'up';
    }


document.getElementById('DOWN').addEventListener('touchstart', d);

    function d(ev){
        snakeDirection = 'down';
    }


document.getElementById('LEFT').addEventListener('touchstart', l);

    function l(ev){
        snakeDirection = 'left';
    }


document.getElementById('RIGHT').addEventListener('touchstart', r);

    function r(ev){
        snakeDirection = 'right';
    }

function gameOver(snake) {
  if (snake[0].x < 0 || snake[0].x > COLUMN_SIZE - 1 || snake[0].y < 0 || snake[0].y > ROW_SIZE - 1) {
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