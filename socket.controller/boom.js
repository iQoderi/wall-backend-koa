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
  socket.on(BOOM.TOKEN, (data)=> {
    const token = data.token;
    const condition = {'token.token': token}
    console.log('deafaefeaf',BOOM.RECVMESSAGE);
    User.findOne(condition).exec((err, user)=> {
      if (user) {
        socket.emit(SERVER.AUTHSUCC, ()=> {
          console.log(13213)
        });
        socket.on(BOOM.RECVMESSAGE, (data)=> {
          console.log(user);
          console.log(data,'dwadad');
          let copyData=data;
          copyData.userId=user.id;
          copyData.nickname=user.nickname;
          copyData.email=user.email;
          copyData.isActive=user.isActive;
          socket.broadcast.emit(SERVER.PULBOOMMESSAGE,copyData)
        })
      } else {
        socket.emit(SERVER.AUTHFAIL);
      }
    });
  })
}

module.exports = boomSocketController;
