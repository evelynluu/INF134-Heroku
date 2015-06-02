var headerDiv = document.getElementById("header");
var headerBtns = [document.getElementById("header-startBtn"),
						    document.getElementById("header-workBtn"), 
						    document.getElementById("header-breakBtn")];

var containerDiv = document.getElementById("container");
var timerForm = document.getElementById("timerForm");

var timerDiv = document.createElement('div');
	   timerDiv.id = "timerDiv";
	   
var timer;

var breakDuration;
	   
// Timer functions
	   
function startWorkTimer(){
	
	workDuration = timerForm.workDuration.value;
	breakDuration = timerForm.breakDuration.value;
	
	// Removes current page elements: headerDiv buttons + timerTable + timerForm
	removeFormElements();
	
	addWorkTimerElements(workDuration);
	
	var workSeconds = workDuration * 60;
	startWorkCountdown(workSeconds);
}

function removeFormElements(){
	
	removeHeaderBtns();
	
	// Remove the form and then the table
	var timerTable = document.getElementById("timerTable");
	timerTable.removeChild(timerForm);
	containerDiv.removeChild(timerTable);
}	

function addWorkTimerElements(timerDuration){
	// Add "Work Timer" header to headerDiv
	addHeaderText("workTimerHeader", "Work Timer");
	
	// Add timer numbers aka timerDiv to containerDiv
	// Inputs: outerDiv, outerDivStyle, duration
	addTimerClock(timerDiv, timerDuration, containerDiv, 'timerContainer');
	
	// Add "remaining" text
	var paragraph = document.createElement('p');
	paragraph.innerHTML = "remaining";
	containerDiv.appendChild(paragraph);
	
	// Add "Pause" button
	var pauseBtn = createButton("pauseBtn", "pauseWorkTimer()", "Pause");
	
	// Add "Reset" button
	var resetBtn = createButton("resetBtn", "resetWindow()", "Reset");
	
	// Put the two buttons into a row
	var timerBtnsDiv = createBtnRow("timerBtnsContainer", pauseBtn, resetBtn);
	containerDiv.appendChild(timerBtnsDiv);
}

function startWorkCountdown(seconds){
	
	timer = new CountDownTimer(seconds);
	timer.onTick(formatTimer(timerDiv)).onTick(breakTime).start();
	
	function breakTime() {
        if (this.expired()) {
            startBreakTimer();
        }
    }
}

function pauseWorkTimer(){
	
	timer.pause();

	// Change the "Pause" button to a "Resume" button
	var resumeBtn = document.getElementById('pauseBtn');
	resumeBtn.id = "resumeBtn";
	resumeBtn.setAttribute("onclick", "resumeWorkTimer()");
	resumeBtn.innerHTML = "Resume";
}

function resumeWorkTimer(){
	
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

function startBreakTimer(){
	
	removeHeaderText();
	insertHeaderBtns();
	enableHeaderBtns();
	removeAllFromDiv(containerDiv);
	
	containerDiv.innerHTML = "<p>Break Time! Please select a game to play:</p>";
	
	addTimerClock(timerDiv, breakDuration, containerDiv, 'timerContainer');
	
	loadGameMenu(containerDiv);
	
	var time = breakDuration * 60;
	startBreakCountdown(time);
}

function startBreakCountdown(seconds){

	var bTimer = new CountDownTimer(seconds);
	bTimer.onTick(formatTimer(timerDiv)).onTick(workTime).start();
	
	function workTime() {
        if (this.expired()) {
            window.location.href = 'index.php';
        }
    }
}

// Game functions

function loadGameMenu(gameContainer){
	var snakeBtn = createButton("snakeBtn", "playSnake()", "Snake");
	var tetrisBtn = createButton("tetrisBtn", "playTetris()", "Tetris");
	
	//var gameBtnsRow = createBtnRow("gameBtnsRow", snakeBtn, tetrisBtn);
	var gameBtnsRow = createBtnRow("timerBtnsContainer", snakeBtn, tetrisBtn);
	
	gameContainer.appendChild(gameBtnsRow);
}

function playSnake(){
	removeAllFromDiv(containerDiv);
	container.innerHTML = "<h1>Snake</h1><br/><img src=\"images/snake.jpg\"/>";
	
}

function playTetris(){
	removeAllFromDiv(containerDiv);
	container.innerHTML = "<h1>Tetris</h1><br/><img src=\"images/tetris.jpg\"/>";
}

// General helper functions

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

function createButton(id, clickFunction, value){
	var button = document.createElement('button');
	button.id = id;
	button.setAttribute("onclick", clickFunction);
	button.innerHTML = value;
	
	return button;
}

function createBtnRow(rowID, button1, button2){
	var rowDiv = document.createElement('div');
	rowDiv.id = rowID;
	
	/* for(var i = 0; i < btnList.length; i++)
	{
		rowDiv.appendChild(btnList[i]);
	} */
	rowDiv.appendChild(button1);
	rowDiv.appendChild(button2);
	
	return rowDiv;
}

function removeAllFromDiv(container){
	
	while(container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

function resetWindow(){
	window.location.href = 'index.php';
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