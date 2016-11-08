/*** === TIMER JAVASCRIPT CODE === ***/
if (window.location.pathname == "/gameRun.html") {
	window.onload = function () {
    	timer();
    	//var randomNumbers = generateTwoRandomNumbers(difficultyLevel)
    	//document.getElementById("generatedQuestion").textContent = getEquation(randomNumbers);
    	//ajaxCall();
	} //end window.onload function
}  //end if-statement

var difficultyLevel = 2;	

var timeLeft = 30;
var secondsElapsed = 0;
var counter = setInterval(timer, 1000); //1000ms, so will run it every 1 second
var userAnswer = document.getElementById("answerInputInputBox");


var randomNumbers = generateTwoRandomNumbers(difficultyLevel);
var correctAnswer = randomNumbers[0] + randomNumbers[1]; 


function timer() {
  timeLeft = timeLeft-1;
  secondsElapsed = secondsElapsed + 1;
  if (timeLeft <= 0) {
     clearInterval(counter);
     //counter ended, do something here
     return;
  } //end if-statement

 document.getElementById("secondsLeft").textContent = timeLeft + " secs" + "\n" + "secondsElasped: " + secondsElapsed;
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
	var correctAnswer;
	switch (mathType) {
		case "+":
			correctAnswer = number1 + number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			if (userAnswer == correctAnswer) {
				return true;
			} else {
				return false;
			} //end else statement
			break;
		case "-":
			correctAnswer = number1 - number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			if (userAnswer == correctAnswer) {
				return true;
			} else {
				return false;
			} //end else statement
			break;
		case "*":
			correctAnswer = number1 * number2;
			console.log("Correct Answer: " + correctAnswer + "\n");
			if (userAnswer == correctAnswer) {
				return true;
			} else {
				return false;
			} //end else statement
			break;
		case "/":
			correctAnswer = Math.round(number1 / number2);
			console.log("Correct Answer: " + correctAnswer + "\n");
			if (userAnswer == correctAnswer) {
				return true;
			} else {
				return false;
			} //end else statement
			//isUserCorrect = ((Math.round(answer * 100) / 100) == userAnswer);
			break;
		//default:
		//	return false;
	} //end switch statement
	//return isUserCorrect;
} //end userAnswerChecker(number1, number2, mathType, userAnswer) function

function answerResult(number1, number2, mathType, userAnswer) {
	userAnswerChecker(number1, number2, mathType, userAnswer);
	if (userAnswerChecker(number1, number2, mathType, userAnswer) == true) {
		console.log("Answer correct" + "\n" + "-----------------------------");
	} //end if-statement
	else {
		console.log("Wrong answer" + "\n" + "-----------------------------");
	} //end if-statement
}

function getEquation(twoNumbers) {
	currentEquation = twoNumbers[0] + " " + /*getMathType()*/"+" + " " + twoNumbers[1] + "    = ";
	return currentEquation;
} //end getEquation() method

function runActualGame() {
	console.log("Running actual game");
	console.log("Difficulty Level: " + difficultyLevel);
	
	var twoNumbers = generateTwoRandomNumbers(difficultyLevel);
	document.getElementById("generatedQuestion").textContent = getEquation(twoNumbers);
	if (document.getElementById("generatedQuestion").textContent == "") {
		document.getElementById("generatedQuestion").textContent = getEquation(twoNumbers);
	} //end if-statement 

	//answerResult(twoNumbers[0], twoNumbers[1], "+", userAnswer.value);
	//document.getElementById("generatedQuestion").textContent = getEquation(twoNumbers);
	if (userAnswer.value != "") {
		answerResult(twoNumbers[0], twoNumbers[1], "+", userAnswer.value);
		userAnswer.value = "";
		document.getElementById("generatedQuestion").textContent = getEquation(twoNumbers);
	} //end if-satement */ 
}  //end runActualGame(difficultyLevel, mathType)

//Get the submit button element and save it as a variable
document.getElementById("submitAnswer-Button").addEventListener("click", ajaxCall);


function ajaxCall() {
    var request;
    if (window.XMLHttpRequest) { //Mozilla, Safari, IE7+...
        request = new XMLHttpRequest();
    } else { //IE6 & older 
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('POST', 'gameRun.html', true);
    request.onreadystatechange = function() {
        //Check state of request and HTTP status code the response
        if ((request.readyState === 4) && (request.status === 200)) {
            console.log(request);
            //var randomNumbers = generateTwoRandomNumbers(difficultyLevel);
            runActualGame();
           // var modify = getElementById('update');
            //modify.innerHTML = request.responseText;
            //or if using XML, use: request.responseXML
        }
    }
    request.send();
} //end ajaxCall() function 
