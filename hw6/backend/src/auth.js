const md5 = require('md5')
var cookieKey = 'sid'
var User = new Array();
var loginUser = ''

function createSalt () {
	var library = "ashgacqqgueuiqibyseuvsukszfwuf71y2dyvgi3t8t8f";
	var saltLength = 10;
	var index = Math.floor(Math.random()*(library.length-saltLength))
	var salt = library.substring(index,index+10);
	return salt;
}

function register(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.status(400).send("missing username or password")
		return
	}
	else{
	var salt = createSalt();
	var hash = md5(password+salt); 
	User.push({username:username, salt: salt, hash:hash})
	res.status(200).send({result:'success', username:username})
	}
}

function login(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.status(400).send("missing password or username")
		return
	}
	var userObj = User.filter(r => {return r.username === ''+username})[0];
	if(!userObj){
		res.status(401).send("Don't have this user")
		return
	}
	var sid = Math.floor(Math.random()*5000)
	if(md5(password+userObj.salt)===userObj.hash){
		res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
		loginUser = username
		var msg = {username:username, result: 'success'}
		res.status(200).send(msg)
	}
	else {
		res.status(401).send("incorrect password")
	}
}
function putPassword(req,res){
	var password = req.body.password
	if(!password){
		res.status(400).send('missing password')
		return
	}
	if(loginUser == ''){
		res.status(400).send("Haven't Log in yet")
		return
	}
	else {
		res.status(200).send({
			username: loginUser,
			status: 'will not change'
		})
	}

}

function logout(req,res) {
	//clear log in information
	loginUser = ''
	//clear session id
	res.cookie(cookieKey, null, {maxAge: -1, httpOnly: true})
	res.status(200).send('OK')
	
}
module.exports = app => {
	app.post('/register', register)
	app.post('/login', login)
	app.put('/password', putPassword)
	app.put('/logout', logout)
	}
