/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const User = mongoose.model('User');
const TYPE = require('../config/socket/messageType');

const boomSocketController = (socket)=> {
  const BOOM = TYPE.BOOM;
  const COMMON = TYPE.COMMON;
  const SERVER = TYPE.SERVER;
  socket.on(COMMON.TOKEN, (data)=> {
    const token = data.token;
    const condition = {'token.token': token}
    User.findOne(condition).exec((err, user)=> {
      if (user) {
        socket.emit(SERVER.AUTHSUCC,()=>{
          console.log(13213)
        });
        socket.on(SERVER.RECVMESSAGE,(data)=>{
          socket.broadcast(BOOM.PULMESSAGE,{data:data.message})
        })
      } else {
        socket.emit(SERVER.AUTHFAIL);
      }
    });
  })
}

module.exports = boomSocketController;
