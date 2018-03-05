var game = {
        questions: [
            {
                    question:"Which of the following is not a primary color?",
                    a:"Blue",b:"Yellow",c:"Pink",d:"Red",
                    answer:"Pink",
                },
            {
                    question:"Which of the following is not a secondary color?",
                    a:"Green",b:"Purple",c:"Orange",d:"Gray",
                    answer:"Gray",
                },
            {
                    question:"Yellow mixed with blue will give you _____?",
                    a:"Green",b:"Purple",c:"Orange",d:"Brown",
                    answer:"Green",
                },
            {
                    question:"Red mixed with blue will give you _____?",
                    a:"Green", b:"Purple", c:"Orange", d:"Brown",
                    answer:"Purple",
                },
            {
                    question:"Yellow mixed with Red will give you _____?",
                    a:"Green",b:"Purple",c:"Orange",d:"Brown",
                    answer:"Orange",
                },
        ],
        counter: 0,
        userAnswer: "",
        result: "",
        right: 0,
        wrong: 0,
        timeOut: 0,
        currentQuestion: {
            question:"",
            a:"",b:"",c:"",d:"",
            answer:"",
        },
        timer: 20,
        intervalId: null,     
    }
function isCorrect(){
    console.log("isCorrect");
    if(game.userAnswer === game.currentQuestion.answer) {
        game.result = "Right";
        game.right++;
    } else if(game.userAnswer === "Time Up"){
        game.result = "Time's Up"
        game.timeOut++;
    } else {
        game.result = "Wrong";
        game.wrong++;
    }
}
function run() {
    clearInterval(game.intervalId);
    game.intervalId = setInterval(decrement, 1000);
  }
function decrement() {
    game.timer--;
    $("#timer").html(`Time Remaining: ${game.timer}`);
    if (game.timer === 0) {
       game.userAnswer = "Time Up";
       gameplay();
    }
  }
function stop() {
    clearInterval(game.intervalId);
  }
function fullReset() {
    game.counter = 0;
    game.userAnswer = "";
    game.result = "",
    game.right = 0;
    game.wrong = 0;
    game.timeOut = 0;
    setCurrentQuestion();
    game.timer = 20;

}
function setCurrentQuestion() {
    game.currentQuestion.question = game.questions[game.counter].question
    game.currentQuestion.a = game.questions[game.counter].a
    game.currentQuestion.b = game.questions[game.counter].b
    game.currentQuestion.c = game.questions[game.counter].c
    game.currentQuestion.d = game.questions[game.counter].d
    game.currentQuestion.answer = game.questions[game.counter].answer
    console.log(game.currentQuestion);
}
function starthtml(){
    var startHTML = `<button id = "start">start</button>`
    $("#holder").html(startHTML);
}
var questionHTML;
function questionhtml(){
    questionHTML = 
    `
    <h2 id = "question">${game.currentQuestion.question}</h2>
    <h2 id = "timer">Time Remaining: ${game.timer}</h2>
    <h2 class="answer" id = ${game.currentQuestion.a}>${game.currentQuestion.a}</h2>
    <h2 class="answer" id = ${game.currentQuestion.b}>${game.currentQuestion.b}</h2>
    <h2 class="answer" id = ${game.currentQuestion.c}>${game.currentQuestion.c}</h2>
    <h2 class="answer" id = ${game.currentQuestion.d}>${game.currentQuestion.d}</h2>
     `
     $("#holder").html(questionHTML);
     run();
}
var answerHTML;
function answerhtml(){
    answerHTML = 
    `
    <br>
    <h2 id = "timer">Time Remaining: ${game.timer}</h2>
    <h2 id="result">${game.result}</h2>
    <h2 id="correctAnswer">The correct answer was<span id ="${game.currentQuestion.answer}"> ${game.currentQuestion.answer}</span></h2>
     `
     $("#holder").html(answerHTML);
}
function endhtml() {
    var endHTML = 
    `
    <h2>Finished!</h2>
    <h2 id = right>Right Answers: ${game.right}</h2>
    <h2 id="wrong">Wrong Answers: ${game.wrong}</h2>
    <h2 id="unasnwered">Unanswered: ${game.timeOut}</h2>
    <button id = "restart">restart</button>
     `
     $("#holder").html(endHTML);
}

function intialize(){
    starthtml();
    setCurrentQuestion();
}
function gameplay(){
    stop();
    console.log("game")
    console.log(game.counter);
    if(game.counter < 4){
    game.counter++;
    isCorrect();
    answerhtml();
    game.timer = 20;
    setCurrentQuestion();
    setTimeout(function(){ questionhtml(); }, 6000);
    } else {
        isCorrect();
        answerhtml();
        endhtml();
        fullReset();
    }
}

$(document).ready(function(){
    intialize();
    console.log(game.questions.length)
    $("#holder").on("click","#start",function(){
        questionhtml();
    });

    $("#holder").on("click", ".answer", function(){
        console.log("a click");
        game.userAnswer = $(this).text();
        gameplay();
    });
    $("#holder").on("click","#restart",function(){
        questionhtml();
    });
    });

