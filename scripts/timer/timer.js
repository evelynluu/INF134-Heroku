
// Functions for the work and break timer

var timerForm = document.getElementById("timerForm");

var timerDiv = createDiv("timerDiv", "");
	   
var timer, breakDuration;
	   
// ***************
//     Work Timer
// ***************

function startWorkTimer(){
	
	var workDuration = timerForm.workDuration.value;
	breakDuration = timerForm.breakDuration.value;
	
	removeHeaderBtns();
	
	// Remove the timerForm and then the timerTable
	var timerTable = document.getElementById("timerTable");
	timerTable.removeChild(timerForm);
	containerDiv.removeChild(timerTable);
	
	addWorkTimerElements(workDuration);
	
	var workSeconds = workDuration * 60;
	startWorkCountdown(workSeconds);
}

function addWorkTimerElements(timerDuration){
	// Add "Work Timer" header to headerDiv
	addHeaderText("workTimerHeader", "Work Timer");
	
	// Add timer numbers aka timerDiv to containerDiv
	// Inputs: outerDiv, outerDivStyle, duration
	addTimerClock(timerDiv, timerDuration, containerDiv, 'container');
	
	// Add "remaining" text
	var paragraph = document.createElement('p');
	paragraph.innerHTML = "remaining";
	containerDiv.appendChild(paragraph);
	
	// Add "Pause" button
	var pauseBtn = createButton("pauseBtn", "pauseWorkTimer()", "Pause");
	
	// Add "Reset" button
	var resetBtn = createButton("resetBtn", "resetWindow()", "Reset");
	
	// Put the two buttons into a row
	var timerBtnsDiv = createBtnRow("timerBtnsContainer", "buttonRowContainer", pauseBtn, resetBtn);
	containerDiv.appendChild(timerBtnsDiv);
}

function startWorkCountdown(seconds){
	
	timer = new CountDownTimer(seconds);
	timer.onTick(formatTimer(timerDiv)).onTick(breakTime).start();
	
	function breakTime() {
        if (this.expired()) {
			
			alert("Attention please!");
			
			var alertText ="<span class=\"paraHeader\">Time for a break!</span>"+
									"<p class=\"timerAlertBox\">"+
										"Click <strong>OK</strong> to start your break."+
										"<br/> Click <strong>Cancel</strong> to start a new work timer."+
									"</p>";
			
			alertify.confirm(alertText, function(e){
				if(e){
					startBreakTimer();
				}
				else{
					resetWindow();
				}
			});
        }
    }
}

function pauseWorkTimer(){
	
	// Stops focus on the "Pause" button
	document.getElementById('pauseBtn').blur();
	
	timer.pause();

	// Change the "Pause" button to a "Resume" button
	var resumeBtn = document.getElementById('pauseBtn');
	resumeBtn.id = "resumeBtn";
	resumeBtn.setAttribute("onclick", "resumeWorkTimer()");
	resumeBtn.innerHTML = "Resume";
}

function resumeWorkTimer(){
	
	// Stops focus on the "Resume" button
	document.getElementById('resumeBtn').blur();
	
	// Setting up the resume functionality
	var timeStr = timerDiv.innerHTML;
	var minStr = timeStr.slice(0, 2);
	var secStr = timeStr.slice(3, 5);
	var min = parseInt(minStr);
	var sec = parseInt(secStr);
	
	// Restart the timer from the time we paused it
	sec = min*60 + sec;
	
	startWorkCountdown(sec);
	
	// Change the "Resume" button to a "Pause" button
	pauseBtn = document.getElementById('resumeBtn');
	pauseBtn.id = "pauseBtn";
	pauseBtn.setAttribute("onclick", "pauseWorkTimer()");
	pauseBtn.innerHTML = "Pause";
}

/* ***************
      Break Timer
	  
	"Rest" = "Break"
 *************** */

function startBreakTimer(){
	
	removeHeaderText();
	removeAllFromDiv(containerDiv);
	
	addHeaderText("breakTimerHeader", "Rest Timer");
		
	addTimerClock(timerDiv, breakDuration, containerDiv, 'container');
	
	var gamePrompt = document.createElement('p');
	gamePrompt.id = "selectGamePrompt";
	gamePrompt.innerHTML = "<p>Please select a game to play:</p>";
	containerDiv.appendChild(gamePrompt);
	
	loadGameMenu(containerDiv);
	
	var time = breakDuration * 60;
	startBreakCountdown(time);
}

function startBreakCountdown(seconds){

	var bTimer = new CountDownTimer(seconds);
	bTimer.onTick(formatTimer(timerDiv)).onTick(workTime).start();
	
	function workTime() {
        if (this.expired()) {
            resetWindow();
        }
    }
}

// *****************
//    Helper Functions
// *****************

function addTimerClock(clockDiv, duration, outerDiv, outerDivStyle){
	if(duration < 10)
	{
		clockDiv.innerHTML = "0" + duration + ":00";
	}
	else
	{
		clockDiv.innerHTML = duration + ":00";
	}
	outerDiv.className = outerDivStyle;
	outerDiv.appendChild(clockDiv);
}

function formatTimer(display){
	return function(minutes, seconds){
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.innerHTML = minutes + ':' + seconds;
	};
}