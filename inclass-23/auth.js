const md5 = require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
var users = [];
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'325893917793968', 
	clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', 
	callbackURL
}

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

//use Facebook Strategy to login
passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null,user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

function logout(req,res){
	req.logout();
	req.redirect('/')
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		next()
	}
	else{
		res.redirect('/login')
	}
}

function profile(req,res){
	res.send({'ok now what?':req.user})
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

function logout_default(req,res) {
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
	app.put('/logout', logout_default)

	app.use(session({secret:'ccfdtdctfkdctd4e56si6drfnd56sftysd5dx'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
	}
