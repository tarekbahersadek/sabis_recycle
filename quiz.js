// ==========================================
// SABIS RECYCLE QUIZ
// ==========================================


// ==========================================
// QUIZ QUESTIONS
// ==========================================

const questions = [

    {
        question: "What is recycling?",

        type: "single",

        answers: [
            "Turning used materials into new products",
            "Throwing all waste into one bin",
            "Burning all rubbish",
            "Buying new products"
        ],

        correct: [0],

        feedback:
            "Recycling means processing used materials so they can be used to make new products."
    },


    {
        question: "Which three words are known as the 3 Rs of waste management?",

        type: "single",

        answers: [
            "Reduce, Reuse, Recycle",
            "Repair, Remove, Replace",
            "Return, Refill, Remove",
            "Reuse, Replace, Recover"
        ],

        correct: [0],

        feedback:
            "The 3 Rs are Reduce, Reuse, and Recycle."
    },


    {
        question: "Reducing waste means trying to create less waste in the first place.",

        type: "truefalse",

        answers: [
            "True",
            "False"
        ],

        correct: [0],

        feedback:
            "True! Reducing means preventing or minimizing waste before it is created."
    },


    {
        question: "Which item is commonly made from recycled paper?",

        type: "single",

        answers: [
            "Newspaper",
            "Glass bottle",
            "Aluminum can",
            "Plastic spoon"
        ],

        correct: [0],

        feedback:
            "Paper products such as newspapers can be made using recycled paper fibers."
    },


    {
        question: "Which materials are commonly recyclable in many recycling systems? Select all that apply.",

        type: "multiple",

        answers: [
            "Clean cardboard",
            "Empty glass bottles",
            "Aluminum cans",
            "Food-covered tissues"
        ],

        correct: [0, 1, 2],

        feedback:
            "Clean cardboard, glass bottles, and aluminum cans are commonly recyclable. Food-covered tissues generally do not belong in standard recycling."
    },


    {
        question: "What does reuse mean?",

        type: "single",

        answers: [
            "Using an item again",
            "Throwing an item away",
            "Buying a larger item",
            "Mixing different wastes"
        ],

        correct: [0],

        feedback:
            "Reuse means using an existing item again instead of throwing it away."
    },


    {
        question: "Recycling is the only action people can take to reduce the amount of waste they produce.",

        type: "truefalse",

        answers: [
            "True",
            "False"
        ],

        correct: [1],

        feedback:
            "False! Reducing and reusing are also important ways to prevent waste."
    },


    {
        question: "Why should recyclable containers generally be emptied before recycling them?",

        type: "single",

        answers: [
            "To reduce contamination",
            "To make them heavier",
            "To change the material",
            "To make them non-recyclable"
        ],

        correct: [0],

        feedback:
            "Emptying containers helps prevent leftover food or liquids from contaminating recyclable materials."
    },


    {
        question: "Which choice is an example of reducing waste?",

        type: "single",

        answers: [
            "Using a reusable bottle instead of buying disposable bottles",
            "Throwing away a reusable bottle",
            "Buying extra packaging",
            "Putting food in the recycling bin"
        ],

        correct: [0],

        feedback:
            "Using a reusable bottle can reduce the number of disposable bottles that become waste."
    },


    {
        question: "Which symbol is commonly associated with recycling?",

        type: "single",

        answers: [
            "Three chasing arrows",
            "A musical note",
            "A star",
            "A lightning bolt"
        ],

        correct: [0],

        feedback:
            "The three chasing arrows form the recycling symbol commonly associated with recycling."
    },


    {
        question: "Which actions can help reduce waste at school? Select all that apply.",

        type: "multiple",

        answers: [
            "Using both sides of paper when appropriate",
            "Using reusable water bottles",
            "Throwing recyclable paper into general waste",
            "Reusing suitable school supplies"
        ],

        correct: [0, 1, 3],

        feedback:
            "Using both sides of paper, reusable bottles, and reusable school supplies can all help reduce waste."
    },


    {
        question: "What is composting mainly used for?",

        type: "single",

        answers: [
            "Organic waste",
            "Glass bottles",
            "Aluminum cans",
            "Plastic bags"
        ],

        correct: [0],

        feedback:
            "Composting is mainly used to break down suitable organic materials such as many food scraps and yard waste."
    },


    {
        question: "Which material is commonly used to make aluminum cans?",

        type: "single",

        answers: [
            "Aluminum",
            "Paper",
            "Glass",
            "Wood"
        ],

        correct: [0],

        feedback:
            "Aluminum cans are made primarily from aluminum metal."
    },


    {
        question: "Glass bottles can often be recycled into new glass products.",

        type: "truefalse",

        answers: [
            "True",
            "False"
        ],

        correct: [0],

        feedback:
            "True! Glass containers can often be collected, processed, and used as material for new glass products."
    },


    {
        question: "What is the purpose of a recycling bin?",

        type: "single",

        answers: [
            "To collect suitable recyclable materials",
            "To collect every type of waste",
            "To store food for later",
            "To replace every other waste bin"
        ],

        correct: [0],

        feedback:
            "A recycling bin is intended to collect materials that the local recycling system accepts."
    },


    {
        question: "Which action comes first in the 3 Rs?",

        type: "single",

        answers: [
            "Reduce",
            "Reuse",
            "Recycle",
            "Replace"
        ],

        correct: [0],

        feedback:
            "Reduce comes first: Reduce, Reuse, Recycle."
    },


    {
        question: "Which habits can help protect resources? Select all that apply.",

        type: "multiple",

        answers: [
            "Repairing items when practical",
            "Reusing suitable items",
            "Buying unnecessary disposable products",
            "Reducing unnecessary consumption"
        ],

        correct: [0, 1, 3],

        feedback:
            "Repairing, reusing, and reducing unnecessary consumption can help save resources."
    },


    {
        question: "What should you do if you are unsure whether an item belongs in a recycling bin?",

        type: "single",

        answers: [
            "Check the local recycling rules",
            "Always put it in recycling",
            "Break it into pieces",
            "Put every uncertain item into compost"
        ],

        correct: [0],

        feedback:
            "Recycling rules can differ between places, so checking the local guidance is the best choice."
    },


    {
        question: "Which choice best represents the idea of a circular economy?",

        type: "single",

        answers: [
            "Keeping materials in use for as long as possible",
            "Using a product once and discarding it",
            "Increasing unnecessary waste",
            "Never repairing products"
        ],

        correct: [0],

        feedback:
            "A circular economy aims to keep products and materials in use for as long as possible and reduce waste."
    },


    {
        question: "Which statement best summarizes responsible waste management?",

        type: "single",

        answers: [
            "Reduce waste, reuse items, and recycle suitable materials",
            "Throw everything away immediately",
            "Recycle everything without checking",
            "Use more disposable products"
        ],

        correct: [0],

        feedback:
            "Responsible waste management includes reducing waste, reusing items, and recycling suitable materials."
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let selectedAnswers = [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const startButton =
    document.getElementById("startQuiz");

const quizIntro =
    document.querySelector(".quiz-intro");

const quizSection =
    document.getElementById("quizSection");

const resultSection =
    document.getElementById("resultSection");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const progressBar =
    document.getElementById("progressBar");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");

const restartButton =
    document.getElementById("restartQuiz");


// ==========================================
// START QUIZ
// ==========================================

startButton.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    selectedAnswers = [];

    quizIntro.style.display = "none";

    quizSection.style.display = "flex";

    resultSection.style.display = "none";

    scoreDisplay.innerText =
        "Score: 0";

    showQuestion();

});


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const q =
        questions[currentQuestion];


    // Question number

    questionNumber.innerText =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    // Progress

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width =
        progress + "%";


    // Question text

    questionElement.innerText =
        q.question;


    // Clear old answers

    answersElement.innerHTML = "";

    feedbackElement.style.display =
        "none";

    feedbackElement.innerText =
        "";

    nextButton.style.display =
        "none";


    // Reset selected answers

    selectedAnswers = [];


    // Create answer buttons

    q.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.innerText =
            answer;


        button.dataset.index =
            index;


        button.addEventListener(
            "click",
            function () {

                selectAnswer(index, button);

            }
        );


        answersElement.appendChild(button);

    });

}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(index, button) {

    const q =
        questions[currentQuestion];


    // Multiple-answer question

    if (q.type === "multiple") {

        if (selectedAnswers.includes(index)) {

            selectedAnswers =
                selectedAnswers.filter(
                    function (item) {
                        return item !== index;
                    }
                );

            button.classList.remove("selected");

        } else {

            selectedAnswers.push(index);

            button.classList.add("selected");

        }


        // Change selected appearance

        button.style.backgroundColor =
            "#d9f2df";

        button.style.borderColor =
            "darkgreen";


        // Show submit button

        showMultipleSubmit();

        return;
    }


    // Single answer / True False

    selectedAnswers = [index];

    checkAnswer();

}


// ==========================================
// MULTIPLE ANSWER SUBMIT
// ==========================================

function showMultipleSubmit() {

    nextButton.style.display =
        "block";

    nextButton.innerText =
        "Check Answer ✓";


    nextButton.onclick =
        function () {

            checkAnswer();

        };

}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer() {

    const q =
        questions[currentQuestion];


    // Disable all answer buttons

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(function (button) {

        button.disabled = true;

    });


    // Sort answers for comparison

    const userAnswers =
        [...selectedAnswers].sort(
            function (a, b) {
                return a - b;
            }
        );


    const correctAnswers =
        [...q.correct].sort(
            function (a, b) {
                return a - b;
            }
        );


    // Check if answers are exactly correct

    const isCorrect =
        JSON.stringify(userAnswers) ===
        JSON.stringify(correctAnswers);


    // Color answers

    buttons.forEach(function (button) {

        const index =
            Number(button.dataset.index);


        if (q.correct.includes(index)) {

            button.classList.add("correct");

        }


        if (
            selectedAnswers.includes(index) &&
            !q.correct.includes(index)
        ) {

            button.classList.add("wrong");

        }

    });


    // Score

    if (isCorrect) {

        score++;

        scoreDisplay.innerText =
            "Score: " + score;

    }


    // Feedback

    feedbackElement.innerText =
        (isCorrect ? "✅ Correct! " : "❌ Not quite. ") +
        q.feedback;

    feedbackElement.style.display =
        "block";


    // Next button

    nextButton.style.display =
        "block";

    nextButton.innerText =
        currentQuestion === questions.length - 1
            ? "See Results →"
            : "Next Question →";


    nextButton.onclick =
        nextQuestion;

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= questions.length) {

        showResults();

        return;

    }


    showQuestion();

}


// ==========================================
// SHOW RESULTS
// ==========================================

function showResults() {

    quizSection.style.display =
        "none";

    resultSection.style.display =
        "flex";


    finalScore.innerText =
        score + " / " + questions.length;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.innerText =
            "🏆 Perfect score! You are a recycling champion!";

    }

    else if (percentage >= 80) {

        resultMessage.innerText =
            "🌟 Excellent job! You know a lot about recycling!";

    }

    else if (percentage >= 60) {

        resultMessage.innerText =
            "👍 Good job! Keep learning about recycling!";

    }

    else if (percentage >= 40) {

        resultMessage.innerText =
            "♻️ Nice try! Review the 3 Rs and try again!";

    }

    else {

        resultMessage.innerText =
            "🌱 Keep practicing! Every recycling expert starts somewhere!";

    }

}


// ==========================================
// RESTART QUIZ
// ==========================================

restartButton.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        selectedAnswers = [];


        resultSection.style.display =
            "none";

        quizIntro.style.display =
            "flex";

        quizSection.style.display =
            "none";


        scoreDisplay.innerText =
            "Score: 0";

    }
);
