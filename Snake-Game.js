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

function drawBoardSquare(position){
  if (position)
  gameboard[position.x][position.y].style.backgroundColor = "#B6D7A8";

}

function drawBoard(position) {
  foodreposition(position);
  if(food){
    drawFood(food);
  }
  drawSnake(snake);
  drawBoardSquare(position);
}

function snakeEatFood(){
  if (gameboard[food.x][food.y] == gameboard[snake[0].x][snake[0].y]) {
  return true;
  }
  return false
}

function foodreposition(position){
  if (!position){
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
  while (snakeIncludes({x, y}));

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

function omitHead(){
  for (let i= 1; i < snake.length; i++){
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      return true;
    }
  }
  return false;
}


function moveSnake(newSnakePosition) {
  snake.unshift(newSnakePosition);
  gameover(snake);
  if (snakeEatFood()===false){
    var position = snake.pop();
  return position;
  }
  return undefined;
}


function snakeUp(){
  headX--;
  var position = moveSnake({ x: headX, y: headY });
  drawBoard(position);
}

function snakeDown(){
  headX++;
  var position = moveSnake({ x: headX, y: headY });
  drawBoard(position);
}

function snakeLeft(){
  headY--;
  var position = moveSnake({ x: headX, y: headY });
  drawBoard(position);
}

function snakeRight(){
  headY++;
  var position = moveSnake({ x: headX, y: headY });
  drawBoard(position);
}


document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowUp':
      setInterval(snakeUp, 500);
      break;
    case 'ArrowDown':
      setInterval(snakeDown, 500);
      break;
    case 'ArrowLeft':
      setInterval(snakeLeft, 500);
      break;
    case 'ArrowRight':
      setInterval(snakeRight, 500);
      break;
    }
  }

  function gameover(snake){
    if (snake[0].x<0 || snake[0].x>19 || snake[0].y<0 || snake[0].y>19){
      window.alert("Game Over");
      {window.location.reload()};
    }
    
    for (let i= 1; i < snake.length; i++){
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      window.alert("Game Over");
      {window.location.reload()};
    }

    }
  }