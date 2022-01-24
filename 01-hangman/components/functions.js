
// Create <div class="X">X</div> elements for hidden word
export const createDivs = function (word) {
    for (let j of word) {
        let divLetter = document.createElement("div");
        divLetter.classList.add(j);
        divLetter.innerHTML = j;
        divLetter.style.color = '#54BD4C';
        document.querySelector(".word-wrapper").append(divLetter);
    }
}

// Create <p class="guessed-letters"></p> element
export const createGuessedParas = function () {
    let guessedLetters = document.createElement("p");
    guessedLetters.classList.add("guessed-letters");
    guessedLetters.innerHTML = `Guessed Letters: `;
    guessedLetters.style.textAlign = 'center';
    document.querySelector(".hangman-word").append(guessedLetters);
}

// Create <p class="lives-left"></p> element
export const createLivesLeft = function () {
    let lives_left = document.createElement("p");
    lives_left.classList.add("lives-left");
    lives_left.innerHTML = `Lives Left: <span class="lives">7</span>`;
    lives_left.style.textAlign = 'right';
    document.querySelector(".hangman-word").append(lives_left);
}

// Create canvas element for drawing
export const createCanvas = function () {
    // Create and append canvas element
    let myCanvas = document.createElement("canvas");
    myCanvas.classList.add("hangman-canvas");
    myCanvas.width = "280";
    myCanvas.height = "210";
    document.querySelector(".hangman-image").append(myCanvas);
}

// Update canvas element based on lives left
export const draw = function (lives = 7) {
    //Browser compatability
    let canvas = document.querySelector(".hangman-canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d')

        // Declare variables
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        let _width = 280;
        let _height = 210;
        let headRadius = 15;
        let start_X = 140;
        let start_Y = 40;
        let street_X = 0;
        let street_Y = 190;
        let lampStart_X = street_X + 50;
        let lampStart_Y = street_Y-181;
        let bodyLength = 55;
        let bodyStart_Y = start_Y + headRadius;
        let bodyEnd_Y = bodyStart_Y + bodyLength;
        let armStart_Y = bodyStart_Y + 10;
        let drawLayer = 7 - lives;

        switch (drawLayer) {
            case 7:
                // Right Leg (7)
                ctx.moveTo(start_X, bodyEnd_Y);
                ctx.lineTo(start_X + 16, bodyEnd_Y + 33);
                break;

            case 6:
                // Left Leg (6)
                ctx.moveTo(start_X, bodyEnd_Y);
                ctx.lineTo(start_X - 16, bodyEnd_Y + 33);
                break;
                
            case 5:
                // Right Arm (5)
                ctx.moveTo(start_X, armStart_Y);
                ctx.lineTo(start_X + 20, armStart_Y + 20); 
                break;

            case 4:
                // Left Arm (4)
                ctx.moveTo(start_X, armStart_Y);
                ctx.lineTo(start_X - 20, armStart_Y + 20); 
                break;
                
            case 3:
                // Body (3)
                ctx.moveTo(start_X, bodyStart_Y);
                ctx.lineTo(start_X, bodyEnd_Y);
                break;
   
            case 2:
                // Head (2)
                ctx.moveTo(start_X + headRadius, start_Y);
                ctx.arc(start_X, start_Y, headRadius, 0, Math.PI*2, false);
                break;
    
            case 1:
                // Lamp Hang (1)
                ctx.moveTo(start_X, lampStart_Y);
                ctx.lineTo(start_X, start_Y-headRadius);
                break;

            default:
                // Lamp (0, base)
                ctx.moveTo(street_X, street_Y);
                ctx.lineTo(_width - street_X, street_Y);
                ctx.moveTo(lampStart_X, street_Y);
                ctx.lineTo(lampStart_X, lampStart_Y);
                ctx.moveTo(lampStart_X, lampStart_Y);
                ctx.lineTo(start_X, lampStart_Y);
        
        }

        ctx.stroke();
        ctx.closePath();
    } 
    else {
        let errorMessage = document.createElement("p");
        errorMessage.innerHTML = `Your browser does not support <canvas> objects!`;
        document.querySelector(".hangman-image").append(errorMessage);
    }
}

// Check win or loss status
export const winOrLose = function (winStatus) {
    // Remove body contents (except header)
    document.querySelector(".hangman-word").remove();
    document.querySelector(".buttons").remove();

    // If win, create win screen
    if (winStatus) {
        let winScreen = document.createElement("div");
        winScreen.classList.add("win-screen");
        winScreen.insertAdjacentHTML('beforeend', `
            <div class="win">You win!</div>
            <img src="images/trophy-512.png" alt=""><br>
            <button class="refresh" onClick="window.location.reload();">Refresh</button>
        `);
        document.querySelector("main").append(winScreen);
    }
    // If lose, create loss screen
    else {
        let loseScreen = document.createElement("div");
        loseScreen.classList.add("win-screen");
        loseScreen.insertAdjacentHTML('beforeend', `You lose! Oh no!`);
        document.querySelector("main").append(loseScreen);
    }
}