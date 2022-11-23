console.log("hola mundo");

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const nameJugador = document.querySelector("#name");

// obteniendo datos
var highScores = JSON.parse(localStorage.getItem('highScores'));
var jugadorActual = JSON.parse(localStorage.getItem('jugadorActual'));
console.log(highScores)
console.log(jugadorActual)

// comparar datos
console.log(highScores)
highScores.forEach((user, position) => {
if (jugadorActual.name === user.name) {
    jugadorActual.score = user.score > jugadorActual.score ? user.score : jugadorActual.score;
    scoreText.innerText = jugadorActual.score;
    nameJugador.innerHTML = jugadorActual.name;
    // borrar user
    console.log(position)
    highScores.splice(position, 1);
}
});


let currentQuestion = {};
let acceptingAnswers = false;
let score = jugadorActual.score;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch("questions.json")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        let selectQuestions = [];
        for (let i = 0; i < 4; i++) {
            e = Math.round(Math.random()*11);
            selectQuestions [i] = questions[e];       
        }
        // console.log(selectQuestions)
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = jugadorActual.score;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        jugadorActual.score = score;

        localStorage.setItem("jugadorActual", JSON.stringify(jugadorActual))
        localStorage.setItem('highScores', JSON.stringify(highScores));
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

