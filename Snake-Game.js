initialize();


function initialize(){
    var div = document.createElement('div');
    div.className = 'pixel';
    
    var gameboardDiv = document.getElementById("gameboard");
    gameboardDiv.appendChild(div);
    
    document.getElementsByClassName('pixel').style.left = 300

}