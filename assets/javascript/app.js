$(document).ready(function(){
    var numberOfCorrectAnswers = 0;
    var numberOfIncorrectAnswers = 0;
    var questionSelection;
    var question;
    var userChoice;
    var answer;
    var timeRemaining = 30;
    var questionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon"]; 
    // ,"frog", "salamander","zoo", "dinosaur", 
    // "monkey","pony", "puppy", "lion", "cheetah", "elephant", "hippo","gorilla","polarbear",
    // "shark","dolphin","orca", "octopus", "tortoise", "crocodile", "yellowJacket", "ibis"];
    var currentQuestionAndAnswerSelection = ["pet", "dog", "shark", "mammals", "reptiles", "birds"
    , "zebras", "nationalBird", "komodoDragon"];
    var startGame = false;

    var questions = {
        pet: "What is the most popular pet in the world?",
        dog: "What do Rin Tin Tin, Lassie, and Snoopy all share in common?",
        shark: "What is the name of the largest shark?",
        mammals: "Which of the following is the largest mammal?",
        reptiles: "Which of the following describes reptiles?",
        birds: "Bird are oviparous, meaning that they share this characteristic with most fish, reptiles, and amphibians?",
        zebras: "Which of the following statements about zebras are true?",
        nationalBird: "What is the national bird of the U.S.A.?",
        komodoDragon: "The Komodo dragon, the largest non-extinct lizard, can be found in which country?",
        frog: "Frogs belong to which class of vertebrates?",
        // salamander: ,
        // zoo: ,
        // dinosaur: ,
        // monkey: ,
        // pony: ,
        // puppy: ,
        // lion: ,
        // cheetah: ,
        // elephant: ,
        // hippo: ,
        // gorilla: ,
        // polarbear: ,
        // shark: ,
        // dolphin: ,
        // orca: ,
        // octopus: ,
        // tortoise: ,
        // crocodile: ,
        // yellowJacket: ,
        // ibis: ,
    }

    var answers = {
        pet: ["Fish", "Cat", "Dog", "Snake"],
        dog: ["They're all retrievers.", "They have their own TV shows.", "They have their own fragrances line.", "They're all labradors."],
        shark: ["Great white shark", "Whale Shark", "Hammerhead shark", "Tiger shark"],
        mammals: ["Elephant", "Blue whale", "Hippopotamus", "Giraffe"],
        reptiles: ["Warm-Blooded", "Cold-blooded", "", "None of the above"],
        birds: ["Cold-blooded", "Females lay eggs", "Ability to fly", ""],
        zebras: ["Zebras can outrun lions.","Zebras sleep standing up.", "Zebras travel in large herds.","All of the above"],
        nationalBird: ["Bald eagle", "Flamingo", "Cardinal", "Hawk"],
        komodoDragon: ["Australia", "Philippines", "Japan", "Indonesia"],
        frogs: []
    }

    //Not sure if I'll use this object
    var correctAnswers = {
        pet: "Fish",
        dog: "They have their own TV shows.",
        shark: "Whale shark",
        mammals: "Blue whale",
        reptiles: "Cold-blooded",
        birds: "Females lay eggs",
        zebras: "All of the above",
        nationalBird: "Bald eagle",
        komodoDragon: "Indonesia",
        frogs: ""
    }

    console.log(questions);
    console.log(answers);
    console.log(correctAnswers);

    var questionsAndAnswers = $(".questions-and-answers");
    var questionDisplay = $("#question");
    var answerDisplayOne = $("#answer1");
    var answerDisplayTwo = $("#answer2");
    var answerDisplayThree = $("#answer3");
    var answerDisplayFour = $("#answer4");
    var timeRemainingJQuery = $("#time-remaining");

     //starts game
     if(startGame == false){
        $("#start-button").click(function(){
            startGame = true;
            setTimeout(function(){
                // $(".questions-and-answers").empty();
                randomQuestionSelection();
                console.log(answers);
            }, 2000);
        }) 
    }

    // hover effects
    function colorChangeOnHover (btn){
        $(btn).css("background-color", "blue");
    }
    function colorChangeOffHover(btn){
        $(btn).css("background-color", "grey");
    }

    //comes up with new questions, assigns it to global variable, and removes question from array
    function randomQuestionSelection(){
        var questionIndex = Math.floor(Math.random() * currentQuestionAndAnswerSelection.length);
        questionSelection = currentQuestionAndAnswerSelection[questionIndex];
        question = questions[questionSelection];
        answer = answers[questionSelection];
        currentQuestionAndAnswerSelection.splice(questionIndex, 1);
        setTimeout(startClock, 5000);
    }

    function startClock(){
        // change html to Q and A
        timeRemainingJQuery.css("display", "block");
        questionsAndAnswers.css("display", "block");
        questionDisplay.html(question);
        console.log(question);
        answerDisplayOne.html(answer[0]);
        console.log(answer[0]);
        answerDisplayTwo.html(answer[1]);
        console.log(answer[1]);
        answerDisplayThree.html(answer[2]);
        answerDisplayFour.html(answer[3]);
        console.log(answer);
        //change button color on hover
        colorChangeOnHover(answerDisplayOne);
        colorChangeOffHover();
        // $(".answers").on("hover", "#answer1", colorChange("#answer1")
        // );("hover", "#answer2", colorChange("#answer2")
        // );("hover", "#answer3", colorChange("#answer3")
        // );("hover", "#answer4", colorChange("#answer4"));
      
        //Time Limit
        var startTimer = function(){setInterval( function(){
            timeRemaining--;
            $("#time-remaining").html("<h3>" + timeRemaining + "</h3>");
        }, 1000)}

        startTimer();

        $(".questions-and-answers").on("click", ".answers", function(){
            var imgSrc = "../images/" + questionSelection + ".jpg";
            if(userChoice === answer){
                $(".questions-and-answers").html("<img src=" + imgSrc + " alt='" + correctAnswers[questionSelection] + "'>Congratulations");
                setTimeout(nextQuestion(), 5000);
                clearTimeout(startTimer);
            }
            else{
                $(".questions-and-answers").html("<img src=" + imgSrc + " alt='" + correctAnswers[questionSelection] + "'>Wrong");
                setTimeout(nextQuestion(), 5000);
                clearTimeout(startTimer);
            }            

        if(timeRemaining === 0){
            $(".questions-and-answers").html("<img src=" + imgSrc + " alt='" + correctAnswers[questionSelection] + "'>Wrong");
            setTimeout(nextQuestion(), 5000);
            clearTimeout(startTimer);
        };
        }) 
    }    

    function nextQuestion(){
        //new question segment
        randomQuestionSelection();
        setTimeout(function(){
            $("#question").text = question;
            $("#answer1").text = answer[0];
            $("answer2").text = answer[1];
            $("answer3").text = answer[2];
            $("answer4").text = answer[3];
            startClock();
        }, 5000);
    }
});