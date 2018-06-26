const socket = require('socket.io');
const io = socket();
const PORT = 8080;

io.on('connection', (socket) => {
  socket.on('enter room', ({room}) => {
    console.log('someone entered');
    socket.join(room, () => {
      console.log('joined room', room)
    })
    console.log('rooms open:', socket.rooms)
  });
  socket.on('check roster', ({room}) => {
    console.log('clients in...', room, io.sockets.adapter.rooms[room].sockets)
  })
  socket.on('leave room', ({room}) => {
    socket.leave(room, () => {
      console.log('left room', io.sockets.adapter.rooms[room].sockets)
    })
  })
  socket.on('check rooms', () => {
    console.log('open rooms are...', io.sockets.adapter.rooms)
    socket.emit('open rooms', {
      open_rooms: io.sockets.adapter.rooms
    })
  })
});

io.listen(PORT);

