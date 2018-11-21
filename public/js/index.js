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


socket.on("newLocationMessage", function(message){
  console.log(message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});


var locarionBtn = jQuery('#send-location');
    locarionBtn.on('click', function(){
       if(!navigator.geolocation){
         return alert('geolocation not supported by your browser');
       }
       navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
             latitud:position.coords.latitude,
             longtitud:position.coords.longitude
        });
       }, function(err){
             alert("unable to get coordinates!");
       });
        // e.preventDefault();
    });


    //google.com/maps?q=