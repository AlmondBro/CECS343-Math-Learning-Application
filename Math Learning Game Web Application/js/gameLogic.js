/*** === TIMER JAVASCRIPT CODE === ***/
if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
    	timer();
	} //end window.onload function
}  //end if-statement

var timeLeft = 30;
var secondsElapsed = 0;
var counter = setInterval(timer, 1000); //1000ms, so will run it every 1 second

function timer() {
  timeLeft = timeLeft-1;
  secondsElapsed = secondsElapsed + 1;
  if (timeLeft <= 0) {
     clearInterval(counter);
     //counter ended, do something here
     return;
  } //end if-statement

 document.getElementById("secondsLeft").textContent = timeLeft + " secs" + "secondsElasped: " + secondsElapsed;
} //end timer() function

function generateTwoRandomNumbers(difficultyLevel) {
	//"Random # (1-10) = ", Math.floor((Math.random() * 10) + 1),
	//Create an empty array that will hold the generated numbers
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
			} //end while loop
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
			} //end while loop
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
			} //end while loop
			break;

		default:
			number1 = 1;
			number2 = 1;
	} //end switch statement
	generatedNumbers[0] = number1;
	generatedNumbers[1] = number2;
	return generatedNumbers;
} //end generateTwoRandomNumbers(var level) function

function userAnswerChecker(number1, number2, mathType, userAnswer) {
	var isUserCorrect;

	switch (mathType) {
		case "+":
			isUserCorrect = (number1 + number2 == userAnswer);
			break;
		case "-":
			isUserCorrect = (number1 - number2 == userAnswer);
			break;
		case "*":
			isUserCorrect = (number1 * number2 == userAnswer);
			break;
		case "/":
			var answer = number1 / number2;
			isUserCorrect = ((Math.round(answer * 100) / 100) == userAnswer);
			break;
		default:
			isUserCorrect = false;
	} //end switch statement
	return isUserCorrect;
} //end userAnswerChecker(number1, number2, mathType, userAnswer) function


function getEquation() {
	var twoNumbers = generateTwoRandomNumbers(difficultyLevel);
	currentEquation = twoNumbers[0] + " " + getMathType() + " " + twoNumbers[1] + "    = ";
	return currentEquation;
} //end getEquation() method

function runActualGame() {
	console.log("Running actual game");
}  //end runActualGame(difficultyLevel, mathType)

//Get the submit button element and save it as a variable
document.getElementById("submitAnswer-Button").addEventListener("click", runActualGame);
