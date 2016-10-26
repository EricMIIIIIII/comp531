const express = require('express')
const bodyParser = require('body-parser')

let articleSet = 
[{
	id: 1,
	author: "Jiwei",
	text: "Hello world"
	},
 {	
	id: 2,
	author: "aha",
	text: "this is a new text"
	},
	{
	id: 3,
	author: "Smith",
	text: "this is a second text"
}]
let author = 'Stephen'
const addArticle = (req, res) => {
     var newArticle = {id:articleSet.length+1, author:author, text:req.body.body}
     articleSet.push(newArticle) 
     res.send(newArticle)
}

const hello = (req, res) => res.send({ hello: 'world'})

const getArticle = (req, res) => {
	res.send(articleSet)
}

const getArticleById = (req, res) =>{
	res.send(articleSet.filter((article) => {
		return article.id == req.params.id
	}))
}
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles',getArticle)
app.get('/articles/:id*?',getArticleById)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})