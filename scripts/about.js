function showAbout(button){

	var divContainer = document.getElementById("container");
	
	while(divContainer.firstChild)
	{
		divContainer.removeChild(divContainer.firstChild);
	}
	
	var paragraph = document.createElement('p');
	paragraph.setAttribute("class", "infoParagraph");
	
	divContainer.appendChild(paragraph);
	divContainer.className="startContainer";
	
	if(button == "start")
	{
		document.location.reload(true);
	}
	else if(button == "work")
	{
		paragraph.id = "workParagraph";
		paragraph.innerHTML = "Blah Blah work <a href=\"tetris.html\">tetris</a> <br/> <a href=\"snake.html\">snake</a>";
	}
	else if(button == "break")
	{
		
		paragraph.id = "breakParagraph";
		paragraph.innerHTML = "Blah Blah break";
	}
	else
	{
		alert("Error with showing: " + button);
	}
}