/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const mongoose = require('mongoose');
const adminModel = require('../../models/admin.model');
const userModel = require('../../models/user.model');
const tokenCreator = require('../../util/token');
const Admin = mongoose.model('Admin');
const User = mongoose.model('User');
const uuid = require('uuid');

/**
 * admin login
 * @param next
 */
exports.login = function *(next) {
  const body = this.request.body;
  const condition = {
    email: body.email,
    password: body.password
  }

  const admin = yield Admin.findOne(condition);
  if (admin) {
    const id = admin.id;
    const expiresIn = 1000 * 60 * 60 * 24 * 7;   //7天过期
    const token = tokenCreator(id, expiresIn);
    yield Admin.update({id: id}, {token: token});
    this.body = {code: 0, data: {token: token}}
  } else {
    this.body = {code: 10001}
  }
}

/**
 * 添加子管理员
 */
exports.addSubAdmin = function *() {
  const user = this.user;
  const body = this.request.body;
  const id = uuid.v1();
  const condition = {
    email: body.email,
    password: body.password,
    role: 0,
    adminId: user.id,
    id: id
  }

  const SubAdmin = new Admin(condition, {_id: 0})
  yield SubAdmin.save();
  this.body = {code: 0}
}


/**
 * 获取子管理员列表
 */
exports.getSubAdmin = function *() {
  const user = this.user;
  const condition = {
    adminId: user.id,
    role: 0
  }
  const admins = yield Admin.find(condition, {password: 0, _id: 0, token: 0, __v: 0});
  this.body = {code: 0, data: {subAdmin: admins}}
}


/**
 * 删除子管理员
 */
exports.rmSubAdmin = function *() {
  const condition = {
    id: this.params.id
  }
  console.log(condition);
  yield Admin.remove(condition);
  this.body = {code: 0}
}


/**
 * 拉黑用户
 */
exports.blockUsers = function *() {
  const condition = {
    id: this.params.id
  }
  const users = yield User.findOne(condition)
  const update = {isBlock: 1}
  yield User.update(condition, update)
  this.body = {code: 0}
}

/**
 * 撤销拉黑用户
 */
exports.redoBlockUser = function *() {
  const condition = {
    id: this.params.id
  }

  const update = {isBlock: 0}
  const info = yield User.update(condition, update);
  this.body = {code: 0}
}

/**
 * 获取拉黑用户列表
 */
exports.getBlockUsers = function *() {
  const condition = {
    isBlock: 1
  }
  const users = yield User.find(condition)
  console.log(users);
  this.body = {code: 0, data: {users: users}}
}
