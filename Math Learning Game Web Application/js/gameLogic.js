
if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
		console.log(user);
    	timer();
    	ajaxCall();
    	console.log("User.difficultyLevel: " + user.difficultyLevel);
	} 
}  

var userInfo = localStorage.getItem("userInfo");
var user = JSON.parse(userInfo);	
var difficultyLevelNumber = user.difficultyLevel;	

document.getElementById("submitAnswer-Button").addEventListener("click", function() {answerResult(num1,num2,mathType,userAnswer.value)});
var timeLeft = 30;
var secondsElapsed = 0;
var counter = setInterval(timer, 1000); 
//var userAnswer = document.getElementById("answerInputInputBox");
var num1;
var num2; 
var mathType = "+";
var userAnswer= document.getElementById("answerInputInputBox");

var currentPointsDOMElement = document.getElementById("currentPoints");
var currentPoints = 0;


function timer() {
  timeLeft--;
  secondsElapsed++;
  if (timeLeft < 0) {
     clearInterval(counter);
     return;
  } 

 document.getElementById("secondsLeft").textContent = timeLeft + " secs" + "\n" + "secondsElasped: " + secondsElapsed;
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
			/*while (number1 < number2) {
				number1 = Math.floor((Math.random() * 10 ) );
				number2 = Math.floor((Math.random() * 9 ) + 1 );
			}  */
			break;

		case "2":
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			break;	

		case "3":
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 90 ) + 10 );
			/*while (number1 < number2) {
				number1 = Math.floor((Math.random() * 90 ) + 10 );
				number2 = Math.floor((Math.random() * 90 ) + 10 );
			} */
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
			/*while(number1 < number2) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number1 = Math.floor((Math.random() * 900 ) + 100 );
			}  */
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
			correctAnswer = Math.round(number1 / number2);
			console.log("Correct Answer: " + correctAnswer + "\n");
			isCorrect = userAnswer == correctAnswer;
			break;
	} 
    return isCorrect;
} 

function answerResult(number1, number2, mathType, userAnswer) {
    console.log(userAnswerChecker(number1,number2,mathType,userAnswer) ? "Correct" : "Wrong");
    if ( userAnswerChecker(number1,number2,mathType,userAnswer) == true ) {
    	console.log("Correct answer! :)");
    	currentPoints++;
    	currentPointsDOMElement.textContent = currentPoints;
    	timeLeft += 8;
     } 
 	else {
 		console.log("Incorrect answer :(");
 		currentPoints--;
 		if (currentPoints <= 0 ) {
 			currentPoints = 0;
 		} //end if-statement
 		currentPointsDOMElement.textContent = currentPoints;
 		timeLeft -= 3;
 	}      
    ajaxCall();
} //end answerResult(number1, number2, mathType, userAnswer) method.

function getEquation(twoNumbers) {
	var currentEquation = twoNumbers[0] + " " + /*getMathType()*/"+" + " " + twoNumbers[1] + "    = ";
	return currentEquation;
} 

function runActualGame() {
	console.log("Running actual game");
	console.log("Difficulty Level: " + difficultyLevelNumber);
    //var userAnswer = document.getElementById("answerInputInputBox");
	if (userAnswer.value != "") {
		userAnswer.value = "";
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
        }
    }
    request.send();
} 

