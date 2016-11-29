/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const Router = require('koa-router')();
const auth = require('./api/auth');
const user = require('./api/user');
const admin=require('./api/admin');
const apiDoc = require('./api/apiDoc');
const mail = require('./api/mailPage');

module.exports = function (app) {
  Router.use('/', apiDoc.routes(), auth.allowedMethods());
  Router.use('/auth', auth.routes(), auth.allowedMethods());
  Router.use('/user', user.routes(), user.allowedMethods());
  Router.use('/admin', admin.routes(), admin.allowedMethods());
  Router.use('/mail', mail.routes(), mail.allowedMethods());
  Router.get("/*", function *() {
    this.body = {code: 0, data: "齐超是个帅比"};
  });
  app.use(Router.routes());
};
