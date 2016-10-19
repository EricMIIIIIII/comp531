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
let idnum = 4
let author = 'Stephen'
const addArticle = (req, res) => {
     var newArticle = [{id:idnum, author:author, text:req.body.body}]
     articleSet.push({id:idnum, author:author, text:req.body.body})
     idnum++;  
     res.send({articles: newArticle})
}

const hello = (req, res) => res.send({ hello: 'world'})

const getArticle = (req, res) => {
	res.send({articles:articleSet})
}

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles',getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})