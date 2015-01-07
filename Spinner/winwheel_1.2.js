var canvasId         = "myDrawingCanvas";   // Id of the canvas element on the page the wheel is to be rendered on.
var wheelImageName   = "spinner.png";	// File name of the image for the wheel.
var spinButtonImgOn  = "spin_on.png";		// Name / path to the images for the spin button.
var spinButtonImgOff = "spin_off.png";
var theSpeed         = 20; 		 // Controls how often the spin function is called (is miliseconds value for animation timer).
var pointerAngle     = 0;  	 	 // The angle / location around the wheel where the pointer indicaing the prize is located. Can be any value you like, 0 is top (12 oclock) 180 is bottom (6 o'clock) etc.
var doPrizeDetection = true; 	 // Set to true if you want the code to detect the prize the user has won when the spinning has stopped. Prizes need to be specified in the prizes array.
var spinMode         = "random"; // Values can be: random, determinedAngle, determinedPrize.
var determinedGetUrl = "";  	 // Set to URL of the server-side process to load via ajax when spinMode is determinedAngle or determinedPrize.

var prizes = new Array();
prizes[0] = {"name" : "Conflict Between Popes and Emperors", "startAngle" : 0,   "endAngle" : 90};  // Note how prize end angle is 1 less than start angle of next prize so no overlap.
prizes[1] = {"name" : "Height of Church Power", "startAngle" : 91,  "endAngle" : 180};
prizes[2] = {"name" : "Holy Roman Empire", "startAngle" : 181,  "endAngle" : 270};
prizes[3] = {"name" : "Struggle for Italy", "startAngle" : 271, "endAngle" : 360};

var surface;		  
var wheel;			   
var angle 		 = 0; 
var targetAngle  = 0;  
var currentAngle = 0;
var power        = 0;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = ajaxCallback;

var randomLastThreshold = 150;
var spinTimer;
var wheelState = 'reset';

function begin() {
	surface = document.getElementById(canvasId);

	if (surface.getContext){
		wheel = new Image();
		wheel.onload = initialDraw;
		wheel.src = wheelImageName;
	}
}

function initialDraw(e){
	var surfaceContext = surface.getContext('2d');
	surfaceContext.drawImage(wheel, 0, 0);
}

function startSpin(determinedValue){
	
	var stopAngle = undefined;	
	
	if (spinMode == "random")
	{
		// In this mode where the wheel stops is to be random, so get a random whole number between 0 and 360 degrees.
		stopAngle = Math.floor(Math.random() * 360);
	}
	else if (spinMode == "determinedAngle")
	{
		
		if (typeof(determinedValue) === 'undefined')
		{
			
			if (determinedGetUrl)
			{
				xhr.open('GET', determinedGetUrl, true);
				xhr.send('');

			}
		}
		else
		{
			stopAngle = determinedValue;
		}
	}
	else if (spinMode == "determinedPrize")
	{	
		if (typeof(determinedValue) === 'undefined')
		{
			if (determinedGetUrl)
			{
				xhr.open('GET', determinedGetUrl, true);
				xhr.send('');
			}
		}
		else
		{
			
			stopAngle = Math.floor(prizes[determinedValue]['startAngle'] + (Math.random() * (prizes[determinedValue]['endAngle'] - prizes[determinedValue]['startAngle'])));
		}
	}
	
	
	if ((typeof(stopAngle) !== 'undefined') && (wheelState == 'reset') && (power))
	{
		stopAngle = (360 + pointerAngle) - stopAngle;
		targetAngle = (360 * (1 * 6) + stopAngle);
		randomLastThreshold = Math.floor(90 + (Math.random() * 90));
		
		document.getElementById('spin_button').src       = spinButtonImgOff;
		document.getElementById('spin_button').className = "";
	
		wheelState = 'spinning';
		doSpin();
	}
}

function ajaxCallback()
{
	if (xhr.readyState < 4)
	{
		return;
	}
	
	// Note: You might want to add some code to deal with when get error response such as notify the user to try again etc.
	if (xhr.status !== 200)
	{
		return;
	}
	
	// If code got this far we know all is well, so call startSpin function passing the response to it (which should be angle or prize).
	// If you need to pass multiple parameters back from the server site process I would look in to doing some JSON then decoding it here.
	startSpin(xhr.responseText);
}

// ==================================================================================================================================================
// This function actually rotates the image making it appear to spin, a timer calls it repeatedly to do the animation.
// The wheel rotates until the currentAngle meets the targetAngle, slowing down at certain thresholds to give a nice effect.
// ==================================================================================================================================================
function doSpin() 
{	
	// Grab the context of the canvas.
	var surfaceContext = surface.getContext('2d');

	// Save the current context - we need this so we can restore it later.
	surfaceContext.save();
	
	// Translate to the center point of our image.
	surfaceContext.translate(wheel.width * 0.5, wheel.height * 0.5);
	
	// Perform the rotation by the angle specified in the global variable (will be 0 the first time).
	surfaceContext.rotate(DegToRad(currentAngle));
	
	// Translate back to the top left of our image.
	surfaceContext.translate(-wheel.width * 0.5, -wheel.height * 0.5);
	
	// Finally we draw the rotated image on the canvas.
	surfaceContext.drawImage(wheel, 0, 0);
	
	// And restore the context ready for the next loop.
	surfaceContext.restore();

	// ------------------------------------------
	// Add angle worked out below by thresholds to the current angle as we increment the currentAngle up until the targetAngle is met.
	currentAngle += angle;
	
	// ------------------------------------------
	// If the currentAngle is less than targetAngle then we need to rotate some more, so figure out what the angle the wheel is to be rotated 
	// by next time this function is called, then set timer to call this function again in a few milliseconds.
	if (currentAngle < targetAngle)
	{
		// We can control how fast the wheel spins by setting how much is it to be rotated by each time this function is called.
		// In order to do a slowdown effect, we start with a high value when the currentAngle is further away from the target
		// and as it is with certian thresholds / ranges of the targetAngle reduce the angle rotated by - hence the slowdown effect.
		
		// The 360 * (power * 6) in the startSpin function will give the following...
		// HIGH power = 360 * (3 * 6) which is 6480
		// MED power = 360 * (2 * 6) which equals 4320
		// LOW power = 360 * (1 * 6) equals 2160.
		
		// Work out how much is remaining between the current angle and the target angle.
		var angleRemaining = (targetAngle - currentAngle);
		
		// Now use the angle remaining to set the angle rotated by each loop, reducing the amount of angle rotated by as
		// as the currentAngle gets closer to the targetangle.
		if (angleRemaining > 6480)
			angle = 55;
		else if (angleRemaining > 5000)		// NOTE: you can adjust as desired to alter the slowdown, making the stopping more gradual or more sudden.
			angle = 45;						// If you alter the forumla used to work out the targetAngle you may need to alter these.
		else if (angleRemaining > 4000)
			angle = 30;
		else if (angleRemaining > 2500)
			angle = 25;
		else if (angleRemaining > 1800)
			angle = 15;
		else if (angleRemaining > 900)
			angle = 11.25;
		else if (angleRemaining > 400)
			angle = 7.5;
		else if (angleRemaining > 220)					
			angle = 3.80;								
		else if (angleRemaining > randomLastThreshold)	
			angle = 1.90;								
		else
			angle = 1;		
							
		spinTimer = setTimeout("doSpin()", theSpeed);
	}
	else
	{
		
		wheelState = 'stopped';
		
		
		if ((doPrizeDetection) && (prizes)){
			var times360 = Math.floor(currentAngle / 360);
			var rawAngle = (currentAngle - (360 * times360));
			var relativeAngle =  Math.floor(pointerAngle - rawAngle);
			
			if (relativeAngle < 0) relativeAngle = 360 - Math.abs(relativeAngle);
			
			for (x = 0; x < (prizes.length); x ++)
			{
				if ((relativeAngle >= prizes[x]['startAngle']) && (relativeAngle <= prizes[x]['endAngle']))
				{
					
					alert("You got the catagory: " + prizes[x]['name'] + "\nClick 'Reset' to reset the spinner.");
					break;
				}
			}
		}
		
		// ADD YOUR OWN CODE HERE.
		// If no prize detection then up to you to do whatever you want when the spinning has stopped.
	}
}

// ==================================================================================================================================================
// Quick little function that converts the degrees to radians.
// ==================================================================================================================================================
function DegToRad(d) 
{
	return d * 0.0174532925199432957;
}

// ==================================================================================================================================================
// This function sets the class name of the power TDs to indicate what power has been selected, and also sets power variable used by startSpin code.
// It is called by the onClick of the power table cells on the page. 
// ==================================================================================================================================================
function powerSelected(powerLevel)
{
	// In order to stop the change of power duing the spinning, only do this if the wheel is in a reset state.
	if (wheelState == 'reset')
	{
		// Reset all to grey incase this is not the first time the user has selected the power.
		document.getElementById('pw1').className = "";
		document.getElementById('pw2').className = "";
		document.getElementById('pw3').className = "";
		
		// Now light up all cells below-and-including the one selected by changing the class.
		if (powerLevel >= 1)
			document.getElementById('pw1').className = "pw1";
			
		if (powerLevel >= 2)
			document.getElementById('pw2').className = "pw2";
			
		if (powerLevel >= 3)
			document.getElementById('pw3').className = "pw3";
		
		// Set internal power variable.
		power = powerLevel;
		
		// Light up the spin button by changing it's source image and adding a clickable class to it.
		document.getElementById('spin_button').src = spinButtonImgOn;
		document.getElementById('spin_button').className = "clickable";
	}
}

// ==================================================================================================================================================
// This function re-sets all vars as re-draws the wheel at the original position. Also re-sets the power and spin buttons on the example wheel.
// ==================================================================================================================================================
function resetWheel()
{
	// Ensure that if wheel is spining then it is stopped.
	clearTimeout(spinTimer);
	
	// Re-set all vars to do with spinning angles.
	angle 		 = 0;
	targetAngle  = 0;
	currentAngle = 0;
	power        = 0;
	
	// Update styels of power buttons so they appear grey again.
	document.getElementById('pw1').className = "";
	document.getElementById('pw2').className = "";
	document.getElementById('pw3').className = "";
	
	// Make spin button disabled again until power is selected.
	document.getElementById('spin_button').src       = spinButtonImgOff;
	document.getElementById('spin_button').className = "";
	
	// Set back to reset so that power selection and click of Spin button work again.
	wheelState = 'reset';
	
	// Call function to draw wheel in start-up poistion.
	initialDraw();
}