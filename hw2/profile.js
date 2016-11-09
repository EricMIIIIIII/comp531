//var submitbutton = document.getElementById("id_submit"); //get the submit button element
var validstr = "";  //wrong input alert
var updatestr = "Update Infomation:\n";  //update alert
var validflag = true; //validflag is true if all input are valid 
var updateflag = false;  //updateflag is true if there exists an update

//regular expression for the fields that needs to be checked
var regdisplay = /^[A-Za-z][A-Za-z0-9]*$/;
var regemail = /\S+@\S+\.\S+/;
var regphone = /^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$/;
var regzipcode = /^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$/;

window.onload = function(){
document.getElementById("id_submit").onclick = function(){
	//get the elements of text input
	var inputdisplayname = document.getElementById("id_displayName").value;
	var inputemail = document.getElementById("id_emailAddress").value;
	var inputphone = document.getElementById("id_phoneNumber").value;
	var inputzipcode = document.getElementById("id_zipcode").value;
	var inputpassword = document.getElementById("id_password").value;
	var inputpasswordconfirm = document.getElementById("id_passwordConfirmation").value;

	//get the element of previous text
	var displayname = document.getElementById("textDisplayName").innerHTML;
	var email = document.getElementById("textEmailAddress").innerHTML;
	var phone = document.getElementById("textPhoneNumber").innerHTML;
	var zipcode = document.getElementById("textZipcode").innerHTML;

	//validate the input
	checkvalid(regdisplay, inputdisplayname, "Display Name");
	checkvalid(regemail, inputemail, "Email Address");
	checkvalid(regphone, inputphone, "Phone Number");
	checkvalid(regzipcode, inputzipcode, "Zipcode");
	if(inputpassword!=inputpasswordconfirm){
		validflag = false;
		validstr += "Two passwords are not the same!"
	}

	if(!validflag){
	// invalid input exists
		validflag = true;
		console.log("here");
		alert(validstr);
		validstr = "";
	}
	else{
	// all input are valid, then check if update happens
		checkupdate(displayname, inputdisplayname, "Display Name");
		checkupdate(email, inputemail, "Email Address");
		checkupdate(phone, inputphone, "Phone Number");
		checkupdate(zipcode, inputzipcode, "Zipcode");
		
		if(updateflag){
		//if update exists
		alert(updatestr);
		changetext(displayname, inputdisplayname, "textDisplayName");
		changetext(email, inputemail, "textEmailAddress");
		changetext(phone, inputphone, "textPhoneNumber");
		changetext(zipcode, inputzipcode, "textZipcode");
		updateflag = false;
		updatestr = "Update Infomation:\n";
		}
	}

	clearinput("id_displayName");
	clearinput("id_emailAddress");
	clearinput("id_phoneNumber");
	clearinput("id_zipcode");
	clearinput("id_password");
	clearinput("id_passwordConfirmation");
	}


document.getElementById("id_tomain").onclick = function(){
	location.href="main.html";
	}
}	

//determine whether the input is valid and set the flag accordingly
function checkvalid(regx, str, field){
	if(!regx.test(str)&&str!=""){
		validstr += "Invalid input of "+field+"; ";
		validflag = false;
	}
}

//determine whether update happen
function checkupdate(currentstr, inputstr, field){
	if(currentstr!=inputstr&&inputstr!=""){
		updateflag = true;
		updatestr += field+": from "+currentstr+" to "+inputstr+";\n";
	}
}

//change the text for update
function changetext(currentstr, inputstr, id){
	if(currentstr!=inputstr&&inputstr!=""){
		document.getElementById(id).innerHTML = inputstr;
	}
}

//clear the input
function clearinput(id){
	document.getElementById(id).value = "";
}