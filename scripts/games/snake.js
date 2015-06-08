/* Team 7: Alex Beall, Evelyn Luu, Jan Sawyer, Noel Canlas */

// This code is copied and modified from http://www.codeproject.com/Articles/230794/HTML5-Games-101-An-introductory-tutorial-to-HTML5

//global constants
var context;                // Variable to hold the entire game context

//specifying the width and height of our game area, we'll use the complete canvas in this case
var width = 300;
var height = 400;

//specify the initial game configuration
var snakeLength = 3;        // initial length of snake is set to 3
var level = 1;              // start from level 1
var sqSize = 10;            // step size is 10px. Also size of single body unit

/* *************************** 
 * specify the initial snake alignment and direction of movement
 * Snake is starts horizontal moving towards its right
 * *************************** */
var bodyX = new Array(150, 150-sqSize, 150-2*sqSize);   //array to manage X coordinates for snake body
var bodyY = new Array(200, 200, 200);                   //array to manage Y coordinates for snake body

var vX = new Array(1, 1, 1);    //array to manage horizontal velocity for snake body
var vY = new Array(0, 0, 0);    //array to manage vertical velocity for snake body

//variables used to put rats on the canvas
var rX;
var rY;

//keeping the scores
var score = 0;
var scoreDiv;                // to hold the context of div used to display score and level

var eaten = true;               // to check if new rat needs to be placed
var isPaused = false;
var gameOver = false;           // to check if the game is over and enable control to restart the game
var justStarted = true;

var controlsDiv;                // to hold the context of div used to display game controls

/* *************************** /
 * Initialize the game variables and the game context
 * and then sends the game to the main game loop
 * *************************** */
function initializeSnake()
{
	// Get game context
	context = document.getElementById("snakeCanvas").getContext("2d");
	
	//draws the canvas
	drawCanvasBoundary();
	
	//draws snake
	drawSnake();
	
	//setTimeout calls the game loop i.e. gameProcess function after the specified time
	intervalId = setTimeout(gameProcess, 1000/6);
	//clearTimeout(intervalId);
	pauseSnakeGame();
	
	
	//get handle to the div containing our score and level details
	scoreDiv = document.getElementById("scoreBoard");
	
	//get handle to the div containing prompting the user to start the game
	promptDiv = document.getElementById("gamePrompt");
	
	//specify the function to handle the keypress
	window.onkeydown = keydown;
}

/* *************************** /
 * Clears the canvas to empty for redrawing
 * not an ideal way but then this is a HTML5 Games 101
 * ************************** */
function clear()
{
	context.clearRect(0,0,width,height);
}

/* *************************** /
 * Restart the game
 * ************************** */
function restart()
{
	bodyX = new Array(150, 150-sqSize, 150-2*sqSize);
	bodyY = new Array(200, 200, 200);
	
	vX = new Array(1, 1, 1);
	vY = new Array(0, 0, 0);
	
	snakeLength = 3;
	
	score = 0;
	level  = 1;
	
	eaten = true;
	
	scoreDiv.innerHTML = "<strong>Score</strong>: " +score+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Level</strong>: "+level;
	promptDiv.innerHTML = "";
	
	clearTimeout(intervalId);
	intervalId = setTimeout(gameProcess, 1000/(6*level));
}

/* *************************** /
 * Handles keyboard events to control snake
 * It only acknowledges the arrow keys and ignores the remaining
 * Calculate the new valid direction for snake head
 * for instance - if snake is moving right, it cannot move left even if left arrow is pressed
 * ************************** */
function keydown(e)
{
	if(e.keyCode == 37 && vX[0] != 1)       //left arrow
	{
		vX[0] = -1;
		vY[0] = 0;
		e.preventDefault();
	}
	else if (e.keyCode == 38 && vY[0] != 1) //up arrow
	{
		vY[0] = -1;
		vX[0] = 0;
		e.preventDefault();
	}
	else if (e.keyCode == 39 && vX[0] != -1) //right arrow
	{
		vX[0] = 1;
		vY[0] = 0;
		e.preventDefault();
	}
	else if (e.keyCode == 40 && vY[0] != -1) //down arrow
	{
		vY[0] = 1;
		vX[0] = 0;
		e.preventDefault();
	}
	/*else if (e.keyCode == 80 && isPaused)	// p - resumes game from "pause"
	{
		isPaused = false;
		intervalId = setTimeout(gameProcess, 1000 /(6*level));
	}*/
	else if (e.keyCode == 80 /*&& !isPaused*/)	// p - pause game
	{
		pauseSnakeGame();
	}
	  else if (e.keyCode == 13 && gameOver == true)		// enter - restart game when game over
	{
		gameOver = false;
		restart();
	}
	else if (e.keyCode ==13 && justStarted) {
		justStarted = false;
		restart();
	}
}

function pauseSnakeGame() {
	if(!isPaused) {
		isPaused = true;
		intervalId = clearTimeout(intervalId);
	}
	else if (isPaused) {
		isPaused = false;
		intervalId = setTimeout(gameProcess, 1000 /(6*level));
	}
}

/* *************************** /
 * Initially it was meant to mark the canvas boundary
 * but this take the background color of the page (black for my blog) so now am filling canvas white
 * ************************** */
function drawCanvasBoundary()
{
	context.fillStyle="#FFF";           //set canvas color to be white
	context.fillRect(0,0,width,height); //draws a rectangle of canvas size filled with white color. This serves as our background
	context.fill();

	context.strokeStyle="#000";
	context.strokeRect(0,0,width,height);
}

/* *************************** /
 * Draws each body part of the snake
 * x, y = provides the body position
 * ************************** */
function drawPoint(x,y)
{
	// First draw a square for size "sqSize" filled with green
	context.fillStyle = "#609344";
	context.fillRect(x,y,sqSize, sqSize);
	context.fill();
	
	// Then draw the square boundary in white
	context.strokeStyle="#FFF";
	context.strokeRect(x,y,sqSize, sqSize);
}

// Draws the rat in a different color than the snake
function drawRatPoint(x,y)
{
	// First draw a square for size "sqSize" filled with brown
	context.fillStyle = "#312a0e";
	context.fillRect(x,y,sqSize, sqSize);
	context.fill();
	
	// Then draw the square boundary in white
	context.strokeStyle="#FFF";
	context.strokeRect(x,y,sqSize, sqSize);
}

/* *************************** /
 * Draws snake by calling the helper drawPoint function
 * ************************** */
function drawSnake()
{
	for(var i=0; i < snakeLength; i++)
		drawPoint(bodyX[i],bodyY[i]);
}

/* *************************** /
 * Checks snake colliding with the boundary walls
 * Snake can collide with itself only if its length is 5
 * else if condition checks for snake length and calls for self collision check
 * ************************** */
function checkCollision()
{
	if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height)
	{
		resetGameState();
	}
	else if(snakeLength > 4)
	{
		if(checkSelfCollision(bodyX[0],bodyY[0]))
		{
			resetGameState();
		}
	}
}

function resetGameState(){
	scoreDiv.innerHTML = "<strong>Score</strong> " +score+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Level</strong>: "+ level;
	promptDiv.innerHTML = "<strong>Game over!</strong> Press <strong>Enter/Return</strong> to restart the game."; 
	gameOver = true;
	clearTimeout(intervalId);
}

/* *************************** /
 * Iterates through all body parts starting from 5
 * and compares their x & y coordinates with that of head sent as the parameter(x & y)
 * ************************** */
function checkSelfCollision(x, y)
{
	for (var i = 4; i < snakeLength; i++)
		if(x == bodyX[i] && y == bodyY[i])
		{
			return true;
		}
	return false;
}

/* *************************** /
 * Iterates through all body parts and compares their x & y coordinates
 * with those of new Rat location sent as the parameter(x & y)
 * ************************** */
function checkFoodCollision(x, y)
{
	for (var i = 0; i < snakeLength; i++)
		if(x == bodyX[i] && y == bodyY[i])
		{
			return true;
		}
	return false;
}

/* *************************** /
 * If the rat was eaten, calculates new rat coordinates,
 * check for collision with snake body and place it on canvas
 * ************************** */
function placeRat()
{
	if(eaten)
	{
		rX = Math.floor(width*Math.random()/sqSize)*sqSize;
		rY = Math.floor(height*Math.random()/sqSize)*sqSize;
		if(checkFoodCollision(rX,rY))
			placeRat();
		else
			eaten = false;
	}
	drawRatPoint(rX, rY);
}

/* *************************** /
 * If the rat was eaten, it calculates new rat coordinates,
 * check for collision with snake body and places new rat on canvas
 * ************************** */
function moveSnake()
{
	for(var i=0; i < snakeLength; i++)
	{
		bodyX[i] += (vX[i]*sqSize);
		bodyY[i] += (vY[i]*sqSize);
	}
	
	for(var i=snakeLength-1; i>0; i--)
	{
		vX[i] = vX[i-1];
		vY[i] = vY[i-1];
	}
	eatRat();
}

/* *************************** /
 * Checks whether the head has reached the rat
 * in case its true, sets flag for calculation of new Rat location
 * and calculates and add a body part at the tail increasing the snakeLength
 * Thereafter, it increments score and check if level needs to be incremented
 * ************************** */
function eatRat()
{
	if(bodyX[0] == rX && bodyY[0] == rY)
	{
		eaten = true;
		// calculate the new X & Y location for tail
		var newX = bodyX[snakeLength-1]-vX[snakeLength-1]*sqSize;
		var newY = bodyY[snakeLength-1]-vY[snakeLength-1]*sqSize;
		
		//Add the new tail part in respective arrays
		bodyX.push(newX);
		bodyY.push(newY);
		
		//Initial velocity of the new part will be same as that of old tail
		//so just copy from last part
		vX.push(vX[snakeLength-1]);
		vY.push(vY[snakeLength-1]);

		snakeLength++;      // increment the snakelength
		
		score += 10;        // increment score
		
		// check and increment level
		if((score%100) == 0)
			level++;
		
		// update score on webpage
		scoreDiv.innerHTML = "<strong>Score</strong>: "+score+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Level</strong>: "+level;
	}
}

/* *************************** /
 * The update and draw game loop
 * ************************** */
function gameProcess()
{
	// Sets the interval for next refresh. Game level defines the rate of refresh and thereby increase speed with level
	intervalId = setTimeout(gameProcess, 1000/(6*level));   
	
	clear();
	drawCanvasBoundary();
	
	placeRat();
	
	moveSnake();
	
	checkCollision();
	
	drawSnake();
}