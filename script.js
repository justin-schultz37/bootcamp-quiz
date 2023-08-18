const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");

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

function showQuestion(question) {
    questionElement.innerText = question.question;

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

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById("quizContainer").style.display = "block"; // Show the quiz container
    nextButton.disabled = true;
    startButton.disabled = true;
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Start the timer immediately
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

function handleTimeUp() {
    console.log("Time's up!");
    clearInterval(timerInterval); // Stop the timer
    nextQuestion();
}

function handleAnswerClick(answer) {
    answerButtons.forEach((button) => {
        button.removeEventListener("click", handleAnswerClick);
        button.disabled = true;
    });

    if (answer.correct === true) {
        console.log("Correct!")
    } else {
        console.log("Incorrect!");
    }

    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.disabled = true;
    } else {
        console.log("Quiz completed.");
    }
}

startButton.addEventListener("click", startQuiz); // Add this line
nextButton.addEventListener("click", nextQuestion);
