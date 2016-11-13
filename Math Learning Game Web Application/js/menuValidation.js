/* Get Dynamic Elements */

//Holds the input box element where the player types in his name
var playerName = document.getElementById("nameInput");

//Get the the option chosen for the diffulty level
var difficultyLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
//document.querySelector("input[name='level-options']");
var difficultyLevelRadioButton_Checked = document.querySelector('input[name="level-options"]:checked');
//difficultyLevelRadioButtonChecked();

//document.querySelector("input[name='level-options']:checked"

function difficultyLevelRadioButtonChecked() {
	var difficultyLevelRadioButtonOption;
	/*if (checkDifficultyLevel() == false) {
		difficultyLevelRadioButtonOption = document.forms["difficultyLevelForm"]["level-options"][Math.floor(Math.random() * 4 )];
	} //end if-statement*/

	/*else if (checkDifficultyLevel() == true) { */
		difficultyLevelRadioButtonOption = document.querySelector('input[name="level-options"]:checked');
		// document.forms["difficultyLevelForm"]["level-options"].checked;
	//} //end else-statement

	return difficultyLevelRadioButtonOption;
} //end difficultyLevelRadioButtonChecked() function

//var difficultyLevelRadioButton = document.querySelector("input[name='level-options']:checked");

/* Get the type of math buttons */
var mathTypeButton = document.getElementsByClassName("mathType-button");
var additionButton = document.getElementById("addition-Button");
var subtractionButton = document.getElementById("subtraction-Button");
var multiplicationButton = document.getElementById("multiplication-Button");
var divisionButton = document.getElementById("division-Button");

/* Call the initializeGame() method when any of the math-Type buttons are clicked.  */
/*for (var i = 0; i < mathTypeButton.length; i++) {
	//Using an inline function, pass the node down to later get its value.
	 //  Its value contains the operator for the type of math that is chosen. 

	 var selectedButton = mathTypeButton[i];
	mathTypeButton[i].addEventListener('click', function(event) {
		console.log("Swag Value: " + selectedButton.value);
		initializeGame(selectedButton);
	} //end inline (click) function
	); //end addEventListener 

	//mathTypeButton[i].addEventListener("click", initializeGame(mathTypeButton[i]), false);
} //end for loop */

additionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + additionButton.value);
		initializeGame(additionButton);
	}); //end inline (click) function

subtractionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + subtractionButton.value);
		initializeGame(subtractionButton);
	}); //end inline (click) function

multiplicationButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + multiplicationButton.value);
		initializeGame(multiplicationButton);
	}); //end inline (click) function

divisionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + divisionButton.value);
		initializeGame(divisionButton);
	}); //end inline (click) function


function initializeGame(mathTypeSpecificButton) {
	var mathTypeValue = mathTypeSpecificButton;
	console.log("A Math Type Button Was Clicked.");
    validateInputs(mathTypeValue); 
} //end initializeGame() button


/* Check to see if the player name input box is empty and/or
   a difficulty level hasn't been selected. Returns an error
   prompting the user to do select the said options.  */
function validateInputs(mathTypeSpecificButton) {
	var mathTypeSwag = mathTypeSpecificButton;
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
		var userInfo = {}; 
		userInfo.userName = playerName.value;
		userInfo.difficultyLevel =  document.querySelector('input[name="level-options"]:checked').value;
		//difficultyLevelRadioButton_Checked.value;
		userInfo.mathType = mathTypeSwag.value;

		localStorage.setItem("userInfo", JSON.stringify(userInfo) );
		window.location.pathname = "/gameRun.html";

		console.log("Math Value of button: " + mathTypeSwag.value);
		console.log(typeof mathTypeSwag.value);

		//location.href.replace(location.origin,'/gameRun.html');
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
	var diffLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
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

function returnDifficultyLevel() {
	return difficultyLevelRadioButton_Checked.value;	
}

