const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.emit("newMessage",{
    "from" : "Admin",
    "text" : "welcome to chat app"

  });

  socket.broadcast.emit("newMessage",{
    "from" : "Admin",
    "text" : "new user connected"

  });

  socket.emit("newMessage",{
    "from" : "alvin",
    "text" : "greeting from ashwini",
    "createdAt" : 123123
  });

  socket.on("createMessage",(message)=>{
    io.emit("newMessage",{
      "from" : message.from,
      "text" : message.text
    });
  });
  
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});