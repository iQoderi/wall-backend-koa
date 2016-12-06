/**
 * Created by qoder on 16-11-17.
 */
'use strict';
const io = require('socket.io');
const md5 = require('md5');
const boomSocketController = require('./socket.controller/boom');
const wallSocketController = require('./socket.controller/wall');
const adminSocketController = require('./socket.controller/admin');
const uuid = require('uuid');

const ioController = (app)=> {
  const socket = io.listen(app);
  socket.on('connection', (socket)=> {
    socket.on('rocket', (data)=> {
      let copyData=data;
      copyData.id=uuid.v1()
      socket.broadcast.emit('PULADMINWALLTOWALL', copyData)
    })
    boomSocketController(socket);
    adminSocketController(socket);
    wallSocketController(socket);
    socket.on('YJF', (data)=> {
      socket.broadcast.emit('REPLYYJF', data);
    })
  })
}

module.exports = ioController;
