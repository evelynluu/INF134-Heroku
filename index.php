<!DOCTYPE HTML>
<html>
	<head>   
	
		<title>Start. Work. Break.</title>
		
		<link href="styles/style.css" type="text/css" rel="stylesheet" />
		
	</head>
	<body>
				
		<div id="header">
			<button id="header-startBtn" onclick="showAbout('start')">Start.</button>
			<button id="header-workBtn" onclick="showAbout('work')">Work.</button>
			<button id="header-breakBtn" onclick="showAbout('break')">Break.</button>
		</div>
		
		<div id="container" class="startContainer" onload="workTimer.js">
			<table id="timerTable">
				<form id="timerForm">
					<!-- Work Timer Dropdown -->
					<tr>
						<td colspan="2"><h2>Set Work Timer:</h2></td>
						
						<td colspan="2">
							<select name="workDuration" class="timerSelect">
								<option value="1">1</option> <!-- For demo-ing purposes -->
								<option value="15">15</option>
								<option value="30">30</option>
							</select>
						</td>
						
						<td><p>minutes</p></td>
					</tr>
					<!-- Break Timer Dropdown -->
					<tr>
						<td colspan="2"><h2>Set Break Timer:</h2></td>
						
						<td colspan="2">
							<select name="breakDuration" class="timerSelect">
								<option value="1">1</option> <!-- For demo-ing purposes -->
								<option value="5">5</option>
								<option value="10">10</option>
							</select>
						</td>
						
						<td><p>minutes</p></td>
					</tr>
					<!-- Start Button -->
					<tr>
						<td colspan="6" style="text-align:center; padding-top: 0.5em;">
							<button id="workTimerBtn" onclick="startWorkTimer()">Start</button>
						</td>
					</tr>
				</form>
			</table>
		</div>
		
		<script type="text/javascript" src="scripts/about.js"></script>
		<script type="text/javascript" src="scripts/countdownTimer.js"></script>
		<script type="text/javascript" src="scripts/workTimer.js"></script>
	</body>
</html>