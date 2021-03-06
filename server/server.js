const path = require('path');
const http = require('http');
const express =  require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("New user connected!")

    //emit message user who joined  fromAdmin text...
    socket.emit('newMessage',generateMessage('Admin', 'Welcom to chat app'));

    //socket.brodcase.emit 
      let user = Math.floor((Math.random() * 100) + 1);
      let from  = "Admin"+user;
      socket.broadcast.emit('newMessage',generateMessage(from, 'New user joined the chat app'));

     //create message event
     socket.on('createMessage',(msg, callback)=>{
         console.log(msg);
         io.emit('newMessage',generateMessage(msg.from, msg.text));
         callback('This is from server');
     });


     socket.on('createLocationMessage', (coord)=>{
         console.log(coord);
        io.emit('newLocationMessage', generateLocationMessage('Endar', coord.latitud, coord.longtitud));
     });

    socket.on('disconnect', (socket)=>{
        console.log("Server connection lost!")
    });
});




server.listen(port, ()=>{
    console.log(`Server up on ${port}`);
});

