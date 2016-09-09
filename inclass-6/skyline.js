var buildings = new Array(); //store the building
var life = 0; //incharge of the movement of sun and car

//create sun object
var Sun = {
	x: 40,
	y: 75,
	radius: 30, 
	color:"red",
	sAngle: 0,
	eAngle: Math.PI*2,
	clockwise: true
}

//create car object
var Car = {
	x:0,
	y:0,
	width:60,
	height:40,
	color:"black"
}

'use strict'
var createApp = function(canvas) { 

	var c = canvas.getContext("2d");
	//clear previous painting
	c.clearRect(0, 0, canvas.width, canvas.height);

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		buildings.push({x:x0, y:floor-blgHeight, width:blgWidth, height:blgHeight, style:c.fillStyle})
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				var a = Math.floor(Math.random()*2);
				if(a==1)
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	//move forward 10 every second
	life+=10;

	//draw a sun firstly
	c.fillStyle = Sun.color;
	c.beginPath();
	c.arc(Sun.x+life%canvas.width, Sun.y, Sun.radius, Sun.sAngle, Sun.eAngle, Sun.clockwise); 
	c.closePath();
	c.fill();

	//draw buildings
	buildings.forEach(function(value){
		c.fillStyle = value.style;
		c.fillRect(value.x, value.y, value.width, value.height)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - value.height; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < value.width - windowWidth; x += windowSpacing + windowWidth) {
				//random window close and open
				var a = Math.floor(Math.random()*2);
				if(a==1)
				c.fillRect(value.x + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	})

	//draw a car
	Car.y = floor - Car.height;
	c.fillStyle = Car.color;
	c.fillRect(Car.x+life%canvas.width, Car.y, Car.width, Car.height); 



	return {
		build: build
	}
}

window.onload = function() {
	//the canvas will update every 1 second
	var timer = setInterval(keeprunning,1000);

	//this method keeprunning() will be executed every 1 second
	function keeprunning(){
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	}
	window.onclick = function(event){
		increaseheight(event);
	}
}

//increase the height of the buildings once they are clicked
function increaseheight(event)
  {
  //gain the x and y coordinates of the click position
  xmouse=event.clientX
  ymouse=event.clientY

  //increase the height of building
  buildings.forEach(function(value){
  	if(xmouse>=value.x && xmouse<=value.x+value.width && ymouse>=value.y && ymouse<=value.y+value.height){
  		//make sure the building does not exceed the window
  		if(value.y-20>0){
  		value.y-=20;
  		value.height+=20;
  		}
  	}
  })
  }
