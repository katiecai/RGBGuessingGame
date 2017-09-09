function color(r, g, b) {
  this.red = r;
  this.green = g;
  this.blue = b;
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var randColor = new color(red, green, blue);
  return randColor;
}

var colors = document.querySelectorAll(".color");
var colorsArray = [];
var colorToGuess;

var header = document.querySelectorAll("p");
var h1 = document.querySelector("h1");

var level = "hard";
var finished = false;

var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var newColorsButton = document.querySelector(".newColors");
var num;

function colorsSetup() {
  colorsArray = [];
  h1.style.background = 'steelblue';
  document.querySelector(".result").textContent = "";
  finished = false;

  if (level == "easy") {
    num = 3;
  }
  else if (level == "hard"){
    num = 6;
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
  }

//set random colors
  for (var i = 0; i < num; i++) {
      var background = randomColor();
      colorsArray[i] = background;
      colors[i].style.background = "rgb(" + background.red + ", " + background.green + ", " + background.blue + ")";
    }

//find random color to guess for
  var randNum = Math.floor(Math.random() * num);
  colorToGuess = colorsArray[randNum];
  document.querySelector("#R").textContent = colorToGuess.red;
  document.querySelector("#G").textContent = colorToGuess.green;
  document.querySelector("#B").textContent = colorToGuess.blue;
}

colorsSetup();

easyButton.addEventListener("click", function() {
  level = "easy";
  this.classList.add("selected");
  hardButton.classList.remove("selected");
  colorsSetup();
  //add fade out
  for (var i = 3; i < 6; i++) {
    colors[i].style.display = "none";
  }
});

hardButton.addEventListener("click", function() {
  level = "hard";
  this.classList.add("selected");
  easyButton.classList.remove("selected");
  colorsSetup();
  for (var i = 3; i < 6; i++) {
    colors[i].style.display = "block";
  }
});

newColorsButton.addEventListener("click", function() {
  this.textContent = "New Colors";
  colorsSetup();
});

//user guesses...
function guess(colorGuess, j) {
  if (!finished) {
    if (colorGuess.red == colorToGuess.red && colorGuess.green == colorToGuess.green && colorGuess.blue == colorToGuess.blue) {
      finished = true;
      document.querySelector(".result").textContent = "Correct";
      document.querySelector(".newColors").textContent = "Play Again?";
      for (var i = 0; i < num; i++) {
        var colorString = "rgb(" + colorToGuess.red + ", " + colorToGuess.green + ", " + colorToGuess.blue + ")";
        colors[i].style.background = colorString;
      }
      h1.style.background = colorString;
    }
    else {
      document.querySelector(".result").textContent = "Try Again";
      colors[j].style.background = "#232323";
    }
  }
}

colors[0].addEventListener("click", function() {guess(colorsArray[0], "0");});
colors[1].addEventListener("click", function() {guess(colorsArray[1], "1");});
colors[2].addEventListener("click", function() {guess(colorsArray[2], "2");});

if (level == "hard") {
  colors[3].addEventListener("click", function() {guess(colorsArray[3], "3");});
  colors[4].addEventListener("click", function() {guess(colorsArray[4], "4");});
  colors[5].addEventListener("click", function() {guess(colorsArray[5], "5");});
}
