<!-- Home page BEFORE login -->

<html>
	<head>   
		<link rel="stylesheet" type="text/css" href="styles/index.css" />
		<link rel="stylesheet" type="text/css" href="styles/calendar.css" />
	</head>
	
	<body>
		<!-- Login text boxes,  "Login" button, "Sign Up" button-->
		<table id="navigation">
		<tr>
			<form id="login-box" onsubmit="loginUser()">
				<td><label id="username-label" for="username">Username:</label></td>
				<td><input id="username-box" type="text" name="username" size="20"/></td>
					
				<td><label id="password-label" for="password">Password:</label></td>
				<td><input  id="password-box" type="password" name="password" size="15"/></td>
					
				<td><input id="login-btn" type="submit" value="Login"/></td>
			</form>
				<td><input id="register-btn" type="button" onclick="registerUser()" value="Sign Up"/></td>
		</tr>
		</table>
		
		<div id="content">
			<!-- http://codepen.io/cssjockey/pen/jGzuK -->
			<div id="tabs-container">
				<div id="calendar-tab" class="tabs">Calendar</div>
				<div id="chart-tab" class="tabs">Stress Chart</div>
			</div>
			
			<div class="clear"></div>
				
				<?php
					include 'calendar.php';
 
					$calendar = new Calendar();
 
					echo $calendar->show();
				?>
		</div>
	</body>
</html>