let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "blue", "red"];

let level = 0;
let highScore = 0;
let started = false;

let h3 = document.querySelector("h3");

let HIGHSCORE = document.querySelector(".highscore");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started = true;
        h3.innerText = '';
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq = [];

    level++;
    if(highScore < level){
        highScore = level;
    }
    HIGHSCORE.innerText = `High Score = ${highScore}`;
    h3.innerText = `Level ${level}`;

    //choosing a random color
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    btnFlash(randomBtn);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    // console.log(randomIdx, randomColor, randomBtn);
}

//step3

function checkAns(idx){
    
    if(gameSeq[idx] === userSeq[idx]){
       if(userSeq.length == level){
        setTimeout(function() {
            levelUp();
        },1000);
       }
    }else{
        h3.innerHTML = `Game Over! Your score is ${level} <br>Press any key to start`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = 'white';
        },200);

        reset();
    }
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}