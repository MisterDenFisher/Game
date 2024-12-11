const game1P = document.getElementById("Game")
const btnStart = document.getElementById("SingleGame-button")
const arena = document.getElementById("Arena")
const infoPlayer = document.getElementById("InfoPlayer")
const infoGame = document.getElementById("InfoGame")

let arenaWidth;
let gameActive;

const borderSize = 8;
const topIndent = 50;
const infoWindowSize = 200;

//Данные игрового поля//
let currentPoint = 0;
let countBonus = 0;
let blocksCount = 0;
let blockWidth = 60;
let blockHeight = 20;
let blockMassive = [];
////////////////////////

//Данные платформы//
let platform;
let platformSize = 80;
let position;
let acceleration = 0.1;
let deceleration = 0.05;
let minSpeed = -5;
let maxSpeed = 5;
let targetSpeed = 0;
let speed = 0;
let keysPressed = {r: false, l: false};
//////////////////////

const updatePoint = function(){
    let infoPoint = document.getElementById("Point");
    infoPoint.innerHTML = `${currentPoint}`;
}

const addBonus = function(){
    infoGame.innerHTML += `<span class='bonus'><img src="img/expansion.png"></span>`
}

function movePlatform(){
    if (speed < targetSpeed)
        speed = Math.min(targetSpeed, speed + acceleration);
    else if (speed > targetSpeed)
        speed = Math.max(targetSpeed, speed - acceleration);

    if (speed > 0)
        speed = Math.min(speed, maxSpeed)
    else if (speed < 0)
        speed = Math.max(speed, minSpeed)
    
    position = Math.max(0, Math.min(arenaWidth - platformSize, position + speed));
    platform.style.left = position + "px";

    if(!keysPressed.r && !keysPressed.l){
        if (speed > 0)
            speed = Math.max(0, speed - deceleration);
        else if (speed < 0)
            speed = Math.min(0, speed + deceleration);
    }

    requestAnimationFrame(movePlatform);
}
const keyUp = (event) => {
    if (event.key === "d" || event.key === "ArrowRight") {
      keysPressed.d = false;
      if (!keysPressed.a) {
        targetSpeed = 0; // Замедление с инерцией
      } else {
        targetSpeed = minSpeed;
      }
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      keysPressed.a = false;
      if (!keysPressed.d) {
        targetSpeed = 0; // Замедление с инерцией
      } else {
        targetSpeed = maxSpeed;
      }
    }
};

const keyDown = (event) => {
    if (event.key === "d" || event.key === "ArrowRight") {
      keysPressed.d = true;
      if (keysPressed.a) {
        targetSpeed = 0; // Остановка с инерцией
      } else {
        targetSpeed = maxSpeed;
      }
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      keysPressed.a = true;
      if (keysPressed.d) {
        targetSpeed = 0; // Остановка с инерцией
      } else {
        targetSpeed = minSpeed;
      }
    }
};

const closeGame = function(){
    game1P.style.display = "none";
    
    Menu.style.display = "block";
    MainMenu.style.display = "block";
    document.removeEventListener('keydown', keyDown);
}

btnStart.addEventListener('click', async()=>{
    ChoiceMenu.style.display = "none";
    Menu.style.display = "none";

    if(currentUser == null){
        printGameMessage("Не выбран текущий игрок! Продолжение невозможно");
        closeGame();
        return;
    }
    
    infoPlayer.style.width = infoWindowSize + "px";
    infoPlayer.style.top = topIndent + 20 + "px";
    infoPlayer.style.left = borderSize + "px";
    infoPlayer.innerHTML = `<p>Текущий игрок:<br><span id="namePlayer">${LS.getItem(currentUser)}</span></p>Макс. очков:<br>${LS.getItem(currentUser[0] + "p")}</p>`;
    let lengthName = LS.getItem(currentUser).length; 
    if (lengthName > 12){
        document.getElementById("namePlayer").style.fontSize = Math.floor(infoWindowSize / lengthName) + "px";
    }


    infoGame.style.left = w - infoWindowSize + "px";
    infoGame.style.top = topIndent + 20 + "px";
    infoGame.innerHTML = `<p><span id='PointIcon'>&#10031;</span>Очки:<span id="Point">${currentPoint}</span></p>`;

    arenaWidth = w - infoWindowSize * 2 - borderSize * 6;
    arenaHeight = h - topIndent * 2;

    arena.style.borderWidth = borderSize + "px"
    arena.style.width = arenaWidth + "px";
    arena.style.left = infoWindowSize + borderSize * 2 + "px";
    arena.style.height = arenaHeight + "px";
    arena.style.top = topIndent + "px";

    infoGame.innerHTML += "<div id='health-axis'>";
    for(let i = 0; i < 3; i++)
        infoGame.innerHTML += `<span class="health"><img id='${i+1}H' src='img/heart.png'></span>`
    infoGame.innerHTML += "</div>";
    infoGame.innerHTML += "<span id='speedCounter'></span>";
    speedCounter = document.getElementById("speedCounter");

    game1P.style.display = "block";

    generationBlocks();

    arena.innerHTML += `<div class="platform" id="1P" style='left: ${arenaWidth / 2}px; width: ${platformSize}px'></div>`;
    position = arenaWidth / 2;

    platform = document.getElementById("1P");

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    movePlatform();

});

function generationBlocks(){
    blocksCount= Math.floor(arenaWidth / blockWidth);
    while (blocksCount < 15){
        blockWidth -= 5;
        blocksCount= Math.floor(arenaWidth / blockWidth);
    }
    let position = (arenaWidth - blocksCount * blockWidth) / 2;
    console.log(position)
    blockHeight = Math.floor(blockWidth / 3);
    let rows = Math.floor(arenaHeight * 0.4 / blockHeight); 

    if (position <= 3 && position >= 1)
        styleSheet.innerHTML =
            `.blocks{
                width: ${blockWidth - position}px;
                height: ${blockHeight - position}px;
                border: ${position}px;
            }`
    else{
        styleSheet.innerHTML =
        `.blocks{
            width: ${blockWidth - position}px;
            height: ${blockHeight - position}px;
        }`
    }
    let typeGeneration = 0//random(0, 1);
    switch(typeGeneration){
        case 0:
            for (let y = 0; y < rows; y++){
                blockMassive[y] = [];
                for(var x = 0; x < blocksCount; x++){
                    arena.innerHTML += `<div class="blocks" style='left: ${position + blockWidth * x}px; top: ${position + blockHeight * y}px'></div>`;
                    blockMassive[y][x] = position + blockWidth * x;
                    console.log(blockMassive[y][x]);
                }
            }
            break;
        /*case 1:
            for (let y = 0; y < rows; y++)
                blockMassive[y] = [];
                for(var x = 0; x < blocksCount; x++){
                    arena.innerHTML += `<div class="blocks" style='left: ${position + blockWidth * x}px; top: ${position + blockHeight * y}px'></div>`;
                    blockMassive[y][x] = position + blockWidth * x;
                    console.log(blockMassive[y][x]);
                }
            break;*/
    }

    
}   


const changeColor = function(){
    let pointIcon = document.getElementById("PointIcon");
    pointIcon.style.color = `rgb(${random(0, 256)}, ${random(0, 256)}, ${random(75, 256)})`;
    setTimeout(changeColor, 1000);
}