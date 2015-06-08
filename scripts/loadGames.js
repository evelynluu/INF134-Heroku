/* Team 7: Alex Beall, Evelyn Luu, Jan Sawyer, Noel Canlas */

// Functions for calling games during the break

var gameCanvas, instrBtn;
var scoreBoard = createScoreBoard();
var prompt = createGamePrompt();

// Called from timer.js when the break timer starts
function loadGameMenu(gameContainer){
	var snakeBtn = createButton("snakeBtn", "playSnake()", "Snake");
	var tetrisBtn = createButton("tetrisBtn", "playTetris()", "Tetris");
	
	var gameBtnsRow = createBtnRow("gameBtnsContainer", "buttonRowContainer", snakeBtn, tetrisBtn);
	
	gameContainer.appendChild(gameBtnsRow);
}

function playSnake(){
	removeAllFromDiv(headerDiv);
	removeAllFromDiv(containerDiv);
	
	document.title = "Start. Work. Snake!";
	addHeaderText("snakeHeader", "Snake");
	
	instrBtn = createInstructionsBtn("snake");
	gameCanvas = createGameCanvas("snakeCanvas");

	appendGameElements(containerDiv);
	
	initializeSnake();
}

function playTetris(){
	removeAllFromDiv(headerDiv);
	removeAllFromDiv(containerDiv);
	
	document.title = "Start. Work. Tetris!";
	addHeaderText("tetrisHeader", "Tetris");
	
	instrBtn = createInstructionsBtn("tetris");
	gameCanvas = createGameCanvas("tetrisCanvas");
	
	appendGameElements(containerDiv);
	
	document.body.setAttribute("onkeydown", "keyDown(event)");
	
	initializeTetris();
}

// *************************
//      Instructions Alert Box
// *************************

function createInstructionsBtn(game){
	var button = createButton("instructionsBtn", "showInstructions('" + game + "');", "Instructions");
	button.className = "instructionsBtn";
	return button;
}

function showInstructions(game){
	
	// Stops focus on the "Instructions" button
	document.getElementById('instructionsBtn').blur();
	
	var instrHeader = "<span class=\"paraHeader\">Game Instructions</span>";
									
	if(game === "snake"){
		
		isPaused = true;
		intervalId = clearTimeout(intervalId);
		
		var instr = "Use directional arrow keys to move the snake: <strong>UP</strong>, <strong>DOWN</strong>, <strong>LEFT</strong>, <strong>RIGHT</strong>.";
	}
	else if(game === "tetris") {
		
		gamePaused = false;
		pauseGame();
		
		var instr = "Use directional arrow keys to move the tetriminos:"+
						 "<br/><strong>UP</strong> = Rotate."+
						 "<br/><strong>DOWN</strong> = Move down faster."+
						 "<br/><strong>LEFT</strong> = Move left."+ 
						 "<br/><strong>RIGHT</strong> = Move right."+
						 "<br/><br/>Press <strong>spacebar</strong> to place object automatically to the bottom.";
	}
	
	var controlText = "Press <strong>p</strong> to <strong>Pause</strong> and <strong>Resume</strong> the game.";

	var instrText = instrHeader + "<p class=\"alertBox\">" + instr + "<br/><br/>" + controlText + "</p>";
	
	alertify.confirm(instrText, function(e){
		if(e){
			//resumeGameAfterInstructions(game);
		}
		else{
			//resumeGameAfterInstructions(game);
		}
	});
}

function resumeGameAfterInstructions(game){
	if(game === "snake" && gameOver == false){
		isPaused = false;
		intervalId = setTimeout(gameProcess, 1000 /(6*level));
	}
	else if(game === "tetris" && justStarted == false){
		gamePaused = true;
		pauseGame();
	}
}

// *************************
//          Helper Functions
// *************************

function createScoreBoard(){
	var score = createDiv("scoreBoard", "gameScoreContainer");
	score.innerHTML = "<strong>Score</strong>: 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Level</strong>: 1";
	
	return score;
}

function createGamePrompt(){
	var div = createDiv("gamePrompt", "gamePromptContainer");
	div.innerHTML = "Press <strong>Enter/Return</strong> to start the game.";
	return div;
}

function createGameCanvas(id){
	var canvas = document.createElement('canvas');
	canvas.id = id;
	canvas.className = "gameCanvas";
	canvas.setAttribute("width", "300px");
	canvas.setAttribute("height", "400px");
	
	return canvas;
}

function appendGameElements(div){
	div.appendChild(instrBtn);
	div.appendChild(scoreBoard);
	div.appendChild(prompt);
	div.appendChild(gameCanvas);
	
	var clearDiv = createDiv("", "clear");
	div.appendChild(clearDiv);
}