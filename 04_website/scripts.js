 let lives = 3;
let score = 0;
const gameArea = document.getElementById("gameArea");
const hearts = document.querySelectorAll(".heartImage");
const restartGameOverBtn = document.getElementById("restartGameOverBtn");
const restartGameWonBtn = document.getElementById("restartGameWonBtn");
const backgroundMusic = document.getElementById("backgroundMusic");
const hitSound = new Audio("lyde/frugt.wav");
const bombSound = new Audio("lyde/bombe.wav");
const gameOverSound = new Audio("lyde/game-over.wav");
const gameWonSound = new Audio("lyde/game-win.wav");
const fadeOutDuration = 500;
let intervalId;
let timer = 120; 

function createItem() {
    const items = ["carrot", "tomato", "cucumber", "carrot", "apple", "bomb", "vegetable", "bomb"];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const item = document.createElement("div");
    item.className = "item";

    switch (randomItem) {
        case "apple":
            item.style.backgroundImage = "url('billeder/apple.png')";
            break;
        case "carrot":
            item.style.backgroundImage = "url('billeder/gulerod.png')";
            break;
        case "tomato":
            item.style.backgroundImage = "url('billeder/tomato.png')";
            break;
        case "cucumber":
            item.style.backgroundImage = "url('billeder/potato.png')";
            break;
        case "bomb":
            item.style.backgroundImage = "url('billeder/bomb.png')";
            break;
        default:
            break;
    }

    
    const randomX = Math.random() * (gameArea.clientWidth - 50);
    item.style.left = randomX + "px";
    item.style.top = "-50px";

    item.addEventListener("click", function () {
        item.classList.add("shrinkOut");
        setTimeout(() => {
            gameArea.removeChild(item);
        }, fadeOutDuration);
        
        if (randomItem === 'bomb') {
            bombSound.play();
            lives--;
            updateHealth();
            if (lives === 0) {
                gameOver();
            }
        } else {
            hitSound.play();
            score += 1;
            document.getElementById("score").textContent = "Score: " + score;
            if (score === 30) {
                gameWon();
            }
        }
    });

    gameArea.appendChild(item);

    animateItem(item);
}


function animateItem(item) {
    let positionY = -50;

    function moveItem() {
        positionY += 4;
        item.style.top = positionY + "px";

        if (positionY > gameArea.clientHeight) {
            gameArea.removeChild(item);
        } else {
            requestAnimationFrame(moveItem);
        }
    }

    requestAnimationFrame(moveItem);
}

function updateHealth() {
    for (let i = 0; i < hearts.length; i++) {
        if (i < lives) {
            hearts[i].src = "billeder/fullheart.png";
        } else {
            hearts[i].src = "billeder/deadheart.png";
        }
    }
}

function gameOver() {
    clearInterval(intervalId);
    gameOverScreen.style.display = "flex";
    document.getElementById("gameOverImage").src = "billeder/gameover.png";
    gameOverSound.play();
    restartGameOverBtn.style.display = "block";
}

function gameWon() {
    clearInterval(intervalId);
    backgroundMusic.pause();
    const message = "Congratulations! You won with a score of: " + score;
    alert(message);
    score = 0;
    lives = 3;
    document.getElementById("gameWonImage").src = "billeder/gamewon.png";
    document.getElementById("score").textContent = "Score: " + score;
    updateHealth();
    gameWonSound.play();
    gameWonScreen.style.display = "flex";
    restartGameWonBtn.style.display = "block";
}

function restartGame() {
    gameOverScreen.style.display = "none";
    gameWonScreen.style.display = "none";
    document.getElementById("gameArea").classList.remove("hidden");
    score = 0;
    lives = 3;
    timer = 120;
    document.getElementById("score").textContent = "Score: " + score;
    updateHealth();
    restartGameOverBtn.style.display = "none";
    restartGameWonBtn.style.display = "none";
    intervalId = setInterval(createItem, 1000);
    backgroundMusic.play();
    countdown();
}

function countdown() {
    if (timer > 0) {
        timer--;
        const displayMinutes = Math.floor(timer / 60);
        const displaySeconds = timer % 60;
        const formattedTime = (displayMinutes < 10 ? "0" : "") + displayMinutes + ":" + (displaySeconds < 10 ? "0" : "") + displaySeconds;
        document.getElementById("display").textContent = "Time Left: " + formattedTime;
        setTimeout(countdown, 1000);
    } else {
        if (score < 30) {
            gameOver();
        }
    }
} 

document.getElementById("playBtn").addEventListener("click", function () {
    document.getElementById("menu").style.display = "none";
    gameArea.classList.remove("hidden");
    intervalId = setInterval(createItem, 200);
    backgroundMusic.play();
    countdown();
});

countdown(); 
updateHealth();

