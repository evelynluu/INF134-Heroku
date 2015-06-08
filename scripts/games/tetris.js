/* Team 7: Alex Beall, Evelyn Luu, Jan Sawyer, Noel Canlas */

// This code is copied and modified from www.drewbuck.com/2013/03/tetris-in-html5-for-noobs-part-1-introduction/

//Global variables

var ctx;        //Canvas object
var width, height;		// Canvas width and height
 
var t;          //Tetrimino type
var x, y;       //Tetrimino position
var o;          //Tetrimino orientation

var grid;	//Game state grid
var gridWidth, gridHeight;	// Game state grid height and width
 
var tetrisTimer;	//Game timer

var score;	//Player's score
var level;	//Current level
var timestep;	//Time between calls to gameStep()	

var gamePaused = false;
var justStarted = true;
var gameOver = false;

var promptDiv;

/************************************************
Allows the user to pause the game.
************************************************/

function pauseGame() {
	if(!gamePaused)
	{
		tetrisTimer = clearInterval(tetrisTimer);
		gamePaused = true;
	} else if(gamePaused)
	{
		tetrisTimer = setInterval(function(){gameStep()}, timestep);
		gamePaused = false;
	}
}


/************************************************
Allows the user to restart the game.
************************************************/

function restartGame() {
	promptDiv.innerHTML = "";
	drawTetrimino(x,y,t,o,0);  
	drawGrid();
	initializeTetris();
}


/************************************************
Initialize the drawing canvas
************************************************/
function initializeTetris() {
  
	//Get the canvas context object from the body
	c = document.getElementById("tetrisCanvas");
	ctx = c.getContext("2d");
	
	width = c.width;
	height = c.height;
	
	gridWidth = width/20;
	gridHeight = height/20;
	
	//Initialize tetrimino variables
	t = 1 + Math.floor((Math.random()*7));
	x = 4;
	y = 18;
	o = 0;
	
	//Create an empty game state grid
	grid = new Array(gridHeight);
	for(i = 0; i < gridHeight; i++) {
		grid[i] = new Array(gridWidth);
		for(j = 0; j < gridWidth; j++)
			grid[i][j] = 0;
	}
	
	//Redraw the grid
	drawGrid();
	
	score = 0;
	level = 1;
	timestep = 1000;
	
	promptDiv = document.getElementById("gamePrompt");
	
	//Start the game timer
	clearInterval(tetrisTimer);
	tetrisTimer = setInterval(function(){gameStep()}, timestep);
	
	if(justStarted){
		pauseGame();
	}
	
	//Draw the current tetrimino
	drawTetrimino(x,y,t,o,1);
}


/************************************************
Draws the current game state grid
************************************************/
function drawGrid() {
	
	//Clear the canvas
	ctx.clearRect(0,0,width,height);
	
	//Loop over each grid cell
	for(i = 0; i < gridHeight; i++) {
		for(j = 0; j < gridWidth; j++)
			drawBlock(j, i, grid[i][j]);
	}
}
 
 
/************************************************
Draws a block at the specified game coordinate
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [0,7]   block type
************************************************/
function drawBlock(x, y, t) {
	
	//Check if a block needs to be drawn
	if(t > 0) {
	
		//Get the block color
		var c;
		if(t == 1)		//I type
			c = 180;	//Cyan
		else if(t == 2)	//J type
			c = 240;	//Blue
		else if(t == 3)	//L type
			c = 40;		//Orange
		else if(t == 4)	//O type
			c = 60;		//Yellow
		else if(t == 5) //S type
			c = 120;	//Green
		else if(t == 6) //T type
			c = 280;	//Purple
		else			//Z type
			c = 0;		//Red
	
		//Convert game coordinates to pixel coordinates
		pixelX = x*gridHeight;
		pixelY = ((gridHeight-1)-y)*gridHeight;
		  
		 
		/**** Draw the center part of the block ****/
		  
		//Set the fill color using the supplied color
		ctx.fillStyle = "hsl(" + c + ",100%,50%)";
		  
		//Create a filled rectangle
		ctx.fillRect(pixelX+2,pixelY+2,16,16);
		
		
		/**** Draw the top part of the block ****/
		  
		//Set the fill color slightly lighter
		ctx.fillStyle = "hsl(" + c + ",100%,70%)";
		  
		//Create the top polygon and fill it
		ctx.beginPath();
		ctx.moveTo(pixelX,pixelY);
		ctx.lineTo(pixelX+gridHeight,pixelY);
		var pixelXBite = gridHeight-2;	// 18 if gridHeight = 20
		ctx.lineTo(pixelX+pixelXBite,pixelY+2);
		ctx.lineTo(pixelX+2,pixelY+2);
		ctx.fill();
		  
		  
		/**** Draw the sides of the block ****/
		  
		//Set the fill color slightly darker
		ctx.fillStyle = "hsl(" + c + ",100%,40%)";
		  
		//Create the left polygon and fill it
		ctx.beginPath();
		ctx.moveTo(pixelX,pixelY);
		ctx.lineTo(pixelX,pixelY+gridHeight);
		ctx.lineTo(pixelX+2,pixelY+pixelXBite);	// See above
		ctx.lineTo(pixelX+2,pixelY+2);
		ctx.fill();
		  
		//Create the right polygon and fill it
		ctx.beginPath();
		ctx.moveTo(pixelX+gridHeight,pixelY);
		ctx.lineTo(pixelX+gridHeight,pixelY+gridHeight);
		ctx.lineTo(pixelX+pixelXBite,pixelY+pixelXBite);
		ctx.lineTo(pixelX+pixelXBite,pixelY+2);
		ctx.fill();
		  
		  
		/**** Draw the bottom part of the block ****/
		  
		//Set the fill color much darker
		ctx.fillStyle = "hsl(" + c + ",100%,30%)";
		  
		//Create the bottom polygon and fill it
		ctx.beginPath();
		ctx.moveTo(pixelX,pixelY+gridHeight);
		ctx.lineTo(pixelX+gridHeight,pixelY+gridHeight);
		ctx.lineTo(pixelX+pixelXBite,pixelY+pixelXBite);
		ctx.lineTo(pixelX+2,pixelY+pixelXBite);
		ctx.fill();
	}
}
  
  
/*************************************************
Draws a tetrimino at the specified game coordinate
with the specified orientation
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [1,7]   tetrimino type
o = [0,3]   orientation
d = [-1,1]	test, erase, or draw
*************************************************/
function drawTetrimino(x,y,t,o,d) {

	//Determine the value to send to setGrid
	c = -1;
	if(d >= 0) c = t*d;
	
	//Initialize validity test
	valid = true;

	/**** Pick the appropriate tetrimino type ****/
	if(t == 1) { //I Type
		  
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x+2,y,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x+1,y+1,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x+1,y-1,c);
			valid = valid && setGrid(x+1,y-2,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y-1,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x+1,y-1,c);
			valid = valid && setGrid(x+2,y-1,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x,y-2,c);
		}
	}
	if(t == 2) { //J Type
		  
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y+1,c);
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x+1,y+1,c);
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x+1,y-1,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x-1,y-1,c);
		}
	}
	if(t == 3) { //L Type
		  
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x+1,y+1,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x+1,y-1,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y-1,c);
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x-1,y+1,c);
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
		}
	}
	if(t == 4) { //O Type
		  
		//Orientation doesn’t matter
		valid = valid && setGrid(x,y,c);
		valid = valid && setGrid(x+1,y,c);
		valid = valid && setGrid(x,y+1,c);
		valid = valid && setGrid(x+1,y+1,c);
	}
	if(t == 5) { //S Type
		 
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x+1,y+1,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x+1,y-1,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y-1,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x-1,y+1,c);
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
		}
	}
	if(t == 6) { //T Type
		  
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x,y+1,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x+1,y,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x,y-1,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x-1,y,c);
		}
	}
	if(t == 7) { //Z Type
		  
		//Get orientation
		if(o == 0) {
			valid = valid && setGrid(x-1,y+1,c);
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x+1,y,c);
		}
		else if(o == 1) {
			valid = valid && setGrid(x+1,y+1,c);
			valid = valid && setGrid(x+1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
		}
		else if(o == 2) {
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x,y-1,c);
			valid = valid && setGrid(x+1,y-1,c);
		}
		else if(o == 3) {
			valid = valid && setGrid(x,y+1,c);
			valid = valid && setGrid(x,y,c);
			valid = valid && setGrid(x-1,y,c);
			valid = valid && setGrid(x-1,y-1,c);
		}
	}
	
	return valid;
}

 
/*************************************************
Sets a grid cell in the game state grid
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [-1,7]  test or block type
*************************************************/
function setGrid(x, y, t) {
	
	//Check if point is in range
	if(x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
		
		//Return test result if testing
		if(t < 0) return grid[y][x] == 0;
		
		//Otherwise assign block type to the grid
		grid[y][x] = t;
		return true;
	}
	return false;
}
 
 
/*************************************************
Responds to a key press event
*************************************************/
function keyDown(e) {
	
	if(e.keyCode == 37) { //Left arrow
		if(gamePaused === true){
			return false;
		} 
		else{
			drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
			x2 = x - 1;
			if(drawTetrimino(x2,y,t,o,-1)){ //Check if valid
				x = x2;
			}
		}
	}
	else if(e.keyCode == 38) { //Up arrow
		if(gamePaused === true){
			return false;
		}
		else{
			drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
			o2 = (o + 1) % 4;
			if(drawTetrimino(x,y,t,o2,-1)){ //Check if valid
				o = o2;
			}
		}
	}
	else if(e.keyCode == 39) { //Right arrow
		if(gamePaused === true){
			return false;
		} 
		else{
			drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
			x2 = x + 1;
			if(drawTetrimino(x2,y,t,o,-1)){ //Check if valid
				x = x2;
			}
		}
	}
	else if(e.keyCode == 40) { //Down arrow
		if(gamePaused === true){
			return false;
		} 
		else{
			drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
			y2 = y - 1;
			if(drawTetrimino(x,y2,t,o,-1)){ //Check if valid
				y = y2;
			}
		}
	}
	else if(e.keyCode == 32) { //Space-bar
		if(gamePaused === true){
			return false;
		} 
		else{
			drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
			
			//Move down until invalid
			while(drawTetrimino(x,y-1,t,o,-1)){
				y -= 1;
			}
			gameStep();
		}
	}
	else if(e.keyCode == 80) { // Changing game state for pause
		if(justStarted){
			return;
		} 
		else {
			pauseGame();
		}
	}
	else if(e.keyCode == 13) { //Restart
		if(gamePaused && justStarted){
			pauseGame();
			justStarted = false;
			restartGame();
		}
		else if(gamePaused || !gameOver){
			return false;
		} 
		else{
			restartGame();
		}
	}
	 
	//Draw the current tetrimino
	drawTetrimino(x,y,t,o,1);
	
	//Redraw the grid
	drawGrid();
}


/*************************************************
Updates the game state at regular intervals
*************************************************/
function gameStep() {

	//Erase the current tetrimino
	drawTetrimino(x,y,t,o,0);  
	
	//Check if the tetrimino can be dropped 1 block
	y2 = y - 1;
	if(drawTetrimino(x,y2,t,o,-1))
		y = y2;
	else {
	
		//Redraw last tetrimino
		drawTetrimino(x,y,t,o,1);
	
		//Check if any lines are complete
		checkLines();
	
		//Create a new tetrimino 
		t2 = 1 + Math.floor((Math.random()*7));
		x2 = 4;
		y2 = 18;
		o2 = 0;
		
		//Check if valid
		if(drawTetrimino(x2,y2,t2,o2,-1)) {
			t = t2;
			x = x2;
			y = y2;
			o = o2;
		} 
		else {
			promptDiv.innerHTML = "<strong>Game over!</strong> Press <strong>Enter/Return</strong> to restart the game."; 
			//initializeTetris();
			gameOver = true;
			return;
		}
		
	}
	
	//Draw the current tetrimino
	drawTetrimino(x,y,t,o,1);
	
	//Redraw the grid
	drawGrid();
}


/*************************************************
Removes completed lines from the grid
*************************************************/
function checkLines() {

	//Loop over each line in the grid
	for(i = 0; i < gridHeight; i++) {
	
		//Check if the line is full
		full = true;
		for(j = 0; j < gridWidth; j++)
			full = full && (grid[i][j] > 0);
			
		if(full) {
		
			//Update score
			score++;
			
			//Check if ready for the next level
			if(score >= level*10) {
				level++;
				
				//Update the timer with a shorter timestep
				timestep *= 0.8;
				clearInterval(tetrisTimer);
				tetrisTimer = setInterval(function(){gameStep()}, timestep);
			}
		
			//Update score and level display
			document.getElementById("scoreBoard").innerHTML = "<strong>Score</strong>: " + score + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Level</strong>: " + level;
		
			var gridHeightInside = gridHeight - 1;
			
			//Loop over the remaining lines
			for(ii = i; ii < gridHeightInside; ii++) {
				
				//Copy each line from the line above
				for(j = 0; j < gridWidth; j++)
					grid[ii][j] = grid[ii+1][j];
			}
			
			//Make sure the top line is clear
			for(j = 0; j < gridWidth; j++)
				grid[gridHeightInside][j] = 0;
				
			//Repeat the check for this line
			i--;
		}
	}
}