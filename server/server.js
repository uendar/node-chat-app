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

    //emit message user who joined  fromAdmin text...
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcom to chat app'
    })

    //socket.brodcase.emit 
      let user = Math.floor((Math.random() * 100) + 1);
       socket.broadcast.emit('newMessage',{
              from:'Admin'+user,
              text:'New user joined',
              createAt:new Date().getTime()
        });

     //create message event
     socket.on('createMessage',(msg)=>{
         io.emit('newMessage',{
             from:msg.from,
             text:msg.text,
             createAt:new Date().getTime()
         });
        // socket.broadcast.emit('newMessage',{
        //       from:msg.from,
        //       text:msg.text,
        //       createAt:new Date().getTime()
        // });
     });


    socket.on('disconnect', (socket)=>{
        console.log("Server connection lost!")
    });
});




server.listen(port, ()=>{
    console.log(`Server up on ${port}`);
});

