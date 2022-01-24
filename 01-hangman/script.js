/* Hangman Game
Cole Benyshek - December 2021 */

import {createDivs, createGuessedParas, createLivesLeft, winOrLose, draw, createCanvas} from './components/functions.js';

// Create and append <input type="button"> elements
export const createButtons = function (alphabet) {
    let btnWrapper = document.createElement('div');
    btnWrapper.classList.add("btn-wrapper");
    alphabet.forEach((item) => {
        btnWrapper.insertAdjacentHTML('beforeend', `
            <input type="button" class="_${item}" value="${item}">
        `);
        btnWrapper.querySelector("._" + item).addEventListener("click", buttonClicked, false); 
    });

document.querySelector(".buttons").append(btnWrapper);
}

// Declare alphabet for buttons, words for guessing
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const words = ["BIOENGINEERING", "TURQUOISE", "KEYBOARD", "HAMMER", "REINDEER", "JAVASCRIPT", "GIRAFFE", "EXCALIBUR", "CAPYBARA", "SILHOUETTE"];

// Randomly decide a word to use from words array
let rng = Math.floor(Math.random() * 10);
var guessWord = words[rng];

// Memory for storing guessed letters
var guesses = new Array();

// Storage for lives left
// var livesLeft = guessWord.length;
var _LivesLeft = 7;

// Global Game over tracker
var gameOver = false;


// Update game status after each button click
const buttonClicked = function () {
    if (!gameOver) {
        let winner = false;
        let isInWord = false;

        // If letter in guessWord, make letter appear
        let children = document.querySelector(".word-wrapper").children;
        for (let i of guessWord) {
            if (this.value == i) {
                isInWord = true;
                for (let j=0; j<children.length; j++) {
                    let childDiv = children[j];
                    if (childDiv.innerHTML == this.value) {
                        childDiv.style.color= '#FFFFFF';
                    }
                }
            }
        }

        // If this.value is not found in guessed letters and not in hangman word, add to list
        if (!guesses.find(element => element == this.value) && !isInWord) {
            _LivesLeft--;
            draw(_LivesLeft);
            document.querySelector(".guessed-letters").insertAdjacentHTML('beforeend', `${this.value} `);
            document.querySelector(".lives").innerHTML = `${_LivesLeft}`;
        }

        // Updated guessed letters if this.value is unique
        if (guesses.length == 0) {
            guesses.push(this.value);
        }
        for (let i=0; i<guesses.length; i++) {
            if (guesses[i] == this.value) {
                break;
            } 
            else if (i == (guesses.length - 1)) {
                guesses.push(this.value);
            }
        }

        // Check to see if all letters have been guessed
        let allWhite = true;
        for (let j=0; j<children.length; j++) {
            if (children[j].style.color == 'rgb(84, 189, 76)') {
                allWhite = false;
                break;
            }
        }
        if (allWhite) {
            gameOver = true;
            winner = true;
            winOrLose(winner);
        }

        // Check to see if _LivesLeft = 0
        if (_LivesLeft <= 0) {
            gameOver = true;
            winOrLose(winner);
        }
    }   
}

createDivs(guessWord);
createGuessedParas();
createLivesLeft();
createCanvas();
draw(); // draw lamp base
createButtons(alphabet);