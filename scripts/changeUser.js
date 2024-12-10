const IW = document.getElementById("ChangeUser");
const contentIW = document.getElementById("ChangeUser-content");
const openIW = document.getElementById("ChangeUser-button");
const sendBtn = document.getElementById("IW-send");
const input = document.getElementById("IW-input");
const statusIW = document.getElementById("IW-status");
const messageIW = document.getElementById("IW-message");

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const bannedSymbol = "!@#$%^&*()=+№;%:?<>|\/1234567890"

function checkName(name){
    if (name === "") {
        messageIW.innerText = "Поле для ввода не должно быть пустым"
        return false;
    }
    if (name.length > 25){
        messageIW.innerText = "Слишком длинное имя (макс. 25 символов)"
        return false;
    }
    for(let i = 0; i < name.length; i++){
        if (bannedSymbol.includes(name[i])){
            messageIW.innerText = `Некорректные символы в имени: ${name[i]}`
            return false;
        }
    }
    return true;
}

const closeIW = function(event){
    if (event.target === IW) {
        IW.style.display = "none";
        window.removeEventListener("click", closeIW)
    }
}

openIW.addEventListener("click", () => {
    IW.style.display = "block";
    window.addEventListener("click", closeIW);
    currentUser = LS.getItem("currentUser")

    if(currentUser === null) {
        statusIW.innerText = "Текущий игрок: " + "-";
    } else {
        statusIW.innerText = "Текущий игрок: " + LS.getItem(currentUser);
    }
});


sendBtn.addEventListener("click", async() => {
    const name = input.value;
    if (checkName(name) == true){
        if(name == "delete") {
            LS.clear();
            nameList = [];
            messageIW.innerText = "Локальное хранилище успешно очищено!";
        } else {
            if(!nameList.includes(name)){
                nameList.push(name);
                LS.setItem("currentUser", ++countUsers + "n");
                LS.setItem("countUsers", countUsers);
                LS.setItem(countUsers + "n", name);
                LS.setItem(countUsers + "p", 0);
                messageIW.innerText = "Новый пользователь успешно создан!";
            } else{
                messageIW.innerText = `Игрок ${name} вернулся в игру!`;
                LS.setItem("currentUser", nameList.indexOf(name) + 1 + "n");
            }
                
        }
    } else {
        contentIW.style.background = "#ff005c";
        await pause(1500);
        contentIW.style.background = "#3498db";
        messageIW.innerText = "";
        input.value = null;
        return;
    }
    currentUser = LS.getItem("currentUser")

    contentIW.style.background = "#00ff00";
    sendBtn.style.display = "none"
    statusIW.innerText = "Текущий игрок: " + LS.getItem(currentUser);

    await pause(2000);

    input.value = null;
    IW.style.display = "none";
    messageIW.innerText = "";
    contentIW.style.background = "#3498db";
    sendBtn.style.display = "inline-block"
});


