const words = [
    {word: 'apple', hint: 'A fruit that keeps the doctor away'},
    {word: 'banana', hint: 'A yellow curved fruit'},
    {word: 'cherry', hint: 'Small red fruit often on top of ice cream'},
    {word: 'date', hint: 'A sweet fruit often associated with palm trees'},
    {word: 'elderberry', hint: 'Dark purple berry used in wines and jams'},
    {word: 'fig', hint: 'A sweet fruit with many tiny seeds inside'},
    {word: 'grape', hint: 'Small round fruit used to make wine'},
    {word: 'honeydew', hint: 'A type of sweet, pale green melon'},
    {word: 'kiwi', hint: 'A fuzzy brown fruit with green flesh'},
    {word: 'lemon', hint: 'A sour yellow citrus fruit'},
    {word: 'mango', hint: 'A tropical fruit with a large pit'},
    {word: 'nectarine', hint: 'Similar to a peach but without fuzz'},
    {word: 'orange', hint: 'A citrus fruit that shares its name with a color'},
    {word: 'papaya', hint: 'Tropical fruit with black seeds and orange flesh'},
    {word: 'quince', hint: 'A hard yellow fruit often used in jams'},
    {word: 'raspberry', hint: 'A small red berry with a hollow core'},
    {word: 'strawberry', hint: 'A red fruit with seeds on the outside'},
    {word: 'tangerine', hint: 'A small orange citrus fruit'},
    {word: 'ugli', hint: 'A Jamaican citrus fruit, a hybrid of grapefruit and tangerine'},
    {word: 'watermelon', hint: 'Large green fruit with red flesh and black seeds'}
];

let currentWord = '';
let currentHint = '';
let displayedWord = '';
let guesses = [];
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let timeLeft = 30;
let timer;
let hintShown = false;

const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const guessedLetters = document.getElementById('guessed-letters');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const player1Display = document.getElementById('player1');
const player2Display = document.getElementById('player2');
const hintDisplay = document.getElementById('hint');

function startNewTurn() {
    const wordObj = getUniqueWord();
    currentWord = wordObj.word;
    currentHint = wordObj.hint;
    displayedWord = '_'.repeat(currentWord.length);
    guesses = [];
    hintShown = false;
    hintDisplay.textContent = '';
    hintDisplay.classList.remove('visible');
    updateDisplay();
    startTimer();
}

function getUniqueWord() {
    const availableWords = words.filter(wordObj => wordObj.word !== currentWord);
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

function updateDisplay() {
    wordDisplay.textContent = displayedWord.split('').join(' ');
    guessedLetters.textContent = `Guessed: ${guesses.join(', ')}`;
    score1Display.textContent = scores[1];
    score2Display.textContent = scores[2];
    player1Display.classList.toggle('active', currentPlayer === 1);
    player2Display.classList.toggle('active', currentPlayer === 2);
}

function makeGuess() {
    const letter = letterInput.value.toLowerCase();
    if (letter && !guesses.includes(letter)) {
        guesses.push(letter);
        if (currentWord.includes(letter)) {
            updateDisplayedWord(letter);
            if (displayedWord === currentWord) {
                endTurn(true);
            }
        }
        updateDisplay();
    }
    letterInput.value = '';
    letterInput.focus();
}

function updateDisplayedWord(letter) {
    let newDisplayedWord = '';
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            newDisplayedWord += letter;
        } else {
            newDisplayedWord += displayedWord[i];
        }
    }
    displayedWord = newDisplayedWord;
}

function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 29 && !hintShown) {
            showHint();
        }
        if (timeLeft === 0) {
            endTurn(false);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}

function showHint() {
    hintDisplay.textContent = `Hint: ${currentHint}`;
    hintDisplay.classList.add('visible');
    hintShown = true;
}


function endTurn(guessedCorrectly) {
    clearInterval(timer);
    if (guessedCorrectly) {
        scores[currentPlayer]++;
        message.textContent = `Player ${currentPlayer} guessed the word: ${currentWord}`;
    } else {
        message.textContent = `Time's up! The word was: ${currentWord}`;
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setTimeout(() => {
        message.textContent = '';
        startNewTurn();
    }, 3000);
}

guessButton.addEventListener('click', makeGuess);
letterInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

startNewTurn();