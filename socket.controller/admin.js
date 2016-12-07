/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const TYPE = require('../config/socket/messageType');

const adminSocketController = (socket)=> {
  const BOOM = TYPE.BOOM;
  const WALL = TYPE.WALL;
  const SERVER = TYPE.SERVER;
  const ADMIN = TYPE.ADMIN;
  socket.on(ADMIN.TOKEN, (data)=> {
    const condition = {"token.token": data.token};
    console.log(data);
    Admin.findOne(condition).exec((err, admin)=> {
      if (data.token) {
        if (admin) {
          socket.emit(SERVER.ADMINAUTHSUCC);
          socket.on(ADMIN.PULMESSAGE, (data)=> {
            socket.broadcast.emit('pulMess', data);
          })
        } else {
          socket.emit(SERVER.ADMINAUTHFAIL);
        }
      } else {
        socket.emit(SERVER.ADMINAUTHFAIL);
      }
    })
    socket.on(ADMIN.PULWALL, (data)=> {
      socket.broadcast.emit(SERVER.PULADMINWALLTOWALL, data)
    })
    socket.on(ADMIN.REDOMESSAGE, (data)=> {
      socket.broadcast.emit(SERVER.REDOWALLMESSAGE, data)
    })
  })
}

module.exports = adminSocketController;
