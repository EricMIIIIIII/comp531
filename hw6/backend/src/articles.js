var articleSet = 
[{
	id: 1,
	author: "Jiwei",
	text: "Hello world",
	date: new Date(),
	comment: [
	{id:1, text: "hello world"}
	]
	},
 {	
	id: 2,
	author: "aha",
	text: "this is a new text",
	date: new Date(),
	comment: [
	{id:1, text:"beautiful"},
	{id:2, text:"good"}
	]
	},
	{
	id: 3,
	author: "Smith",
	text: "this is a second text",
	date: new Date(),
	comment: [
	{id:1, text:"hello web"}
	]
}]

var author = 'Stephen'
const addArticle = (req, res) => {
	if(!req.body.text){
		res.status(400).send("missing text input")
		return
	}
	else{
    var newArticle = {
     	id:articleSet.length+1, 
     	author:author, 
     	text:req.body.body, 
     	data: new Date(),
     	comment: []
    }
     articleSet.push(newArticle) 
     res.status(200).send({articles:[newArticle]})
 	}
}


const getArticles = (req, res) => {
	if(req.params.id){
		var target = articleSet.filter((element)=>{return element.id == req.params.id})
		if(target.length!==0){
			res.status(200).send({articles:target})
		}
		else{
			res.status(200).send({articles:[]})
		}
	}
	else{
		res.status(200).send({articles:articleSet})
	}
}

const putArticles = (req, res) => {
    if(!req.body.text){
        res.status(400).send("missing text input")
        return
    }
	if(req.params.id > articleSet.length || req.params.id <= 0){
		res.status(401).send("Inbalid Id. Forbidden Request")
		return
	}
	if(!req.body.commentId){
		articleSet[req.params.id-1].text = req.body.text
	}
	else{
		if(req.body.commentId> articleSet[req.params.id-1].comment.length
			|| (req.body.commentId <=0&&req.body.commentId!=-1)){
			res.status(401).send("Invalid comment id")
			return
		}
		if(req.body.commentId == -1){
			articleSet[req.params.id-1].comment.push({
				id:articleSet[req.params.id-1].comment.length+1,
				text:req.body.text
			})
		}
		else{
			articleSet[req.params.id-1].comment.forEach(function(e){
				if(e.id == req.body.commentId){
					e.text = req.body.text 
				}
			})
		}
	}
	res.status(200).send({articles: [articleSet[req.params.id-1]]})	
}

module.exports = (app) => {
    app.post('/article', addArticle)
    app.get('/articles/:id*?', getArticles)
    app.put('/articles/:id', putArticles)
}