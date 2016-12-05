/**
 * Created by qoder on 16-11-17.
 */
const io = require('socket.io');
const md5 = require('md5');
const boomSocketController = require('./socket.controller/boom');
const wallSocketController = require('./socket.controller/wall');
const adminSocketController = require('./socket.controller/admin');

const ioController = (app)=> {
  const socket = io.listen(app);
  socket.on('connection', (socket)=> {
    boomSocketController(socket);
    adminSocketController(socket);
    wallSocketController(socket);
    socket.on('YJF', (data)=> {
      socket.broadcast.emit('REPLYYJF', data);
    })
  })
}

module.exports = ioController;
