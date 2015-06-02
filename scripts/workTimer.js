var headerDiv = document.getElementById("header");
var headerBtns = [document.getElementById("header-startBtn"),
						  document.getElementById("header-workBtn"), 
						  document.getElementById("header-breakBtn")];

var containerDiv = document.getElementById("container");
var timerForm = document.getElementById("timerForm");

var workDuration, breakDuration;
var pauseBtn, resetBtn, resumeBtn;

var timerDiv = document.createElement('div');
	   timerDiv.id = "timerDiv";

function startWorkTimer(){
	
	workDuration = timerForm.workDuration.value;
	breakDuration = timerForm.breakDuration.value;
	
	// Removes current page elements: headerDiv buttons + timerTable + timerForm
	removeFormElements();
	
	addWorkTimerElements();
	
	var workSeconds = workDuration * 60;
	startWorkCountdown(workSeconds);
}

function startBreakTimer(){
	
	removeHeaderText();
	insertHeaderBtns();
	enableHeaderBtns();
	
	// Remove everything from the container div
	while(containerDiv.firstChild)
	{
		containerDiv.removeChild(containerDiv.firstChild);
	}
	
	containerDiv.innerHTML = "<p>Break Time!</p>";
}

function removeFormElements(){
	
	removeHeaderBtns();
	
	// Remove the form and then the table
	var timerTable = document.getElementById("timerTable");
	timerTable.removeChild(timerForm);
	containerDiv.removeChild(timerTable);
}	

function addWorkTimerElements(){
	// Add "Work Timer" header to headerDiv
	addHeaderText("workTimerHeader", "Work Timer");
	
	// Add timer numbers aka timerDiv to containerDiv
	// Inputs: outerDiv, outerDivStyle, duration
	addTimerClock(containerDiv, 'timerContainer', workDuration);
	
	// Add "remaining" text
	var paragraph = document.createElement('p');
	paragraph.innerHTML = "remaining";
	containerDiv.appendChild(paragraph);
	
	// Add "Pause" button
	pauseBtn = createPauseBtn("pauseWorkTimer()");
	
	// Add "Reset" button
	resetBtn = createResetBtn();
	
	// Put the two buttons into a row
	var timerBtnsDiv = document.createElement('div');
	timerBtnsDiv.id = "timerBtnsContainer";
	timerBtnsDiv.appendChild(pauseBtn);
	timerBtnsDiv.appendChild(resetBtn);
	containerDiv.appendChild(timerBtnsDiv);
}

var timerInterval;
var testCount = 0;

function startWorkCountdown(seconds){
	
	timerInterval = setInterval(function () {
       
	   if (seconds === 0) {
            clearInterval(timerInterval);
           
			startBreakTimer();
        }
	   
        var minutes = Math.floor(seconds / 60);
        
		var minutesToShow = minutes.toString();
		var secondsToShow = (seconds - minutes * 60).toString();
		
		if(minutesToShow.length === 1){
			minutesToShow = "0" + minutesToShow;
		}
		
        if (secondsToShow.length === 1) {
            secondsToShow = "0" + secondsToShow; // if the number of seconds is '5' for example, make sure that it is shown as '05'
        }
 
        timerDiv.innerHTML = minutesToShow + ":" + secondsToShow;
		
		// ensures that the timer is subtracting seconds consistently
		testCount++;
		if(testCount % 10 == 0){
			seconds--;	
		}		
    }, 100);
}

function pauseWorkTimer(){
	
	clearInterval(timerInterval);
	
	// Create "Resume" button
	resumeBtn = document.getElementById('pauseBtn');
	resumeBtn.id = "resumeBtn";
	resumeBtn.setAttribute("onclick", "resumeWorkTimer()");
	resumeBtn.innerHTML = "Resume";
}

function resumeWorkTimer(){
	
	var timeStr = timerDiv.innerHTML;
	var minStr = timeStr.slice(0, 2);
	var secStr = timeStr.slice(3, 5);
	var min = parseInt(minStr);
	var sec = parseInt(secStr);
	
	sec = min*60 + sec;
	
	startWorkCountdown(sec);
	
	pauseBtn = document.getElementById('resumeBtn');
	pauseBtn.id = "pauseBtn";
	pauseBtn.setAttribute("onclick", "pauseWorkTimer()");
	pauseBtn.innerHTML = "Pause";
}

// General helper functions

function addTimerClock(outerDiv, outerDivStyle, duration){
	if(duration < 10)
	{
		timerDiv.innerHTML = "0" + duration + ":00";
	}
	else
	{
		timerDiv.innerHTML = duration + ":00";
	}
	outerDiv.className = outerDivStyle;
	outerDiv.appendChild(timerDiv);
}

function createPauseBtn(clickFunction){
	var button = document.createElement('button');
	button.id = "pauseBtn";
	button.setAttribute("onclick", clickFunction);
	button.innerHTML = "Pause";
	
	return button;
}

function createResetBtn(){
	var button = document.createElement('button');
	button.id = "resetBtn";
	button.setAttribute("onclick", "resetWindow()");
	button.innerHTML = "Reset";
	
	return button;
}

function resetWindow(){
	window.location.href = 'index.html';
}

// Helper functions related to the headerDiv

function addHeaderText(id, text){
	var headText = document.createElement('h1');
	headText.id = id;
	headText.innerHTML = text;
	headerDiv.appendChild(headText);
}

function removeHeaderText(){
	var headText = headerDiv.getElementsByTagName('h1')[0];
	headerDiv.removeChild(headText);
}

/* Disable the headerDiv buttons so that user can't click on them */
function disableHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerBtns[i].disabled = true;
		headerBtns[i].className='disabled';
	}
}

/* Enable the headerDiv buttons so that user can click on them */
function enableHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerBtns[i].disabled = false;
		headerBtns[i].className='';
	}
}

/* Remove the headerBtns from the headerDiv */
function removeHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerDiv.removeChild(headerBtns[i]);
	}
}

/* Add the headerBtns back to the headerDiv */
function insertHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerDiv.appendChild(headerBtns[i]);
	}
}