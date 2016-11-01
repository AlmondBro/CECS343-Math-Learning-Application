/*** === TIMER JAVASCRIPT CODE === ***/
if (document.location == "/gameRun.html") {
	window.onload = function () {
    	timer();
	}
}

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
