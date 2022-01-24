// Doodle Jump
// Cole Benyshek - January 2022
// Modeled after project from Ania Kubow: 
// https://youtu.be/8xPsg6yv7TU 


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('img');
    let vWidth = 400;
    let vHeight = 600;
    let pWidth = 85;
    let pHeight = 15;
    let dWidth = 60;
    let startPoint = 150;
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let numPlatforms = 5;
    let platforms = [];
    let platDecrement = 4;
    let upTimer;
    let downTimer;
    let leftTimer;
    let rightTimer;
    let tickDuration = 25;  // milliseconds
    let jumpHeight = 200;
    let jumpSpeed = 14;
    let fallSpeed = 14;
    let isJumping = false;
    let isGoingLeft = true;
    let isGoingRight = true;
    let score = 0;

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.floor(Math.random() * (vWidth - pWidth));
            this.visual = document.createElement('img');

            const visual = this.visual;
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            visual.classList.add('platform');
            visual.src = './images/platform.png';
            visual.alt = 'platform';
            grid.appendChild(visual);
        }
    }

    const createDoodler = () => {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodler.src = './images/doodler-guy.png';
        doodler.alt = 'doodler';
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    const createPlatforms = () => {
        for (let i = 0; i < numPlatforms; i++) {
            let platGap = vHeight / numPlatforms;
            let newPlatBottom = (i * platGap) + 100;
            let newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform);
        }
    }

    const movePlatforms = () => {
        if (doodlerBottomSpace > 200) {
            platforms.forEach((item) => {
                item.bottom -= platDecrement;
                let visual = item.visual;
                visual.style.bottom = item.bottom + 'px';

                if (item.bottom < 10) {
                    score++;
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    firstPlatform.remove();
                    platforms.shift();
                    let newPlatform = new Platform(vHeight);
                    platforms.push(newPlatform);
                }
            }); 
        }
    }

    const jump = () => {
        if (!isJumping) {
            clearInterval(downTimer);
            isJumping = true;
            upTimer = setInterval(() => {
                doodlerBottomSpace += jumpSpeed;
                doodler.style.bottom = doodlerBottomSpace + 'px';
                if (doodlerBottomSpace > startPoint + jumpHeight) {
                    fall();
                }
            }, tickDuration);
        }
    }

    const fall = () => {
        if (isJumping) {
            clearInterval(upTimer);
            isJumping = false;
            downTimer = setInterval(() => {
                doodlerBottomSpace -= fallSpeed;
                doodler.style.bottom = doodlerBottomSpace + 'px';
                if(doodlerBottomSpace <= 0) {
                    gameOver();
                }
                platforms.forEach ((item) => {
                    if ((doodlerBottomSpace >= item.bottom) && 
                    (doodlerBottomSpace <= item.bottom + pHeight) &&
                    (doodlerLeftSpace + dWidth >= item.left) &&
                    (doodlerLeftSpace <= item.left + pWidth) &&
                    !isJumping) {
                        console.log('wahoo');
                        startPoint = doodlerBottomSpace;
                        jump();
                    }
                });
            }, tickDuration);
        }
    }

    const moveLeft = () => {
        if (isGoingRight) {
            isGoingRight = false;
            clearInterval(rightTimer);
            isGoingLeft = true;
            leftTimer = setInterval(() => {
                if (doodlerLeftSpace >= 0) {   
                    doodlerLeftSpace -= 8;
                    doodler.style.left = doodlerLeftSpace + 'px';
                }
                else moveRight();
            }, tickDuration);
        }
    }

    const moveRight = () => {
        if (isGoingLeft) {
            isGoingLeft = false;
            clearInterval(leftTimer);
            isGoingRight = true;
            rightTimer = setInterval(() => {
                if (doodlerLeftSpace <= vWidth - dWidth) {
                    doodlerLeftSpace += 8;
                    doodler.style.left = doodlerLeftSpace + 'px';
                }
                else moveLeft();
            }, tickDuration);
        }
    }

    const moveStraight = () => {
        isGoingRight = false;
        isGoingLeft = false;
        clearInterval(rightTimer);
        clearInterval(leftTimer);
    }

    const control = (e) => {
        if (e.key === 'ArrowLeft') {
            moveLeft();
        }
        else if (e.key === 'ArrowRight') {
            moveRight();
        }
        else if (e.key === 'ArrowUp') {
            moveStraight();
        }
    }

    const gameOver = () => {
        console.log('gameOver');
        isGameOver = true;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.insertAdjacentHTML('beforeend', `<div class="score">${score}</div> 
        <img class="background" src="./images/background.png" alt="background" />`);
        clearInterval(upTimer);
        clearInterval(downTimer);
        clearInterval(leftTimer);
        clearInterval(rightTimer);
    }

    const start = () => {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, tickDuration);
            jump();
            document.addEventListener('keyup', control);
        }
    }

    // Add button
    start();

}, false);