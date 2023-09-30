import {wordsArray} from './words.js';


//----------------------------------------------------


const title = document.querySelector(".title");
const stats= document.querySelector(".stats")
const form = document.querySelector("form");
const resetBtn = document.querySelector("#resetBtn");
const imageElement = document.querySelector(".image");

const amountElement = document.querySelector(".guessAmount");
const wordsElement = document.querySelector(".guessedWords");
const hiddenElement = document.querySelector(".hiddenWord");


//----------------------------------------------------

class Hangman {
    constructor() {
        this.word = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
        this.hiddenWord = Array(this.word.length).fill("-").join(" ");
        this.guessesTotal = this.word.length + 5;
        this.guessedList = [];
    }
    
    //
    checkInput(){
        const answerInput = document.querySelector(".formInput");
        const answer = answerInput.value.toUpperCase();
        const exclusions = /[`1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;

        answerInput.value = "";

        if(exclusions.test(answer) || answer === "") {
            alert("Input needs to be a character or word!");
            return;
        }
        this.checkWord(answer);
    }

    //
    checkWord(answer){
        if(answer === this.word){
            this.hiddenWord = this.word
            this.outcome(true);

        } else if(this.guessedList.includes(answer)){
            alert(`You have already guessed '${answer}'!`);
            return;

        } else {
            this.guessesTotal--;
            this.guessedList.unshift(`${answer}`.toUpperCase());
            this.updateHiddenWord(answer)
        }
    }

    //
    updateHiddenWord(answer){
        if(this.word.includes(answer)){
            const arr = this.hiddenWord.split(" ");

            Array.from(this.word).forEach((character, index) => {
                if (character === answer) {
                    arr[index] = answer;
                }
            });
            this.hiddenWord = arr.join(" ")
        }
        this.updateUI();
        this.checkGuesses();

        if (this.hiddenWord.split(" ").join("") === this.word) {
            this.outcome(true);
        }
    };

    //
    checkGuesses(){
        if(this.guessesTotal === 0){
            this.outcome(false);
        }
    }

    //
    updateUI(){
        amountElement.innerHTML = this.guessesTotal
        hiddenElement.innerHTML = this.hiddenWord;
        wordsElement.innerHTML = `[ ${this.guessedList.join(" - ")} ]`
    }

    //
    outcome(bool){
        resetBtn.style.display = "block"; 
        resetBtn.innerHTML = "Play Again"
        form.style.display = "none"

        title.innerHTML = (bool) 
        ? `YOU WIN! <br> <hr> The Word Was - '<u>${this.word}</u>'!` 
        : `YOU LOSE! <br> <hr> The Word Was - '<u>${this.word}</u>'!` 

        imageElement.src = (bool) 
        ? "img/winner.gif"
        : "img/loser.gif";
    }
}


//----------------------------------------------------


//
const start = function(){
    const hangman = new Hangman();

    wordsElement.innerHTML = "[ ]"
    hiddenElement.innerHTML = hangman.hiddenWord
    amountElement.innerHTML = hangman.guessesTotal

    form.addEventListener("submit", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();

        hangman.checkInput();
    });
};


//----


//reset game btn
resetBtn.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    
    if(confirm(`Are you sure you want to ${e.target.innerHTML.toUpperCase()}?`)) {
        document.location.href = "index.html";
    }
});

//back to main menu btn
document.querySelector("#quitBtn").addEventListener("click", (e) => { //BROKEN
    e.stopImmediatePropagation();
    e.preventDefault();

    if(confirm("Are you sure you want to QUIT?")) {
        document.location.href = "start.html";
    }
});


//----------------------------------------------------


//
document.addEventListener("DOMContentLoaded", (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    
    start();
});