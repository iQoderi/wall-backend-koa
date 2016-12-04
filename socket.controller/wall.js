/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const mongoose = require('mongoose');
const uuid = require('uuid');
const UserModel = require('../models/user.model');
const WallModel = require('../models/walls.model')
const User = mongoose.model('User');
const Wall = mongoose.model('Wall');
const TYPE = require('../config/socket/messageType');

const wallController = (socket)=> {
  const BOOM = TYPE.BOOM;
  const WALL = TYPE.WALL;
  const SERVER = TYPE.SERVER;
  const ADMIN = TYPE.ADMIN;
  socket.on(WALL.TOKEN, (data)=> {
    const token = data.token;
    const condition = {'token.token': token}
    User.findOne(condition).exec((err, user)=> {
      if (user) {
        socket.emit(SERVER.AUTHSUCC);
        socket.on(WALL.MESSAGE, (data)=> {
          const copyData = data;
          copyData.id = uuid.v1();
          copyData.userId = user.id;
          copyData.nickname = user.nickname;
          // const walls = new Wall(copyData);
          socket.broadcast.emit(SERVER.PULWALLMESSAGETOADMIN, copyData)
          // walls.save(()=> {
          // })
        })
      } else {
        socket.emit(SERVER.AUTHFAIL);
      }
    })
  })
}

module.exports = wallController;
