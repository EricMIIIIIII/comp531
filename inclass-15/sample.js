var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
          console.log(body)
     })

     req.on('end', function() {
          req.body = body
          console.log(body+"asd")
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload 
     if(req.url === '/' && req.method === 'GET')
          payload = { 'hello': 'world' }
     else if(req.url === '/articles' && req.method === 'GET'){
          payload = { 'articles': [ 
               { id:1, author: 'Scott', body:'A post' }, 
               { id:2, author: 'JY', body:'Second post'}, 
               { id:3, author: 'Stephen', body:'Third post'} 
          ]}
     }
     else if(req.url === '/login' && req.method === 'POST'){
          var body = JSON.parse(req.body)
          payload = { 'username': body.username, 'result' : 'success'}
     }
     else if(req.url === '/logout' && req.method === 'PUT')
          payload = 'OK'
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     if(req.url === '/logout' && req.method === 'PUT')
          res.end(payload+ '\n')
     else
          res.end(JSON.stringify(payload)+ '\n')
}