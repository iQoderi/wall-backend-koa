/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const Router = require('koa-router')();
const auth = require('./api/auth');
const user = require('./api/user');
const email = require('./api/email');
const work = require('./api/work');
const apiDoc = require('./api/apiDoc');

module.exports = function (app) {
  Router.use('/', apiDoc.routes(), auth.allowedMethods());
  Router.use('/auth', auth.routes(), auth.allowedMethods());
  Router.use('/user', user.routes(), auth.allowedMethods());
  Router.use('/email', email.routes(), auth.allowedMethods());
  Router.use('/work', work.routes(), auth.allowedMethods());
  Router.get("/*", function *() {
    this.body = {code: 0, data: "齐超是个帅比"};
  });
  app.use(Router.routes());
};
