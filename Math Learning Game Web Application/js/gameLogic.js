/* Get Dynamic Elements */

//Holds the input box element where the player types in his name
var playerName = document.getElementById("nameInput");

//Get the the option chosen for the diffulty level
var difficultyLevel = document.querySelector("input[name='level-options']:checked");

/* Get the type of math buttons */
var mathTypeButton = document.getElementsByClassName("mathType-button");
var additionButton = document.getElementById("addition-Button");
var subtractionButton = document.getElementById("subtraction-Button");
var multiplicationButton = document.getElementById("multiplication-Button");
var divisionButton = document.getElementById("division-Button");

/* Call the initializeGame() method when any of the math-Type buttons are clicked. 
	This code has to be utilized for the mathTypeButton variable returns a NodeList 
	object which does not work in an eventListener. An eventListener requires 
	a Node, and not a NodeList which the document.getElementsByClassName returns.
	This is a workaround for this, converting the NodeList to a Node. 

		Syntax: [].forEach.call(nodeList,function(e){e.addEventListener('click',callback,false)})
		Source: https://stackoverflow.com/questions/12362256/addeventlistener-on-nodelist
*/
[].forEach.call(mathTypeButton, function(e) {
							  	e.addEventListener('click',initializeGame,false)
							  } //end function(e)
				);

//mathTypeButton.addEventListener("click", initializeGame);

function initializeGame() {
	console.log("A Math Type Button Was Clicked.");
    validateInputs(); 
} //end initializeGame() button

/* Check to see if the player name input box is empty and/or
   a difficulty level hasn't been selected. Returns an error
   prompting the user to do select the said options.  */
function validateInputs() {
	if (checkPlayerName() == false) {
		document.getElementById("nameInput-errorMessage").style.display = "inline-block";
	}  //end if statement

	if (checkPlayerName() == true) {
		document.getElementById("nameInput-errorMessage").style.display = "none";
	} //end if statement

	if (checkDifficultyLevel() == false) {
		console.log("Please choose a difficulty level");
		document.getElementById("difficultyLevel-errorMessage").style.display = "inline-block";
	} //end if-statement

	if (checkDifficultyLevel() == true) {
		document.getElementById("difficultyLevel-errorMessage").style.display = "none";
	} //end if-statement

	if (checkPlayerName() == true && checkDifficultyLevel() == true) {
		console.log("Change to gameRun");
		window.location.href = "/gameRun.html";
	} //end if-statement

} //end validateInputs() function

function checkPlayerName() {
	if (playerName.value == "" || playerName.value === null || 
		playerName.value.length == 0 || isEmpty(playerName.value) == true ) {
		return false;
	} //end if-statement
	if (playerName.value !== "" || playerName.value !== null || 
		playerName.value.length != 0 || isEmpty(playerName.value) == false ) {
		return true;
	} //end if-statement
} //end checkPlayerName() function

/* Checks to see if there is whitespace in an element
   like an input field. Returns true if the field is empty.
*/
function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; 
} //end isEmpty() function


/* Checks if a difficulty level has been selected or not. */
function checkDifficultyLevel() {
	var diffLevelRadioButton = document.forms["difficutyLevelForm"]["level-options"];
	var diffLevelFormLength = diffLevelRadioButton.length;
	var levelChosen = null;

	for (var i = 0; i < diffLevelFormLength; i++) {
		if (diffLevelRadioButton[i].checked) {
			levelChosen = diffLevelRadioButton[i].value;
		} //end if-statement
	} //end for loop

	if (levelChosen == null) {
		return false;
	} //end if-statement

	else {
		return true;
	} //end else-statement
} //end checkDifficultyLevel() option

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
