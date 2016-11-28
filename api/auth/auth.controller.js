/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');
const jwt = require('koa-jwt');
const config = require('../../config/env');
const UserModel = require('../../models/user.model');
const md5 = require('md5');
const tokenCreator = require('../../util/token');
const User = mongoose.model('User');


/**
 * 注册
 */
exports.register = function *(next) {
  console.log('called');
  const body = this.request.body;
  const user = yield User.findOne({email: body.email});
  if (user) {
    this.body = {
      code: 10003
    };
  } else {
    let id = uuid.v4();
    let expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
    let token=tokenCreator(id, expiresIn)
    const condition = {
      id: id,
      email: body.email,
      password: (md5(config.salt + body.password)),
      token:token
    }
    const newUser = new User(condition, {_id: 0});
    yield newUser.save();
    this.request.body.token=token;
    yield next;
  }
};


/**
 * 登录
 */
exports.login = function *() {
  const body = this.request.body;
  console.log(body);
  const condition = {
    email: body.email,
    password: body.password
  };
  const user = yield User.findOne(condition, {_id: 0});
  if (user) {
    let id = user.id;
    let expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
    const token = tokenCreator(id, expiresIn);
    yield User.update(condition, {token: token});
    this.body = {code: 0, data: {token: token}}
  } else {
    this.body = {
      code: 10001
    }
  }
};

