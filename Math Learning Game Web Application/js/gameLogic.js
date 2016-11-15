
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
var user = JSON.parse(userInfo);	
var difficultyLevelNumber = user.difficultyLevel;	
var mathType = user.mathType;

document.getElementById("submitAnswer-Button").addEventListener("click", function() {answerResult(num1,num2,mathType,userAnswer.value)});
var timeLeft = 30;
var secondsElapsed = 0;
var counter = setInterval(timer, 1000); 
//var userAnswer = document.getElementById("answerInputInputBox");
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
  timeLeft--;
  secondsElapsed++;
  if (timeLeft < 0) {
     clearInterval(counter);
     return;
  } 

 document.getElementById("secondsLeft").textContent = timeLeft + " secs" + "\n" + "Seconds elapsed: " + secondsElapsed;
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
			number1 = Math.floor((Math.random() * 10 ) );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			while (number1 < number2) {
				number1 = Math.floor((Math.random() * 10 ) );
				number2 = Math.floor((Math.random() * 9 ) + 1 );
			}  
			break;

		case "2":
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			break;	

		case "3":
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 90 ) + 10 );
			while (number1 < number2) {
				number1 = Math.floor((Math.random() * 90 ) + 10 );
				number2 = Math.floor((Math.random() * 90 ) + 10 );
			} 
			break;

		case "4":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			break;

		case "5":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 90) + 10 );
			break;	

		case "6":
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 900 ) + 100 );
			while(number1 < number2) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number1 = Math.floor((Math.random() * 900 ) + 100 );
			}  
			break;

		/*default:
			number1 = 3;
			number2 = 1; */
	} 
	generatedNumbers[0] = number1;
	generatedNumbers[1] = number2;
    num1 = number1;
    num2 = number2;
    //userAnswer = num1+num2;
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
			correctAnswer = Math.round(number1 / number2 * 100) / 100;
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
	} 
    return isCorrect;
} 

function answerResult(number1, number2, mathType, userAnswer) {
    //console.log(userAnswerChecker(number1,number2,mathType,userAnswer) ? "Correct" : "Wrong");
    if (userAnswerChecker(number1,number2,mathType,userAnswer)) {
    	console.log("Correct answer! :)");
        difficultyLevelNumber = parseInt(difficultyLevelNumber);
    	currentPoints += (6 * difficultyLevelNumber + (difficultyLevelNumber + 2));
        difficultyLevelNumber = difficultyLevelNumber.toString();
        console.log(currentPoints);
    	currentPointsDOMElement.textContent = currentPoints;
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

