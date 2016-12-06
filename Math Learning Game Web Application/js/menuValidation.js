//CECS 343 Math WebApp Game
/* Get Dynamic Elements */
/*Holds the input box element where the player types in his name*/
var playerName = document.getElementById("nameInput");
/*Holds the list of high scores */
var userArray = localStorage.getItem("highscoresList");
/*Instantiates an object by parsing*/
var objArray = JSON.parse(userArray);
/*Instantiates a radio button variable for the set difficulty.*/
var difficultyLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
/* Stores the users level input into a variable. */
var difficultyLevelRadioButton_Checked = document.querySelector('input[name="level-options"]:checked');
/*
*@return the difficulty that was selected by user is returned
*/
function difficultyLevelRadioButtonChecked() {
	var difficultyLevelRadioButtonOption;
		difficultyLevelRadioButtonOption = document.querySelector('input[name="level-options"]:checked');

	return difficultyLevelRadioButtonOption;
} 

/* Get the type of math buttons */
var mathTypeButton = document.getElementsByClassName("mathType-button");
/*Get the addition button*/
var additionButton = document.getElementById("addition-Button");
/*Get the subtraction button*/
var subtractionButton = document.getElementById("subtraction-Button");
/*Get the multiplication button*/
var multiplicationButton = document.getElementById("multiplication-Button");
/*Get the division button*/
var divisionButton = document.getElementById("division-Button");
/*Added an action listener for the high scores implemtation*/
document.getElementById("highscore-Button").addEventListener("click", function() {
	populateHighScores();
	window.location.href = "/index.html#openModal";
});
/*Added the action listener for the main menu button*/
document.getElementById("main-menu-button").addEventListener("click", function() {window.location.href = "/index.html";});
/*Added a listener for the addition button. By clicking on the desired math type, it passes the math chosen*/
additionButton.addEventListener('click', function(event) {
		console.log("Operator Value: " + additionButton.value);
        initializeGame(additionButton);
	}); //end inline (click) function
/*Action Listener for the subtraction button*/ 
subtractionButton.addEventListener('click', function(event) {
		console.log("Operator Value: " + subtractionButton.value);
		initializeGame(subtractionButton);
	}); //end inline (click) function
/*Action Listener for the multiplication button*/
multiplicationButton.addEventListener('click', function(event) {
		console.log("Operator Value: " + multiplicationButton.value);
		initializeGame(multiplicationButton);
	}); //end inline (click) function
/*Added an action listener for the division button*/
divisionButton.addEventListener('click', function(event) {
		console.log("Operator Value: " + divisionButton.value);
		initializeGame(divisionButton);
	}); //end inline (click) function

/* Based upon the math type that was clicked on, the variable is passed in and will initialize the game
   There is also a check to see if other parameters have been met */
function initializeGame(mathTypeSpecificButton) {
	var mathTypeValue = mathTypeSpecificButton;
	console.log("A Math Type Button Was Clicked.");
    validateInputs(mathTypeValue); 
}


/* Check to see if the player name input box is empty and/or
   a difficulty level hasn't been selected. Returns an error
   prompting the user to do select the said options.  */
function validateInputs(mathTypeSpecificButton) {
	//Sets the math type chose to the following variable
	var mathTypeOperator = mathTypeSpecificButton;
	//Tests to see if the Players name has been filled out. If so, displays an error message
	if (!checkPlayerName()) {
		document.getElementById("nameInput-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("nameInput-errorMessage").style.display = "none";
	} 
	//Checks to see if the difficulty has been chosen, otherwise displays an error message.
	if (!checkDifficultyLevel()) {
		console.log("Please choose a difficulty level");
		document.getElementById("difficultyLevel-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("difficultyLevel-errorMessage").style.display = "none";
	} 
	//If both the conditions are met then the game will run. 
	if (checkPlayerName() && checkDifficultyLevel()) {
		console.log("Change to gameRun");
		var userInfo = {}; 
		//Sets the appropiate variables to the users choices
		userInfo.userName = playerName.value;
		userInfo.difficultyLevel =  document.querySelector('input[name="level-options"]:checked').value;
		userInfo.mathType = mathTypeOperator.value;
		userInfo.time = -1;

		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		console.log("cookie = " + JSON.stringify(userInfo));
		window.location.pathname = "/gameRun.html";

		console.log("Math Value of button: " + mathTypeOperator.value);
		console.log(typeof mathTypeOperator.value);
	} 

} 
/* Checks the validity of the players name. If it is blank or null it will 
   return a false */
function checkPlayerName() {
	if (playerName.value == "" || playerName.value === null || 
		playerName.value.length == 0 || isEmpty(playerName.value) == true ) {
		return false;
	} 
	if (playerName.value !== "" || playerName.value !== null || 
		playerName.value.length != 0 || isEmpty(playerName.value) == false ) {
		return true;
	} 
}

/* Checks to see if there is whitespace in an element
   like an input field. Returns true if the field is empty.
*/
function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; 
} 

/* Checks if a difficulty level has been selected or not. */
function checkDifficultyLevel() {
	var diffLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
	var diffLevelFormLength = diffLevelRadioButton.length;
	var levelChosen = null;
	//Loops through the different difficulty levels
	for (var i = 0; i < diffLevelFormLength; i++) {
		if (diffLevelRadioButton[i].checked) {
			levelChosen = diffLevelRadioButton[i].value;
		} 
	} 
	
	if (levelChosen == null) {
		return false;
	} 

	else {
		return true;
	} 
} 
/* Returns the difficulty of the level */
function returnDifficultyLevel() {
	return difficultyLevelRadioButton_Checked.value;
}
/*compares scores of users*/
function compare(user1, user2){
    var data1 = user1.score;
    var data2 = user2.score;
    if (parseInt(data1) < parseInt(data2)) { return -1;}
    if (parseInt(data1) > parseInt(data2)) { return 1;}
    return 0;
}
/*Gets the top ten scores and sorts them in rank.*/
function getTop10(){
	if (objArray != null){
		objArray.sort(compare);
	}
}
/*Fills out the list of highscores with the list of the top ten user scores*/
function populateHighScores() {
    getTop10();
    if (objArray != null) {
        for (var i = 0; i < objArray.length; i++) {
            if (i == 10) {
                return; }
            if (objArray[i] != null) {
                var name = "user-name" + i;
                var lvl = "user-lvl" + i;
                var type = "user-type" + i;
                var time = "user-time" + i;
                var username = objArray[i].userName;
                document.getElementById(name).textContent = username.length > 9 ? username.substring(0,8)+"..." : username;
                document.getElementById(lvl).textContent = objArray[i].difficultyLevel;
                var newMathType = convertMathType(objArray[i].mathType);
                document.getElementById(type).textContent = newMathType;
                document.getElementById(time).textContent = objArray[i].time;
            }
        }
    }
}
/* Based on the operator that is chosen,returns the string of the math type */
function convertMathType(type){
	if (type == "+") { return "Addition";}
	else if (type == "-") { return "Subtraction";}
	else if (type == "*") { return "Multiplication"; }
	else { return "Division"; }
}

/* Polyfill for Internet Explorer 8 to support the faster textContent property. 
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