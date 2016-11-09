const followList = [
    {user:"jy54", follower: ['user1', 'user2', 'jr58', 'jp64']},
    {user:"user1", follower: ['shdu', 'jy54']},
    {user:"LoggedInUser", follower: ['qwe', 'uq', 'j6', 'r7']},
]

const getFollowing = (req, res) =>{
    var user
    if (!req.params.user) 
        user = "LoggedInUser"
    else
        user = req.params.user
    var record = followList.filter((r) => {return r.user == user})
    res.status(200).send({
        username: user,
        following: record[0].follower
    })
}

const putFollowing = (req, res) =>{
    if (!req.user) req.user = 'LoggedInUser'
    followList.forEach(function(element){
        if(element.user == req.user){
            if(element.follower.includes(req.params.user)){
                res.status(401).send("this user already follow "+req.user)
                return
            }
            else{
                element.follower.push(req.params.user)
                res.status(200).send({
                    username: req.user,
                    following: element.follower
                })
            }
        }
    })
}

const deleteFollowing = (req, res)=>{
    if (!req.user) req.user = 'LoggedInUser'
    followList.forEach(function(element){
        if(element.user == req.user){
            if(!element.follower.includes(req.params.user)){
                res.status(401).send("this user is not a follower of "+req.user)
                return
            }
            else{
                element.follower = element.follower.filter((r) =>{
                    return r != req.params.user
                })
                res.status(200).send({
                    username: req.user,
                    following: element.follower
                })
            }
        }
    })  
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}