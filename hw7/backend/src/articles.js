const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const md5 = require('md5')

var author = 'Stephen'
const addArticle = (req, res) => {
	//check whether text is provided
	if(!req.body.text){
		res.status(400).send("missing text input")
		return
	}
	else{
	var article_obj = new Article({
		author:req.username, 
		text:req.body.text,
		date:new Date(),
		img:'http://assets.pokemon.com/assets/cms2/img/pokedex/full//025.png',
		comments:[]
	})
	//store the new article into the database
	new Article(article_obj).save(function(err,user){
		if(err)
			return console.log(err)
	})
    res.status(200).send({articles:[article_obj]})
 	}
}


const getArticles = (req, res) => {
	//check whether post id is provided
	if(req.params.id){
		//return only the arctile of that post id
		Article.find({_id:req.params.id}).exec(function(err, articles){
			if(articles === undefined){
				res.status(400).send('invalid article id')
				return
			}
			else{
				res.status(200).send({articles:articles})
			}
		})
	}
	else{
		//return all the article
		Article.find({}).exec(function(err, allarticles){
			if(err)
				return console.log(err)
			else
				res.status(200).send({articles:allarticles})
		})
	}
}

const putArticles = (req, res) => {
	//check wherther the text is provided
    if(!req.body.text){
        res.status(400).send("missing text input")
        return
    }
    var article
	Article.find({_id:req.params.id}).exec(function(err, articles){
		//check whether the article of this id is stored in database
		if(articles === undefined || articles.length === 0){
    		res.status(400).send("invalid post id")
    		return
    	}

    	//the arcticle of this id is stored in the database
    	else{
    		article = articles[0]

    		//update the article
		    if(!req.body.commentId){
		    	if(article.author == req.username){
					Article.update({_id: req.params.id}, { $set: { text: req.body.text }}, { new: true }, function(err){
						Article.find({_id:req.params.id}).exec(function(err,articles){
							if(err)
								return console.log(err)
							else{
								var updatedArticle
								updatedArticle = articles[0]
								res.status(200).send({articles:[updatedArticle]})
							}
						})
					})
		    	}
		    	else{
		    		res.status(400).send('No permission to edit article that you do not own')
		    		return
		    	}
		    }

		    //change the comment
		    else{

		    	//add a new comment
		    	if(req.body.commentId === "-1"){
		    		var commentId = md5(req.username + new Date().getTime())
		    		obj_comment = new Comment({commentId:commentId, author:req.username, date:new Date(), text:req.body.text})
		    		var newcomments = article.comments
		    		newcomments.push(obj_comment)

		    		Article.update({_id:req.params.id},{$set: { comments:newcomments}}, { new: true }, function(err){
						Article.find({_id:req.params.id}).exec(function(err,articles){
							var updatedArticle
							updatedArticle = articles[0]
							res.status(200).send({articles:[updatedArticle]})
						})
		    		})
		    	}

		    	//update the comment
		    	else{
		    		var targetcomment = article.comments.filter((r) => {return r.commentId == req.body.commentId})
		    		//check whether this comment exists in the database
		    		if(!targetcomment  || targetcomment.length === 0){
		    			res.status(400).send('invalid commentId')
		    			return
		    		}

		    		else{
		    			//check whether the user own this comment
		    			if(targetcomment[0].author !== req.username){
		    				res.status(400).send('No permission to edit comment that you do not own')
		    				return 
		    			}

		    			//update the comment
		    			else{
		    				var newcomments = article.comments
		    				newcomments.forEach(function(c){
		    					if(c.commentId === req.body.commentId){
		    						c.text = req.body.text
		    					}
		    				})
		    				Article.update({_id:req.params.id},{$set: { comments:newcomments}}, { new: true },function(err){
		    					Article.find({_id:req.params.id}).exec(function(err,articles){
									var updatedArticle
									updatedArticle = articles[0]
									res.status(200).send({articles:[updatedArticle]})
								})
		    				})
		    			}
		    		}
		    	}
		    }

    	}
    })

}



module.exports = (app) => {
    app.post('/article', addArticle)
    app.get('/articles/:id*?', getArticles)
    app.put('/articles/:id', putArticles)
}