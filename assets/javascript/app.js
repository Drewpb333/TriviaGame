$(document).ready(function(){
    var questionSelection;
    var question;
    var answer;
    var userChoice;
    var timeRemaining = 30;
    var correctResponse = 0;
    var incorrectResponse = 0;
    var totalResponses = correctResponse + incorrectResponse;
    var questionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon", "frog"]; 
    var currentQuestionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon", "frog"];
    var startGame = false;
    var timer;

    var questions = {
        pet: "What is the most popular pet in the world?",
        dog: "What do Rin Tin Tin, Lassie, and Snoopy all share in common?",
        shark: "What is the name of the largest shark species in the world?",
        mammals: "Which of the following is the largest mammal in the world?",
        reptiles: "Which of the following describes reptiles?",
        birds: "Bird are oviparous, meaning that they share this characteristic with most fish, reptiles, and amphibians?",
        zebras: "Which of the following statements about zebras are true?",
        nationalBird: "What is the national bird of the U.S.A.?",
        komodoDragon: "The Komodo dragon, the largest non-extinct lizard, can be found in which country?",
        frog: "Frogs belong to which class of vertebrates?",
    }

    var answers = {
        pet: [["Fish", "Cat", "Dog", "Snake"], "Fish"],
        dog: [["They're all retrievers.", "They all have their own TV shows.", "They have their own fragrances line.", "They're all labradors."], "They all have their own TV shows."],
        shark: [["Great white shark", "Whale shark", "Hammerhead shark", "Tiger shark"], "Whale shark"],
        mammals: [["Elephant", "Blue whale", "Hippopotamus", "Giraffe"], "Blue whale"],
        reptiles: [["Warm-Blooded", "Cold-blooded", "They're only found in the western hemisphere.", "None of the above"], "Cold-blooded"],
        birds: [["Cold-blooded", "Females lay eggs", "Ability to fly", "Ability to swim"], "Females lay eggs"],
        zebras: [["Zebras can outrun lions.","Zebras sleep standing up.", "Zebras travel in large herds.","All of the above"], "All of the above"],
        nationalBird: [["Bald eagle", "Flamingo", "Cardinal", "Hawk"], "Bald eagle"],
        komodoDragon: [["Australia", "Philippines", "Japan", "Indonesia"], "Indonesia"],
        frog: [["Mammals", "Amphibians", "Reptiles", "Fish"], "Amphibians"]
    }

    var questionsAndAnswers = $(".questions-and-answers");
    var questionDisplay = $("#question");
    var answerDisplayOne = $("#answer1");
    var answerDisplayTwo = $("#answer2");
    var answerDisplayThree = $("#answer3");
    var answerDisplayFour = $("#answer4");
    var displayQuestionsandTimer = $("#time-remaining, #answer1, #answer2, #answer3, #answer4");
    var timeRemainingJQuery = $("#time-remaining");
    var answerImage = $("#answer-image");
    function newQuestion(){
        setTimeout(randomQuestionSelection, 5000);
    };

    //checks user response
    function correctOrIncorrect(){
        displayQuestionsandTimer.hide();
        console.log(correctAnswer);
        console.log(userChoice);
        if(userChoice === correctAnswer){
            correctResponse++;
            answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection + "'><br><h3>Congratulations!</h3>");
            answerImage.show();
            if(totalResponses < 10){
                newQuestion();
                clearInterval(timer);
            }
            else{
                clearInterval(timer);
                resetGame()                
            }
        }
        else{
            incorrectResponse++;
            answerImage.html("<img src='./assets/images/" + questionSelection + ".jpg' alt='" + questionSelection  + "'><br><h3>Wrong!</h3>");
            answerImage.show();
            if(totalResponses < 10){
                newQuestion();
                clearInterval(timer);
            }
            else{
                clearInterval(timer);
                resetGame()                
            }
        }   
    }

     //starts game
    if(startGame == false){
        $(document).on("click", "#start-button, #play-again", function(event){
            $("#start-button").hide();
            $("#play-again").hide();
            event.preventDefault();
            startGame = true;            
            newQuestion();
        }) 
    }
    

    //comes up with new questions, assigns it to global variable, and removes question from array
    function randomQuestionSelection(){
        // reset clock
        answerImage.hide()
        displayQuestionsandTimer.show();
        timeRemaining = 30;
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

    timer = setInterval(function(){
        timeRemaining--;
        $("#time-remaining").html("Time remaining: " + timeRemaining);
    }, 1000);

    function displayQandA(){
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
        
        timer = setInterval(function(){
            timeRemaining--;
            $("#time-remaining").html("Time remaining: " + timeRemaining);
        }, 1000);

        questionsAndAnswers.on("click", "#answer1", function(){
            console.log("answer#1");
            userChoice = answerDisplayOne.attr("button-content");
            correctOrIncorrect();
        }).on("click", "#answer2", function(){
            userChoice = answerDisplayTwo.attr("button-content");
            correctOrIncorrect();
        }).on("click", "#answer3", function(){
            userChoice = answerDisplayThree.attr("button-content");
            correctOrIncorrect();
        }).on("click", "#answer4", function(){
            userChoice = answerDisplayFour.attr("button-content");
            correctOrIncorrect();
        })
    }
     
    if(timeRemaining === 0){
        userChoice = "";
        correctOrIncorrect();
    };   
    
      


// Reset Game
    function resetGame(){
        questionsAndAnswers.empty();
        questionsAndAnswers.append("<h2>GAME OVER!</h2>");
        questionsAndAnswers.append("<h5>Correct Responses: " + correctResponse + "</h5><br><h5>" + incorrectResponse + "</h5>")
        startGame = false;
        correctResponse = 0;
        incorrectResponse = 0;
        currentQuestionAndAnswerSelection = questionAndAnswerSelection;
        $("#play-again").show();
    }
})
