var panel = $("#quiz-area");
var countStartNumber = 30;

//Array for question, answers, correct answer, and images
var questions = [{
    question: "What is the most popular pet in the world?",
    answers: ["Fish", "Cat", "Dog", "Snake"],
    correctAnswer: "Fish",
    image: "./assets/images/pet.jpg"
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

var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        this.counter--;
        $("counter-number").text(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(this.countdown.bind(this), 1000);

        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] +
                "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function () {
        this.counter = window.countStartNumber;
        $("#counter-number").text(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function () {
        //timer declared globally
        clearInterval(window.timer);

        $("#counter-number").text(this.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results, 3 * 1000);
        } else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },

    results: function () {

        clearInterval(window.timer);

        panel.html("<h2>All done, heres how you did!</h2>");

        $("#counter-number").text(this.counter);

        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function (e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        this.incorrect++;

        clearInterval(window.timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(window.timer);

        this.correct++;

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.nextQuestion();
    }
}


//Event Listeners
$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function (e) {
    game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.nextQuestion.bind(game)();
});


// //checks user response
// function correctOrIncorrect() {
//     displayQuestionsandTimer.hide();
//     console.log(correctAnswer);
//     console.log(userChoice);
//     if (userChoice === correctAnswer) {
//         clearInterval(timer);
//         correctResponse++;
//         answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection + "'><br><h3>Congratulations!</h3>");
//         answerImage.show();
//         if (totalResponses < 10) {
//             newQuestion();
//         } else {
//             resetGame()
//         }
//     } else {
//         clearInterval(timer);
//         incorrectResponse++;
//         answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection + "'><br><h3>Wrong!</h3>");
//         answerImage.show();
//         if (totalResponses < 10) {
//             newQuestion();
//         } else {
//             resetGame()
//         }
//     }
// }

// //starts game
// if (startGame == false) {
//     $(document).on("click", "#start-button, #play-again", function (event) {
//         $("#start-button").hide();
//         $("#play-again").hide();
//         event.preventDefault();
//         startGame = true;
//         newQuestion();
//     })
// }


// //comes up with new questions, assigns it to global variable, and removes question from array
// function randomQuestionSelection() {
//     // reset clock
//     answerImage.hide()
//     displayQuestionsandTimer.show();
//     timer = setInterval(function () {
//         initTimeRemaining--;
//         $("#time-remaining").html("Time remaining: " + initTimeRemaining);
//     }, 1000)
//     initTimeRemaining = 30;
//     var questionIndex = Math.floor(Math.random() * (currentQuestionAndAnswerSelection.length - 1));
//     // console.log(questionIndex);
//     questionSelection = currentQuestionAndAnswerSelection[questionIndex];
//     console.log(questionIndex);
//     console.log(questionSelection);
//     // console.log(questionSelection);
//     question = questions[questionSelection];
//     // console.log(question);
//     answerChoices = answers[questionSelection][0];
//     // console.log(answerChoices);
//     correctAnswer = answers[questionSelection][1];
//     // console.log(correctAnswer);
//     currentQuestionAndAnswerSelection.splice(questionIndex, 1);
//     // console.log(currentQuestionAndAnswerSelection);
//     displayQandA();
// }

// function displayQandA() {
//     displayQuestionsandTimer.show();
//     // clear q and a section
//     // change html to Q and A
//     questionDisplay.text(question);
//     answerDisplayOne.text(answerChoices[0]);
//     answerDisplayOne.attr("button-content", answerChoices[0]);
//     answerDisplayTwo.text(answerChoices[1]);
//     answerDisplayTwo.attr("button-content", answerChoices[1]);
//     answerDisplayThree.text(answerChoices[2]);
//     answerDisplayThree.attr("button-content", answerChoices[2]);
//     answerDisplayFour.text(answerChoices[3]);
//     answerDisplayFour.attr("button-content", answerChoices[3]);

//     //Time Limit        
//     questionsAndAnswers.on("click", "#answer1", function () {
//         console.log("answer#1");
//         userChoice = answerDisplayOne.attr("button-content");
//         correctOrIncorrect();
//     }).on("click", "#answer2", function () {
//         userChoice = answerDisplayTwo.attr("button-content");
//         correctOrIncorrect();
//     }).on("click", "#answer3", function () {
//         userChoice = answerDisplayThree.attr("button-content");
//         correctOrIncorrect();
//     }).on("click", "#answer4", function () {
//         userChoice = answerDisplayFour.attr("button-content");
//         correctOrIncorrect();
//     })
// }

// if (initTimeRemaining === 0) {
//     userChoice = "";
//     correctOrIncorrect();
// };




// // Reset Game
// function resetGame() {
//     clearInterval(timer);
//     questionsAndAnswers.empty();
//     questionsAndAnswers.append("<h2>GAME OVER!</h2>");
//     questionsAndAnswers.append("<h5>Correct Responses: " + correctResponse + "</h5><br><h5>" + incorrectResponse + "</h5>")
//     startGame = false;
//     correctResponse = 0;
//     incorrectResponse = 0;
//     currentQuestionAndAnswerSelection = questionAndAnswerSelection;
//     $("#play-again").show();
// }