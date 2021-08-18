const ROW_SIZE = 20;
const COLUMN_SIZE = 20;
const PIXEL_WIDTH = 20;
var gameboard;
var snake = [[9,9],[9,10],[9,11],[9,12]];
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
  gameboard[9][9].style.backgroundColor = "red";
  gameboard[9][10].style.backgroundColor = "blue";
  gameboard[9][11].style.backgroundColor = "blue";
  gameboard[9][12].style.backgroundColor = "blue";
}

function initializeFood(){
gameboard[Math.floor((Math.random() * 20 ))][Math.floor((Math.random() * 20 ))].style.backgroundColor = "black";
  
}







function initialize(){
  initializeGameBoard();
  initializeSnake();
  initializeFood();
}

