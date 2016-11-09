const profile = [
{
        user: 'jy54',
        headline: 'This is my headline!',
        email: 'a@ba.com',
        dob: Date.parse('1993-07-30'),
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    },
{
        user: 'user1',
        headline: 'hello world!',
        email: 'foo@bar.com',
        dob: Date.parse('1999-01-30'),
        zipcode: 77030,
        avatar: 'pic1.jpg',
    },
{
        user: 'user2',
        headline: 'what a beautiful world',
        email: 'ab1@co1.com',
        dob: Date.parse('1994-02-12'),
        zipcode: 77012,
        avatar: 'pic2.jpg',
    },
{
        user: 'user3',
        headline: 'web developer',
        email: 'ygh@sina.com',
        dob: Date.parse('1990-04-12'),
        zipcode: 77676,
        avatar: 'pic3.jpg',
    }
]

const getHeadline = (req, res) => {
	if (!req.user) req.user = 'jy54'
    const users = req.params.users ? req.params.users.split(',') : [req.user]
	var result = []
	users.forEach(function(element){
		var record = profile.filter((r) => {return r.user == element})
		result.push({username:record[0].user, headline:record[0].headline})
	})
	res.status(200).send({headlines:result})
}

const putHeadline = (req, res) => {
    if(!req.body.headline){
        res.status(400).send("missing headline input")
        return
    }
	if (!req.user) req.user = 'jy54'
    profile.forEach(function(element){
        if(element.user === req.user){
            element.headline = req.body.headline
            res.status(200).send({
            username: element.user, 
            headline: element.headline
            })
        }
    })
}

const getEmail = (req, res) => {
    var username
    if (!req.params.user) 
        username = 'jy54'
    else
        username = req.params.user
    var record = profile.filter((r) => {return r.user == username})
	res.status(200).send({username: record[0].user, email: record[0].email})
}

const putEmail = (req, res) => {
    if(!req.body.email){
        res.status(400).send("missing email input")
        return
    }
    else{
        if (!req.user) req.user = 'jy54'
        profile.forEach(function(element){
            if(element.user === req.user){
                element.email = req.body.email
                res.status(200).send({
                username: element.user,
                email: element.email
                })
            }
        })
    }
}

const getZipcode = (req, res) => {
    var username
    if (!req.params.user) 
        username = 'jy54'
    else
        username = req.params.user
    var record = profile.filter((r) => {return r.user == username})
    res.status(200).send({username: record[0].user, zipcode: record[0].zipcode})
}

const putZipcode = (req, res) => {
    if(!req.body.zipcode){
        res.status(400).send("missing zipcode input")
        return
    }
    else{
        if (!req.user) req.user = 'jy54'
        profile.forEach(function(element){
            if(element.user === req.user){
                element.zipcode = req.body.zipcode
                res.status(200).send({
                username: element.user,
                zipcode: element.zipcode
                })
            }
        })
    }
}

const getAvatars = (req, res) => {
    if (!req.user) req.user = 'jy54'
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    var result = []
    users.forEach(function(element){
        var record = profile.filter((r) => {return r.user == element})
        result.push({username:record[0].user, avatar:record[0].avatar})
    })
    res.status(200).send({avatar:result})
}

const putAvatars = (req, res) => {
    if(!req.body.avatar){
        res.status(400).send("missing avatar input")
        return
    }
    if (!req.user) req.user = 'jy54'
    profile.forEach(function(element){
        if(element.user === req.user){
            element.avatar = req.body.avatar
            res.status(200).send({
            username: element.user, 
            avatar: element.avatar
            })
        }
    })
}

const getDob = (req, res) => {
    var username
    if (!req.params.user) 
        username = 'jy54'
    else
        username = req.params.user
    var record = profile.filter((r) => {return r.user == username})
    res.status(200).send({username: record[0].user, dob: record[0].dob})
}

module.exports = app => {
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatars)
     app.get('/dob', getDob)
}