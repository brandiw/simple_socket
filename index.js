//Requires
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Some Socket IO stuff
io.on('connection', function(socket){
  console.log('Connection!');

  socket.on('chat message', function(msg){
    //Server has received a new message from one of the clients.
    //Server needs to tell other clients about this message.
    //(Other server side stuff might normally go here if it was needed - e.g., storing msg history in a db)
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('Disconnection!');
  })
});

//Listen
http.listen(3000);
