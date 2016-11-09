if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
    	timer();
    	ajaxCall();
	} 
}  

var difficultyLevel = 2;	
document.getElementById("submitAnswer-Button").addEventListener("click", function() {answerResult(num1,num2,mathType,userAnswer)});
var timeLeft = 30;
var secondsElapsed = 0;
var counter = setInterval(timer, 1000); 
//var userAnswer = document.getElementById("answerInputInputBox");
var num1;
var num2; 
var mathType = "+";
var userAnswer;



function timer() {
  timeLeft--;
  secondsElapsed++;
  if (timeLeft <= 0) {
     clearInterval(counter);
     return;
  } 

 document.getElementById("secondsLeft").textContent = timeLeft + " secs" + "\n" + "secondsElasped: " + secondsElapsed;
} 

function generateTwoRandomNumbers(difficultyLevel) {
	var generatedNumbers = []; 
	var number1 = 0;
	var number2 = 0;

	switch (difficultyLevel) {
		case 1:
			number1 = Math.floor((Math.random() * 10 ) );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			while (number1 < number2) {
				number1 = Math.floor((Math.random() * 10 ) );
				number2 = Math.floor((Math.random() * 9 ) + 1 );
			} 
			break;

		case 2:
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			break;	

		case 3:
			number1 = Math.floor((Math.random() * 90 ) + 10 );
			number2 = Math.floor((Math.random() * 90 ) + 10 );
			while (number1 < number2) {
				number1 = Math.floor((Math.random() * 90 ) + 10 );
				number2 = Math.floor((Math.random() * 90 ) + 10 );
			} 
			break;

		case 4:
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 9 ) + 1 );
			break;

		case 5:
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number2 = Math.floor((Math.random() * 90) + 10 );
			break;	

		case 6:
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			number1 = Math.floor((Math.random() * 900 ) + 100 );
			while(number1 < number2) {
				number1 = Math.floor((Math.random() * 900 ) + 100 );
				number1 = Math.floor((Math.random() * 900 ) + 100 );
			} 
			break;

		default:
			number1 = 1;
			number2 = 1;
	} 
	generatedNumbers[0] = number1;
	generatedNumbers[1] = number2;
    num1 = number1;
    num2 = number2;
    userAnswer = num1+num2;
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
        ajaxCall();
}

function getEquation(twoNumbers) {
	var currentEquation = twoNumbers[0] + " " + /*getMathType()*/"+" + " " + twoNumbers[1] + "    = ";
	return currentEquation;
} 

function runActualGame() {
	console.log("Running actual game");
	console.log("Difficulty Level: " + difficultyLevel);
    var userAnswer = document.getElementById("answerInputInputBox");
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
            document.getElementById("generatedQuestion").textContent = getEquation(generateTwoRandomNumbers(difficultyLevel));
            runActualGame();
        }
    }
    request.send();
} 