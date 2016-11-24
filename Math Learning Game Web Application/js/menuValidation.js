/* Get Dynamic Elements */

//Holds the input box element where the player types in his name
var playerName = document.getElementById("nameInput");
var userArray = localStorage.getItem("highscoresList");
var objArray = JSON.parse(userArray);

var difficultyLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
var difficultyLevelRadioButton_Checked = document.querySelector('input[name="level-options"]:checked');

function difficultyLevelRadioButtonChecked() {
	var difficultyLevelRadioButtonOption;
		difficultyLevelRadioButtonOption = document.querySelector('input[name="level-options"]:checked');

	return difficultyLevelRadioButtonOption;
} 

/* Get the type of math buttons */
var mathTypeButton = document.getElementsByClassName("mathType-button");
var additionButton = document.getElementById("addition-Button");
var subtractionButton = document.getElementById("subtraction-Button");
var multiplicationButton = document.getElementById("multiplication-Button");
var divisionButton = document.getElementById("division-Button");
document.getElementById("highscore-Button").addEventListener("click", function() {
	populateHighScores();
	window.location.href = "/index.html#openModal";
});
document.getElementById("main-menu-button").addEventListener("click", function() {window.location.href = "/index.html";});

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
	if (!checkPlayerName()) {
		document.getElementById("nameInput-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("nameInput-errorMessage").style.display = "none";
	} 

	if (!checkDifficultyLevel()) {
		console.log("Please choose a difficulty level");
		document.getElementById("difficultyLevel-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("difficultyLevel-errorMessage").style.display = "none";
	} 

	if (checkPlayerName() && checkDifficultyLevel()) {
		console.log("Change to gameRun");
		var userInfo = {}; 
		userInfo.userName = playerName.value;
		userInfo.difficultyLevel =  document.querySelector('input[name="level-options"]:checked').value;
		userInfo.mathType = mathTypeSwag.value;
		userInfo.time = -1;

		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		console.log("cookie = " + JSON.stringify(userInfo));
		window.location.pathname = "/gameRun.html";

		console.log("Math Value of button: " + mathTypeSwag.value);
		console.log(typeof mathTypeSwag.value);
	} 

} 

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

function returnDifficultyLevel() {
	return difficultyLevelRadioButton_Checked.value;
}

function compare(user1, user2){
    var data1 = user1.score;
    var data2 = user2.score;
    if (parseInt(data1) < parseInt(data2)) { return -1;}
    if (parseInt(data1) > parseInt(data2)) { return 1;}
    return 0;
}

function getTop10(){
	if (objArray != null){
		objArray.sort(compare);
	}
}

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
                document.getElementById(name).textContent = objArray[i].userName;
                document.getElementById(lvl).textContent = objArray[i].difficultyLevel;
                var newMathType = convertMathType(objArray[i].mathType);
                document.getElementById(type).textContent = newMathType;
                document.getElementById(time).textContent = objArray[i].time;
            }
        }
    }
}

function convertMathType(type){
	if (type == "+") { return "Addition";}
	else if (type == "-") { return "Subtraction";}
	else if (type == "*") { return "Multiplication"; }
	else { return "Division"; }
}

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