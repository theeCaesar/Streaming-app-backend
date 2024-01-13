process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log('UNCAUGHT Exception !!!!!!!!!!!  Terminateing The Server');
  process.exit(1);
});

const dot = require('dotenv');
dot.config({ path: './config.env' });

const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');

DB = process.env.MONGODB_URI;

mongoose.connect(DB).then((con) => {
  console.log('DB connected');
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, user) => {
    socket.join(roomId);
    socket.user = user;
    socket.to(roomId).emit('user joined', socket.user);
  });
  socket.on('switch-video-state', (state, roomId) => {
    socket.to(roomId).emit('switch-video-state', state, socket.user);
  });
  socket.on('change-seekbar', (timestamp, roomId) => {
    socket.to(roomId).emit('change-seekbar', timestamp, socket.user);
  });
  socket.on('message', (roomId, msg) => {
    socket.to(roomId).emit('message', msg, socket.user);
  });
  socket.on('leave-room', (roomId) => {
    socket.to(roomId).emit('leave-room', socket.user);
    socket.leave(roomId);
  });

  socket.on('disconnect', () => {
    //
  });
});
const port = process.env.PORT || 3000;

// const server = app.listen(port, () => {
//   console.log('running...');
// });

// {
//   useCreateIndex: true,
//   autoIndex: true
// }

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION !!!!!!!!!!!  Terminateing The Server');

  server.close((_) => {
    process.exit(1);
  });
});
