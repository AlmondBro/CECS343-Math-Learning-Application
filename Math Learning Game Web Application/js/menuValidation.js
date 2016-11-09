/* Get Dynamic Elements */

//Holds the input box element where the player types in his name
var playerName = document.getElementById("nameInput");

//Get the the option chosen for the diffulty level
var difficultyLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
//document.querySelector("input[name='level-options']");
var difficultyLevelRadioButton_Checked = difficultyLevelRadioButtonChecked();

//document.querySelector("input[name='level-options']:checked"


function difficultyLevelRadioButtonChecked() {
	var difficultyLevelRadioButtonOption;
	if (checkDifficultyLevel() == false) {
		difficultyLevelRadioButtonOption = document.forms["difficultyLevelForm"]["level-options"][Math.floor(Math.random() * 4 )];
	} //end if-statement

	else if (checkDifficultyLevel() == true) {
		difficultyLevelRadioButtonOption = document.forms["difficultyLevelForm"]["level-options"].checked;
	} //end else-statement

	return difficultyLevelRadioButtonOption;
} //end difficultyLevelRadioButtonChecked() function

//var difficultyLevelRadioButton = document.querySelector("input[name='level-options']:checked");

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
		window.location.pathname = "/gameRun.html";
		//location.href.replace(location.origin,'/gameRun.html')
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
	var difficultyLevelNumber;
	if (difficultyLevelRadioButton_Checked.value == 1) {
		difficultyLevelNumber = 1;
	} //end if-statement

	if (difficultyLevelRadioButton_Checked.value == 2) {
		difficultyLevelNumber = 2;
	} //end if-statement

	if (difficultyLevelRadioButton_Checked.value == 3) {
		difficultyLevelNumber = 3;
	} //end if-statement

	if (difficultyLevelRadioButton_Checked.value == 4) {
		difficultyLevelNumber = 4;
	} //end if-statement

	if (difficultyLevelRadioButton_Checked.value == 5) {
		difficultyLevelNumber = 5;
	} //end if-statement
	return difficultyLevelNumber;
}

//var difficultyLevel = returnDifficultyLevel();
var difficultyLevel = 3;