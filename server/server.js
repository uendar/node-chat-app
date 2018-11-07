const path = require('path');
const http = require('http');
const express =  require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("New user connected!")

     //create message event
     socket.on('createMessage',(msg)=>{
         io.emit('newMessage',{
             from:msg.from,
             text:msg.text,
             createAt:new Date().getTime()
         })
     });


    socket.on('disconnect', (socket)=>{
        console.log("Server connection lost!")
    });
});




server.listen(port, ()=>{
    console.log(`Server up on ${port}`);
});

