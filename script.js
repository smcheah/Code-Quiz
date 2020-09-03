//data
var clickCount = 0;
var totalTime;
var questionsList = [
    q1 = {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    q2 = {
        question: "The condition in an if / else statement is enclosed within _____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    q3 = {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    q4 = {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    q5 = {
        question: "A very useful too used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

//menu
var menu = document.querySelector("#menu")
var time = document.querySelector(".time");

//homepage
var homePage = document.querySelector("#homePage");
var startQuiz = document.querySelector("#startQuiz");

//quiz
var quiz = document.querySelector("#quiz");
var questions = document.querySelector("#questions");
var result = document.querySelector("#result");

//final score
var finalScore = document.querySelector("#finalScore");
var score = document.querySelector("#score");
var inputName = document.querySelector("#inputName");

//high score
var highScores = document.querySelector("#highScores");
var scoreList = document.querySelector("#scoreList");
var goHome = document.querySelector("#goHome");
var clearScores = document.querySelector("#clearScores");

//display
homePage.style.display = "block";
quiz.style.display = "none";
finalScore.style.display = "none";
highScores.style.display = "none";

addQuestion(q1);

menu.addEventListener("click", home());

startQuiz.addEventListener("click", function() {
    // start timer
    toggleDisplay(homePage);
    toggleDisplay(quiz);
    timer();
});

questions.addEventListener("click", function(event) {
    clickCount++;
    if (clickCount === 1) {
        nextQuestion(event, q2, 1)
    } else if (clickCount === 2) {
        nextQuestion(event, q3, clickCount)
    } else if (clickCount === 3) {
        nextQuestion(event, q4, clickCount)
    } else if (clickCount === 4) {
        nextQuestion(event, q5, clickCount)
    } else if (clickCount === 5) {
        // all done
        displayResults(event, clickCount);
        toggleDisplay(quiz);
        toggleDisplay(finalScore);
    }
});

finalScore.addEventListener("click", function(event) {
    var userScore = score.textContent
    event.preventDefault();

    if (event.target.matches("button")) {
        if (inputName.value === "") {
            return;
        }
        var newLi = document.createElement("li");
        newLi.textContent = `${inputName.value}: score ${parseInt(userScore)* 10 + parseInt(time.textContent)  }`;
        scoreList.appendChild(newLi);

        toggleDisplay(finalScore);
        toggleDisplay(highScores);
    }
})

goHome.addEventListener("click", home());

clearScores.addEventListener("click", function() {
    scoreList.textContent = "";
})

function timer() {
    score.textContent = 0;
    clickCount = 0;
    totalTime = 60;

    if (totalTime >= 0) {
        var timerInterval = setInterval(function() {
            totalTime--;
            time.textContent = totalTime;
            console.log("clicks: " + clickCount)

            if (clickCount === 5 || totalTime === 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
}

function toggleDisplay(page) {
    if (page.style.display === "none") {
        page.style.display = "block";
    } else {
        page.style.display = "none";
    }
}

function home() {
    totalTime = 60;
    time.textContent = totalTime;
    score.textContent = 0;

    toggleDisplay(highScores);
    toggleDisplay(homePage);
}

function nextQuestion(event, name, index) {
    displayResults(event, index);
    clearQuestion();
    addQuestion(name);
}

function displayResults(event, index) {
    if (event.target.textContent === questionsList[index - 1].answer) {
        result.textContent = "Correct!"
        score.textContent++;
    } else {
        result.textContent = "Wrong!"
        time.textContent -= 10;
    }
}

function clearQuestion() {
    timeOut = setTimeout(function() {
        result.textContent = "";
    }, 1000)
    questions.textContent = "";
}

function addQuestion(questionName) {
    // h1
    quiz.children[0].textContent = questionName.question;

    // buttons
    questionName.choices.forEach(element => {
        var newButton = document.createElement("button");
        newButton.textContent = element;
        var br = document.createElement("br");
        questions.appendChild(newButton);
        questions.appendChild(br);
    })
}
