window.onload = function(){
	//button onclick navigate to profile.html
	document.getElementById("btn_toprofile").onclick = function(){
		location.href = "profile.html";
	}
	//button onclick navigate to index.html
	document.getElementById("btn_toindex").onclick = function(){
		location.href = "index.html";
	}
	//button onclick to clear the content
	document.getElementById("btn_cancelpost").onclick = function(){
		document.getElementById("posttext").value = "";
	}
	//button onclick to update the content
	document.getElementById("btn_headline").onclick = function(){
		var newtext;
		newtext = document.getElementById("headlinetext").value;
		document.getElementById("headline").innerHTML = newtext;
	}
}  