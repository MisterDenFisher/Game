const game1P = document.getElementById("Game")
const btnStart = document.getElementById("SingleGame-button")
const arena = document.getElementById("Arena")
const infoPlayer = document.getElementById("InfoPlayer")
const infoGame = document.getElementById("InfoGame")

const borderSize = 6;
const topIndent = 50;
const infoWindowSize = 200;

const updatePoint = function(){
    let infoPoint = document.getElementById("Point");
    infoPoint.innerHTML = `${currentPoint}`;
}

const addBonus = function(){
    infoGame.innerHTML += `<span class='bonus'><img src="img/expansion.png"></span>`
}

btnStart.addEventListener('click', ()=>{
    if(currentUser == ""){
        return;
    }

    Menu.style.display = "none";
    
    infoPlayer.style.width = infoWindowSize + "px";
    infoPlayer.style.top = topIndent + "px";
    infoPlayer.style.left = borderSize + "px";
    infoPlayer.innerHTML = `<p>Текущий игрок:<br><span id="namePlayer">${LS.getItem(currentUser)}</span></p>Макс. очков:<br>${LS.getItem(currentUser[0] + "p")}</p>`;
    let lengthName = LS.getItem(currentUser).length; 
    if (lengthName > 12){
        document.getElementById("namePlayer").style.fontSize = Math.floor(infoWindowSize / lengthName) + "px";
    }

    infoGame.style.left = w - infoWindowSize + "px";
    infoGame.style.top = topIndent + "px";
    infoGame.innerHTML = `<p><span id='PointIcon'>&#10031;</span>Очки:<span id="Point">${currentPoint}</span></p>`;

    arena.style.borderWidth = borderSize + "px"
    arena.style.width = w - infoWindowSize * 2 - borderSize * 6 + "px";
    arena.style.left = infoWindowSize + borderSize * 2 + "px";
    arena.style.height = h - topIndent * 2 + "px";
    arena.style.top = topIndent + "px";

    game1P.style.display = "block";

    for(let i = 0; i < 3; i++)
        infoGame.innerHTML += `<img class='health' id='${i+1}H' style='left: ${i*48}px' src='img/health.png'>`
})


arena.addEventListener('click', ()=>{
    currentPoint++
    updatePoint();
    changeColor();
    addBonus();
})



const changeColor = function(){
    let pointIcon = document.getElementById("PointIcon");
    pointIcon.style.color = `rgb(${random(0, 256)}, ${random(0, 256)}, ${random(75, 256)})`;
    setTimeout(changeColor, 1000);
}