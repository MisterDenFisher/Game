const Menu = document.getElementById("Menu")
const MainMenu = document.getElementById("MainMenu")
const ChoiceMenu = document.getElementById("ChoiceMenu")
const label = document.getElementById("Label")
const messageWindow = document.getElementById('InfoMessageWindow');
const infoMessage = document.getElementById('InfoMessage');
const closeBtn = document.getElementById('close-button');

const printGameMessage = async function(msg, bgColor = "#3498db"){
    messageWindow.style.backgroundColor = bgColor;
    messageWindow.style.display = 'block';
    let fontSize = messageWindow.clientWidth / msg.length;
    infoMessage.style.fontSize = fontSize;
    infoMessage.innerText = msg;

    closeBtn.addEventListener('click', ()=>{
        messageWindow.style.display = 'none';
        infoMessage.innerText = "";
        MainMenu.style.display = 'block'; 
    });
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("NewGame-button").addEventListener("click",() => {
    MainMenu.style.display = "none";
    ChoiceMenu.style.display = "block";
});
document.getElementById("Back-button").addEventListener("click",() => {
    ChoiceMenu.style.display = "none";
    MainMenu.style.display = "block";
});
