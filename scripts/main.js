const Menu = document.getElementById("Menu")
const MainMenu = document.getElementById("MainMenu")
const ChoiceMenu = document.getElementById("ChoiceMenu")
const label = document.getElementById("Label")

var currentPoint = 10000;

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
