// socketio.js

const queue = require('./queue.js');


module.exports = (app, express, http, io) => {
  let count = 0;
  const masters = {};

  io.on('connection', (socket) => {
    count++;
    console.log(count, 'users connected');
    socket.on('room', (room) => {
      console.log("roomname",room)
      socket.join(room);
      if (!masters[room]) {
        masters[room] = socket.id;
        console.log("masters",masters)
        io.to(socket.id).emit('master', true);
      }
      queue.getQueue(room).then((updated) => {
        console.log("getting the initial queue",room, updated)
        if (updated.length > 0) {
          io.in(room).emit('queue', [updated, updated[0]]);
        } else {
          io.in(room).emit('queue', [updated]);
        }
      });
    });

    socket.on('update', (data) => {
      console.log("updating", data[0])
      let roomid = data[0];
      let currentSong = data[1];
      queue.getQueue(roomid).then((updated) => {
        if (currentSong) {
          socket.broadcast.in(roomid).emit('queue', [updated, currentSong]);
        } else {
          socket.broadcast.in(roomid).emit('queue', [updated]);
        }
      });
    });


    socket.on('disconnect', () => {
      count--;
      console.log(count, 'users remained');
    });
  });
};
