
if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
		console.log(user);
    	timer();
    	ajaxCall();
    	document.getElementById("levelNumber").textContent = difficultyLevelNumber;
    	getMathTypeButton(); 
    	console.log("User.difficultyLevel: " + user.difficultyLevel);
    	console.log("Type of math selected: " + mathType);
	} //end onload inline function
}  //end if-statement

var userInfo = localStorage.getItem("userInfo");
console.log(userInfo);
var user = JSON.parse(userInfo);	
var difficultyLevelNumber = user.difficultyLevel;	
var mathType = user.mathType;
var username = user.userName;

document.getElementById("submitAnswer-Button").addEventListener("click", function() {answerResult(num1,num2,mathType,userAnswer.value)});
document.getElementById("main-Menu-Button").addEventListener("click", function() {window.location.href = "/index.html";});
document.getElementById("pop-Up-Button").addEventListener("click", function() {
	window.location.href = "/gameRun.html#openModal";
});

var diff = parseInt(difficultyLevelNumber);
var goalPoints = (15 * diff) + 15;
document.getElementById("goalPoints").innerHTML = goalPoints.toString();
var timeLeft = 10;//(40 + (diff * 15));
var secondsElapsed = 0;
var counter = setInterval(timer, 100); 
//var userAnswer = document.getElementById("answerInputInputBox").onclick();
var num1;
var num2; 
var userAnswer= document.getElementById("answerInputInputBox");

var currentPointsDOMElement = document.getElementById("currentPoints");
var currentPoints = 0;

function getMathTypeButton() {
	if (mathType == "+") {
		document.getElementById("addition-Button2").style.display = "inline-block";
	} //end if-statement

	if (mathType == "-") {
		document.getElementById("subtraction-Button2").style.display = "inline-block";
	} //end if-statement

	if (mathType == "*") {
		document.getElementById("multiplication-Button2").style.display = "inline-block";
	} //end if-statement

	if (mathType == "/") {
		document.getElementById("division-Button2").style.display = "inline-block";
	} //end if-statement
} //end getMathTypeButton()

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

 document.getElementById("secondsLeft").textContent = timeLeft;
} 
function convertMathType(type){
	if (type == "+") { return "Addition";}
	else if (type == "-") { return "Subtraction";}
	else if (type == "*") { return "Multiplication"; }
	else { return "Division"; }
}

	
function gameEnd(winOrLose) {
	if(winOrLose) {
		document.getElementById("endMsg").innerHTML = "You Won!";
	}
	else {
		document.getElementById("endMsg").innerHTML = "You Lost!";
	}
	document.getElementById("user-name").innerHTML = username.length > 9 ? username.substring(0,8)+"..." : username;
	document.getElementById("user-lvl").innerHTML = difficultyLevelNumber;
	document.getElementById("user-type").innerHTML = convertMathType(mathType);
	document.getElementById("user-time").innerHTML = secondsElapsed;
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
			while ((number1 < number2) || (number1%number2 != 0)) {
				number1 = Math.floor((Math.random() * 21 ) );
				number2 = Math.floor((Math.random() * 19 ) + 1 );
			}  
			break;

		case "2":
			number1 = Math.floor((Math.random() * 80 ) + 20 );
			number2 = Math.floor((Math.random() * 19 ) + 1 );
            while(number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 80 ) + 20 );
		      	number2 = Math.floor((Math.random() * 19 ) + 1 );
            }
			break;	

		case "3":
			number1 = Math.floor((Math.random() * 290 ) + 10 );
			number2 = Math.floor((Math.random() * 49 ) + 1 );
			while ((number1 < number2) || (number1 % number2 != 0)) {
				number1 = Math.floor((Math.random() * 290 ) + 10 );
				number2 = Math.floor((Math.random() * 49 ) + 1 );
			} 
			break;

		case "4":
			number1 = Math.floor((Math.random() * 490 ) + 10 );
			number2 = Math.floor((Math.random() * 69 ) + 20 );
            while(number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 490 ) + 10 );
		      	number2 = Math.floor((Math.random() * 69 ) + 20 );
            }
			break;

		case "5":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 49) + 1 );
            while (number1 % number2 != 0){
                number1 = Math.floor((Math.random() * 900 ) + 100 );
		      	number2 = Math.floor((Math.random() * 49) + 1 );
            }
			break;	

		case "6":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 500 ) + 20 );
			while((number1 < number2) || (number1 % number2 != 0)) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number2 = Math.floor((Math.random() * 500 ) + 20 );
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
    console.log("This is your answer: " + userAnswer);
    console.log("This is the first and second number: " + number1 + " " + number2);
    
	var correctAnswer;
    var isCorrect;
	switch (mathType) {
		case "+":
			correctAnswer = number1 + number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
		case "-":
			correctAnswer = number1 - number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
		case "*":
			correctAnswer = number1 * number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
		case "/":
			correctAnswer = number1 / number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
	} 
	displayCorrectnessImg(isCorrect);	//Display the "check" or "x" img if correct or not
    return isCorrect;
} 

function answerResult(number1, number2, mathType, userAnswer) {
    if (userAnswerChecker(number1,number2,mathType,userAnswer)) {
    	console.log("Correct answer! :)");
        difficultyLevelNumber = parseInt(difficultyLevelNumber);
    	currentPoints += (6 * difficultyLevelNumber + (difficultyLevelNumber + 2));
        difficultyLevelNumber = difficultyLevelNumber.toString();
        console.log(currentPoints);
    	currentPointsDOMElement.textContent = currentPoints;
		if (currentPoints >= goalPoints) {
			clearInterval(counter);	// stops timer
			secondsElapsed -= .1;
            secondsElapsed = Math.round(secondsElapsed * 100) / 100;
			gameEnd(true);
		}
     } 
 	else {
 		console.log("Incorrect answer :(" + "\n");
 		currentPoints -= 4 * difficultyLevelNumber;
 		if (currentPoints <= 0 ) {
 			currentPoints = 0;
 		} //end if-statement
 		currentPointsDOMElement.textContent = currentPoints;
 	}      
    ajaxCall();
} //end answerResult(number1, number2, mathType, userAnswer) method.

function displayCorrectnessImg(TorF) {
	var checkImg;
	if(TorF) {
		checkImg = document.getElementById("checkMarkWin");
	}
	else {
		checkImg = document.getElementById("checkXLose");
	}
		fadeIn(checkImg, 700);
		setTimeout(function () {fadeOut(checkImg, 700);}, 800);
}

function getEquation(twoNumbers) {
	var currentEquation = twoNumbers[0] + " " +  getMathType() + " " + twoNumbers[1] + "    = ";
	return currentEquation;
} 

function runActualGame() {
	console.log("Running actual game function. Clears answer input when changing equation" + "\n" + "\n");
	if (userAnswer.value != "") {
		userAnswer.value = "";
	} //end if-statement
} //end runActualGame() function

function getMathType() {
	if (mathType == "*") {
		return "x";
	} //end if-statement

	else if (mathType == "/") {
		return"\xF7";
	} //end if-statement

	else {
		return mathType;
	} //end else-statement
} //end getMathType()

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

function ajaxCall() {
    var request;
    if (window.XMLHttpRequest) { 
        request = new XMLHttpRequest();
    } else { 
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('POST', 'gameRun.html', true);
    request.onreadystatechange = function() {
        if ((request.readyState === 4) && (request.status === 200)) {
            document.getElementById("generatedQuestion").textContent = getEquation(generateTwoRandomNumbers(difficultyLevelNumber));
            runActualGame();
        } //end if-statement
    } //end request.onreadystatechange inline function
    request.send();
} //end ajaxCall() function

