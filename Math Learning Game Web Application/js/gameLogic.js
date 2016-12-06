/* Initiates the game onto the screen */
if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
		//Creates a timer visible to the user. 
    	timer();
		//Generates an equation to the screen
    	generateEquation();
		//Displays the levels number to the screen.
    	document.getElementById("levelNumber").textContent = difficultyLevelNumber.toString();
		//Returns the math type 
		getMathTypeButton(); 
		//Puts the focus on the answer box from its initial start
    	document.forms['userAnswerForm'].elements['answerInputInputBox'].focus(); 
	} 
} 
/* Array to hold different users */
var userArray = [];
/* Obtains userInfo and stores it into a variable. */
var userInfo = localStorage.getItem("userInfo");
/* Converts JSON object into a string. */
var user = JSON.parse(userInfo);	
/* Stores the difficulty based on the users choice. */
var difficultyLevelNumber = user.difficultyLevel;	
/* Stores the math type based on the users choice. */
var mathType = user.mathType;
/* Stores the name of the user into a variable. */
var username = user.userName;

/* Keep focus on the answer input box while keeping the page from reloading when entering the answer. */
document.forms['userAnswerForm'].onsubmit = function() {
														document.forms['userAnswerForm'].elements['answerInputInputBox'].focus(); 
														 return false;
														};
/* Listener for the submit button once the user has entered an answer. */
document.getElementById("submitAnswer-Button").addEventListener("click", function() {answerResult(num1,num2,mathType,userAnswer.value)});
/*Listener for the main menue button once the game has ended */
document.getElementById("game-end-main-menu-button").addEventListener("click", function() {window.location.href = "/index.html";});
/* Listener for the main menu button as you are playing the game. */
document.getElementById("main-menu-button").addEventListener("click", function() {window.location.href = "/index.html";});
/* Listener for the submission of the high score from the user. */
document.getElementById("submit-Score-Button").addEventListener("click", function() {
     storeHighScore();
     window.location.href = "/index.html";
     });
/* Stores the difficulty of the level in to a variable */
var diff = parseInt(difficultyLevelNumber);
/* Based on the difficulty the user chose, calculates an amount of goal points */
var goalPoints = (15 * diff) + 15;
/* Changes the goal points to a string to display. */
document.getElementById("goalPoints").textContent = goalPoints.toString();
/* Calculates the time left for the user */
var timeLeft = (40 + (diff * 15));
/* Instantiates the time to zero. */
var secondsElapsed = 0;
/* Instantiates a counter */
var counter = window.setInterval(timer, 100); 
/* Creates a variable to store the first number of the equation. */
var num1;
/* Creates a variable to store the second number of the equation. */
var num2; 
/* Obtains the users answer from the input box. */
var userAnswer= document.getElementById("answerInputInputBox");
/* Obtains the current points */
var currentPointsDOMElement = document.getElementById("currentPoints");
/* Instantiates the points to zero at the start of the game. */
var currentPoints = 0;
/* Obtains the math type from the game that is being played. */
function getMathTypeButton() {
	//Based on the operator that is played, will obtain the appropiate operator. 
	if (mathType == "+") {
		document.getElementById("addition-Button2").style.display = "inline-block";
	} 

	if (mathType == "-") {
		document.getElementById("subtraction-Button2").style.display = "inline-block";
	} 

	if (mathType == "*") {
		document.getElementById("multiplication-Button2").style.display = "inline-block";
	} 

	if (mathType == "/") {
		document.getElementById("division-Button2").style.display = "inline-block";
	} 
}
/* Stores the highscore that is entered from the user that has finished playing the game. */
function storeHighScore(){
	//Obtains the time elapsed to determine highscore. 
    user.time = secondsElapsed.toString();
	//Obtains the score of the user 
	user.score = (Math.round(weightScore()*100)/100).toString();
    var gameInfo;
	// Pushes the score of the user into the array
	var getLocal = localStorage.getItem("highscoresList");
    if (getLocal == null){
			userArray.push(user);
          gameInfo = JSON.stringify(userArray);
    } else{
		var scoreList = JSON.parse(getLocal);
		scoreList.push(user);
		userArray = scoreList;
		gameInfo = JSON.stringify(userArray);   
    }
    localStorage.setItem("highscoresList", gameInfo);
}

function getNumberMathType(type){
    if (type == "+") { return 1}
	else if (type == "-") { return .75;}
	else if (type == "*") { return .5; }
	else { return .25; }
}

function weightScore(){
    return getNumberMathType(mathType) * secondsElapsed + parseInt(difficultyLevelNumber)*2;
}

function timer() {
  timeLeft -= 0.1;
  timeLeft = Math.round(timeLeft * 100) / 100;
  secondsElapsed += .1;
  secondsElapsed = Math.round(secondsElapsed * 100) / 100;
  if (timeLeft < 0) {
	  secondsElapsed -= .1;
      secondsElapsed = Math.round(secondsElapsed * 100) / 100;
	  gameEnd(false);
     clearInterval(counter);
     return;
  } 
	var timeLeftInt = parseInt(timeLeft); //Convert time displayed to an integer to remove lag
	document.getElementById("secondsLeft").textContent = timeLeftInt.toString();   
} 

function convertMathType(type){
	if (type == "+") { return "Addition";}
	else if (type == "-") { return "Subtraction";}
	else if (type == "*") { return "Multiplication"; }
	else { return "Division"; }
}

	
function gameEnd(winOrLose) {
	if(winOrLose) {
		document.getElementById("endMsg").textContent = "You Won!";
	}
	else {
		document.getElementById("endMsg").textContent = "You Lost!";
	}
	document.getElementById("user-name").textContent = username.length > 9 ? username.substring(0,8)+"..." : username;
	document.getElementById("user-lvl").textContent = difficultyLevelNumber.toString();
	document.getElementById("user-type").textContent = convertMathType(mathType).toString();
	document.getElementById("user-time").textContent = secondsElapsed.toString();
	window.location.href = "/gameRun.html#openModal";
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function generateTwoRandomNumbers(difficultyLevel) {
	var generatedNumbers = []; 
	var number1;
	var number2;

	switch (difficultyLevel) {
		case "1":
			number1 = Math.floor((Math.random() * 21 ) );
			number2 = Math.floor((Math.random() * 19 ) + 1 );
            if (mathType == "/"){
                while ((number1 < number2) || (number1%number2 != 0)) {
				number1 = Math.floor((Math.random() * 21 ) );
				number2 = Math.floor((Math.random() * 19 ) + 1 );
			     }  
            }
            else {
                while (number1 < number2) {
				number1 = Math.floor((Math.random() * 21 ) );
				number2 = Math.floor((Math.random() * 19 ) + 1 );
			     }  
            }
			break;

		case "2":
			number1 = Math.floor((Math.random() * 80 ) + 20 );
			number2 = Math.floor((Math.random() * 19 ) + 1 );
            if (mathType == "/"){
                while(number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 80 ) + 20 );
		      	number2 = Math.floor((Math.random() * 19 ) + 1 );
            }
            } 
			break;	

		case "3":
			number1 = Math.floor((Math.random() * 290 ) + 10 );
			number2 = Math.floor((Math.random() * 49 ) + 1 );
            if (mathType == "/"){
                while ((number1 < number2) || (number1 % number2 != 0)) {
				number1 = Math.floor((Math.random() * 290 ) + 10 );
				number2 = Math.floor((Math.random() * 49 ) + 1 );
			}    
            } else{
                while (number1 < number2) {
				number1 = Math.floor((Math.random() * 290 ) + 10 );
				number2 = Math.floor((Math.random() * 49 ) + 1 );
			}    
            }
			break;

		case "4":
			number1 = Math.floor((Math.random() * 490 ) + 10 );
			number2 = Math.floor((Math.random() * 69 ) + 20 );
            if (mathType == "/"){
             while(number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 490 ) + 10 );
		      	number2 = Math.floor((Math.random() * 69 ) + 20 );
            }   
            }
			break;

		case "5":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 49) + 1 );
            if (mathType == "/"){
                while (number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 900 ) + 100 );
		      	number2 = Math.floor((Math.random() * 49) + 1 );
            }   
            }
			break;	

		case "6":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 500 ) + 20 );
            if (mathType == "/"){
             while((number1 < number2) || (number1 % number2 != 0)) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number2 = Math.floor((Math.random() * 500 ) + 20 );
			}     
            } else{
                while (number1 < number2) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number2 = Math.floor((Math.random() * 500 ) + 20 );
			}  
            }
			break;
	} 
	generatedNumbers[0] = number1;
	generatedNumbers[1] = number2;
    num1 = number1;
    num2 = number2;
	return generatedNumbers;
} 

function userAnswerChecker(number1, number2, mathType, userAnswer) {
	var correctAnswer;
    var isCorrect;
	switch (mathType) {
		case "+":
			correctAnswer = number1 + number2;
			isCorrect = userAnswer == correctAnswer;
			break;
		case "-":
			correctAnswer = number1 - number2;
			isCorrect = userAnswer == correctAnswer;
			break;
		case "*":
			correctAnswer = number1 * number2;
			isCorrect = userAnswer == correctAnswer;
			break;
		case "/":
			correctAnswer = number1 / number2;
			isCorrect = userAnswer == correctAnswer;
			break;
	} 
	displayCorrectnessImg(isCorrect);	//Display the "check" or "x" img if correct or not
    return isCorrect;
} 

function answerResult(number1, number2, mathType, userAnswer) {
    if (userAnswerChecker(number1,number2,mathType,userAnswer)) {
        difficultyLevelNumber = parseInt(difficultyLevelNumber);
    	currentPoints += (5 * difficultyLevelNumber + (difficultyLevelNumber + 2));
        difficultyLevelNumber = difficultyLevelNumber.toString();
    	currentPointsDOMElement.textContent = currentPoints.toString();
		if (currentPoints >= goalPoints) {
			clearInterval(counter);	
			secondsElapsed -= .1;
            secondsElapsed = Math.round(secondsElapsed * 100) / 100;
			gameEnd(true);
		}
     } 
 	else {
 		currentPoints -= 4 * difficultyLevelNumber;
 		if (currentPoints <= 0 ) {
 			currentPoints = 0;
 		} 
 		currentPointsDOMElement.textContent = currentPoints.toString();
 	}      
    generateEquation();
} 

function displayCorrectnessImg(TorF) {
	var checkImg;
	if(TorF) {
		checkImg = document.getElementById("checkMarkWin");
	}
	else {
		checkImg = document.getElementById("checkXLose");
	}
		fadeIn(checkImg, 700);
		setTimeout(function () {
								fadeOut(checkImg, 700);
								}, 
			   800);
}

function getEquation(twoNumbers) {
	var currentEquation = twoNumbers[0] + " " +  getMathType() + " " + twoNumbers[1] + "    = ";
	return currentEquation.toString();
} 

function runActualGame() {
	if (userAnswer.value != "") {
		userAnswer.value = "";
	} 
}

function getMathType() {
	if (mathType == "*") {
		return "x";
	}

	else if (mathType == "/") {
		return"\xF7";
	} 

	else {
		return mathType;
	} 
} 

function fadeIn(el, time) {
     el.style.opacity = 0;
	 el.style.visibility = "visible";
     el.style.display = "block";

     var last = +new Date();
     var tick = function() {
          el.style.opacity = +el.style.opacity + (new Date() - last) / time;
          last = +new Date();

          if (+el.style.opacity < 1) {
               (window.requestAnimationFrame && requestAnimationFrame(tick)) ||      setTimeout(tick, 16)
          }
     };

     tick();
}

function fadeOut( elem, ms )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
}

function generateEquation() {
	document.getElementById("generatedQuestion").textContent = getEquation(generateTwoRandomNumbers(difficultyLevelNumber));
 	runActualGame();
} //end generateEquation() function

/* Polyfill for Internet Explorer 8 to suppor the faster textContent property. 
   If IE8 is detected, innerText is used instead of textContent. innerText
   is supproted by IE8: 
   Source: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent */
if (Object.defineProperty 
  && Object.getOwnPropertyDescriptor 
  && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") 
  && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function() {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent",
     {
       get: function() {
         return innerText.get.call(this);
       },
       set: function(s) {
         return innerText.set.call(this, s);
       }
     }
   );
  })();
}