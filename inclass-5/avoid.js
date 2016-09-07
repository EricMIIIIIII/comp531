var xwidth = window.innerWidth; 
var yheight = window.innerHeight;
var flag = true;
var flagclicked = false;


function generateRandomPosition(){
	if(flag==true){
	var abutton = document.getElementById("id_button");
	var buttonwidth = abutton.offsetWidth;
	var buttonheight = abutton.offsetHeight;
	var randomX = Math.floor(Math.random()*(xwidth-buttonwidth));
	var randomY = Math.floor(Math.random()*(yheight-buttonheight));
	abutton.setAttribute("style","position:absolute;"),
	abutton.style.left = randomX + "px";
	abutton.style.top = randomY + "px";
	}
}

window.onload = function() {

var button=document.getElementById("id_button");
button.onmouseover = function() {
generateRandomPosition();
}

var submitbutton = document.getElementById("id_button");
submitbutton.onclick = function(){
	if(submitbutton.value == "Click Me"){
		flag = false;
		flagclicked = true;
		document.getElementById("announcement").style = "";
		submitbutton.value = "Play Again";
	}
	else if(submitbutton.value == "Play Again"){
		document.getElementById("announcement").style = "display: none";
		submitbutton.value = "Click Me";
		flag = true;
		flagclicked = false;
		generateRandomPosition();
	}
}
}

window.onkeydown = function(event){
	if(!flagclicked){
    	if(event.shiftKey) {
        flag = false;
    	}
    }
}

window.onkeyup = function(){
	if(!flagclicked){
	flag = true;
	}
}



