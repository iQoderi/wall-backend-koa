/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const mongoose = require('mongoose');
const adminModel = require('../../models/admin.model');
const tokenCreator = require('../../util/token');
const Admin = mongoose.model('Admin');

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
    this.body = {code: 0, data: {token: token}}
  } else {
    this.body = {code: 10001}
  }
}

