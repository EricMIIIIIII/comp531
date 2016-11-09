
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
	res.send({headlines:[
	{username: 'User1', headline: 'I am user1'},
	{username: 'User2', headline: 'I am user2'},
	{username: 'User3', headline: 'I am user3'}
	]})
}

const putHeadline = (req, res) => {
	res.send({headlines:[{
		username: 'Stephen',
		headline: req.body.headline || 'you did not supply headline'
		}]})
}

const getEmail = (req, res) => {
	res.send({username: 'User1', email: 'user1@gmail.com'})
}

const putEmail = (req, res) => {
	res.send({
		username: 'Stephen',
		email: req.body.email || 'you did not supply email'
		})
}

const getZipcode = (req, res) => {
	res.send({username: 'User1', zipcode: '77030'})
}

const putZipcode = (req, res) => {
	res.send({
		username: 'Stephen',
		zipcode: req.body.zipcode || 'you did not supply zipcode'
		})
}

const getAvatars = (req, res) => {
	res.send({avatars:[
	{username: 'User1', avatar: 'user1_pictureURL'},
	{username: 'User2', avatar: 'user2_pictureURL'},
	{username: 'User3', avatar: 'user3_pictureURL'}
	]})
}

const putAvatars = (req, res) => {
	res.send({
		username: 'Stephen',
		headline: req.body.img || 'you did not supply file'
		})
}
module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatars)
}
