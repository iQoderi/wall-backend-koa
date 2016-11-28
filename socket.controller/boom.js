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
  socket.on(BOOM.TOKEN, (data)=> {
    const token = data.token;
    const condition = {'token.token': token}
    User.findOne(condition).exec((err, user)=> {
      console.log(user,3123123);
      if (user) {
        socket.emit(BOOM.AUTHSUCC);
        socket.on(BOOM.RECVMESSAGE,(data)=>{
          socket.broadcast(BOOM.PULMESSAGE,{data:data.message})
        })
      } else {
        socket.emit(BOOM.AUTHFAIL);
      }
    });
  })
}

module.exports = boomSocketController;
