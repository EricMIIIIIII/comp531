window.onload = function(){
	//the array for each images in a card 
	var images1 = ["image/img1.jpg","image/img2.jpg","image/img3.jpg"]
	var images2 = ["image/img4.jpg","image/img5.jpg","image/img6.jpg"]
	var images3 = ["image/img7.jpg","image/img8.jpg","image/img9.jpg"]
	var images4 = ["image/img10.jpg","image/img11.jpg","image/img12.jpg"]
	var images5 = ["image/img13.jpg","image/img14.jpg","image/img15.jpg"]
	var images6 = ["image/img16.jpg","image/img17.jpg","image/img18.jpg"]
	//id_pos stands for the index of images in the array
	var id_pos1 = 0;
	var id_pos2 = 0;
	var id_pos3 = 0;
	var id_pos4 = 0;
	var id_pos5 = 0;
	var id_pos6 = 0;
	//picture element reference
	var pos1 = document.getElementById("pos1");
	var pos2 = document.getElementById("pos2");
	var pos3 = document.getElementById("pos3");
	var pos4 = document.getElementById("pos4");
	var pos5 = document.getElementById("pos5");
	var pos6 = document.getElementById("pos6");
	//interval for each card that contains an image
	var timer1 = setInterval(function(){
		pos1.src = images1[id_pos1++ % images1.length]
	},random_interval("interval1"));
	var timer2 = setInterval(function(){
		pos2.src = images2[id_pos2++ % images2.length]
	},random_interval("interval2"));
	var timer3 = setInterval(function(){
		pos3.src = images3[id_pos3++ % images3.length]
	},random_interval("interval3"));
	var timer4 = setInterval(function(){
		pos4.src = images4[id_pos4++ % images4.length]
	},random_interval("interval4"));
	var timer5 = setInterval(function(){
		pos5.src = images5[id_pos5++ % images5.length]
	},random_interval("interval5"));
	var timer6 = setInterval(function(){
		pos6.src = images6[id_pos6++ % images6.length]
	},random_interval("interval6"));
	//set response to button click
	document.getElementById("btn_img1").onclick = function() {button_response("btn_img1","1")};
	document.getElementById("btn_img2").onclick = function() {button_response("btn_img2","2")};
	document.getElementById("btn_img3").onclick = function() {button_response("btn_img3","3")};
	document.getElementById("btn_img4").onclick = function() {button_response("btn_img4","4")};
	document.getElementById("btn_img5").onclick = function() {button_response("btn_img5","5")};
	document.getElementById("btn_img6").onclick = function() {button_response("btn_img6","6")};

	//button clicked response
	function button_response(button, buttoninfo){
		var operation = document.getElementById(button).innerHTML;

		if(operation=="stop"){
			if(buttoninfo==1) clearInterval(timer1);
			else if(buttoninfo==2) clearInterval(timer2);
			else if(buttoninfo==3) clearInterval(timer3);
			else if(buttoninfo==4) clearInterval(timer4);
			else if(buttoninfo==5) clearInterval(timer5);
			else if(buttoninfo==6) clearInterval(timer6);
			document.getElementById(button).innerHTML = "start";
		}
		else if(operation=="start"){
			if(buttoninfo==1) timer1 = setInterval(function(){
				pos1.src = images1[id_pos1++ % images1.length]
			},random_interval("interval1"));

			else if(buttoninfo==2) timer2 = setInterval(function(){
				pos2.src = images2[id_pos2++ % images2.length]
			},random_interval("interval2"));

			else if(buttoninfo==3) timer3 = setInterval(function(){
				pos3.src = images3[id_pos3++ % images3.length]
			},random_interval("interval3"));

			else if(buttoninfo==4) timer4 = setInterval(function(){
				pos4.src = images4[id_pos4++ % images4.length]
			},random_interval("interval4"));

			else if(buttoninfo==5) timer5 = setInterval(function(){
				pos5.src = images5[id_pos5++ % images5.length]
			},random_interval("interval5"));

			else if(buttoninfo==6) timer6 = setInterval(function(){
				pos6.src = images6[id_pos6++ % images6.length]
			},random_interval("interval6"));

			document.getElementById(button).innerHTML = "stop";
		}

	}

	//set the navigation
	document.getElementById("btn_toprofile").onclick = function(){
		location.href="profile.html";
	}
}

//return the time delay
function random_interval(text){
	var time = Math.floor(Math.random()*5+1)*1000;
	document.getElementById(text).innerHTML = time/1000 + " seconds";
	return time;
}

