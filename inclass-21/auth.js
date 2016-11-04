const md5 = require('md5')
var cookieParser = require('cookie-parser') 
var cookieKey = 'sid'
var User = new Array();

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
		res.sendStatus(400).sned("missing username or password")
		return
	}
	else{
	var salt = createSalt();
	var hash = md5(password+salt); 
	User.push({username:username, salt: salt, hash:hash})
	res.send({username:username, salt: salt, hash:hash})
	}
}

function login(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.sendStatus(400).send("missing password or username")
		return
	}
	var userObj = User.filter(r => {return r.username === ''+username})[0];
	if(!userObj){
		res.sendStatus(401).send("Don't have this user")
		return
	}
	var sid = Math.floor(Math.random()*5000)
	if(md5(password+userObj.salt)===userObj.hash){
		res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
		var msg = {username:username, result: 'success'}
		res.send(msg)
	}
	else {
		res.sendStatus(401).send("incorrect password")
	}
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/login', login)
	app.post('/register', register)
	}
