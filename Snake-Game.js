initialize();

function initialize(){
  for (let i = 1; i<=400; i++){
    var div = document.createElement('div');
    var gameboardDiv = document.getElementById("gameboard");
    gameboardDiv.appendChild(div);
    div.className = 'pixel';
    
    for (let x = 0; x<260 ; x++)
    div.style.top = x;
    for (let y = 0; y<169; y++)
    div.style.left = y

  }
}