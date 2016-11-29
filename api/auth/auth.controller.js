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
const hash=require('../../util/hash');
const User = mongoose.model('User');


/**
 * 注册
 */
exports.register = function *(next) {
  const body = this.request.body;
  const user = yield User.findOne({email: body.email});
  if (user) {
    this.body = {
      code: 10003
    };
  } else {
    const id = uuid.v4();
    const expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
    const token = tokenCreator(id, expiresIn)
    const condition = {
      id: id,
      isActive: 0,
      email: body.email,
      password: body.password,
      nickname: body.nickname,
      token: token
    }
    const newUser = new User(condition, {_id: 0});
    yield newUser.save();
    this.request.body.token = token;
    yield next;
  }
};


/**
 * 登录
 */
exports.login = function *() {
  const body = this.request.body;
  const condition = {
    email: body.email,
    password: body.password
  };
  const user = yield User.findOne(condition, {_id: 0});
  if (user) {
    if (user.isActive === 1) {
      const id = user.id;
      const expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
      const token = tokenCreator(id, expiresIn);
      yield User.update(condition, {token: token});
      this.body = {code: 0, data: {token: token}}
    } else {
      this.body = {code: 10002}
    }
  } else {
    this.body = {
      code: 10001
    }
  }
};

/**
 * 重新发送邮件
 */
exports.resendEmail = function *(next) {
  const body = this.request.body;
  const condition = {email: body.email}
  const user = yield User.findOne(condition);
  if (user) {
    if (user.isActive === 1) {
      this.body = {code: 10006}
    } else {
      const id = user.id;
      const expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
      const token = tokenCreator(id, expiresIn);
      const condition = {id: id}
      const update = {token: token};
      yield User.update(condition, update);
      this.request.body.token = token;
      yield next;
    }
  } else {
    this.body = {code: 10005}
  }
}

/**
 * 忘记密码
 */
exports.forgetPass = function *(next) {
  const body = this.request.body;
  const condition = {email: body.email}
  const user = yield User.findOne(condition);
  if (user) {
    const id = user.id;
    const expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
    const token = tokenCreator(id, expiresIn);
    const condition = {id: id}
    const update = {token: token}
    yield User.update(condition, update);
    this.request.body.token = token;
    yield next;
  } else {
    this.body = {code: 10005}
  }
}

/**
 * 忘记密码/重置密码
 * @param next
 */
exports.resetPass = function *(next) {
  const body=this.request.body;
  const user=this.user;
  const condition={
    id:user.id
  }

  body.password=hash(user.email,body.password);
  const update={
    password:body.password
  }

  yield User.update(condition,update)
  this.body={code:0}
}
