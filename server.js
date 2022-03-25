const http = require('http')
const fs = require('fs')
const port = 8000;
const hostname = 'localhost'


const server = http.createServer((req,res)=>{
    res.setHeader("Content-Type","text/html");
    
let route = './views/';

switch (req.url) {
    case '/':
        route+='index.html';
        res.statusCode = 200;
        break;
    case '/contacts':
        route+='contacts.html';
        res.statusCode = 200;
        break;
    default:
        route+='404.html'
        res.statusCode = 404;
        break;
}
    fs.readFile(route,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.end(data)
            console.log(req.url)
        }
    })
    
})
server.listen(port,()=>{
    console.log(`listening on ${port}`)
})

