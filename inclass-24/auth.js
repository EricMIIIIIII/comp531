const md5 = require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const redis = require('redis').createClient('redis://h:pbqp1ju072pqd4dqu4b9thp8rnl@ec2-107-20-196-14.compute-1.amazonaws.com:12099')
var users = [];
const User = require('./model.js').User
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'325893917793968', 
	clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', 
	callbackURL
}

var cookieKey = 'sid'


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
	var hash = md5(password+salt)
	const userObj = {username, salt, hash}
	new User(userObj).save(function (err, usr){
		if(err) return console.log(err)
	})
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
	User.find({username: username}).exec(function(err, Users){
	        if (users === null || users.length === 0){
            res.sendStatus(401)
            return
        }
    userObj = users[0]
	if(!userObj){
		res.status(401).send("Don't have this user")
		return
	}
	var sid = Math.floor(Math.random()*5000)
	if(md5(password+userObj.salt)===userObj.hash){
		edis.hmset(sid, userObj)
		res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
		var msg = {username:username, result: 'success'}
		res.status(200).send(msg)
	}
	else {
		res.status(401).send("incorrect password")
	}
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
	var sid = req.cookie[cookieKey]
	if (!sid){
        return res.status(401).send('Not Authorized')
    }
    redis.hgetall(sid, function(err, userObj) {
    	if(err) {
    		console.log('Error: ${err}')
    	}
    	console.log(sid + 'mapped to ' + userObj)
    	if(userObj){
    		username = userObj.username
			next()
		}
		else{
			res.redirect('/login')
		}
    })
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
	else {
		res.status(200).send({
			username: 'jy54'
			status: 'will not change'
		})
	}

}

function logout_default(req,res) {
	//clear log in information
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
