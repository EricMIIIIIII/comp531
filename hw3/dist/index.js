window.onload=function getTimeStamp(){
    document.getElementById("idTimeStamp").value = new Date().getTime();
    document.getElementById("indexSubmit").onclick = function(){
    var pwd1=document.getElementById("password").value;
    var pwd2=document.getElementById("passwordConfirmation").value;
    var birthdate=new Date(document.getElementById("idDateofBirth").value);
    var presentdate=new Date();
    var yeardiff=presentdate.getFullYear()-birthdate.getFullYear();
    var monthdiff=presentdate.getMonth()-birthdate.getMonth();
    var daydiff=presentdate.getDate()-birthdate.getDate();
    //judge whether the passwords are the same
    if(pwd2!=pwd1){
        alert("two passwords are not the same!");
        return false;
    }
    //judge whether the user is old enough to register
    else if(!(yeardiff>18||yeardiff==18&&monthdiff>0||yeardiff==18&&monthdiff==0&&daydiff>=0)){
        alert("you have to be 18 years old or older to register");
        return false;  
    }
    else
        return true;
}
}


