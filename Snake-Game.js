const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
var gameboard;
var snake;
initialize();

function initialize(){
  initializeGameBoard();
  initializeSnake();
  initializeFood();
}




    function initializeGameBoard(){
  gameboard = new Array(ROW_SIZE);
  for(let row =0; row<ROW_SIZE; row++){
    gameboard[row] = new Array(COLUMN_SIZE);
    for(let column = 0; column<COLUMN_SIZE; column++){
      let div = document.createElement('div');
      let gameboardDiv = document.getElementById("gameboard");
      gameboardDiv.appendChild(div);
      div.className = "pixel";
      div.style.left = column *PIXEL_WIDTH;
      div.style.top = row *PIXEL_WIDTH;
      gameboard[row][column] = div;
      }
    }

  }


function initializeSnake(){
  let headX = Math.floor(ROW_SIZE / 2);  
  let headY = Math.floor(COLUMN_SIZE / 2);
  moveSnake([[headX,headY],[headX,headY+1],[headX,headY+2],[headX,headY+3]]);
}

function initializeFood(){
  let x, y;
  do{
    x = Math.floor(Math.random() * ROW_SIZE);
    y = Math.floor(Math.random() * COLUMN_SIZE);
  }
  while(snakeIncludes([x,y]));

  gameboard[x][y].style.backgroundColor = "black";
}

function snakeIncludes(position){
  for (let i = 0; i < snake.length; i++ ){
    if(snake[i][0] == position[0] && snake[i][1] == position[1]){
      return true;
    }
  }

  return false;
}



function moveSnake(newSnakePosition){
  for (let i = 0; i < newSnakePosition.length; i++ ){
    let pixelColor;
    if (i==0) {
      pixelColor = "red";
    }
    else {
      pixelColor = "blue";
    }
    gameboard[newSnakePosition[i][0]][newSnakePosition[i][1]].style.backgroundColor = pixelColor;
    snake = newSnakePosition;
  }

}




  document.onkeydown = function(e) {
    switch (e.key) {
        case 'ArrowUp':
          moveSnake([headX - 1,headY]);
            break;
        case 'ArrowDown':
            console.log ('Down')
            break;
        case 'ArrowLeft':
            console.log ('Left');
            break;
        case 'ArrowRight':
            console.log ('Right');
            break;


     }
  }