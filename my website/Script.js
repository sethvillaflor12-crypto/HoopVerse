
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==================================================
   BASKETBALL SHOOTING GAME
================================================== */

const gameContainer =
    document.getElementById("gameContainer");

const ball =
    document.getElementById("ball");

const startGameButton =
    document.getElementById("startGame");

const shootButton =
    document.getElementById("shootButton");

const restartButton =
    document.getElementById("restartButton");

const scoreDisplay =
    document.getElementById("score");

const timeDisplay =
    document.getElementById("time");

const comboDisplay =
    document.getElementById("combo");

const bestScoreDisplay =
    document.getElementById("bestScore");

const gameMessage =
    document.getElementById("gameMessage");


/* ================= GAME VARIABLES ================= */

let score = 0;

let timeLeft = 30;

let combo = 0;

let gameRunning = false;

let timer = null;

let shooting = false;


/* ================= BEST SCORE ================= */

let bestScore =
    Number(localStorage.getItem("hoopverseBest")) || 0;

bestScoreDisplay.textContent = bestScore;


/* ================= RESET BALL ================= */

function resetBall() {

    ball.style.left = "50%";

    ball.style.bottom = "55px";

    ball.style.transform =
        "translateX(-50%) rotate(0deg)";

}


/* ================= START GAME ================= */

function startGame() {

    if (gameRunning) return;

    score = 0;

    timeLeft = 30;

    combo = 0;

    shooting = false;

    gameRunning = true;


    scoreDisplay.textContent = score;

    timeDisplay.textContent = timeLeft;

    comboDisplay.textContent = "0🔥";


    gameMessage.textContent =
        "SHOOT!";

    startGameButton.style.display =
        "none";

    shootButton.disabled = false;


    resetBall();


    clearInterval(timer);


    timer = setInterval(() => {

        timeLeft--;

        timeDisplay.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}


/* ================= END GAME ================= */

function endGame() {

    gameRunning = false;

    shooting = false;

    clearInterval(timer);

    shootButton.disabled = true;

    gameMessage.innerHTML =
        TIME'S UP!<br><span style="color:#ff7200;font-size:22px;">FINAL SCORE: ${score}</span>;

    startGameButton.textContent =
        "PLAY AGAIN";

    startGameButton.style.display =
        "block";

    resetBall();


    if (score > bestScore) {

        bestScore = score;

        bestScoreDisplay.textContent =
            bestScore;

        localStorage.setItem(
            "hoopverseBest",
            bestScore
        );

    }

}


/* ================= SHOOT ================= */

function shoot() {

    if (!gameRunning) return;

    if (shooting) return;

    shooting = true;


    /* Randomize hoop position */

    const minX = 25;

    const maxX = 75;

    const hoopX =
        Math.random() *
        (maxX - minX) +
        minX;


    /* Move ball toward hoop */

    ball.style.left =
        ${hoopX}%;

    ball.style.bottom =
        "350px";

    ball.style.transform =
        "translateX(-50%) rotate(720deg)";


    setTimeout(() => {

        /* RANDOM SHOT RESULT */

        const madeShot =
            Math.random() < 0.72;


        if (madeShot) {

            score += 2;

            combo++;

            /* Combo bonus */

            let bonus = 0;

            if (combo >= 3) {

                bonus = combo;

                score += bonus;

            }


            scoreDisplay.textContent =
                score;

            comboDisplay.textContent =
                ${combo}🔥;


            gameMessage.textContent =
                "BUCKET! 🏀";


            createScorePopup(
                +${2 + bonus}
            );


            /* Screen effect */

            gameContainer.style.boxShadow =
                "0 0 60px rgba(255,114,0,0.6)";


            setTimeout(() => {

                gameContainer.style.boxShadow =
                    "0 30px 70px rgba(0,0,0,0.5)";

            }, 300);


        } else {

            combo = 0;

            comboDisplay.textContent =
                "0🔥";

            gameMessage.textContent =
                "MISS!";

        }


        setTimeout(() => {

            resetBall();

            shooting = false;

            if (gameRunning) {

                gameMessage.textContent =
                    "SHOOT!";

            }

        }, 450);


    }, 500);

}


/* ================= SCORE POPUP ================= */

function createScorePopup(text) {

    const popup =
        document.createElement("div");

    popup.className =
        "score-popup";

    popup.textContent =
        text;

    popup.style.left =
        ${Math.random() * 50 + 25}%;

    popup.style.top =
        "45%";

    gameContainer.appendChild(popup);


    setTimeout(() => {

        popup.remove();

    }, 800);

}


/* ================= BUTTONS ================= */

startGameButton.addEventListener(
    "click",
    startGame
);


shootButton.addEventListener(
    "click",
    shoot
);


restartButton.addEventListener(
    "click",
    () => {

        clearInterval(timer);

        gameRunning = false;

        shooting = false;

        score = 0;

        timeLeft = 30;

        combo = 0;

        scoreDisplay.textContent =
            "0";

        timeDisplay.textContent =
            "30";

        comboDisplay.textContent =
            "0🔥";

        gameMessage.textContent =
            "PRESS START";

        shootButton.disabled = true;

        startGameButton.textContent =
            "START GAME";

        startGameButton.style.display =
            "block";

        resetBall();

    }
);


/* ================= BALL CLICK ================= */

ball.addEventListener(
    "click",
    shoot
);


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" ||
            event.code === "Enter"
        ) {

            event.preventDefault();

            if (!gameRunning) {

                startGame();

            } else {

                shoot();

            }

        }

    }
);


/* ================= INITIAL STATE ================= */

resetBall();

shootButton.disabled = true;


/* ================= PREVENT IMAGE DRAG ================= */

document.addEventListener(
    "dragstart",
    event => {

        if (event.target.tagName === "IMG") {

            event.preventDefault();

        }

    }
);