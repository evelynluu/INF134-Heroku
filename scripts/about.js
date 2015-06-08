/* Team 7: Alex Beall, Evelyn Luu, Jan Sawyer, Noel Canlas */

// Shows the description paragraph when user clicks on a button in the headerDiv

// Uses variables and functions from layout.js
function showAbout(button){
	
	removeAllFromDiv(containerDiv);
	
	var paragraph = document.createElement('p');
	paragraph.setAttribute("class", "infoParagraph");
	
	containerDiv.appendChild(paragraph);
	containerDiv.className="startContainer";
	
	if(button === "start"){
		resetWindow();
	}
	else if(button === "work"){
		// Stops focus on the "Work" button
		document.getElementById('header-workBtn').blur();
		
		paragraph.id = "workParagraph";
		paragraph.innerHTML = "The goal of this project is to promote the pomodoro technique. The pomodoro technique is a work process that involves focusing on one task in intervals ranging from 15 to 30 minutes long while taking 5- or 10-minute breaks at the end of each work period. This time-boxed reward mechanism allows someone to work in small bursts and recharge or renew their focus in between."
											+ "<br/><br/>"
											+ "We have included a timer that allows users to work in 15 or 30 minute time intervals, as these have generally been accepted to be appropriate blocks. The user also has the option of taking a 5- or 10-minute break. At the end of the work block timer, the user will be presented with a couple of games that they may choose to play during their allotted break time.";
	}
	else if(button === "break"){
		// Stops focus on the "Break" button
		document.getElementById('header-breakBtn').blur();
		
		paragraph.id = "breakParagraph";
		paragraph.innerHTML = "<span id=\"tetrisHeader\" class=\"paraHeader\">Tetris</span>"
											+ "<br/>"
											+ "The objective of Tetris is to create a horizontal line of ten units without gaps by strategically rearranging falling tetriminos under a limited time. Once the horizontal line is created, it is eliminated and all other remnants above it fall down to the current height. As the games progresses, the tetriminos begin to fall faster and the game is finished when the stack of tetriminos reaches the top. Players use the directional arrow keys to rotate and move the tetriminos."
											+ "<br/><br/>"
											+ "<span id=\"snakeHeader\" class=\"paraHeader\">Snake</span>"
											+ "<br/>"
											+ "Snake is a game in which you control the constantly-moving snake to collect rats and grow with every bite! For every 10 rats, the snake will move faster across the field. Be careful though! Make sure not to run into yourself or hit any walls! ";
	}
	else
	{
		alert("Error with showing: " + button);
	}
}