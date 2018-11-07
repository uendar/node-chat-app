var socket = io();

socket.on('connect', function(){
  console.log("Connected to server!!!")
//   socket.emit('createEmail',{
//       email:"endar8@gmail.com"
//   })


socket.emit('createMessage',{
    from:'Endar',
    text:"Yes it works dude"
});




 });

socket.on('disconnect', function(){
  console.log("Connection lost!")
});


socket.on('newMessage',function(message){
   console.log(message);
});

// socket.on('newEmail', function(data){
//      console.log("New Email!", data)
//  });
