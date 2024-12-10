const gameWindow = document.getElementById("Area");
var w = Math.ceil(window.innerWidth);
var h = Math.ceil(window.innerHeight);
gameWindow.style.width = w + "px";
gameWindow.style.height = h + "px";

let loadingScreen = document.getElementById("LoadingScreen");
window.addEventListener("load", ()=>{
    console.log("All resources loaded!");
    loadingScreen.style.display = "none";
});

const uploadWindowSize = function(){
    w = Math.ceil(window.innerWidth);
    h = Math.ceil(window.innerHeight);
    gameWindow.style.width = w + "px";
    gameWindow.style.height = h + "px";
}

window.addEventListener('resize', () => {uploadWindowSize()});
window.addEventListener('fullscreenchange', () => {uploadWindowSize()});

const LS = window.localStorage;
var currentUser = LS.getItem("currentUser");
var countUsers = LS.getItem("countUsers");
var nameList = [];
for(let i = 0; i < countUsers; i++)
    nameList[i] = LS.getItem(i+1+"n")

