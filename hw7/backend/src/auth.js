const md5 = require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const redis = require('redis').createClient('redis://h:p4sf0tv5ldvdj3a12gv16ud10oj@ec2-54-221-228-237.compute-1.amazonaws.com:12399')
var users = [];
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientID:'325893917793968', 
	clientSecret:'35f25c9c89b0a9d5e0076523e667ef4c', 
	callbackURL
}

var cookieKey = 'sid'
var mySecretMessage = "you can never guess what it is"

//function to create salt 
function createSalt () {
	var library = "ashgacqqgueuiqibyseuvsukszfwuf71y2dyvgi3t8t8f";
	var saltLength = 10;
	var index = Math.floor(Math.random()*(library.length-saltLength))
	var salt = library.substring(index,index+10);
	return md5(salt + new Date().getTime()) ;
}

function register(req, res){
	var username = req.body.username;
	var email = req.body.email;
	var dob = new Date(req.body.birth).getTime();
	var zipcode = req.body.zipcode; 
	var password = req.body.password;
	var headline = "A default headline"
	if(!username || !password || !dob || !zipcode || !password){
		res.status(400).send("all fields should be filled in")
		return
	}
	else{
	//find whether the user already exist
	//if not, register this user
	User.find({username:username}).exec(function(err, users){
		if(err)
			return console.log(err)
		else{
			if(users.length !== 0){
				res.status(400).send("this username has already been used")
				return
			}
			else{
				var salt = createSalt();
				var hash = md5(password+salt)
				var obj_user = new User({username:username, salt:salt, hash:hash})
				new User(obj_user).save(function (err, user){
					if(err) 
						return console.log(err)
				})
				var obj_profile = new Profile({username:username, email:email, 
					following:[], dob:dob, headline:'default headline', zipcode:zipcode,
					avatar:'http://cistercianinformer.com/wp-content/uploads/2016/01/rice-logo.png',
					headline: headline})
				new Profile(obj_profile).save(function (err, user){
					if(err)
						return console.log(err)
					})
				res.status(200).send({result:'success', username:username})
			}
		}
	})
	}
}

function login(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.status(400).send("missing password or username")
		return
	}
	//check whether this user has registered or not
	//if already registered and the password is correct, login user
	User.find({username: username}).exec(function(err, users){
		if(err)
			return console.log(err)
		else{
		    if (!users  || users.length === 0){
		        res.status(401).send("this username hasn't been registered")
		        return
		    }
		    obj_user = users[0]
			if(!obj_user){
				res.status(401).send("Don't have this user")
				return
			}
			var sid = md5(mySecretMessage + new Date().getTime() + obj_user.username)
			if(md5(password+obj_user.salt) == obj_user.hash){
				redis.hmset(sid, obj_user)
				res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
				var msg = {username:username, result: 'success'}
				res.status(200).send(msg)
			}
			else {
				res.status(401).send("incorrect password")
			}
		}
	})
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


function isLoggedIn(req, res, next){
	var sid = req.cookies[cookieKey]
	if (!sid){
        return res.sendStatus(401)
    }
    redis.hgetall(sid, function(err, userObj) {
    	if(err) throw err;
    	if(userObj){
    		console.log(sid + 'mapped to ' + userObj.username)
    		req.username = userObj.username
			next()
		}
		else{
			res.sendStatus(401)
		}
    })
}

function profile(req,res){
	res.send({'ok now what?':req.user})
}

function putPassword(req,res){
	var password = req.body.password
	var username = req.username
	if(!password){
		res.status(400).send('missing password')
		return
	}
	//check whether the password is the same or not
	//if is not the same, change the password
	else {
		User.find({username:username}).exec(function(err,user){
			if(err)
				return console.log(err)
			else{
				var obj_user = user[0];
				if(md5(obj_user.salt+password) === obj_user.hash){
					res.status(400).send("new password is the same as old password")
					return
				}
				else{ 
					var newsalt = createSalt();
					var newhash = md5(password+newsalt);
					User.update({username: username}, { $set: { salt: newsalt, hash: newhash }}, { new: true }, function(err, user){
		        		res.sendStatus(200)
		    		})
				}	
			}
		})
	}

}

function logout(req,res) {
	//clear log in information
	//clear session id
	redis.del(req.cookies[cookieKey])
	res.clearCookie(cookieKey)
	res.status(200).send("OK")	
}
module.exports = app => {
	app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)


	//app.use(session({secret:'ccfdtdctfkdctd4e56si6drfnd56sftysd5dx'}))
	app.use(passport.initialize())
	app.use(passport.session())

	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use(isLoggedIn)
	app.put('/password', putPassword)
	app.put('/logout', logout)
	app.use('/profile', profile)
	}
