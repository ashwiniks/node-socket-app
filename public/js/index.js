var socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

  socket.emit('createMessage',{
      from : "adminfrom",
      to : "admin",
      text : "this is ashmessage"
  });

  socket.on("newMessage",(message)=>{
  console.log("new message",message);
  });