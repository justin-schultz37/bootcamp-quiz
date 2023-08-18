// List of variables created that are linked to elements found in the HTML
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const saveButton = document.getElementById("saveButton");
const scoreList = document.getElementById("scoreList");

// Sets the initial score to 0
let score = 0;

// The questions and answers that the user will see when interracting with the quiz
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

//The function that displays the questions and answers
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

//This function runs when the start quiz button is click
function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById("quizContainer").style.display = "block"; // Show the quiz container
    document.getElementById('start-btn').style.display = 'none'; // Removes start button once quiz begins
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
// This function checks if the answer selected is true or false, and will increase score or subtract from time remaining
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
        timeLeft -= 2;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }

    nextButton.disabled = false;
}
// This make the quiz progress until all questions are answered, and displays the score HTML elements
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.disabled = true;
    } else {
        console.log("Quiz completed.");
        document.getElementById("finalScore").style.display = "block";
        document.getElementById("score").textContent = score;
    }
}
// Resets the score, time, question index, hides final score elements, and re-displays the start quiz elements.
function restartQuiz() {
    currentQuestionIndex = -1;
    score = 0;
    timeLeft = 60;
    clearInterval(timerInterval);
    updateTimer();

    // Hide and show the appropriate sections
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("finalScore").style.display = "none";
    document.getElementById("savedScores").style.display = "none";

    // Show the "Start Quiz" button again
    document.getElementById("start-btn").style.display = "block";
    document.getElementById("start-btn").disabled = false;
}

// The event listeners for the start, next, save, and reset buttons.
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
saveButton.addEventListener("click", function () {
    const initials = document.getElementById("initials").value;
    if (initials !== "") {
        const savedScoreItem = document.createElement("li");
        savedScoreItem.textContent = `${initials}: ${score}`;
        scoreList.appendChild(savedScoreItem);

        // Clear input and reset score
        document.getElementById("initials").value = "";
        score = 0;

        // Hide the score entry form
        document.getElementById("finalScore").style.display = "none";

        // Show the saved scores section
        document.getElementById("savedScores").style.display = "block";
    }
});
const restartButton = document.getElementById("restart-btn");
restartButton.addEventListener("click", restartQuiz);
