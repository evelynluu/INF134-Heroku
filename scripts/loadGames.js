
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
	prompt.innerHTML = "Control Snake: UP, DOWN, LEFT, RIGHT <br/> Space = Pause<br/> Shift = Play";
	
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
	prompt.innerHTML = "Use directional arrow keys to play.";
	
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
		
		keydown(80);
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
	
	var controlText = "Press <strong>p</strong> to <strong>Pause</strong> and <strong>Resume</strong> the game."+
								"<br/>Press <strong>Enter/Return</strong> to <strong>Restart</strong> the game.";

	var instrText = instrHeader + "<p class=\"alertBox\">" + instr + "<br/><br/>" + controlText + "</p>";
	
	//alertify.alert(boxText);
	
	alertify.confirm(instrText, function(e){
		if(e){
			pauseGameForInstructions(game);
		}
		else{
			pauseGameForInstructions(game);
		}
	});
}

function pauseGameForInstructions(game){
	if(game === "snake"){
		keydown(80);
		isPaused = false;
		intervalId = setTimeout(gameProcess, 1000 /(6*level));
	}
	else if(game === "tetris"){
		gamePaused = true;
		pauseGame();
	}
}

// *************************
//          Helper Functions
// *************************

function createScoreBoard(){
	var score = createDiv("scoreBoard", "gameScore");
	score.innerHTML = "Score: 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Level: 1";
	
	return score;
}

function createGameCanvas(id){
	var canvas = document.createElement('canvas');
	canvas.id = id;
	canvas.className = "gameCanvas";
	canvas.setAttribute("width", "300px");
	canvas.setAttribute("height", "400px");
	
	return canvas;
}

function createGamePrompt(){
	var div = createDiv("gamePrompt", "");
	return div;
}

function appendGameElements(div){
	div.appendChild(scoreBoard);
	div.appendChild(prompt);
	div.appendChild(gameCanvas);
	div.appendChild(instrBtn);
}