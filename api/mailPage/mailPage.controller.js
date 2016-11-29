/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const mongoose = require('mongoose');
const userModel = require('../../models/user.model');
const User = mongoose.model('User');
const views = require('co-views');

const render = views(__dirname + '/../../views/mail', {
  map: {html: 'ejs'}
})

exports.register = function *() {
  const user = this.user;
  const token = this.query.token;
  const condition = {
    id: user.id
  }

  const update = {
    isActive: 1
  }

  yield User.update(condition, update);
  this.body = yield render('register', {__mail__: user.mail});
}

exports.forgetPass = function *() {
  const mail = this.user.email;
  const token = this.query.token;
  console.log(token)
  this.body = yield render('resetPass', {__mail__: mail, token: token});
}


