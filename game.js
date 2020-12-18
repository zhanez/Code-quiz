//questions 
var questions = [
    {
        question: " Who is the main character? ",
        answers: [" Lexie Grey ", " Alex Karev ", " Izzie Stevens ", " Meredith Grey"],
        correct: " Meredith Grey"
    },
    {
        question: " Who plays Meredith Grey? ",
        answers: [" Scarlett Johnansoon", " Ellen Pompeo ", " Blake Lively ", " Angelina Jolie"],
        correct: "Ellen Pompeo"
    },
    {
        question: " How many seasons does Grey's Anatomy have?",
        answers: ["12 seasons", "20 seasons", " 17 seasons", "23 seasons"],
        correct: "17 seasons"
    },
    {
        question: " How many sisters does Meredith have?",
        answers: ["3", "1", "0", "2"],
        correct: "2"
    },

];

//question i variable
var questionindex = 0;


//timer variable
var timer = questions.length*15;
var startButtonEl = document.getElementById("start-button");
var questionEl = document.getElementById("questions");
var highscoresEl = document.getElementById("highscores");
var welcomeEl = document.getElementById("welcome");
var timerEl = document.getElementById("timer");
var titleEl = document.getElementById("title");
var questionUlEl = document.getElementById("questionUl");
var messageEl = document.getElementById("message");
var initalsEl = document.getElementById("initals");
var initalsNameEl = document.getElementById("initalsName");
var saveEl = document.getElementById("save");
var intervalId = ""
var highscoreEl = document.getElementById("highscore");
var highscoreUl =document.getElementById("highscoreUl");
var highscorelist =  localStorage.getItem("highscore") ?   localStorage.getItem("highscore"): []

//start application
function game() {
    messageEl.textContent = ""
    console.log(questionindex, questions.length)
    if(questionindex< questions.length){

        welcomeEl.setAttribute ("class", "dontshow");
        questionEl.removeAttribute ("class");
    
        // start timer
          intervalId = setInterval (function(){
            timer--;
            console.log("timer-")
            timerEl.textContent = timer
            displayQuestion()
        },1000)
    }
    else {
        clearInterval(intervalId)
        initalsEl.removeAttribute ("class");
        questionEl.setAttribute ("class", "dontshow");
    }


    


    // loop over array of questions
}


function displayQuestion (){
      titleEl.textContent= questions[questionindex].question
      questionUlEl.textContent =""
   
      for (let i = 0; i < questions[questionindex].answers.length; i++) {
       var button = document.createElement("button")
        button.textContent = questions [questionindex].answers[i]
        button.addEventListener ("click", function(event){
            var buttonText = this.textContent
            var message = ""
            if (buttonText=== questions[questionindex].correct){
                message = "correct"
            }
            else {
                message = "wrong"
                timer = timer -10
            }
            questionindex++
            messageEl.textContent = message
            clearInterval(intervalId)
            setTimeout(game,2000)

        })
       questionUlEl.appendChild(button)

    }    
    
}

saveEl.addEventListener("click", function(event){
    var initalsName=initalsNameEl.value
    highscorelist.push( timer+"-" + initalsName)
    localStorage.setItem("highscore", JSON.stringify(highscorelist))

    
    highscoreEl.removeAttribute ("class");
    initalsEl.setAttribute ("class", "dontshow");
    


     for (let i = 0; i < highscorelist.length; i++) {
          
         var li = document.createElement("li")
         li.textContent=highscorelist[i]
         highscoreUl.appendChild(li)
     }
})


startButtonEl.addEventListener("click", function( event ){
   game ();
})
