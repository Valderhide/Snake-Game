const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
var gameboard;
var snake = [[0,0],[0,1],[0,2],[0,3]];
initialize();


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
  gameboard[0][0].style.backgroundColor = "red";
  gameboard[0][1].style.backgroundColor = "blue";
  gameboard[0][2].style.backgroundColor = "blue";
  gameboard[0][3].style.backgroundColor = "blue";
}

function initialize(){
  initializeGameBoard();
  initializeSnake();
  initializeFood();
}

