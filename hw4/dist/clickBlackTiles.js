//array of tiles
var tiles = [];
//timer for displaying tiles 
var timer;
//record of score, increased by one everytime a black tile is clicked
var score = 0;
//static base speed for the tiles rolling down
var basefactor = 4;
//current spped for the tiles rolling down
var factor = basefactor;
//left spacing for the canvas
var leftspacing = 300;
//top spacing for the canvas
var topspacing = 50;
//width of tile
var tilewidth = 100;
//height of tile
var tileheight = 150; 

'use strict'

window.onload = function (){
	//initialize 20 tiles in 5 rows and 4 columns
	initialTiles();
	//start the game
	start();
	//response for restart click
	document.getElementById("restart").onclick = function(){
		//hide the restart button
		document.getElementById("restart").style = "display : none "
		//clear tiles
		tiles = [];
		//initialize 20 tiles in 5 rows and 4 columns
		initialTiles();
		//reset the score
		score = 0;
		//reset current speed
		factor = basefactor;
		//reset the display of score;
		document.getElementById("score").innerHTML = score;
		//reset the dispaly of level;
		document.getElementById("level").innerHTML = 1;
		//restart the game
		start();
	}
}

function start() {
	//keeprunning method will be executed every 20 millisec
	timer = setInterval(keeprunning,20);


	function keeprunning(){
		//reponse to tile click event
		window.onmousedown = function(event){
		response(event);
		}

		//print the tiles
		var app = createApp(document.querySelector("canvas"))

		//roll down the tiles and deal with tiles that cross the border of canvas
		//check whether a black tiles is missed, i.e a black tile has not been clicked and is outside of border
		circulate(document.querySelector("canvas"));
	}
}

//initialize  20 tiles in 5 rows and 4 columns
function initialTiles(){
	var row;
	var col;
	//generate 4 rows of white tiles so that the player can have time to move the mouse at the beginning
	for( col = 0; col < 4 ; col++){
		for( row = 0; row < 4 ; row++){
			tiles.push({x:row*tilewidth, y:col*tileheight, column:row+1, color:"white"});
		}
	}

	//generate a row with 4 tiles(one is black and the others are white)
	var chooseBlack = Math.floor(Math.random()*4);
	for(row = 0; row < 4; row++){
		if(row == chooseBlack){
			tiles.push({x:row*tilewidth, y:-1*tileheight, column:row+1, color:"black"});
		}
		else{
			tiles.push({x:row*tilewidth, y:-1*tileheight, column:row+1, color:"white"});
		}
	}
}

//print the tiles in canvas and check whether the click is legal
var createApp = function(canvas) { 

	var c = canvas.getContext("2d");
	//clear previous painting
	c.clearRect(0, 0, canvas.width, canvas.height);
	// spacing for tiles
	var rowSpacing = 1, columnSpacing = 1

	tiles.forEach(function(value){
			c.fillStyle = value.color;
			c.fillRect(value.x, value.y, tilewidth-rowSpacing, tileheight-columnSpacing);
		})
	//check whether the click is legal, i.e check whether there is red tiles(when white tiles 
	//are clicked, their color will be switched to red to indicated an illegal click)
	checkClick(c);
}

//response to the mouse click 
function response(event){
  //gain the x and y coordinates of the click position
  xmouse=event.clientX
  ymouse=event.clientY
  tiles.forEach(function(value){
  	//decide which tile has been clicked
  	if(xmouse >= value.x + leftspacing && xmouse <= value.x + tilewidth + leftspacing
  		&& ymouse >= value.y +topspacing && ymouse <= value.y + tileheight + topspacing){
  		//if the clicked tile is white, change it to red to indicate invalid click
  		if(value.color=="white"){
  			value.color = "red";
  		}

  		//if the clicked tile is black, change it to grey to show the black tile has already been clicked
  		//increase score by 1
  		//set the current speed. The spped will increased by 1 everytime 10 tiles are clicked correctly
  		//set the display of score and level
  		else if(value.color == "black"){
  			value.color = "grey";
  			score++;
  			factor = basefactor + Math.floor(score/10);  
  			document.getElementById("score").innerHTML = score;
  			document.getElementById("level").innerHTML = (Math.floor(score/10)+1);
  		}
   	}
  })
 }

//roll down the tiles and deal wit tiles that cross the border of canvas. 
//check whether a black tiles is missed, i.e a black tile has not been clicked and is outside of border
function circulate(canvas){
//randomly select a tile in the row to be black. Only used for the row that is ourside of the border
var chooseBlack = Math.floor(Math.random()*4)+1;

tiles.forEach(function(value){

	//the tiles that is outside of the border
	if(value.y>=canvas.height){
		//move the row of tiles at the bottom to the top(beyond the border and will be rolled down and displayed in the canvas)
		value.y = value.y - canvas.height - tileheight + factor;
		//if a black tile is missed
		if(value.color == "black"){
			//alert the game over message
			setTimeout("alert('Miss Black Tile!Game Over')", 40);
			//stop the game
			clearInterval(timer);
			//show the restart button
			document.getElementById("restart").style = "";
		}
		//set one tile to be black and the others to be white
		if(value.column == chooseBlack){
			value.color = "black";
		}
		else{
			value.color = "white";
		}
	}

	//tiles that are inside of the canvas
	else{
		//roll down the tiles by speed factor
		value.y+= factor;
	}
});
}

//check whether the click is legal, i.e check whether there is red tiles(when white tiles 
//are clicked, their color will be switched to red to indicated an illegal click)
function checkClick(c){
	tiles.forEach(function(value){
		if(value.color == "red"){
			//display the red tile
			c.fillStyle = value.color;
			c.fillRect(value.x, value.y, tilewidth, tileheight);
			//alert the game over massage 
			setTimeout("alert('Click White Tile!Game Over')", 40);
			//stop the game
			clearInterval(timer);
			//show the restart button
			document.getElementById("restart").style = "";
		}	
	});

}




