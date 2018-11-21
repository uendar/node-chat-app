var socket = io();

socket.on('connect', function(){
  console.log("Connected to server!!!")
//   socket.emit('createEmail',{
//       email:"endar8@gmail.com"
//   })


 });

socket.on('disconnect', function(){
  console.log("Connection lost!")
});


socket.on('newMessage',function(message){
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   jQuery('#messages').append(li);
});

// socket.on('newEmail', function(data){
//      console.log("New Email!", data)
//  });


// socket.emit('createMessage',{
//     from:'Frank',
//     text:"hi"
// }, function(data){
//  console.log("Received", data)
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});