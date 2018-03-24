$(document).ready(function(){
    var numberOfCorrectAnswers = 0;
    var numberOfIncorrectAnswers = 0;
    var questionSelection;
    var question;
    var answer;
    var startTimer;
    var timeRemaining = 30;
    var correctResponse = 0;
    var incorrectResponse = 0;
    var questionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon", "frog"]; 
    var currentQuestionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon", "frog"];
    var imgSrc = "./assets/images/" + questionSelection + ".jpg";
    var startGame = false;

    var questions = {
        pet: "What is the most popular pet in the world?",
        dog: "What do Rin Tin Tin, Lassie, and Snoopy all share in common?",
        shark: "What is the name of the largest shark species in the world?",
        mammals: "Which of the following is the largest mammal?",
        reptiles: "Which of the following describes reptiles?",
        birds: "Bird are oviparous, meaning that they share this characteristic with most fish, reptiles, and amphibians?",
        zebras: "Which of the following statements about zebras are true?",
        nationalBird: "What is the national bird of the U.S.A.?",
        komodoDragon: "The Komodo dragon, the largest non-extinct lizard, can be found in which country?",
        frog: "Frogs belong to which class of vertebrates?",
    }

    var answers = {
        pet: [["Fish", "Cat", "Dog", "Snake"], "Fish"],
        dog: [["They're all retrievers.", "They have their own TV shows.", "They have their own fragrances line.", "They're all labradors."], "They have their own TV shows."],
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
    var timeRemainingJQuery = $("#time-remaining");

    // function correctOrIncorrect(){
    //     var userChoice = $(this).attr("data-content");
    //     console.log(userChoice);
    //     if(userChoice === answer){
    //         $(".questions-and-answers").html("<img src=" + imgSrc + "' alt='" +  + "'>Congratulations");
    //         // setTimeout(nextQuestion(), 5000);
    //         clearTimeout(startTimer);
    //         correctResponse++;
    //         randomQuestionSelection();
    //     }
    //     else{
    //         $(".questions-and-answers").html("<img src=" + imgSrc + "' alt='" +  + "'>Wrong");
    //         // setTimeout(nextQuestion(), 5000);
    //         clearTimeout(startTimer);
    //         incorrectResponse++;
    //         randomQuestionSelection();
    //     }   
    // }

     //starts game
    if(startGame == false){
        $(document).on("click", "#start-button", function(event){
            event.preventDefault();
            startGame = true;            
            randomQuestionSelection();
            $("#start-button").css("display", "none");
        }) 
    }

    //comes up with new questions, assigns it to global variable, and removes question from array
    function randomQuestionSelection(){
        // reset clock
        timeRemaining = 30;
        var questionIndex = Math.floor(Math.random() * (currentQuestionAndAnswerSelection.length - 1));
        // console.log(questionIndex);
        questionSelection = currentQuestionAndAnswerSelection[questionIndex];
        // console.log(questionSelection);
        question = questions[questionSelection];
        // console.log(question);
        answerChoices = answers[questionSelection][0];
        // console.log(answerChoices);
        correctAnswer = answers[questionSelection][1];
        // console.log(correctAnswer);
        currentQuestionAndAnswerSelection.splice(questionIndex, 1);
        // console.log(currentQuestionAndAnswerSelection);
        // questionsAndAnswers.css("display", "none");
        startClock();
    }

    function startTimer(){
        while(timeRemaining > 0){
            {setInterval( function(){
                timeRemaining--;
                $("#time-remaining").html("<h2>" + timeRemaining + "</h2>");
            }, 1000)}
        }
    }

    function startClock(){
        $(document).ready(function(){
            // clear q and a section
            // change html to Q and A
            $(".answers").css("display", "grid");
            questionDisplay.html("<button>" + question + "</button>");
            answerDisplayOne.append(answerChoices[0]);
            answerDisplayTwo.append(answerChoices[1]);
            answerDisplayThree.text(answerChoices[2]);
            answerDisplayFour.text(answerChoices[3]);
            //Time Limit
            startTimer();
            
            $(".questions-and-answers").on("click", "#answer1", function(){
                //  correctOrIncorrect();
                var userChoice = correctAnswer;
                console.log(userChoice);
            if(userChoice === answer){
                $(".questions-and-answers").html("<img src=" + imgSrc + "' alt='" + correctAnswer + "'>Congratulations");
                // setTimeout(nextQuestion(), 5000);
                clearTimeout(startTimer);
                correctResponse++;
                randomQuestionSelection();
            }
            else{
                $(".questions-and-answers").html("<img src=" + imgSrc + "' alt='" + correctAnswer + "'>Wrong");
                // setTimeout(nextQuestion(), 5000);
                clearTimeout(startTimer);
                incorrectResponse++;
                randomQuestionSelection();
            }   
            }).on("click", "#answer2", function(){
                correctOrIncorrect();
            }).on("click", "#answer3", function(){
                correctOrIncorrect();
            }).on("click", "#answer4", function(){
                correctOrIncorrect();
            })

            if(timeRemaining === 0){
                $(".questions-and-answers").html("<img src=" + imgSrc + "' alt='" + correctAnswer + "'>Wrong");
                setTimeout(nextQuestion(), 5000);
                clearTimeout(startTimer);
                incorrectResponse++;
                randomQuestionSelection();
            };   
        })
    }    
});

// console.log(correctResponse);
// Reset Game
// if((correctResponse + incorrectResponse) == 10){
//     questionsAndAnswers.empty();
//     questionsAndAnswers.append("<h2>GAME OVER!</h2>");
//     questionsAndAnswers.append("<h5>Correct Responses: " + correctResponse + "</h5><br><h5>" + incorrectResponse + "</h5>")
// }

//     function nextQuestion(){
//         //new question segment
//         randomQuestionSelection();
//         setTimeout(function(){
//             $("#question").text = question;
//             $("#answer1").text = answer[0];
//             $("answer2").text = answer[1];
//             $("answer3").text = answer[2];
//             $("answer4").text = answer[3];
//             startClock();
//         }, 5000);
//     }
// });