// var questionSelection;
// var question;
// var answer;
// var userChoice;

//variables for where dynamic content will be placed in index.html

var questionsAndAnswers = $(".questions-and-answers");
var questionDisplay = $("#question");
var answerDisplayOne = $("#answer1");
var answerDisplayTwo = $("#answer2");
var answerDisplayThree = $("#answer3");
var answerDisplayFour = $("#answer4");
var displayQuestionsandTimer = $("#time-remaining, #answer1, #answer2, #answer3, #answer4");
var timeRemainingJQuery = $("#time-remaining");
var answerImage = $("#answer-image");


var initTimeRemaining = 30;
var timer;

//Array for question, answers, correct answer, and images
var questions = [{
    question: "What is the most popular pet in the world?",
    answers: ["Fish", "Cat", "Dog", "Snake"];
    correctAnswer: "Fish",
    image = "./assets/images/pet.jpg"
}, {
    question: "What do Rin Tin Tin, Lassie, and Snoopy all share in common?",
    answers: ["They're all retrievers.", "They all have their own TV shows.", "They have their own fragrances line.", "They're all labradors."],
    correctAnswer: "They all have their own TV shows.",
    image: "./assets/images/dog.jpg"
}, {
    question: "What is the name of the largest shark species in the world?",
    answers: ["Great white shark", "Whale shark", "Hammerhead shark", "Tiger shark"],
    correctAnswer: "Whale shark",
    image: "./assets/images/shark.jpg"
}, {
    question: "Which of the following is the largest mammal in the world?",
    answers: ["Elephant", "Blue whale", "Hippopotamus", "Giraffe"],
    correctAnswer: "Blue whale",
    image: "./assets/images/mammals.jpg"
}, {
    question: "Which of the following describes reptiles?",
    answers: ["Warm-Blooded", "Cold-blooded", "They're only found in the western hemisphere.", "None of the above"],
    correctAnswer: "Cold-blooded",
    image: "./assets/images/reptiles.jpg"
}, {
    question: "Bird are oviparous, meaning that they share this characteristic with most fish, reptiles, and amphibians?",
    answers: ["Cold-blooded", "Females lay eggs", "Ability to fly", "Ability to swim"],
    correctAnswer: "Females lay eggs",
    image: "./assets/images/birds.jpg"
}, {
    question: "Which of the following statements about zebras are true?",
    answers: ["Zebras can outrun lions.", "Zebras sleep standing up.", "Zebras travel in large herds.", "All of the above"],
    correctAnswer: "All of the above",
    image: "./assets/images/zebras.jpg"
}, {
    question: "What is the national bird of the U.S.A.?",
    answers: ["Bald eagle", "Flamingo", "Cardinal", "Hawk"],
    correctAnswer: "Bald eagle",
    image: "./assets/images/nationalBird.jpg"
}, {
    question: "The Komodo dragon, the largest non-extinct lizard, can be found in which country?",
    answers: ["Australia", "Philippines", "Japan", "Indonesia"],
    correctAnswer: "Indonesia",
    image: ".assets/images/komodoDragon.jpg"
}, {
    question: "Frogs belong to which class of vertebrates?",
    answers: ["Mammals", "Amphibians", "Reptiles", "Fish"],
    correctAnswer: "Amphibians",
    image: ".assets/images/frog.jpg"
}]


//game logic
var gameLogic = {

    questions: questions,
    currentQuestion: 0,
    counter: initTimeRemaining,
    correct: 0,
    incorrect: 0,

    startTimer: function () {
        this.counter--;
        timeRemainingJQuery.text(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },


    nextQuestion: function () {

        timer = setInterval(this.countdown.bind(this), 1000);

        questionDisplay("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] +
                "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    
}







function newQuestion() {
    setTimeout(randomQuestionSelection, 5000);
};

//checks user response
function correctOrIncorrect() {
    displayQuestionsandTimer.hide();
    console.log(correctAnswer);
    console.log(userChoice);
    if (userChoice === correctAnswer) {
        clearInterval(timer);
        correctResponse++;
        answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection + "'><br><h3>Congratulations!</h3>");
        answerImage.show();
        if (totalResponses < 10) {
            newQuestion();
        } else {
            resetGame()
        }
    } else {
        clearInterval(timer);
        incorrectResponse++;
        answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection + "'><br><h3>Wrong!</h3>");
        answerImage.show();
        if (totalResponses < 10) {
            newQuestion();
        } else {
            resetGame()
        }
    }
}

//starts game
if (startGame == false) {
    $(document).on("click", "#start-button, #play-again", function (event) {
        $("#start-button").hide();
        $("#play-again").hide();
        event.preventDefault();
        startGame = true;
        newQuestion();
    })
}


//comes up with new questions, assigns it to global variable, and removes question from array
function randomQuestionSelection() {
    // reset clock
    answerImage.hide()
    displayQuestionsandTimer.show();
    timer = setInterval(function () {
        initTimeRemaining--;
        $("#time-remaining").html("Time remaining: " + initTimeRemaining);
    }, 1000)
    initTimeRemaining = 30;
    var questionIndex = Math.floor(Math.random() * (currentQuestionAndAnswerSelection.length - 1));
    // console.log(questionIndex);
    questionSelection = currentQuestionAndAnswerSelection[questionIndex];
    console.log(questionIndex);
    console.log(questionSelection);
    // console.log(questionSelection);
    question = questions[questionSelection];
    // console.log(question);
    answerChoices = answers[questionSelection][0];
    // console.log(answerChoices);
    correctAnswer = answers[questionSelection][1];
    // console.log(correctAnswer);
    currentQuestionAndAnswerSelection.splice(questionIndex, 1);
    // console.log(currentQuestionAndAnswerSelection);
    displayQandA();
}

function displayQandA() {
    displayQuestionsandTimer.show();
    // clear q and a section
    // change html to Q and A
    questionDisplay.text(question);
    answerDisplayOne.text(answerChoices[0]);
    answerDisplayOne.attr("button-content", answerChoices[0]);
    answerDisplayTwo.text(answerChoices[1]);
    answerDisplayTwo.attr("button-content", answerChoices[1]);
    answerDisplayThree.text(answerChoices[2]);
    answerDisplayThree.attr("button-content", answerChoices[2]);
    answerDisplayFour.text(answerChoices[3]);
    answerDisplayFour.attr("button-content", answerChoices[3]);

    //Time Limit        
    questionsAndAnswers.on("click", "#answer1", function () {
        console.log("answer#1");
        userChoice = answerDisplayOne.attr("button-content");
        correctOrIncorrect();
    }).on("click", "#answer2", function () {
        userChoice = answerDisplayTwo.attr("button-content");
        correctOrIncorrect();
    }).on("click", "#answer3", function () {
        userChoice = answerDisplayThree.attr("button-content");
        correctOrIncorrect();
    }).on("click", "#answer4", function () {
        userChoice = answerDisplayFour.attr("button-content");
        correctOrIncorrect();
    })
}

if (initTimeRemaining === 0) {
    userChoice = "";
    correctOrIncorrect();
};




// Reset Game
function resetGame() {
    clearInterval(timer);
    questionsAndAnswers.empty();
    questionsAndAnswers.append("<h2>GAME OVER!</h2>");
    questionsAndAnswers.append("<h5>Correct Responses: " + correctResponse + "</h5><br><h5>" + incorrectResponse + "</h5>")
    startGame = false;
    correctResponse = 0;
    incorrectResponse = 0;
    currentQuestionAndAnswerSelection = questionAndAnswerSelection;
    $("#play-again").show();
}