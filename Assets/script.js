
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const saveButton = document.getElementById("saveButton");
const scoreList = document.getElementById("scoreList");
const restartButton = document.getElementById("restart-btn");

let score = 0;

const questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Alerts", correct: true },
            { text: "Numbers", correct: false }
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with:",
        answers: [
            { text: "curly brackets", correct: true },
            { text: "parenthesis", correct: false },
            { text: "square brackets", correct: false },
            { text: "quotes", correct: false }
        ]
    }, {
        question: "A very useful tool used in development and debugging for priniting content to the debugger is",
        answers: [
            { text: "terminal/bash", correct: false },
            { text: "console.log", correct: true },
            { text: "for loop", correct: false },
            { text: "Javascript", correct: false }
        ]
    }, {
        question: "Arrays in Javascript can be used to store:",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    }, {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { text: "curly brackets", correct: false },
            { text: "parenthesis", correct: false },
            { text: "commas", correct: false },
            { text: "quotes", correct: true }
        ]
    },
];

let currentQuestionIndex = -1;
let timerInterval;
let timeLeft = 60;

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById("quizContainer").style.display = "block";
    document.getElementById('start-btn').style.display = 'none';
    nextButton.disabled = true;
    startButton.disabled = true;
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer() {
    timeLeft--;
    if (timeLeft >= 0) {
        timerElement.innerText = `Time left: ${timeLeft} seconds`;
    } else {
        clearInterval(timerInterval);
        handleTimeUp();
    }
}

function showQuestion(question) {
    questionElement.textContent = question.question;

    answerButtons.forEach((button) => {
        button.removeEventListener("click", handleAnswerClick);
    });

    question.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer.text;
        answerButtons[index].addEventListener("click", () => handleAnswerClick(answer));
        answerButtons[index].disabled = false;
    });

    nextButton.disabled = true;
}

function handleAnswerClick(answer) {
    answerButtons.forEach((button) => {
        button.removeEventListener("click", handleAnswerClick);
        button.disabled = true;
    });

    if (answer.correct === true) {
        nextButton.textContent = 'Correct!';
        score++;
    } else {
        nextButton.textContent = 'Wrong!';
    }


    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.disabled = true;
    } else {
        stopTimer();
        alert('Quiz Completed!');
        document.getElementById("finalScore").style.display = "block";
        document.getElementById("score").textContent = score;
        document.getElementById('next-btn').disabled = true;
    }
}
function stopTimer() {
    clearInterval(timerInterval);
}

function handleTimeUp() {
    alert('Oh no! You have run out of time.');
    clearInterval(timerInterval);
    restartQuiz();
}

function restartQuiz() {
    // Reset variables and timer
    currentQuestionIndex = -1;
    score = 0;
    timeLeft = 60;
    clearInterval(timerInterval);

    // Hide and show appropriate sections
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("finalScore").style.display = "none";
    document.getElementById("savedScores").style.display = "none";

    // Show and enable the "Start Quiz" button
    document.getElementById("start-btn").style.display = "block";
    document.getElementById("start-btn").disabled = false;
    document.getElementById('next-btn').disabled = true;
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
saveButton.addEventListener("click", function () {
    const initials = document.getElementById("initials").value;
    if (initials !== "") {
        const savedScoreItem = document.createElement("li");
        savedScoreItem.textContent = `${initials}: ${score}`;
        scoreList.appendChild(savedScoreItem);


        document.getElementById("initials").value = "";
        score = 0;


        document.getElementById("finalScore").style.display = "none";


        document.getElementById("savedScores").style.display = "block";
    }
});

restartButton.addEventListener("click", restartQuiz);
