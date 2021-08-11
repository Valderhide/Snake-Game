initialize();


function delay() {
    setTimeout(initialize, 3000);
  }

function initialize(){
    var div = document.createElement('div');
    div.className = 'pixel';
    
    var gameboardDiv = document.getElementById("gameboard");
    gameboardDiv.appendChild(div);

     for (let r = 0; r<150 ; r++)
        div.style.left = r;
}