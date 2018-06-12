
// Variables


// The progress variable shows whether each question is the current question, incomplete, the good result, or the bad result. 
var progress = {
    "q1":"current",
    "q2":"incomplete",
    "q3":"incomplete",
    "q4":"incomplete",
}

const fadetime = 500;

var score = 0;


const maxscore = 40;
const minscore = -40;



// INTRODUCTION

function closeIntro() {
    $('#introbg').fadeOut(1000);
    updateProgressBar();
    loadQuestion();
}


// HANDLING QUESTIONS

$('.answer').click(function(){
    var scorechange = $(this).attr("data-score");
    changeScore(scorechange);
    var qnumber = $(this).closest(".question").prop("id");
    $(this).closest(".question").fadeOut(fadetime);
    if($(this).hasClass("answer-l")) {
        var resultid = qnumber + "-l";
    } else if ($(this).hasClass("answer-r")) {
        var resultid = qnumber + "-r";
    }
    $("#" + resultid).fadeIn(fadetime);
    generateGraph(qnumber, resultid)
    
    // check if you got the question right or wrong, change progress bar accordingly
    if ($("#" + resultid + " .result").hasClass("resultgood")) {
        progress[qnumber] = "good";  
    } else {
        progress[qnumber] = "bad";
    }
    updateProgressBar();
});

$ ('.result button').click(function(){
    var qnumber = $(this).closest(".result-container").prop("id");
    var qnumber = parseInt(qnumber.substring(1,2))+1; //gets the next question
    if (!(progress["q" + qnumber] === undefined)) {
        progress["q" + qnumber] = "current";
    }
    updateProgressBar();
    loadQuestion();
    $(this).closest(".result-container").fadeOut(fadetime);
    
    
});


function loadQuestion() {
    var keyfound = false;
    $.each(progress,function(key, value){
        if(value == "current") {
            $("#" + key).fadeIn(fadetime);
            keyfound = true;
        } else {
            $("#" + key).fadeOut(fadetime);
        }
    });
    if (keyfound == false) {
        loadFinish();
    }
}


function updateProgressBar() {
    $.each(progress,function(key, value){
        var circle = $(".circle[data-progress=" + key + "]");
        if (circle.hasClass("current")) {circle.removeClass("current")}
        if (value == "current") {
            circle.addClass("current");
        } else if (value == "good") {
            circle.addClass("good");
        } else if (value == "bad") {
            circle.addClass("bad");
        } else if (value == "incomplete") {
            if (circle.hasClass("good")) {circle.removeClass("good")}
            if (circle.hasClass("bad")) {circle.removeClass("bad")}
        }
    })
}






// Change Score



function changeScore(change) {
    score += parseInt(change);
    if (score > maxscore) { score = maxscore }
    if (score < minscore) { score = minscore }
    var scorerange = maxscore - minscore;
    var percentage = Math.round(((score + maxscore) / scorerange) * 100);
    $('#scorecircle').css('left',percentage + '%');
    $('#scorecircle').text(score);
    if (score > 0) {
        $('#scorecircle').css('background', '#DB7DCF');
    } else if (score < 0) {
        $('#scorecircle').css('background', '#828282');
    } else {
        $('#scorecircle').css('background', '#36D2B5');
    }
}





// Generate Graphs

function generateGraph(qnumber, id) {
    var graphid = $("#" + id + " .graphcanvas").prop("id");
    var ctx = document.getElementById(graphid).getContext('2d');
    
    
    if (qnumber == "q1") {
        var graphdata = {
            labels: ["Independence", "Security"],
            datasets: [{
                label: '% Happiness of Designers',
                data: [62, 57],
                backgroundColor: ['#DB7DCF','#828282']
            }]
        };
    } else if (qnumber == "q2") {
        var graphdata = {
            labels: ["Regular Hours", "No Commute"],
            datasets: [{
                label: '% Happiness of Designers',
                data: [66, 58],
                backgroundColor: ['#DB7DCF','#828282']
            }]
        };
    } else if (qnumber == "q3") {
        var graphdata = {
            labels: ["High Position", "No Management"],
            datasets: [{
                label: '% Happiness of Designers',
                data: [58, 64],
                backgroundColor: ['#828282','#DB7DCF']
            }]
        };
    } else if (qnumber == "q4") {
        var graphdata = {
            labels: ["High Salary", "Feeling Valued"],
            datasets: [{
                label: '% Happiness of Designers',
                data: [49, 69],
                backgroundColor: ['#828282','#DB7DCF']
            }]
        };
    } else {
        return
    }
    
    var graph = new Chart(ctx, {
        type: 'bar',
        data: graphdata,
        options: {
            maintainAspectRatio: false,
            legend: {
                display:false
            },
            tooltips: {
                enabled:false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}








// FINAL PAGE


var answerkey = {
    "q1": {
        "good": "Independence",
        "bad": "Security"
    },
    "q2": {
        "good": "Regular Hours",
        "bad": "No Commute"
    },
    "q3": {
        "good": "No Management",
        "bad": "High Position"
    },
    "q4": {
        "good": "Feeling Valued",
        "bad": "High Salary"
    },
}

var imagekey = {
    "q1": {
        "good": "palette.svg",
        "bad": "lock.svg"
    },
    "q2": {
        "good": "car.svg",
        "bad": "house.svg"
    },
    "q3": {
        "good": "single.svg",
        "bad": "multiple.svg"
    },
    "q4": {
        "good": "medal.svg",
        "bad": "money.svg"
    },
}



function loadFinish() { 
    
    
    //Display the final page
    $("#progressbar").fadeOut(fadetime);
    $("#score-container").fadeOut(fadetime);
    $("#end-container").fadeIn(fadetime);
    $("#end-container").scrollTop(0);
    
    
    // Display score
    $("#scorenum").text(score);
    
    // Change styles depending on whether score is positive or negative.
    if (score > 0) {
        $("#smileorfrown").attr("src", "images/smile.svg");
        $(".endheader").css("background", "#DB7DCF");
        var pointtext = "points!"
    } else {
        $("#smileorfrown").attr("src", "images/frown.svg");
        $(".endheader").css("background", "#828282");
        var pointtext = "points."
    }
    
    // Handles pluralization for the word points.
    if (score == 1) {
        $("#points").text("point!");
    } else if (score == -1) {
        $("#points").text("point.");
    }
    $("#points").text(pointtext);
    
    // Display number of correct answers
    var happycount = 0;
    $.each(progress, function(key, value) {
        if (value == "good") {
            happycount++;
        }
    });
    $("#happycount").text(happycount);
    
    // Fill out individual question parts
    
    $(".yourchoice").each(function(){
        if ($(this).hasClass("good")) {$(this).removeClass("good")}
        if ($(this).hasClass("bad")) {$(this).removeClass("bad")}
    });
    
    $(".qsummary").each(function(){
        var qnumber = $(this).attr("data-question");
        
        var yourchoice = progress[qnumber];
        if (yourchoice == "good") {
            var notchosen = "bad"
        } else {
            var notchosen = "good"
        }
        $(this).find(".yourchoice").text(answerkey[qnumber][yourchoice]);
        $(this).find(".yourchoice").addClass(yourchoice);
        $(this).find(".notchosen").text(answerkey[qnumber][notchosen]);
        $(this).find("img").attr("src", "images/finish/" + imagekey[qnumber][yourchoice]);
    });
}



$("#playagain button").click(function(){
    restartGame();
})


function restartGame() {
    progress = {
        "q1":"current",
        "q2":"incomplete",
        "q3":"incomplete",
        "q4":"incomplete"
    }
    console.log(progress)
    score = 0;
    $('#end-container').fadeOut(fadetime);
    $("#progressbar").fadeIn(fadetime);
    $("#score-container").fadeIn(fadetime);
    updateProgressBar();
    changeScore(0)
    loadQuestion();
}