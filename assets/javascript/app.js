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
    image: "./assets/images/komodoDragon.jpg"
}, {
    question: "Frogs belong to which class of vertebrates?",
    answers: ["Mammals", "Amphibians", "Reptiles", "Fish"],
    correctAnswer: "Amphibians",
    image: "./assets/images/frog.jpg"
}]

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
