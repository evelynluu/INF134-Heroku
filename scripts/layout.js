/* Team 7: Alex Beall, Evelyn Luu, Jan Sawyer, Noel Canlas */

// Functions for manipulating the DOM: buttons, resetting, headerDiv

var headerDiv = document.getElementById("header");
var headerBtns = [document.getElementById("header-startBtn"),
						    document.getElementById("header-workBtn"), 
						    document.getElementById("header-breakBtn")];

var containerDiv = document.getElementById("bodyContainer");


// ***********************
//        Create Elements
// ***********************

function createDiv(id, style){
	var div = document.createElement('div');
	div.id = id;
	div.className = style;
	
	return div;
}

// ***********************
//   General Button functions
// ***********************

function createButton(id, clickFunction, value){
	var button = document.createElement('button');
	button.id = id;
	button.setAttribute("onclick", clickFunction);
	button.innerHTML = value;
	
	return button;
}

function createBtnRow(rowID, rowClass, button1, button2){
	var rowDiv = createDiv(rowID, rowClass);
	
	/* for(var i = 0; i < btnList.length; i++)
	{
		rowDiv.appendChild(btnList[i]);
	} */
	rowDiv.appendChild(button1);
	rowDiv.appendChild(button2);
	
	return rowDiv;
}

// ********************
//       Reset functions
// ********************

function removeAllFromDiv(div){
	
	while(div.firstChild) {
		div.removeChild(div.firstChild);
	}
}

function resetWindow(){
	window.location.href = 'index.php';
}

// ********************
//   HeaderDiv functions
// ********************

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

// Add the headerBtns back to the headerDiv
function insertHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerDiv.appendChild(headerBtns[i]);
	}
}

// Enable the headerDiv buttons so that user can click on them
function enableHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerBtns[i].disabled = false;
		headerBtns[i].className='';
	}
}

// Remove the headerBtns from the headerDiv
function removeHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerDiv.removeChild(headerBtns[i]);
	}
}

// Disable the headerDiv buttons so that user can't click on them
function disableHeaderBtns(){
	for(var i = 0; i < headerBtns.length; i++)
	{
		headerBtns[i].disabled = true;
		headerBtns[i].className='disabled';
	}
}