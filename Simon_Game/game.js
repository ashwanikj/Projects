var gamePattern=[];

var buttoncolors= ["red", "blue","green","yellow"];

var userClickedPattern=[];
var start=false;
var level=0;

$(document).keypress(function (){
  if(!start){
    $("#level-title").text("Level "+ level);

    nextSequence();
    start=true;
  }
});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {

    console.log("wrong");
    // var audio= new Audio("sounds/wrong.mp3");
    // audio.play();
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game over, Press any key to restart");
    startOver();

  }
}

function nextSequence(){
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+ level);

  var randomnumber= Math.floor(Math.random() *4);

  var randomChosenColour= buttoncolors[randomnumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio= new Audio("sounds/"+ randomChosenColour + ".mp3");
  audio.play();
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio= new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level=0;
  start=false;
  gamePattern=[];
}
