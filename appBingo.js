const express = require("express")
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const ejs = require("ejs")

app.use( express.static( "templates" ) );
app.all("/",(req,res)=>{
    console.log(__dirname)
    ejs.renderFile(__dirname+"//templates/bingo_user.html",[],
    (err, site)=>{
        res.status=200
        res.send(site)
    })
})


app.all("/admin",(req,res)=>{
    
    ejs.renderFile(__dirname+"//templates/bingo.html",[],
    (err, site)=>{
        console.log(err)
        res.status=200
        res.send(site)
    })
})
var numbers = []
io.on("connection",(socket)=>{
    socket.emit("Connect",numbers)
    socket.on("setNumber",(number)=>{
        numbers.push(number)
        io.emit("setNumber",number)
    })
    socket.on("removeNumber",(number)=>{
        numbers = numbers.filter((num)=>{
            return number!=num
        });console.log(numbers)
        io.emit("removeNumber", number)
    })
    socket.on("refresh", ()=>{
        numbers=[]
        io.emit("refresh",[])
    })
})
server.listen(21017,function(){
    console.log("servidor rodando na porta 21017")
})