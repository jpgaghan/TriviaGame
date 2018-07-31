var answer = ""
var question = ""
var intervalId;
gameContent = {
    usedQuestions : [[],[],[]],
    usedAnswers : [[],[],[]],
    questionOptions: [],
    questioncategoryIndex : "",
    questionIndex : "",
    currentTime: 7,
    questionanswerShow: '',
    correctCount: 0,
    incorrectCount: 0,

// something to keep in mind when reading this code is the index for your question should always match your index for you answer.`
    questions : [["Quarterback with most superbowl rings?", "What quarterback holds the record for most rushing touchdowns?", "Who was the 2018 first draft pick?", "What quarterback with most touchdowns in one season?","Who is the only quarterback to have multiple seasons of throwing 5,000 yards? He has 5 in total.","Which quarterback is the first to earn this trifecta: Heisman Trophy winner, Number 1 overall draft pick, and Super Bowl MVP?","What quartback holds the single season quarterback rating record?", "What quarterback is considered responsible for national anthem protest?","What quarterback served as Tom Brady's back up until moving to the 49ers?","Who was the first quarterback to be named three time super bowl MVP's?"],
    ["This franchise played in Cleveland, Los Angeles, and St. Louis. Which team is this?", "What team was originally named the braves?", "What team has the most superbowl wins?", "What NFL team was originally called the Oilers?", "America's Team, refers to what football team?", "What is the only NFL team to ever win all 16 of their regular season games?", "What team ruined a 16 game regular season perfect record by beating the undefeated team in the super bowl?", "What team won the 2018 superbowl?", "What team lost the superbowl after having a 25 point lead at one point?", "What team did Dan Marino play for?"],
    ["Penalty when a defensive player crosses the line of scrimmage and makes contact with an opponent before the ball is snapped?" , "Penalty when an interior lineman on the offensive team moves prior to the snap of the ball, or when any offensive player makes a quick, abrupt movement prior to the snap of the ball.", "When any part of a player’s body is beyond the line of scrimmage or free kick line when the ball is put into play." ,"Penalty when an offensive player uses his hands, arms, or other parts of his body to prevent a defensive player from tackling the ball carrier.", "Penalty when a defensive player make contact with the intended receiver before the ball arrives, thus restricting his opportunity to catch the forward pass.", "When one player tackles another by grabbing inside their shoulder pads (or jersey) from behind and yanking them down.", "Penatly that is considered illegal, flagrant foul considered risky to the health of another player.", "An action which delays the game", "Penalty for a player using his helmet to hit into another player’s helmet.", "Penalty for a defensive player makes any contact with the punter, provided the defensive player hasn’t touched the kicked ball before contact."]],

    answers : [["Tom Brady", "Cam Newton", "Baker Mayfield", "Peyton Manning", "Drew Brees", "Jim Plunkett", "Aaron Rodgers", "Colin Kaepernick", "Jimmy Garoppolo", "Joe Montana", "Michael Vick", "Johnny Unitas", "Steve Young"],
    ["Rams", "Redskins", "Steelers", "Titans", "Cowboys", "Patriots", "Giants", "Eagles" , "Falcons", "Dolphins", "Packers", "49ers","Panthers"],
    ["Encroachment", "False Start", "Offside", "Holding", "Pass Interference", "Horse Collar Tackle", "Personal Foul", "Delay of Game", "Helmet to Helmet Collision", "Roughing the Kicker", "Onside", "Flagrant Foul", "Touchback"],
    ],

questionGenerator: function() {
    // setting time to answer the question
    
    gameContent.currentTime = 7;
    questionTimer = setTimeout(gameContent.timeUp, 1*1000);
    intervalId = setInterval(gameContent.time, 1000);
    // generating question and answer
    questioncategoryIndex = ""
    while (questioncategoryIndex === "") {
        index = Math.floor(Math.random()*this.questions.length);
        if (this.questions[index].length !== 0) {
            questioncategoryIndex = index;
        }
    }
    questionIndex = Math.floor(Math.random()*this.questions[questioncategoryIndex].length);
    question = this.questions[questioncategoryIndex][questionIndex];
    console.log(this.question)
    this.questions[questioncategoryIndex].splice(questionIndex,1);
    this.usedQuestions[questioncategoryIndex].push(question);
    answer = this.answers[questioncategoryIndex][questionIndex];
    console.log(answer);
    this.answers[questioncategoryIndex].splice(questionIndex,1);
    this.usedAnswers[questioncategoryIndex].push(answer);
    this.questionOptions.push(answer);

    // creates 3 unique random wrong answers from the answers left in the answers array
    while (this.questionOptions.length < 4) {
        index=Math.floor(Math.random()*this.answers[questioncategoryIndex].length)
        if (this.questionOptions.indexOf(this.answers[questioncategoryIndex][index]) === -1) {
            this.questionOptions.push(this.answers[questioncategoryIndex][index])
        }
    }
    console.log(this.questionOptions)
    this.renderHtml();
    
},

time: function() {
    console.log(intervalId)
    gameContent.currentTime--;
    if (gameContent.currentTime===0) {
        clearInterval(intervalId)
    }
},

renderHtml: function() {
    $("h5").text(question)
    for (i=0; i<4; i++) {
        index=Math.floor(Math.random()*this.questionOptions.length);
        option=this.questionOptions[index];
        this.questionOptions.splice(index,1);
        $(".option" + i).text(option);
        
    }
},

checkAnswer: function (selection) {
    $("#quiz").hide();
    if (selection===undefined) {
        selection="quiz"
    }
    console.log(document.getElementById(selection).textContent)
    if (answer === document.getElementById(selection).textContent) {
        $("#win").show();
        $(".win").append("<p> The answer is " + answer);
        correctanswerShow = setTimeout(gameContent.nextQuestion, 1*1000)
        this.correctCount++
        gameContent.endGame();
    } 

    else {
        $("#quiz").hide();
        $("#lose").show();
        $(".lose").append("<p> The answer is " + answer);
        correctanswerShow = setTimeout(gameContent.nextQuestion, 1*1000)
        this.incorrectCount++;
        gameContent.endGame();
    }


},
nextQuestion: function() {
    $(".win p,.lose p,.timeup p").remove();
    $("#win,#lose,#timeup").hide();
    gameContent.questionGenerator();
    $("#quiz").show();

},

timeUp: function() {
        $("#quiz").hide();
        $("#timeup").show();
        $(".timeup").append("<p> The answer is " + answer);
        nextpregunta = setTimeout(gameContent.nextQuestion, 1*1000)
        gameContent.incorrectCount++;
        gameContent.endGame();
},

endGame: function() {
    //checking to make sure there isn't questions left and if there isn't it will render the html for the end game screen too with the percentage correct and percentage wrong
    questionsLeft=0
    clearTimeout(questionTimer);
    for (i=0; i<this.questions.length; i++){
        questionsLeft =this.questions[i].length + questionsLeft;  
        }
    if (questionsLeft === 0) {
        clearTimeout(correctanswerShow);
        $("#win,#lose,#timeup").hide();
        $("#middle").append("<p>Correct: " + this.correctCount + "</p>")
        $("#middle").append("<p>Incorrect: " + this.incorrectCount + "</p>")
        $(".leader").append("<p>Overall Percent: " + (100*this.correctCount/30).toFixed(2) + "%</p>")
        // resetting arrays back to their original state to rerun
        for (i=0; i<3; i++) {
            while (this.answers[i].length !== 0) {
                this.usedAnswers[i].push(this.answers[i ].pop());
            }
            this.answers[i]=this.usedAnswers[i]
            this.questions[i]=this.usedQuestions[i]
            }
        
        $("#gameend").show();
        clearInterval(intervalId);
        clearTimeout(nextpregunta);
    }
    else {this.nextQuestion}
}
}


$(document).ready(function() {
// $(document).on("click",".answer", function () {
    console.log(gameContent.answer)
    $(document).on("click",".answer", function () {
        gameContent.checkAnswer(this.id);
        }); 
    $(document).on("click","#startpicture", function () {
        gameContent.questionGenerator();
        $("#startpicture").hide();
        $(".spacer").css("height", "175px")
        $("#quiz").show();
        });  
    $(document).on("click","#reset", function () {
        $("#gameend").hide();
        $("#gameend p").remove();
        gameContent.questionGenerator();
        $(".spacer").css("height", "125px")
        $("#quiz").show();
    });
});


    // }
// setTimeout(gameContent.questionMissed, 1000 * 7);